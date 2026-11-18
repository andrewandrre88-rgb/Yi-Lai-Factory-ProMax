import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../firebase';

export type UploadFolder = 'products' | 'blog';

export interface UploadedImageResult {
  url: string;
  suggestedLabel: string;
  mode: 'storage' | 'compressed';
}

const MAX_RAW_FILE_BYTES = 12 * 1024 * 1024; // 12 MB raw upload limit
const MAX_FIRESTORE_DATA_URL_CHARS = 90000; // Fits safely inside 100k rule & 1MB doc cap even with 6 images
const STORAGE_TIMEOUT_MS = 6000;

export class ImageUploadValidationError extends Error {
  code: 'invalid-type' | 'too-large' | 'read-failed';

  constructor(code: 'invalid-type' | 'too-large' | 'read-failed', message: string) {
    super(message);
    this.code = code;
  }
}

function buildSuggestedLabel(filename: string): string {
  const withoutExt = filename.replace(/\.[^.]+$/, '');
  const spaced = withoutExt.replace(/[-_]+/g, ' ').replace(/\s+/g, ' ').trim();
  if (!spaced) return 'Product Photo';
  return spaced.charAt(0).toUpperCase() + spaced.slice(1, 60);
}

function loadImageElement(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const objectUrl = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(objectUrl);
      resolve(img);
    };
    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new ImageUploadValidationError('read-failed', 'Could not decode image file.'));
    };
    img.src = objectUrl;
  });
}

function renderToDataUrl(
  img: HTMLImageElement,
  maxDimension: number,
  mimeType: 'image/webp' | 'image/jpeg',
  quality: number
): string {
  const scale = Math.min(1, maxDimension / Math.max(img.naturalWidth || 1, img.naturalHeight || 1));
  const width = Math.max(1, Math.round(img.naturalWidth * scale));
  const height = Math.max(1, Math.round(img.naturalHeight * scale));

  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new ImageUploadValidationError('read-failed', 'Canvas 2D context unavailable.');
  }

  // Fill clean white backing for transparent PNGs exported to JPEG
  if (mimeType === 'image/jpeg') {
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, width, height);
  }
  ctx.drawImage(img, 0, 0, width, height);
  return canvas.toDataURL(mimeType, quality);
}

function renderToBlob(
  img: HTMLImageElement,
  maxDimension: number,
  mimeType: string,
  quality: number
): Promise<Blob | null> {
  return new Promise((resolve) => {
    const scale = Math.min(1, maxDimension / Math.max(img.naturalWidth || 1, img.naturalHeight || 1));
    const width = Math.max(1, Math.round(img.naturalWidth * scale));
    const height = Math.max(1, Math.round(img.naturalHeight * scale));

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      resolve(null);
      return;
    }
    ctx.drawImage(img, 0, 0, width, height);
    canvas.toBlob((blob) => resolve(blob), mimeType, quality);
  });
}

function compressImageToSafeDataUrl(img: HTMLImageElement): string {
  const attempts: Array<{ maxDim: number; quality: number }> = [
    { maxDim: 960, quality: 0.78 },
    { maxDim: 820, quality: 0.7 },
    { maxDim: 680, quality: 0.62 },
    { maxDim: 540, quality: 0.54 },
    { maxDim: 420, quality: 0.46 },
  ];

  // Try WebP first if supported by browser canvas, then fallback to JPEG
  for (const attempt of attempts) {
    const webp = renderToDataUrl(img, attempt.maxDim, 'image/webp', attempt.quality);
    if (webp.startsWith('data:image/webp') && webp.length <= MAX_FIRESTORE_DATA_URL_CHARS) {
      return webp;
    }
    const jpeg = renderToDataUrl(img, attempt.maxDim, 'image/jpeg', attempt.quality);
    if (jpeg.length <= MAX_FIRESTORE_DATA_URL_CHARS) {
      return jpeg;
    }
  }

  return renderToDataUrl(img, 360, 'image/jpeg', 0.4);
}

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return new Promise((resolve, reject) => {
    const timer = window.setTimeout(() => {
      reject(new Error('Storage upload timed out'));
    }, ms);

    promise
      .then((res) => {
        window.clearTimeout(timer);
        resolve(res);
      })
      .catch((err) => {
        window.clearTimeout(timer);
        reject(err);
      });
  });
}

export async function uploadDashboardImage(
  file: File,
  folder: UploadFolder,
  uid: string
): Promise<UploadedImageResult> {
  if (!file.type.startsWith('image/')) {
    throw new ImageUploadValidationError(
      'invalid-type',
      `Unsupported file type: ${file.type || file.name}`
    );
  }
  if (file.size > MAX_RAW_FILE_BYTES) {
    throw new ImageUploadValidationError('too-large', 'File exceeds 12 MB limit.');
  }

  const img = await loadImageElement(file);
  const suggestedLabel = buildSuggestedLabel(file.name);

  // Optimize oversized images before sending to Firebase Storage
  const preservePng = file.type === 'image/png';
  const targetMime = preservePng ? 'image/png' : 'image/jpeg';
  const optimizedBlob =
    (await renderToBlob(img, 1400, targetMime, 0.85)) ?? file;

  const safeFilename =
    file.name
      .toLowerCase()
      .replace(/[^a-z0-9._-]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 60) || 'image.jpg';

  const objectPath = `cms-uploads/${folder}/${uid}/${Date.now()}-${safeFilename}`;
  const storageRef = ref(storage, objectPath);

  try {
    await withTimeout(
      uploadBytes(storageRef, optimizedBlob, {
        contentType: optimizedBlob.type || file.type,
        cacheControl: 'public, max-age=31536000',
      }),
      STORAGE_TIMEOUT_MS
    );
    const downloadUrl = await withTimeout(getDownloadURL(storageRef), STORAGE_TIMEOUT_MS);
    return {
      url: downloadUrl,
      suggestedLabel,
      mode: 'storage',
    };
  } catch {
    // Graceful fallback if Firebase Storage bucket rules/billing aren't enabled yet:
    // compress cleanly into a lightweight WebP/JPEG data URL under Firestore doc bounds.
    const compactDataUrl = compressImageToSafeDataUrl(img);
    return {
      url: compactDataUrl,
      suggestedLabel,
      mode: 'compressed',
    };
  }
}
