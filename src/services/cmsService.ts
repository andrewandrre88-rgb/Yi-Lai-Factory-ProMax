import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  Timestamp,
  Unsubscribe,
  updateDoc,
  where,
  writeBatch,
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';
import { PRODUCT_CATEGORIES, ProductVariant } from '../data/factoryData';
import { BlogCategory, BlogPost, STARTER_BLOG_POSTS } from '../data/blogData';
import {
  EMPTY_SOCIAL_LINKS,
  MAX_ACCOUNTS_PER_PLATFORM,
  SOCIAL_PLATFORMS,
  SocialMediaLinks,
  SocialPlatformKey,
} from '../components/SocialLinksBar';

export type { SocialMediaLinks };

export interface CmsProductRecord {
  id: string;
  categoryId: string;
  slug: string;
  model: string;
  neckFinish: string;
  dosage: string;
  closureStyle: string;
  springType: string;
  moq: string;
  materials: string;
  leadTime: string;
  applications: string;
  description: string;
  features: string[];
  galleryUrls: string[];
  galleryLabels: string[];
  status: 'active' | 'archived';
  socialLinks?: SocialMediaLinks;
  authorUid: string;
  isEdited: boolean;
}

export interface ProductInput {
  categoryId: string;
  slug: string;
  model: string;
  neckFinish: string;
  dosage: string;
  closureStyle: string;
  springType: string;
  moq: string;
  materials: string;
  leadTime: string;
  applications: string;
  description: string;
  features: string[];
  galleryUrls: string[];
  galleryLabels: string[];
  status: 'active' | 'archived';
  socialLinks?: SocialMediaLinks;
}

export interface BlogPostInput {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: BlogCategory;
  coverImage: string;
  authorName: string;
  readTime: string;
  tags: string[];
  status: 'published' | 'draft';
  publishedAt: string;
  socialLinks?: SocialMediaLinks;
}

export interface SeoFaqEntry {
  id: string;
  question: string;
  answer: string;
}

export interface SeoSettings {
  siteTitle: string;
  metaDescription: string;
  keywords: string[];
  canonicalUrl: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  robotsIndex: boolean;
  googleVerification: string;
  bingVerification: string;
  yandexVerification: string;
  baiduVerification: string;
  autoApplyToNewContent: boolean;
  enableFaqSchema: boolean;
  enableItemListSchema: boolean;
  enableHreflangTags: boolean;
  indexNowKey: string;
  trackedKeywords: string[];
  faqItems: SeoFaqEntry[];
}

export const DEFAULT_SEO_FAQS: SeoFaqEntry[] = [
  {
    id: 'faq-moq-leadtime',
    question:
      'What is the MOQ and production lead time for trigger sprayers, lotion pumps, foam pumps, and fine mist sprayers?',
    answer:
      'Yi Lai Plastics standard MOQ is 10,000 pcs per SKU (20,000 pcs for select mini triggers and closures), with 15 to 22 day factory production lead times from Yuyao, Ningbo and direct FOB Ningbo container consolidation.',
  },
  {
    id: 'faq-neck-sizes',
    question:
      'Which SPI bottle neck finishes are supported across your sprayers and lotion pumps?',
    answer:
      'We manufacture in-house moulds for 18/410, 18/415, 20/410, 24/410, 28/400, 28/410, and 40/400 SPI neck finishes, with custom angle-cut LDPE dip tubes matched to your exact bottle height within ±1.0 mm.',
  },
  {
    id: 'faq-springs-chemical',
    question:
      'Do you offer 316 stainless steel or metal-free springs for bleach and acidic cleaners?',
    answer:
      'Yes. Standard household cleaners use external 304 stainless steel springs, while sodium hypochlorite bleach, bathroom descalers, and alkaline degreasers can be built with 316 marine-grade stainless steel springs or all-plastic metal-free valving.',
  },
  {
    id: 'faq-pantone-samples',
    question:
      'Can we order custom Pantone colors and free test samples before bulk production?',
    answer:
      'Yes. Our Yuyao colour room matches any Pantone solid coated code across PP shrouds, triggers, lotion pump collars, and bottle caps, and we ship a free 50-piece technical sample kit for leak and compatibility testing.',
  },
];

export const DEFAULT_SEO_SETTINGS: SeoSettings = {
  siteTitle: 'Yi Lai Plastics — Trigger Sprayer, Lotion Pump & Mist Factory',
  metaDescription:
    'ISO 9001 manufacturer of trigger sprayers, lotion pumps, foam pumps, and fine mist sprayers in Yuyao, Ningbo. Custom Pantone OEM & direct FOB export.',
  keywords: [
    'trigger sprayer',
    'lotion pump',
    'foam pump',
    'fine mist sprayer',
    'trigger sprayer manufacturer',
    'lotion pump factory China',
    'foam trigger sprayer OEM',
    '28/410 trigger sprayer wholesale',
    'fine mist atomizer supplier',
    'Yuyao plastic dispensers Ningbo',
  ],
  canonicalUrl: 'https://yilaiplastics.online',
  ogTitle: 'Yi Lai Plastics — Trigger Sprayer, Lotion Pump & Mist Factory',
  ogDescription:
    'ISO 9001 manufacturer of trigger sprayers, lotion pumps, foam pumps, and fine mist sprayers in Yuyao, Ningbo. Custom Pantone OEM & direct FOB export.',
  ogImage: '/src/assets/images/product_trigger_sprayer_1795008502569.jpg',
  robotsIndex: true,
  googleVerification: '',
  bingVerification: '',
  yandexVerification: '',
  baiduVerification: '',
  autoApplyToNewContent: true,
  enableFaqSchema: true,
  enableItemListSchema: true,
  enableHreflangTags: true,
  indexNowKey: 'yilai8899triggerlotionfoamfinemist2026',
  trackedKeywords: [
    'trigger sprayer',
    'lotion pump',
    'foam pump',
    'fine mist sprayer',
    '28/410 trigger sprayer',
    'lotion pump manufacturer',
    'foam trigger sprayer',
    'fine mist atomizer supplier',
  ],
  faqItems: DEFAULT_SEO_FAQS,
};

export const RECOMMENDED_SEO_SETTINGS: SeoSettings = {
  ...DEFAULT_SEO_SETTINGS,
  siteTitle: 'Trigger Sprayer, Lotion, Foam & Fine Mist Pump | Yi Lai',
  metaDescription:
    'Top China factory for trigger sprayers, lotion pumps, foam pumps & fine mist sprayers (24/410, 28/410). Custom Pantone, 316 SS springs & FOB Ningbo.',
  keywords: [
    'trigger sprayer',
    'lotion pump',
    'foam pump',
    'fine mist sprayer',
    'trigger sprayer manufacturer China',
    '28/410 trigger sprayer wholesale',
    'lotion pump supplier Ningbo',
    'foam pump manufacturer OEM',
    'fine mist sprayer factory',
    '24/410 lotion pump dispenser',
    '20/410 fine mist atomizer',
    'foam trigger sprayer 28/410',
    'chemical resistant 316 spring sprayer',
    'custom Pantone bottle closures Yuyao',
    'Yi Lai Plastics Industry',
  ],
  canonicalUrl: 'https://yilaiplastics.online',
  ogTitle: 'Trigger Sprayer, Lotion, Foam & Fine Mist Pump | Yi Lai',
  ogDescription:
    'Top China factory for trigger sprayers, lotion pumps, foam pumps & fine mist sprayers (24/410, 28/410). Custom Pantone, 316 SS springs & FOB Ningbo.',
  autoApplyToNewContent: true,
  enableFaqSchema: true,
  enableItemListSchema: true,
  enableHreflangTags: true,
};

const VALID_PRODUCT_CATEGORIES = new Set([
  'trigger-sprayers',
  'mini-triggers',
  'foam-triggers',
  'lotion-pumps',
  'fine-mist-sprayers',
  'bottle-caps-closures',
]);

const VALID_BLOG_CATEGORIES = new Set<BlogCategory>([
  'Engineering',
  'Manufacturing',
  'Quality Control',
  'Packaging Trends',
  'Export & Logistics',
]);

export function sanitizeSlug(raw: string, fallbackPrefix = 'item'): string {
  const cleaned = raw
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 75);
  return cleaned || `${fallbackPrefix}-${Date.now().toString(36)}`;
}

function clampStr(val: string, max: number, fallback = '-'): string {
  const trimmed = val.trim().slice(0, max);
  return trimmed.length > 0 ? trimmed : fallback;
}

function normalizeSocialUrl(raw: unknown, platform?: SocialPlatformKey): string {
  if (typeof raw !== 'string') return '';
  const trimmed = raw.replace(/[\r\n]+/g, '').trim();
  if (!trimmed) return '';
  if (/^(javascript|data|vbscript):/i.test(trimmed)) return '';

  if (platform === 'gmail') {
    if (/^mailto:/i.test(trimmed)) {
      return `mailto:${trimmed.slice(7).trim()}`.slice(0, 300);
    }
    if (/^https?:\/\//i.test(trimmed)) {
      return trimmed.replace(/^https?:\/\//i, (m) => m.toLowerCase()).slice(0, 300);
    }
    if (/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(trimmed)) {
      return `mailto:${trimmed}`.slice(0, 300);
    }
    return `https://${trimmed}`.slice(0, 300);
  }

  const withScheme = /^https?:\/\//i.test(trimmed)
    ? trimmed.replace(/^https?:\/\//i, (m) => m.toLowerCase())
    : `https://${trimmed}`;
  return withScheme.slice(0, 300);
}

function normalizePlatformList(rawValue: unknown, platform: SocialPlatformKey): string[] {
  const rawList = Array.isArray(rawValue)
    ? rawValue
    : typeof rawValue === 'string'
    ? [rawValue]
    : [];

  return rawList
    .map((entry) => normalizeSocialUrl(entry, platform))
    .filter(Boolean)
    .slice(0, MAX_ACCOUNTS_PER_PLATFORM);
}

export function normalizeSocialLinks(
  raw?: Partial<Record<SocialPlatformKey, unknown>> | null
): SocialMediaLinks {
  return {
    facebook: normalizePlatformList(raw?.facebook, 'facebook'),
    instagram: normalizePlatformList(raw?.instagram, 'instagram'),
    tiktok: normalizePlatformList(raw?.tiktok, 'tiktok'),
    youtube: normalizePlatformList(raw?.youtube, 'youtube'),
    linkedin: normalizePlatformList(raw?.linkedin, 'linkedin'),
    x: normalizePlatformList(raw?.x, 'x'),
    snapchat: normalizePlatformList(raw?.snapchat, 'snapchat'),
    pinterest: normalizePlatformList(raw?.pinterest, 'pinterest'),
    gmail: normalizePlatformList(raw?.gmail, 'gmail'),
  };
}

export function countSocialLinks(links?: SocialMediaLinks | null): number {
  if (!links) return 0;
  return SOCIAL_PLATFORMS.reduce((sum, p) => {
    const val = links[p.key];
    if (Array.isArray(val)) return sum + val.filter((u) => Boolean(u?.trim())).length;
    return sum + (typeof val === 'string' && Boolean(String(val).trim()) ? 1 : 0);
  }, 0);
}

export function hasAnySocialLink(links?: SocialMediaLinks | null): boolean {
  return countSocialLinks(links) > 0;
}

function normalizeProductPayload(input: ProductInput, uid: string) {
  const categoryId = VALID_PRODUCT_CATEGORIES.has(input.categoryId)
    ? input.categoryId
    : 'trigger-sprayers';
  const slug = sanitizeSlug(input.slug || input.model, 'yl-model').slice(0, 80);

  const features = input.features
    .map((f) => f.trim().slice(0, 240))
    .filter(Boolean)
    .slice(0, 10);
  if (features.length === 0) {
    features.push('Precision in-house moulding in Yuyao, Ningbo');
  }

  const urls = input.galleryUrls
    .map((u) => u.trim())
    .filter((u) => u.length > 0 && u.length <= 100000)
    .slice(0, 6);
  if (urls.length === 0) {
    urls.push('/src/assets/images/product_trigger_sprayer_1795008502569.jpg');
  }

  const labels = urls.map((_, idx) =>
    clampStr(input.galleryLabels[idx] || `Product View ${idx + 1}`, 120)
  );

  return {
    categoryId,
    slug,
    model: clampStr(input.model, 140),
    neckFinish: clampStr(input.neckFinish, 80, '28/410'),
    dosage: clampStr(input.dosage, 80, '1.25 ml/stroke'),
    closureStyle: clampStr(input.closureStyle, 120, 'Ribbed / Smooth'),
    springType: clampStr(input.springType, 120, '304 Stainless Steel'),
    moq: clampStr(input.moq, 60, '10,000 pcs'),
    materials: clampStr(input.materials, 200, 'Virgin PP'),
    leadTime: clampStr(input.leadTime, 60, '15–18 days'),
    applications: clampStr(input.applications, 300, 'Household & industrial cleaners'),
    description: clampStr(input.description, 2000),
    features,
    galleryUrls: urls,
    galleryLabels: labels,
    status: input.status === 'archived' ? 'archived' : ('active' as const),
    socialLinks: normalizeSocialLinks(input.socialLinks),
    authorUid: uid,
  };
}

function normalizeBlogPayload(input: BlogPostInput, uid: string) {
  const category = VALID_BLOG_CATEGORIES.has(input.category)
    ? input.category
    : 'Engineering';
  const slug = sanitizeSlug(input.slug || input.title, 'article').slice(0, 100);
  const tags = input.tags
    .map((t) => t.trim().slice(0, 40))
    .filter(Boolean)
    .slice(0, 8);

  return {
    slug,
    title: clampStr(input.title, 180),
    excerpt: clampStr(input.excerpt, 2000),
    content: clampStr(input.content, 50000),
    category,
    coverImage: clampStr(
      input.coverImage,
      100000,
      '/src/assets/images/factory_injection_moulding_1795005762839.jpg'
    ),
    authorName: clampStr(input.authorName, 80, 'Yi Lai Engineering Desk'),
    readTime: clampStr(input.readTime, 40, '4 min read'),
    tags,
    status: input.status === 'draft' ? 'draft' : ('published' as const),
    publishedAt: clampStr(input.publishedAt, 40, new Date().toISOString().slice(0, 10)),
    socialLinks: normalizeSocialLinks(input.socialLinks),
    authorUid: uid,
  };
}

function extractSocialLinks(raw: unknown): SocialMediaLinks {
  if (!raw || typeof raw !== 'object') return { ...EMPTY_SOCIAL_LINKS };
  return normalizeSocialLinks(raw as Partial<SocialMediaLinks>);
}

function toProductRecord(id: string, data: Record<string, unknown>): CmsProductRecord {
  const createdAt = data.createdAt instanceof Timestamp ? data.createdAt.toMillis() : 0;
  const updatedAt = data.updatedAt instanceof Timestamp ? data.updatedAt.toMillis() : 0;
  const galleryUrls = Array.isArray(data.galleryUrls) ? (data.galleryUrls as string[]) : [];
  const galleryLabels = Array.isArray(data.galleryLabels) ? (data.galleryLabels as string[]) : [];

  return {
    id,
    categoryId: String(data.categoryId || 'trigger-sprayers'),
    slug: String(data.slug || id),
    model: String(data.model || ''),
    neckFinish: String(data.neckFinish || ''),
    dosage: String(data.dosage || ''),
    closureStyle: String(data.closureStyle || ''),
    springType: String(data.springType || ''),
    moq: String(data.moq || ''),
    materials: String(data.materials || ''),
    leadTime: String(data.leadTime || ''),
    applications: String(data.applications || ''),
    description: String(data.description || ''),
    features: Array.isArray(data.features) ? (data.features as string[]) : [],
    galleryUrls,
    galleryLabels,
    status: data.status === 'archived' ? 'archived' : 'active',
    socialLinks: extractSocialLinks(data.socialLinks),
    authorUid: String(data.authorUid || ''),
    isEdited: updatedAt !== createdAt,
  };
}

function toBlogRecord(id: string, data: Record<string, unknown>): BlogPost {
  const createdAt = data.createdAt instanceof Timestamp ? data.createdAt.toMillis() : 0;
  const updatedAt = data.updatedAt instanceof Timestamp ? data.updatedAt.toMillis() : 0;
  const rawCategory = String(data.category || 'Engineering') as BlogCategory;

  return {
    id,
    slug: String(data.slug || id),
    title: String(data.title || ''),
    excerpt: String(data.excerpt || ''),
    content: String(data.content || ''),
    category: VALID_BLOG_CATEGORIES.has(rawCategory) ? rawCategory : 'Engineering',
    coverImage: String(
      data.coverImage || '/src/assets/images/factory_injection_moulding_1795005762839.jpg'
    ),
    authorName: String(data.authorName || 'Yi Lai Engineering Team'),
    readTime: String(data.readTime || '4 min read'),
    tags: Array.isArray(data.tags) ? (data.tags as string[]) : [],
    status: data.status === 'draft' ? 'draft' : 'published',
    publishedAt: String(data.publishedAt || '2026-11-18'),
    socialLinks: extractSocialLinks(data.socialLinks),
    isEdited: updatedAt !== createdAt,
  };
}

export function subscribeCatalogSeeded(
  onChange: (seeded: boolean, loaded: boolean) => void
): Unsubscribe {
  const ref = doc(db, 'siteConfig', 'catalog');
  return onSnapshot(
    ref,
    (snap) => {
      onChange(snap.exists() && Boolean(snap.data()?.seeded), true);
    },
    (error) => {
      handleFirestoreError(error, OperationType.GET, 'siteConfig/catalog');
    }
  );
}

export function subscribeSocialLinks(onData: (links: SocialMediaLinks) => void): Unsubscribe {
  const path = 'socialSettings/default';
  return onSnapshot(
    doc(db, 'socialSettings', 'default'),
    (snap) => {
      if (!snap.exists()) {
        onData({ ...EMPTY_SOCIAL_LINKS });
        return;
      }
      onData(extractSocialLinks(snap.data()));
    },
    (error) => {
      handleFirestoreError(error, OperationType.GET, path);
    }
  );
}

export async function saveSocialLinks(
  uid: string,
  links: SocialMediaLinks
): Promise<SocialMediaLinks> {
  const path = 'socialSettings/default';
  const ref = doc(db, 'socialSettings', 'default');
  const normalized = normalizeSocialLinks(links);

  try {
    const existingSnap = await getDoc(ref);
    if (existingSnap.exists()) {
      await updateDoc(ref, {
        ...normalized,
        updatedBy: uid,
        updatedAt: serverTimestamp(),
      });
    } else {
      await setDoc(ref, {
        ...normalized,
        updatedBy: uid,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    }
    return normalized;
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

export function extractVerificationToken(raw: string): string {
  const trimmed = raw.trim();
  if (!trimmed) return '';
  const match = trimmed.match(/content=["']([^"']+)["']/i);
  if (match && match[1]) {
    return match[1].trim().slice(0, 120);
  }
  return trimmed.slice(0, 120);
}

export function normalizeSeoSettings(raw?: Partial<SeoSettings> | null): SeoSettings {
  const cleanTitle = clampStr(
    String(raw?.siteTitle ?? DEFAULT_SEO_SETTINGS.siteTitle),
    120,
    DEFAULT_SEO_SETTINGS.siteTitle
  );
  const cleanDesc = clampStr(
    String(raw?.metaDescription ?? DEFAULT_SEO_SETTINGS.metaDescription),
    320,
    DEFAULT_SEO_SETTINGS.metaDescription
  );

  const keywords = Array.isArray(raw?.keywords)
    ? raw.keywords
        .map((k) => (typeof k === 'string' ? k.trim().slice(0, 60) : ''))
        .filter(Boolean)
        .slice(0, 30)
    : [...DEFAULT_SEO_SETTINGS.keywords];

  const rawCanonical =
    typeof raw?.canonicalUrl === 'string'
      ? raw.canonicalUrl.replace(/[\r\n]+/g, '').trim()
      : DEFAULT_SEO_SETTINGS.canonicalUrl;
  const canonicalUrl = rawCanonical
    ? /^(javascript|data|vbscript):/i.test(rawCanonical)
      ? ''
      : (/^https?:\/\//i.test(rawCanonical) ? rawCanonical : `https://${rawCanonical}`)
          .replace(/\/+$/, '')
          .slice(0, 300)
    : '';

  const trackedKeywords = Array.isArray(raw?.trackedKeywords)
    ? raw.trackedKeywords
        .map((k) => (typeof k === 'string' ? k.trim().slice(0, 80) : ''))
        .filter(Boolean)
        .slice(0, 20)
    : [...DEFAULT_SEO_SETTINGS.trackedKeywords];

  const faqItems: SeoFaqEntry[] = Array.isArray(raw?.faqItems)
    ? raw.faqItems
        .filter(
          (item): item is SeoFaqEntry =>
            Boolean(item) &&
            typeof item === 'object' &&
            typeof item.question === 'string' &&
            typeof item.answer === 'string' &&
            Boolean(item.question.trim()) &&
            Boolean(item.answer.trim())
        )
        .slice(0, 12)
        .map((item, idx) => ({
          id: clampStr(String(item.id || `faq-${idx + 1}`), 80, `faq-${idx + 1}`),
          question: clampStr(item.question, 300),
          answer: clampStr(item.answer, 1000),
        }))
    : [...DEFAULT_SEO_FAQS];

  const rawIndexNowKey =
    typeof raw?.indexNowKey === 'string'
      ? raw.indexNowKey.replace(/[^a-zA-Z0-9-]/g, '').slice(0, 64)
      : '';

  return {
    siteTitle: cleanTitle,
    metaDescription: cleanDesc,
    keywords,
    canonicalUrl,
    ogTitle:
      typeof raw?.ogTitle === 'string' ? raw.ogTitle.trim().slice(0, 120) : cleanTitle.slice(0, 120),
    ogDescription:
      typeof raw?.ogDescription === 'string'
        ? raw.ogDescription.trim().slice(0, 320)
        : cleanDesc.slice(0, 320),
    ogImage: typeof raw?.ogImage === 'string' ? raw.ogImage.trim().slice(0, 100000) : '',
    robotsIndex: raw?.robotsIndex === false ? false : true,
    googleVerification:
      typeof raw?.googleVerification === 'string'
        ? extractVerificationToken(raw.googleVerification)
        : '',
    bingVerification:
      typeof raw?.bingVerification === 'string' ? extractVerificationToken(raw.bingVerification) : '',
    yandexVerification:
      typeof raw?.yandexVerification === 'string'
        ? extractVerificationToken(raw.yandexVerification)
        : '',
    baiduVerification:
      typeof raw?.baiduVerification === 'string'
        ? extractVerificationToken(raw.baiduVerification)
        : '',
    autoApplyToNewContent: raw?.autoApplyToNewContent === false ? false : true,
    enableFaqSchema: raw?.enableFaqSchema === false ? false : true,
    enableItemListSchema: raw?.enableItemListSchema === false ? false : true,
    enableHreflangTags: raw?.enableHreflangTags === false ? false : true,
    indexNowKey: rawIndexNowKey || DEFAULT_SEO_SETTINGS.indexNowKey,
    trackedKeywords:
      trackedKeywords.length > 0 ? trackedKeywords : [...DEFAULT_SEO_SETTINGS.trackedKeywords],
    faqItems,
  };
}

export function subscribeSeoSettings(onData: (seo: SeoSettings) => void): Unsubscribe {
  const path = 'seoSettings/default';
  return onSnapshot(
    doc(db, 'seoSettings', 'default'),
    (snap) => {
      if (!snap.exists()) {
        onData({ ...DEFAULT_SEO_SETTINGS });
        return;
      }
      onData(normalizeSeoSettings(snap.data() as Partial<SeoSettings>));
    },
    (error) => {
      handleFirestoreError(error, OperationType.GET, path);
    }
  );
}

export async function saveSeoSettings(uid: string, input: SeoSettings): Promise<SeoSettings> {
  const path = 'seoSettings/default';
  const ref = doc(db, 'seoSettings', 'default');
  const normalized = normalizeSeoSettings(input);

  try {
    const existingSnap = await getDoc(ref);
    if (existingSnap.exists()) {
      await updateDoc(ref, {
        ...normalized,
        updatedBy: uid,
        updatedAt: serverTimestamp(),
      });
    } else {
      await setDoc(ref, {
        ...normalized,
        updatedBy: uid,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    }
    return normalized;
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
}

export function subscribePublicProducts(onData: (items: CmsProductRecord[]) => void): Unsubscribe {
  const path = 'products';
  const q = query(collection(db, path), where('status', '==', 'active'));
  return onSnapshot(
    q,
    (snap) => {
      onData(snap.docs.map((d) => toProductRecord(d.id, d.data() as Record<string, unknown>)));
    },
    (error) => {
      handleFirestoreError(error, OperationType.LIST, path);
    }
  );
}

export function subscribeAdminProducts(onData: (items: CmsProductRecord[]) => void): Unsubscribe {
  const path = 'products';
  return onSnapshot(
    collection(db, path),
    (snap) => {
      onData(snap.docs.map((d) => toProductRecord(d.id, d.data() as Record<string, unknown>)));
    },
    (error) => {
      handleFirestoreError(error, OperationType.LIST, path);
    }
  );
}

export function subscribePublicBlogPosts(onData: (posts: BlogPost[]) => void): Unsubscribe {
  const path = 'blogPosts';
  const q = query(collection(db, path), where('status', '==', 'published'));
  return onSnapshot(
    q,
    (snap) => {
      const list = snap.docs.map((d) => toBlogRecord(d.id, d.data() as Record<string, unknown>));
      list.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
      onData(list);
    },
    (error) => {
      handleFirestoreError(error, OperationType.LIST, path);
    }
  );
}

export function subscribeAdminBlogPosts(onData: (posts: BlogPost[]) => void): Unsubscribe {
  const path = 'blogPosts';
  return onSnapshot(
    collection(db, path),
    (snap) => {
      const list = snap.docs.map((d) => toBlogRecord(d.id, d.data() as Record<string, unknown>));
      list.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
      onData(list);
    },
    (error) => {
      handleFirestoreError(error, OperationType.LIST, path);
    }
  );
}

async function resolveUniqueDocId(
  collectionName: 'products' | 'blogPosts',
  baseSlug: string,
  maxLen: number
): Promise<string> {
  const base = sanitizeSlug(baseSlug, collectionName === 'products' ? 'yl-model' : 'post').slice(
    0,
    maxLen
  );
  const firstRef = doc(db, collectionName, base);
  try {
    const firstSnap = await getDoc(firstRef);
    if (!firstSnap.exists()) return base;
  } catch (error) {
    handleFirestoreError(error, OperationType.GET, `${collectionName}/${base}`);
  }

  const suffix = `-${Date.now().toString(36).slice(-5)}`;
  return `${base.slice(0, Math.max(1, maxLen - suffix.length))}${suffix}`;
}

export async function seedStarterContent(uid: string, force = false): Promise<boolean> {
  const configRef = doc(db, 'siteConfig', 'catalog');
  try {
    const configSnap = await getDoc(configRef);
    if (!force && configSnap.exists() && configSnap.data()?.seeded) {
      return false;
    }

    const starterProducts = PRODUCT_CATEGORIES.flatMap((cat) =>
      cat.variants.map((variant) => ({
        cat,
        variant,
        docId: sanitizeSlug(variant.slug, 'product').slice(0, 80),
      }))
    );

    const starterPosts = STARTER_BLOG_POSTS.map((post) => ({
      post,
      docId: sanitizeSlug(post.slug, 'post').slice(0, 100),
    }));

    const [productSnaps, postSnaps] = await Promise.all([
      Promise.all(starterProducts.map((item) => getDoc(doc(db, 'products', item.docId)))),
      Promise.all(starterPosts.map((item) => getDoc(doc(db, 'blogPosts', item.docId)))),
    ]);

    const batch = writeBatch(db);
    let writeCount = 0;

    starterProducts.forEach(({ cat, variant, docId }, idx) => {
      const existingSnap = productSnaps[idx];
      const existingData = existingSnap.exists()
        ? (existingSnap.data() as Record<string, unknown>)
        : null;

      if (existingData && !force) {
        return;
      }

      const preservedSocial = existingData?.socialLinks
        ? extractSocialLinks(existingData.socialLinks)
        : { ...EMPTY_SOCIAL_LINKS };

      const payload = normalizeProductPayload(
        {
          categoryId: cat.id,
          slug: docId,
          model: variant.model,
          neckFinish: variant.neckFinish,
          dosage: variant.dosage,
          closureStyle: variant.closureStyle,
          springType: variant.springType,
          moq: variant.moq,
          materials: variant.materials,
          leadTime: variant.leadTime,
          applications: variant.applications,
          description: variant.description,
          features: variant.features,
          galleryUrls: variant.gallery.map((g) => g.src),
          galleryLabels: variant.gallery.map((g) => g.label),
          status: 'active',
          socialLinks: preservedSocial,
        },
        uid
      );

      const targetRef = doc(db, 'products', docId);
      if (existingData) {
        batch.update(targetRef, {
          categoryId: payload.categoryId,
          slug: payload.slug,
          model: payload.model,
          neckFinish: payload.neckFinish,
          dosage: payload.dosage,
          closureStyle: payload.closureStyle,
          springType: payload.springType,
          moq: payload.moq,
          materials: payload.materials,
          leadTime: payload.leadTime,
          applications: payload.applications,
          description: payload.description,
          features: payload.features,
          galleryUrls: payload.galleryUrls,
          galleryLabels: payload.galleryLabels,
          status: payload.status,
          socialLinks: payload.socialLinks,
          updatedAt: serverTimestamp(),
        });
      } else {
        batch.set(targetRef, {
          ...payload,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
      }
      writeCount += 1;
    });

    starterPosts.forEach(({ post, docId }, idx) => {
      const existingSnap = postSnaps[idx];
      const existingData = existingSnap.exists()
        ? (existingSnap.data() as Record<string, unknown>)
        : null;

      if (existingData && !force) {
        return;
      }

      const preservedSocial = existingData?.socialLinks
        ? extractSocialLinks(existingData.socialLinks)
        : { ...EMPTY_SOCIAL_LINKS };

      const payload = normalizeBlogPayload(
        {
          slug: docId,
          title: post.title,
          excerpt: post.excerpt,
          content: post.content,
          category: post.category,
          coverImage: post.coverImage,
          authorName: post.authorName,
          readTime: post.readTime,
          tags: post.tags,
          status: post.status,
          publishedAt: post.publishedAt,
          socialLinks: preservedSocial,
        },
        uid
      );

      const targetRef = doc(db, 'blogPosts', docId);
      if (existingData) {
        batch.update(targetRef, {
          slug: payload.slug,
          title: payload.title,
          excerpt: payload.excerpt,
          content: payload.content,
          category: payload.category,
          coverImage: payload.coverImage,
          authorName: payload.authorName,
          readTime: payload.readTime,
          tags: payload.tags,
          status: payload.status,
          publishedAt: payload.publishedAt,
          socialLinks: payload.socialLinks,
          updatedAt: serverTimestamp(),
        });
      } else {
        batch.set(targetRef, {
          ...payload,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        });
      }
      writeCount += 1;
    });

    if (configSnap.exists()) {
      batch.update(configRef, {
        seeded: true,
        updatedBy: uid,
        updatedAt: serverTimestamp(),
      });
    } else {
      batch.set(configRef, {
        seeded: true,
        updatedBy: uid,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    }
    writeCount += 1;

    if (writeCount > 0) {
      await batch.commit();
    }
    return true;
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, 'siteConfig/catalog');
  }
}

export async function saveProduct(
  uid: string,
  input: ProductInput,
  existingId?: string
): Promise<string> {
  const normalized = normalizeProductPayload(input, uid);
  let docId = existingId ? existingId : normalized.slug;
  let currentPath = `products/${docId}`;

  try {
    await seedStarterContent(uid);

    if (!existingId) {
      docId = await resolveUniqueDocId('products', normalized.slug, 80);
      currentPath = `products/${docId}`;
    }

    const ref = doc(db, 'products', docId);
    const existingSnap = existingId ? await getDoc(ref) : null;

    if (existingSnap?.exists()) {
      await updateDoc(ref, {
        categoryId: normalized.categoryId,
        slug: normalized.slug,
        model: normalized.model,
        neckFinish: normalized.neckFinish,
        dosage: normalized.dosage,
        closureStyle: normalized.closureStyle,
        springType: normalized.springType,
        moq: normalized.moq,
        materials: normalized.materials,
        leadTime: normalized.leadTime,
        applications: normalized.applications,
        description: normalized.description,
        features: normalized.features,
        galleryUrls: normalized.galleryUrls,
        galleryLabels: normalized.galleryLabels,
        status: normalized.status,
        ...(hasAnySocialLink(normalized.socialLinks)
          ? { socialLinks: normalized.socialLinks }
          : {}),
        updatedAt: serverTimestamp(),
      });
    } else {
      const { socialLinks: normalizedSocial, ...coreFields } = normalized;
      const createPayload: Record<string, unknown> = hasAnySocialLink(normalizedSocial)
        ? {
            ...coreFields,
            socialLinks: normalizedSocial,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
          }
        : {
            ...coreFields,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
          };
      try {
        await setDoc(ref, createPayload);
      } catch (writeErr) {
        const checks: string[] = [];
        if (!/^[a-zA-Z0-9_-]{1,128}$/.test(docId)) checks.push(`badId:${docId}`);
        if (!VALID_PRODUCT_CATEGORIES.has(normalized.categoryId)) checks.push(`badCat:${normalized.categoryId}`);
        if (!/^[a-zA-Z0-9_-]{1,80}$/.test(normalized.slug)) checks.push(`badSlug:${normalized.slug}`);
        const strLimits: Array<[string, string, number]> = [
          ['model', normalized.model, 140],
          ['neckFinish', normalized.neckFinish, 80],
          ['dosage', normalized.dosage, 80],
          ['closureStyle', normalized.closureStyle, 120],
          ['springType', normalized.springType, 120],
          ['moq', normalized.moq, 60],
          ['materials', normalized.materials, 200],
          ['leadTime', normalized.leadTime, 60],
          ['applications', normalized.applications, 300],
          ['description', normalized.description, 2000],
          ['authorUid', normalized.authorUid, 128],
        ];
        for (const [k, v, max] of strLimits) {
          if (typeof v !== 'string' || v.length < 1 || v.length > max) {
            checks.push(`badStr:${k}=${typeof v}:${String(v).length}`);
          }
        }
        if (normalized.status !== 'active' && normalized.status !== 'archived') {
          checks.push(`badStatus:${normalized.status}`);
        }
        if (normalized.features.length < 1 || normalized.features.length > 10 || normalized.features[0].length > 240) {
          checks.push(`badFeatures:${normalized.features.length}`);
        }
        if (normalized.galleryUrls.length < 1 || normalized.galleryUrls.length > 6 || normalized.galleryUrls[0].length > 100000) {
          checks.push(`badGalleryUrls:${normalized.galleryUrls.length}/${normalized.galleryUrls[0]?.length ?? 0}`);
        }
        if (normalized.galleryLabels.length !== normalized.galleryUrls.length || normalized.galleryLabels[0].length > 120) {
          checks.push(`badGalleryLabels:${normalized.galleryLabels.length}`);
        }
        if (hasAnySocialLink(normalizedSocial)) {
          for (const p of SOCIAL_PLATFORMS) {
            const arr = normalizedSocial[p.key];
            if (!Array.isArray(arr) || arr.length > 5 || arr.some((u) => !/^(https?:\/\/|mailto:)/i.test(u) || u.length > 300)) {
              checks.push(`badSocial:${p.key}`);
            }
          }
        }
        const diagSummary =
          checks.length > 0
            ? checks.join(',')
            : `clientChecksOK;keys=${Object.keys(createPayload).length};hasSocial=${hasAnySocialLink(normalizedSocial)};gallery0Len=${normalized.galleryUrls[0]?.length ?? 0};uidLen=${uid.length};slug=${normalized.slug}`;
        const baseMsg = writeErr instanceof Error ? writeErr.message : String(writeErr);
        throw new Error(`${baseMsg} [diag: ${diagSummary}]`);
      }
    }

    return docId;
  } catch (error) {
    if (error instanceof Error && error.message.startsWith('{"error":')) {
      throw error;
    }
    handleFirestoreError(
      error,
      existingId ? OperationType.UPDATE : OperationType.CREATE,
      currentPath
    );
  }
}

export async function deleteProduct(uid: string, productId: string): Promise<void> {
  const path = `products/${productId}`;
  try {
    await seedStarterContent(uid);
    await deleteDoc(doc(db, 'products', productId));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}

export async function saveBlogPost(
  uid: string,
  input: BlogPostInput,
  existingId?: string
): Promise<string> {
  const normalized = normalizeBlogPayload(input, uid);
  let docId = existingId ? existingId : normalized.slug;
  let currentPath = `blogPosts/${docId}`;

  try {
    await seedStarterContent(uid);

    if (!existingId) {
      docId = await resolveUniqueDocId('blogPosts', normalized.slug, 100);
      currentPath = `blogPosts/${docId}`;
    }

    const ref = doc(db, 'blogPosts', docId);
    const existingSnap = existingId ? await getDoc(ref) : null;

    if (existingSnap?.exists()) {
      await updateDoc(ref, {
        slug: normalized.slug,
        title: normalized.title,
        excerpt: normalized.excerpt,
        content: normalized.content,
        category: normalized.category,
        coverImage: normalized.coverImage,
        authorName: normalized.authorName,
        readTime: normalized.readTime,
        tags: normalized.tags,
        status: normalized.status,
        publishedAt: normalized.publishedAt,
        ...(hasAnySocialLink(normalized.socialLinks)
          ? { socialLinks: normalized.socialLinks }
          : {}),
        updatedAt: serverTimestamp(),
      });
    } else {
      const { socialLinks: normalizedSocial, ...coreFields } = normalized;
      const createPayload = hasAnySocialLink(normalizedSocial)
        ? {
            ...coreFields,
            socialLinks: normalizedSocial,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
          }
        : {
            ...coreFields,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
          };
      try {
        await setDoc(ref, createPayload);
      } catch (writeErr) {
        const checks: string[] = [];
        if (!/^[a-zA-Z0-9_-]{1,128}$/.test(docId)) checks.push(`badId:${docId}`);
        if (!VALID_BLOG_CATEGORIES.has(normalized.category)) checks.push(`badCat:${normalized.category}`);
        if (!/^[a-zA-Z0-9_-]{1,100}$/.test(normalized.slug)) checks.push(`badSlug:${normalized.slug}`);
        const strLimits: Array<[string, string, number]> = [
          ['title', normalized.title, 180],
          ['excerpt', normalized.excerpt, 2000],
          ['content', normalized.content, 50000],
          ['coverImage', normalized.coverImage, 100000],
          ['authorName', normalized.authorName, 80],
          ['readTime', normalized.readTime, 40],
          ['publishedAt', normalized.publishedAt, 40],
          ['authorUid', normalized.authorUid, 128],
        ];
        for (const [k, v, max] of strLimits) {
          if (typeof v !== 'string' || v.length < 1 || v.length > max) {
            checks.push(`badStr:${k}=${typeof v}:${String(v).length}`);
          }
        }
        if (normalized.status !== 'published' && normalized.status !== 'draft') {
          checks.push(`badStatus:${normalized.status}`);
        }
        if (normalized.tags.length > 8 || (normalized.tags.length > 0 && normalized.tags[0].length > 40)) {
          checks.push(`badTags:${normalized.tags.length}`);
        }
        const diagSummary =
          checks.length > 0
            ? checks.join(',')
            : `clientChecksOK;keys=${Object.keys(createPayload).length};hasSocial=${hasAnySocialLink(normalizedSocial)};coverLen=${normalized.coverImage.length};uidLen=${uid.length};slug=${normalized.slug}`;
        const baseMsg = writeErr instanceof Error ? writeErr.message : String(writeErr);
        throw new Error(`${baseMsg} [diag: ${diagSummary}]`);
      }
    }

    return docId;
  } catch (error) {
    if (error instanceof Error && error.message.startsWith('{"error":')) {
      throw error;
    }
    handleFirestoreError(
      error,
      existingId ? OperationType.UPDATE : OperationType.CREATE,
      currentPath
    );
  }
}

export async function deleteBlogPost(uid: string, postId: string): Promise<void> {
  const path = `blogPosts/${postId}`;
  try {
    await seedStarterContent(uid);
    await deleteDoc(doc(db, 'blogPosts', postId));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
}

export function cmsProductToVariant(record: CmsProductRecord): ProductVariant {
  return {
    slug: record.slug,
    model: record.model,
    neckFinish: record.neckFinish,
    dosage: record.dosage,
    closureStyle: record.closureStyle,
    springType: record.springType,
    moq: record.moq,
    materials: record.materials,
    leadTime: record.leadTime,
    applications: record.applications,
    description: record.description,
    features: record.features,
    gallery: record.galleryUrls.map((src, i) => ({
      src,
      label: record.galleryLabels[i] || `View ${i + 1}`,
    })),
    socialLinks: record.socialLinks,
  };
}
