import { ChangeEvent, DragEvent, FormEvent, useEffect, useState } from 'react';
import { User, signInWithPopup, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import {
  AlertCircle,
  ArrowLeft,
  BookOpen,
  CheckCircle2,
  Edit3,
  ExternalLink,
  ImagePlus,
  Layers,
  Loader2,
  Lock,
  LogOut,
  Package,
  Plus,
  RefreshCw,
  Search,
  Share2,
  Trash2,
  Upload,
  X,
} from 'lucide-react';
import { auth, db, googleProvider, PRIMARY_ADMIN_EMAIL } from '../firebase';
import { LanguageCode } from '../data/factoryData';
import { getLocalizedCategories } from '../data/translations';
import {
  BLOG_CATEGORIES,
  BlogCategory,
  BlogPost,
  STUDIO_IMAGE_PRESETS,
} from '../data/blogData';
import { getCmsStrings } from '../data/cmsTranslations';
import {
  BlogPostInput,
  CmsProductRecord,
  deleteBlogPost,
  deleteProduct,
  hasAnySocialLink,
  ProductInput,
  sanitizeSlug,
  saveBlogPost,
  saveProduct,
  saveSocialLinks,
  seedStarterContent,
  SocialMediaLinks,
} from '../services/cmsService';
import {
  ImageUploadValidationError,
  uploadDashboardImage,
} from '../services/imageUploadService';
import { LanguageSwitcher } from './LanguageSwitcher';
import {
  EMPTY_SOCIAL_LINKS,
  SOCIAL_PLATFORMS,
  SocialLinksBar,
  SocialPlatformIcon,
} from './SocialLinksBar';

interface DashboardPageProps {
  lang: LanguageCode;
  onChangeLang: (lang: LanguageCode) => void;
  user: User | null;
  authReady: boolean;
  catalogSeeded: boolean;
  catalogConfigReady: boolean;
  products: CmsProductRecord[];
  blogPosts: BlogPost[];
  socialLinks: SocialMediaLinks;
  onBackHome: () => void;
  onOpenProductsPage: () => void;
  onOpenBlogPage: (slug?: string | null) => void;
}

type DashboardTab = 'products' | 'blog' | 'social';

const EMPTY_PRODUCT_FORM: ProductInput = {
  categoryId: 'trigger-sprayers',
  slug: '',
  model: '',
  neckFinish: '28/400 & 28/410',
  dosage: '1.25 ± 0.10 ml/stroke',
  closureStyle: 'Ribbed / Smooth',
  springType: '304 Stainless Steel (External)',
  moq: '10,000 pcs',
  materials: 'Virgin PP Shroud & Closure · LDPE Dip Tube · 304 SS Spring',
  leadTime: '15–18 days',
  applications: 'Household cleaners, garden care, disinfectants',
  description: '',
  features: ['Precision in-house moulding in Yuyao, Ningbo'],
  galleryUrls: ['/src/assets/images/product_trigger_sprayer_1795008502569.jpg'],
  galleryLabels: ['Studio Front Profile'],
  status: 'active',
};

const EMPTY_BLOG_FORM: BlogPostInput = {
  slug: '',
  title: '',
  excerpt: '',
  content: '',
  category: 'Engineering',
  coverImage: '/src/assets/images/factory_injection_moulding_1795005762839.jpg',
  authorName: 'Yi Lai Engineering Team',
  readTime: '4 min read',
  tags: ['Trigger Sprayers', 'Yuyao Factory'],
  status: 'published',
  publishedAt: new Date().toISOString().slice(0, 10),
};

export function DashboardPage({
  lang,
  onChangeLang,
  user,
  authReady,
  catalogSeeded,
  catalogConfigReady,
  products,
  blogPosts,
  socialLinks,
  onBackHome,
  onOpenProductsPage,
  onOpenBlogPage,
}: DashboardPageProps) {
  const s = getCmsStrings(lang);
  const categories = getLocalizedCategories(lang);

  const [isVerifiedAdmin, setIsVerifiedAdmin] = useState(false);
  const [checkingAdmin, setCheckingAdmin] = useState(true);
  const [activeTab, setActiveTab] = useState<DashboardTab>('products');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; text: string } | null>(
    null
  );
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [isSeeding, setIsSeeding] = useState(false);

  // Social media links form state
  const [socialForm, setSocialForm] = useState<SocialMediaLinks>(EMPTY_SOCIAL_LINKS);
  const [savingSocial, setSavingSocial] = useState(false);

  // Product editor modal state
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [productForm, setProductForm] = useState<ProductInput>(EMPTY_PRODUCT_FORM);
  const [featuresText, setFeaturesText] = useState('');
  const [savingProduct, setSavingProduct] = useState(false);
  const [uploadingGallerySlot, setUploadingGallerySlot] = useState<number | 'batch' | null>(null);
  const [productUploadError, setProductUploadError] = useState<string | null>(null);
  const [isDraggingGallery, setIsDraggingGallery] = useState(false);

  // Blog editor modal state
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [postModalOpen, setPostModalOpen] = useState(false);
  const [postForm, setPostForm] = useState<BlogPostInput>(EMPTY_BLOG_FORM);
  const [tagsText, setTagsText] = useState('');
  const [savingPost, setSavingPost] = useState(false);
  const [uploadingCover, setUploadingCover] = useState(false);
  const [postUploadError, setPostUploadError] = useState<string | null>(null);
  const [isDraggingCover, setIsDraggingCover] = useState(false);

  useEffect(() => {
    setSocialForm({ ...socialLinks });
  }, [socialLinks]);

  useEffect(() => {
    let active = true;
    const verifyRole = async () => {
      if (!authReady) return;
      if (!user || !user.emailVerified) {
        if (active) {
          setIsVerifiedAdmin(false);
          setCheckingAdmin(false);
        }
        return;
      }

      if (user.email?.toLowerCase() === PRIMARY_ADMIN_EMAIL.toLowerCase()) {
        if (active) {
          setIsVerifiedAdmin(true);
          setCheckingAdmin(false);
        }
        return;
      }

      try {
        const adminSnap = await getDoc(doc(db, 'admins', user.uid));
        if (active) {
          setIsVerifiedAdmin(adminSnap.exists());
          setCheckingAdmin(false);
        }
      } catch {
        if (active) {
          setIsVerifiedAdmin(false);
          setCheckingAdmin(false);
        }
      }
    };

    void verifyRole();
    return () => {
      active = false;
    };
  }, [user, authReady]);

  // Automatically initialize starter Firestore products & blog posts on first admin visit
  useEffect(() => {
    if (!isVerifiedAdmin || !user || !catalogConfigReady || catalogSeeded || isSeeding) return;
    let cancelled = false;
    const init = async () => {
      setIsSeeding(true);
      try {
        await seedStarterContent(user.uid, false);
      } catch (err) {
        if (!cancelled) {
          setFeedback({
            type: 'error',
            text: err instanceof Error ? err.message : 'Could not initialize starter catalogue.',
          });
        }
      } finally {
        if (!cancelled) setIsSeeding(false);
      }
    };
    void init();
    return () => {
      cancelled = true;
    };
  }, [isVerifiedAdmin, user, catalogConfigReady, catalogSeeded, isSeeding]);

  const handleGoogleSignIn = async () => {
    setFeedback(null);
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      setFeedback({
        type: 'error',
        text: err instanceof Error ? err.message : 'Google sign-in failed.',
      });
    }
  };

  const handleSignOut = async () => {
    await signOut(auth);
    setFeedback(null);
  };

  const handleSyncStarter = async () => {
    if (!user) return;
    setIsSeeding(true);
    setFeedback(null);
    try {
      await seedStarterContent(user.uid, true);
      setFeedback({
        type: 'success',
        text: `${s.dashRestoreDefaults} — OK`,
      });
    } catch (err) {
      setFeedback({
        type: 'error',
        text: err instanceof Error ? err.message : 'Sync failed.',
      });
    } finally {
      setIsSeeding(false);
    }
  };

  const handleSaveSocialLinks = async (e: FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSavingSocial(true);
    setFeedback(null);
    try {
      const saved = await saveSocialLinks(user.uid, socialForm);
      setSocialForm(saved);
      setFeedback({ type: 'success', text: s.socialSavedMsg });
    } catch (err) {
      setFeedback({
        type: 'error',
        text: err instanceof Error ? err.message : 'Failed to save social media links.',
      });
    } finally {
      setSavingSocial(false);
    }
  };

  // --- Product Handlers ---
  const openAddProductModal = () => {
    setEditingProductId(null);
    setProductUploadError(null);
    setProductForm({
      ...EMPTY_PRODUCT_FORM,
      galleryUrls: [STUDIO_IMAGE_PRESETS[0].src],
      galleryLabels: ['Studio Front Profile'],
      socialLinks: { ...socialLinks },
    });
    setFeaturesText(
      'Self-priming within 3 to 4 strokes\nVacuum leak tested at -0.06 MPa\nCustom Pantone colours & logo imprinting available'
    );
    setProductModalOpen(true);
  };

  const openEditProductModal = (item: CmsProductRecord) => {
    setEditingProductId(item.id);
    setProductUploadError(null);
    setProductForm({
      categoryId: item.categoryId,
      slug: item.slug,
      model: item.model,
      neckFinish: item.neckFinish,
      dosage: item.dosage,
      closureStyle: item.closureStyle,
      springType: item.springType,
      moq: item.moq,
      materials: item.materials,
      leadTime: item.leadTime,
      applications: item.applications,
      description: item.description,
      features: item.features,
      galleryUrls: item.galleryUrls.length > 0 ? [...item.galleryUrls] : [STUDIO_IMAGE_PRESETS[0].src],
      galleryLabels:
        item.galleryLabels.length > 0 ? [...item.galleryLabels] : ['Studio View'],
      status: item.status,
      socialLinks: hasAnySocialLink(item.socialLinks) ? item.socialLinks : { ...socialLinks },
    });
    setFeaturesText(item.features.join('\n'));
    setProductModalOpen(true);
  };

  const getUploadErrorMessage = (err: unknown): string => {
    if (err instanceof ImageUploadValidationError) {
      if (err.code === 'invalid-type') return s.fieldUploadInvalidType;
      if (err.code === 'too-large') return s.fieldUploadTooLarge;
    }
    return s.fieldUploadFailed;
  };

  const handleProductSingleImageUpload = async (file: File, rowIdx: number) => {
    if (!user) return;
    setProductUploadError(null);
    setUploadingGallerySlot(rowIdx);
    try {
      const result = await uploadDashboardImage(file, 'products', user.uid);
      setProductForm((prev) => {
        const nextUrls = [...prev.galleryUrls];
        const nextLabels = [...prev.galleryLabels];
        nextUrls[rowIdx] = result.url;
        if (!nextLabels[rowIdx]?.trim() || /^(Studio View|View \d+|Product View \d+)$/i.test(nextLabels[rowIdx])) {
          nextLabels[rowIdx] = result.suggestedLabel;
        }
        return {
          ...prev,
          galleryUrls: nextUrls,
          galleryLabels: nextLabels,
        };
      });
    } catch (err) {
      setProductUploadError(getUploadErrorMessage(err));
    } finally {
      setUploadingGallerySlot(null);
    }
  };

  const handleProductBatchImageUpload = async (files: FileList | File[]) => {
    if (!user) return;
    const fileArray = Array.from(files);
    if (fileArray.length === 0) return;

    const remainingSlots = Math.max(0, 6 - productForm.galleryUrls.length);
    if (remainingSlots === 0) return;

    const filesToProcess = fileArray.slice(0, remainingSlots);
    setProductUploadError(null);
    setUploadingGallerySlot('batch');

    try {
      const uploaded: Array<{ url: string; label: string }> = [];
      for (const file of filesToProcess) {
        const res = await uploadDashboardImage(file, 'products', user.uid);
        uploaded.push({ url: res.url, label: res.suggestedLabel });
      }
      if (uploaded.length > 0) {
        setProductForm((prev) => ({
          ...prev,
          galleryUrls: [...prev.galleryUrls, ...uploaded.map((u) => u.url)].slice(0, 6),
          galleryLabels: [...prev.galleryLabels, ...uploaded.map((u) => u.label)].slice(0, 6),
        }));
      }
    } catch (err) {
      setProductUploadError(getUploadErrorMessage(err));
    } finally {
      setUploadingGallerySlot(null);
    }
  };

  const handleGalleryDrop = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDraggingGallery(false);
    if (e.dataTransfer.files?.length) {
      void handleProductBatchImageUpload(e.dataTransfer.files);
    }
  };

  const handleSaveProduct = async (e: FormEvent) => {
    e.preventDefault();
    if (!user) return;
    if (!productForm.model.trim() || !productForm.description.trim()) {
      setFeedback({ type: 'error', text: 'Model name and description are required.' });
      return;
    }

    setSavingProduct(true);
    setFeedback(null);
    try {
      const parsedFeatures = featuresText
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean);

      const finalSlug = productForm.slug.trim()
        ? sanitizeSlug(productForm.slug, 'yl-model')
        : sanitizeSlug(productForm.model, 'yl-model');

      const attachedSocial = editingProductId
        ? hasAnySocialLink(productForm.socialLinks)
          ? productForm.socialLinks
          : socialLinks
        : socialLinks;

      await saveProduct(
        user.uid,
        {
          ...productForm,
          slug: finalSlug,
          features: parsedFeatures.length > 0 ? parsedFeatures : ['Precision Yi Lai tooling'],
          socialLinks: attachedSocial,
        },
        editingProductId ?? undefined
      );

      setProductModalOpen(false);
      setFeedback({
        type: 'success',
        text: `${productForm.model} — ${s.dashSaveProductBtn}`,
      });
    } catch (err) {
      setFeedback({
        type: 'error',
        text: err instanceof Error ? err.message : 'Failed to save product.',
      });
    } finally {
      setSavingProduct(false);
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    if (!user) return;
    setFeedback(null);
    try {
      await deleteProduct(user.uid, productId);
      setConfirmDeleteId(null);
      setFeedback({ type: 'success', text: `${productId} — ${s.dashDeleteBtn}` });
    } catch (err) {
      setFeedback({
        type: 'error',
        text: err instanceof Error ? err.message : 'Failed to delete product.',
      });
    }
  };

  // --- Blog Handlers ---
  const openAddPostModal = () => {
    setEditingPostId(null);
    setPostUploadError(null);
    setPostForm({
      ...EMPTY_BLOG_FORM,
      publishedAt: new Date().toISOString().slice(0, 10),
      socialLinks: { ...socialLinks },
    });
    setTagsText('Trigger Sprayers, QC Testing, OEM');
    setPostModalOpen(true);
  };

  const openEditPostModal = (post: BlogPost) => {
    setEditingPostId(post.id);
    setPostUploadError(null);
    setPostForm({
      slug: post.slug,
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
      socialLinks: hasAnySocialLink(post.socialLinks) ? post.socialLinks : { ...socialLinks },
    });
    setTagsText(post.tags.join(', '));
    setPostModalOpen(true);
  };

  const handleBlogCoverUpload = async (file: File) => {
    if (!user) return;
    setPostUploadError(null);
    setUploadingCover(true);
    try {
      const res = await uploadDashboardImage(file, 'blog', user.uid);
      setPostForm((prev) => ({ ...prev, coverImage: res.url }));
    } catch (err) {
      setPostUploadError(getUploadErrorMessage(err));
    } finally {
      setUploadingCover(false);
    }
  };

  const handleCoverDrop = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDraggingCover(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      void handleBlogCoverUpload(file);
    }
  };

  const handleSavePost = async (e: FormEvent) => {
    e.preventDefault();
    if (!user) return;
    if (!postForm.title.trim() || !postForm.excerpt.trim() || !postForm.content.trim()) {
      setFeedback({ type: 'error', text: 'Title, excerpt, and article body are required.' });
      return;
    }

    setSavingPost(true);
    setFeedback(null);
    try {
      const parsedTags = tagsText
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean);

      const finalSlug = postForm.slug.trim()
        ? sanitizeSlug(postForm.slug, 'post')
        : sanitizeSlug(postForm.title, 'post');

      const attachedSocial = editingPostId
        ? hasAnySocialLink(postForm.socialLinks)
          ? postForm.socialLinks
          : socialLinks
        : socialLinks;

      await saveBlogPost(
        user.uid,
        {
          ...postForm,
          slug: finalSlug,
          tags: parsedTags,
          socialLinks: attachedSocial,
        },
        editingPostId ?? undefined
      );

      setPostModalOpen(false);
      setFeedback({
        type: 'success',
        text: `${postForm.title} — ${s.dashSavePostBtn}`,
      });
    } catch (err) {
      setFeedback({
        type: 'error',
        text: err instanceof Error ? err.message : 'Failed to save article.',
      });
    } finally {
      setSavingPost(false);
    }
  };

  const handleDeletePost = async (postId: string) => {
    if (!user) return;
    setFeedback(null);
    try {
      await deleteBlogPost(user.uid, postId);
      setConfirmDeleteId(null);
      setFeedback({ type: 'success', text: `${postId} — ${s.dashDeleteBtn}` });
    } catch (err) {
      setFeedback({
        type: 'error',
        text: err instanceof Error ? err.message : 'Failed to delete article.',
      });
    }
  };

  // --- Auth Gate Views ---
  if (!authReady || checkingAdmin) {
    return (
      <div className="min-h-[70vh] bg-[#F6F9FE] flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl border border-slate-200 p-8 text-center shadow-xs">
          <RefreshCw className="w-6 h-6 text-[#155EEF] animate-spin mx-auto" />
          <p className="mt-3 text-sm font-semibold text-[#0B1B3E]">
            {s.dashKicker}
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-[80vh] bg-[#F6F9FE] py-12 px-5 sm:px-8">
        <div className="max-w-[1100px] mx-auto flex flex-wrap items-center justify-between gap-4 mb-10">
          <button
            type="button"
            onClick={onBackHome}
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-[#155EEF] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
            <span>{s.dashBackHome}</span>
          </button>
          <LanguageSwitcher lang={lang} onChangeLang={onChangeLang} />
        </div>

        <div className="max-w-lg mx-auto bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-sm text-center space-y-5">
          <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#155EEF] flex items-center justify-center mx-auto">
            <Lock className="w-7 h-7" />
          </div>
          <div>
            <p className="text-xs font-semibold tracking-wider text-[#E1262D] uppercase">
              {s.dashKicker}
            </p>
            <h1 className="mt-2 font-display font-extrabold text-2xl sm:text-3xl text-[#0B1B3E]">
              {s.dashSignInTitle}
            </h1>
            <p className="mt-2.5 text-sm text-slate-600 leading-relaxed">
              {s.dashSignInSub}
            </p>
          </div>

          {feedback && (
            <p className="text-xs font-semibold text-[#E1262D] bg-red-50 border border-red-200 rounded-xl px-4 py-2.5">
              {feedback.text}
            </p>
          )}

          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="w-full inline-flex items-center justify-center gap-2.5 bg-[#0B1B3E] hover:bg-[#155EEF] text-white font-semibold text-sm px-6 py-3.5 rounded-full transition-colors cursor-pointer"
          >
            <span>{s.dashSignInBtn}</span>
          </button>
        </div>
      </div>
    );
  }

  if (!isVerifiedAdmin) {
    return (
      <div className="min-h-[80vh] bg-[#F6F9FE] py-12 px-5 sm:px-8">
        <div className="max-w-[1100px] mx-auto flex flex-wrap items-center justify-between gap-4 mb-10">
          <button
            type="button"
            onClick={onBackHome}
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-[#155EEF] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
            <span>{s.dashBackHome}</span>
          </button>
          <LanguageSwitcher lang={lang} onChangeLang={onChangeLang} />
        </div>

        <div className="max-w-lg mx-auto bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-sm text-center space-y-5">
          <div className="w-14 h-14 rounded-2xl bg-red-50 text-[#E1262D] flex items-center justify-center mx-auto">
            <Lock className="w-7 h-7" />
          </div>
          <h1 className="font-display font-extrabold text-2xl text-[#0B1B3E]">
            {s.dashUnauthorizedTitle}
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed">
            {s.dashUnauthorizedSub}
          </p>
          <p className="text-xs font-mono text-slate-500">
            {s.dashSignedInAs}: <span dir="ltr">{user.email}</span>
          </p>
          <button
            type="button"
            onClick={handleSignOut}
            className="inline-flex items-center gap-2 bg-slate-100 hover:bg-slate-200 text-[#0B1B3E] font-semibold text-sm px-5 py-2.5 rounded-full transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>{s.dashSignOutBtn}</span>
          </button>
        </div>
      </div>
    );
  }

  // --- Filtered Dashboard Lists ---
  const q = searchQuery.trim().toLowerCase();
  const filteredProducts = products.filter((item) => {
    const matchCat = categoryFilter === 'all' || item.categoryId === categoryFilter;
    const matchStatus = statusFilter === 'all' || item.status === statusFilter;
    const matchQuery =
      !q ||
      item.model.toLowerCase().includes(q) ||
      item.neckFinish.toLowerCase().includes(q) ||
      item.dosage.toLowerCase().includes(q) ||
      item.slug.toLowerCase().includes(q);
    return matchCat && matchStatus && matchQuery;
  });

  const filteredPosts = blogPosts.filter((post) => {
    const matchCat = categoryFilter === 'all' || post.category === categoryFilter;
    const matchStatus = statusFilter === 'all' || post.status === statusFilter;
    const matchQuery =
      !q ||
      post.title.toLowerCase().includes(q) ||
      post.authorName.toLowerCase().includes(q) ||
      post.excerpt.toLowerCase().includes(q);
    return matchCat && matchStatus && matchQuery;
  });

  const activeProductsCount = products.filter((p) => p.status === 'active').length;
  const publishedPostsCount = blogPosts.filter((p) => p.status === 'published').length;
  const hiddenCount =
    products.filter((p) => p.status === 'archived').length +
    blogPosts.filter((p) => p.status === 'draft').length;

  return (
    <div className="bg-[#F6F9FE] min-h-screen pb-20">
      {/* Top Bar */}
      <section className="bg-white border-b border-slate-200/80 pt-7 pb-8">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={onBackHome}
                className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-[#155EEF] transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
                <span>{s.dashBackHome}</span>
              </button>

              <span className="text-slate-300">|</span>

              <button
                type="button"
                onClick={onOpenProductsPage}
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#155EEF] hover:text-[#0B1B3E] cursor-pointer"
              >
                <span>{s.dashViewProducts}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={() => onOpenBlogPage(null)}
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#155EEF] hover:text-[#0B1B3E] cursor-pointer"
              >
                <span>{s.dashViewBlog}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <LanguageSwitcher lang={lang} onChangeLang={onChangeLang} />
              <span className="hidden md:inline-block text-xs font-mono text-slate-500">
                <span dir="ltr">{user.email}</span>
              </span>
              <button
                type="button"
                onClick={handleSignOut}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-slate-200 hover:border-slate-300 text-xs font-semibold text-[#0B1B3E] cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>{s.dashSignOutBtn}</span>
              </button>
            </div>
          </div>

          <div className="mt-6 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <p className="text-xs font-semibold tracking-wider text-[#E1262D] uppercase">
                {s.dashKicker}
              </p>
              <h1 className="mt-1.5 font-display font-extrabold text-3xl sm:text-4xl text-[#0B1B3E] tracking-tight">
                {s.dashTitle}
              </h1>
              <p className="mt-2 text-sm text-slate-600 max-w-2xl">
                {s.dashSub}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={handleSyncStarter}
                disabled={isSeeding}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-[#0B1B3E] transition-colors cursor-pointer disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isSeeding ? 'animate-spin' : ''}`} />
                <span>{s.dashRestoreDefaults}</span>
              </button>

              {activeTab === 'products' && (
                <button
                  type="button"
                  onClick={openAddProductModal}
                  className="inline-flex items-center gap-2 bg-[#155EEF] hover:bg-[#0B1B3E] text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors cursor-pointer shadow-xs"
                >
                  <Plus className="w-4 h-4" />
                  <span>{s.dashAddProduct}</span>
                </button>
              )}
              {activeTab === 'blog' && (
                <button
                  type="button"
                  onClick={openAddPostModal}
                  className="inline-flex items-center gap-2 bg-[#E1262D] hover:bg-[#C61D24] text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors cursor-pointer shadow-xs"
                >
                  <Plus className="w-4 h-4" />
                  <span>{s.dashAddPost}</span>
                </button>
              )}
            </div>
          </div>

          {/* Summary KPI Strip */}
          <div className="mt-7 grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="rounded-2xl bg-[#F8FAFE] border border-slate-200/80 p-4">
              <p className="text-xs font-medium text-slate-500">{s.dashStatActiveProducts}</p>
              <p className="mt-1 font-display font-extrabold text-2xl text-[#0B1B3E] tabular-nums">
                {activeProductsCount}
              </p>
            </div>
            <div className="rounded-2xl bg-[#F8FAFE] border border-slate-200/80 p-4">
              <p className="text-xs font-medium text-slate-500">{s.dashStatPublishedPosts}</p>
              <p className="mt-1 font-display font-extrabold text-2xl text-[#155EEF] tabular-nums">
                {publishedPostsCount}
              </p>
            </div>
            <div className="rounded-2xl bg-[#F8FAFE] border border-slate-200/80 p-4">
              <p className="text-xs font-medium text-slate-500">{s.dashStatDraftsArchived}</p>
              <p className="mt-1 font-display font-extrabold text-2xl text-[#E1262D] tabular-nums">
                {hiddenCount}
              </p>
            </div>
            <div className="rounded-2xl bg-[#F8FAFE] border border-slate-200/80 p-4">
              <p className="text-xs font-medium text-slate-500">{s.dashStatCategories}</p>
              <p className="mt-1 font-display font-extrabold text-2xl text-[#0B1B3E] tabular-nums">
                {categories.length}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="max-w-[1280px] mx-auto px-5 sm:px-8 pt-8 space-y-6">
        {feedback && (
          <div
            className={`rounded-2xl px-5 py-3.5 flex items-center justify-between gap-4 border text-sm font-medium ${
              feedback.type === 'success'
                ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                : 'bg-red-50 border-red-200 text-[#E1262D]'
            }`}
          >
            <span className="inline-flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{feedback.text}</span>
            </span>
            <button
              type="button"
              onClick={() => setFeedback(null)}
              className="p-1 rounded-full hover:bg-black/5 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Section Tabs + Search Controls */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-xs space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="inline-flex flex-wrap p-1 rounded-xl bg-[#F6F9FE] border border-slate-200/80 gap-1">
              <button
                type="button"
                onClick={() => {
                  setActiveTab('products');
                  setCategoryFilter('all');
                  setStatusFilter('all');
                  setSearchQuery('');
                  setConfirmDeleteId(null);
                }}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
                  activeTab === 'products'
                    ? 'bg-[#0B1B3E] text-white shadow-xs'
                    : 'text-slate-600 hover:text-[#0B1B3E]'
                }`}
              >
                <Package className="w-4 h-4" />
                <span>{s.dashTabProducts} ({products.length})</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveTab('blog');
                  setCategoryFilter('all');
                  setStatusFilter('all');
                  setSearchQuery('');
                  setConfirmDeleteId(null);
                }}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
                  activeTab === 'blog'
                    ? 'bg-[#0B1B3E] text-white shadow-xs'
                    : 'text-slate-600 hover:text-[#0B1B3E]'
                }`}
              >
                <BookOpen className="w-4 h-4" />
                <span>{s.dashTabBlog} ({blogPosts.length})</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveTab('social');
                  setConfirmDeleteId(null);
                }}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
                  activeTab === 'social'
                    ? 'bg-[#0B1B3E] text-white shadow-xs'
                    : 'text-slate-600 hover:text-[#0B1B3E]'
                }`}
              >
                <Share2 className="w-4 h-4" />
                <span>
                  {s.dashTabSocial} ({SOCIAL_PLATFORMS.filter((p) => Boolean(socialLinks[p.key])).length}/5)
                </span>
              </button>
            </div>

            {activeTab !== 'social' && (
              <div className="flex flex-wrap items-center gap-3 flex-1 justify-end">
                <div className="relative flex-1 min-w-[220px] max-w-sm">
                  <Search className="w-4 h-4 text-slate-400 absolute start-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={activeTab === 'products' ? s.dashSearchProducts : s.dashSearchPosts}
                    className="w-full rounded-xl border border-slate-200 bg-[#F8FAFE] ps-10 pe-4 py-2 text-sm text-[#0B1B3E] placeholder:text-slate-400 focus:outline-none focus:border-[#155EEF] focus:bg-white"
                  />
                </div>

                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="rounded-xl border border-slate-200 bg-[#F8FAFE] px-3.5 py-2 text-xs sm:text-sm font-medium text-[#0B1B3E] focus:outline-none focus:border-[#155EEF]"
                >
                  <option value="all">{s.dashAllSeries}</option>
                  {activeTab === 'products'
                    ? categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.index}. {cat.name}
                        </option>
                      ))
                    : BLOG_CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>
                          {s.blogCategoryNames[cat] ?? cat}
                        </option>
                      ))}
                </select>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="rounded-xl border border-slate-200 bg-[#F8FAFE] px-3.5 py-2 text-xs sm:text-sm font-medium text-[#0B1B3E] focus:outline-none focus:border-[#155EEF]"
                >
                  <option value="all">{s.dashAllStatuses}</option>
                  {activeTab === 'products' ? (
                    <>
                      <option value="active">{s.dashStatusActive}</option>
                      <option value="archived">{s.dashStatusArchived}</option>
                    </>
                  ) : (
                    <>
                      <option value="published">{s.dashStatusPublished}</option>
                      <option value="draft">{s.dashStatusDraft}</option>
                    </>
                  )}
                </select>
              </div>
            )}
          </div>
        </div>

        {/* --- Social Media Links Tab Section --- */}
        {activeTab === 'social' ? (
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
              <div>
                <h2 className="font-display font-extrabold text-xl sm:text-2xl text-[#0B1B3E]">
                  {s.socialSectionTitle}
                </h2>
                <p className="mt-1.5 text-sm text-slate-600 max-w-2xl leading-relaxed">
                  {s.socialSectionSub}
                </p>
              </div>
              <span className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-blue-50 text-[#155EEF] text-xs font-semibold border border-blue-200/70 shrink-0">
                <Share2 className="w-3.5 h-3.5" />
                <span>
                  {SOCIAL_PLATFORMS.filter((p) => Boolean(socialLinks[p.key])).length} / 5
                </span>
              </span>
            </div>

            <form onSubmit={handleSaveSocialLinks} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {SOCIAL_PLATFORMS.map((platform) => (
                  <div
                    key={platform.key}
                    className="rounded-2xl border border-slate-200/90 bg-[#F8FAFE] p-4 space-y-2"
                  >
                    <label
                      htmlFor={`social-input-${platform.key}`}
                      className="flex items-center gap-2 text-xs font-bold text-[#0B1B3E]"
                    >
                      <SocialPlatformIcon
                        platform={platform.key}
                        className={`w-4 h-4 ${platform.accentText}`}
                      />
                      <span>{platform.label}</span>
                    </label>
                    <input
                      id={`social-input-${platform.key}`}
                      type="url"
                      dir="ltr"
                      value={socialForm[platform.key]}
                      onChange={(e) =>
                        setSocialForm({ ...socialForm, [platform.key]: e.target.value })
                      }
                      placeholder={platform.placeholder}
                      className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm font-mono text-[#0B1B3E] placeholder:text-slate-400 focus:outline-none focus:border-[#155EEF]"
                    />
                  </div>
                ))}
              </div>

              {hasAnySocialLink(socialForm) && (
                <div className="pt-2">
                  <SocialLinksBar links={socialForm} lang={lang} />
                </div>
              )}

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="submit"
                  disabled={savingSocial}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#155EEF] hover:bg-[#0B1B3E] text-white text-sm font-semibold transition-colors cursor-pointer disabled:opacity-60 shadow-xs"
                >
                  {savingSocial ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <CheckCircle2 className="w-4 h-4" />
                  )}
                  <span>{savingSocial ? s.dashSaving : s.socialSaveBtn}</span>
                </button>
              </div>
            </form>
          </div>
        ) : /* --- Products Tab List --- */
        activeTab === 'products' ? (
          filteredProducts.length === 0 ? (
            <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center">
              <Layers className="w-10 h-10 text-slate-300 mx-auto" />
              <p className="mt-3 font-display font-bold text-lg text-[#0B1B3E]">
                {s.dashNoProducts}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredProducts.map((item) => {
                const catName =
                  categories.find((c) => c.id === item.categoryId)?.shortName ?? item.categoryId;
                const isConfirming = confirmDeleteId === `prod:${item.id}`;
                return (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs flex flex-col justify-between"
                  >
                    <div>
                      <div className="aspect-[16/10] w-full bg-slate-100 overflow-hidden border-b border-slate-100 relative">
                        <img
                          src={item.galleryUrls[0] || STUDIO_IMAGE_PRESETS[0].src}
                          alt={item.model}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />
                        <span
                          className={`absolute top-3 end-3 text-[11px] font-semibold px-2.5 py-1 rounded-full ${
                            item.status === 'active'
                              ? 'bg-emerald-600 text-white'
                              : 'bg-slate-700 text-white'
                          }`}
                        >
                          {item.status === 'active' ? s.dashStatusActive : s.dashStatusArchived}
                        </span>
                      </div>

                      <div className="p-5">
                        <p className="text-xs font-semibold text-[#155EEF]">{catName}</p>
                        <h3 className="mt-1 font-display font-bold text-base text-[#0B1B3E]">
                          {item.model}
                        </h3>
                        <p className="mt-1 font-mono text-xs text-slate-500 tabular-nums">
                          {item.neckFinish} · {item.dosage} · {item.moq}
                        </p>
                        <p className="mt-2 text-xs text-slate-600 line-clamp-2 leading-relaxed">
                          {item.description}
                        </p>
                        {hasAnySocialLink(item.socialLinks) && (
                          <div className="mt-3 pt-2.5 border-t border-slate-100">
                            <SocialLinksBar links={item.socialLinks} lang={lang} compact />
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="px-5 pb-5 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                      <button
                        type="button"
                        onClick={() => openEditProductModal(item)}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#F8FAFE] hover:bg-blue-50 text-[#0B1B3E] hover:text-[#155EEF] border border-slate-200 text-xs font-semibold transition-colors cursor-pointer"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>{s.dashEditBtn}</span>
                      </button>

                      {isConfirming ? (
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => handleDeleteProduct(item.id)}
                            className="px-3 py-2 rounded-full bg-[#E1262D] hover:bg-[#C61D24] text-white text-xs font-semibold cursor-pointer"
                          >
                            {s.dashConfirmDelete}
                          </button>
                          <button
                            type="button"
                            onClick={() => setConfirmDeleteId(null)}
                            className="px-3 py-2 rounded-full bg-slate-100 text-slate-600 text-xs font-semibold cursor-pointer"
                          >
                            {s.dashCancelBtn}
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setConfirmDeleteId(`prod:${item.id}`)}
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white hover:bg-red-50 text-[#E1262D] border border-red-200 text-xs font-semibold transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>{s.dashDeleteBtn}</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )
        ) : /* --- Blog Posts Tab List --- */
        filteredPosts.length === 0 ? (
          <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center">
            <BookOpen className="w-10 h-10 text-slate-300 mx-auto" />
            <p className="mt-3 font-display font-bold text-lg text-[#0B1B3E]">{s.dashNoPosts}</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredPosts.map((post) => {
              const isConfirming = confirmDeleteId === `blog:${post.id}`;
              return (
                <div
                  key={post.id}
                  className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs flex flex-col md:flex-row gap-5 items-start md:items-center justify-between"
                >
                  <div className="flex flex-col sm:flex-row gap-4 items-start flex-1">
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      referrerPolicy="no-referrer"
                      className="w-full sm:w-36 aspect-[16/10] object-cover rounded-xl border border-slate-200 shrink-0"
                    />
                    <div className="space-y-1.5">
                      <div className="flex flex-wrap items-center gap-2.5 text-xs">
                        <span
                          className={`font-semibold px-2.5 py-0.5 rounded-full ${
                            post.status === 'published'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-amber-50 text-amber-700 border border-amber-200'
                          }`}
                        >
                          {post.status === 'published' ? s.dashStatusPublished : s.dashStatusDraft}
                        </span>
                        <span className="font-semibold text-[#E1262D]">
                          {s.blogCategoryNames[post.category] ?? post.category}
                        </span>
                        <span className="font-mono text-slate-400 tabular-nums">
                          {post.publishedAt} · {post.readTime}
                        </span>
                      </div>

                      <h3 className="font-display font-bold text-lg text-[#0B1B3E]">
                        {post.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 max-w-2xl">
                        {post.excerpt}
                      </p>
                      {hasAnySocialLink(post.socialLinks) && (
                        <div className="pt-1.5">
                          <SocialLinksBar links={post.socialLinks} lang={lang} compact />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 shrink-0">
                    {post.status === 'published' && (
                      <button
                        type="button"
                        onClick={() => onOpenBlogPage(post.slug)}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-slate-200 text-xs font-semibold text-[#155EEF] hover:bg-blue-50 cursor-pointer"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => openEditPostModal(post)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#F8FAFE] hover:bg-blue-50 text-[#0B1B3E] hover:text-[#155EEF] border border-slate-200 text-xs font-semibold transition-colors cursor-pointer"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>{s.dashEditBtn}</span>
                    </button>

                    {isConfirming ? (
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleDeletePost(post.id)}
                          className="px-3 py-2 rounded-full bg-[#E1262D] hover:bg-[#C61D24] text-white text-xs font-semibold cursor-pointer"
                        >
                          {s.dashConfirmDelete}
                        </button>
                        <button
                          type="button"
                          onClick={() => setConfirmDeleteId(null)}
                          className="px-3 py-2 rounded-full bg-slate-100 text-slate-600 text-xs font-semibold cursor-pointer"
                        >
                          {s.dashCancelBtn}
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setConfirmDeleteId(`blog:${post.id}`)}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white hover:bg-red-50 text-[#E1262D] border border-red-200 text-xs font-semibold transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>{s.dashDeleteBtn}</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* --- Product Add / Edit Modal --- */}
      {productModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#0B1B3E]/65 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl border border-slate-200 shadow-2xl p-6 sm:p-8">
            <div className="flex items-center justify-between gap-4 pb-5 border-b border-slate-100">
              <h2 className="font-display font-extrabold text-xl sm:text-2xl text-[#0B1B3E]">
                {editingProductId ? s.dashEditProduct : s.dashAddProduct}
              </h2>
              <button
                type="button"
                onClick={() => setProductModalOpen(false)}
                className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="mt-6 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#0B1B3E] mb-1.5">
                    {s.fieldSeries}
                  </label>
                  <select
                    value={productForm.categoryId}
                    onChange={(e) => setProductForm({ ...productForm, categoryId: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-[#F8FAFE] px-3.5 py-2.5 text-sm text-[#0B1B3E]"
                  >
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.index}. {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#0B1B3E] mb-1.5">
                    {s.fieldStatus}
                  </label>
                  <select
                    value={productForm.status}
                    onChange={(e) =>
                      setProductForm({
                        ...productForm,
                        status: e.target.value as 'active' | 'archived',
                      })
                    }
                    className="w-full rounded-xl border border-slate-200 bg-[#F8FAFE] px-3.5 py-2.5 text-sm text-[#0B1B3E]"
                  >
                    <option value="active">{s.dashStatusActive}</option>
                    <option value="archived">{s.dashStatusArchived}</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#0B1B3E] mb-1.5">
                    {s.fieldModel}
                  </label>
                  <input
                    type="text"
                    required
                    value={productForm.model}
                    onChange={(e) => setProductForm({ ...productForm, model: e.target.value })}
                    placeholder="YL-TS28X Heavy Trigger"
                    className="w-full rounded-xl border border-slate-200 bg-[#F8FAFE] px-3.5 py-2.5 text-sm text-[#0B1B3E]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#0B1B3E] mb-1.5">
                    {s.fieldSlug}
                  </label>
                  <input
                    type="text"
                    value={productForm.slug}
                    onChange={(e) => setProductForm({ ...productForm, slug: e.target.value })}
                    placeholder="yl-ts28x"
                    disabled={Boolean(editingProductId)}
                    className="w-full rounded-xl border border-slate-200 bg-[#F8FAFE] px-3.5 py-2.5 text-sm font-mono text-[#0B1B3E] disabled:opacity-60"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#0B1B3E] mb-1.5">
                    {s.fieldNeckFinish}
                  </label>
                  <input
                    type="text"
                    required
                    value={productForm.neckFinish}
                    onChange={(e) => setProductForm({ ...productForm, neckFinish: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-[#F8FAFE] px-3.5 py-2.5 text-sm text-[#0B1B3E]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#0B1B3E] mb-1.5">
                    {s.fieldDosage}
                  </label>
                  <input
                    type="text"
                    required
                    value={productForm.dosage}
                    onChange={(e) => setProductForm({ ...productForm, dosage: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-[#F8FAFE] px-3.5 py-2.5 text-sm text-[#0B1B3E]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#0B1B3E] mb-1.5">
                    {s.fieldMoq}
                  </label>
                  <input
                    type="text"
                    value={productForm.moq}
                    onChange={(e) => setProductForm({ ...productForm, moq: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-[#F8FAFE] px-3.5 py-2.5 text-sm text-[#0B1B3E]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#0B1B3E] mb-1.5">
                    {s.fieldClosureStyle}
                  </label>
                  <input
                    type="text"
                    value={productForm.closureStyle}
                    onChange={(e) => setProductForm({ ...productForm, closureStyle: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-[#F8FAFE] px-3.5 py-2.5 text-sm text-[#0B1B3E]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#0B1B3E] mb-1.5">
                    {s.fieldSpringType}
                  </label>
                  <input
                    type="text"
                    value={productForm.springType}
                    onChange={(e) => setProductForm({ ...productForm, springType: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-[#F8FAFE] px-3.5 py-2.5 text-sm text-[#0B1B3E]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#0B1B3E] mb-1.5">
                    {s.fieldLeadTime}
                  </label>
                  <input
                    type="text"
                    value={productForm.leadTime}
                    onChange={(e) => setProductForm({ ...productForm, leadTime: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-[#F8FAFE] px-3.5 py-2.5 text-sm text-[#0B1B3E]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#0B1B3E] mb-1.5">
                    {s.fieldMaterials}
                  </label>
                  <input
                    type="text"
                    value={productForm.materials}
                    onChange={(e) => setProductForm({ ...productForm, materials: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-[#F8FAFE] px-3.5 py-2.5 text-sm text-[#0B1B3E]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#0B1B3E] mb-1.5">
                    {s.fieldApplications}
                  </label>
                  <input
                    type="text"
                    value={productForm.applications}
                    onChange={(e) => setProductForm({ ...productForm, applications: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-[#F8FAFE] px-3.5 py-2.5 text-sm text-[#0B1B3E]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0B1B3E] mb-1.5">
                  {s.fieldDescription}
                </label>
                <textarea
                  rows={3}
                  required
                  value={productForm.description}
                  onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 bg-[#F8FAFE] px-3.5 py-2.5 text-sm text-[#0B1B3E]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0B1B3E] mb-1.5">
                  {s.fieldFeatures}
                </label>
                <textarea
                  rows={3}
                  value={featuresText}
                  onChange={(e) => setFeaturesText(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-[#F8FAFE] px-3.5 py-2.5 text-sm text-[#0B1B3E]"
                />
              </div>

              {/* Multi-Image Gallery Builder */}
              <div className="space-y-3 pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between gap-3">
                  <label className="text-xs font-semibold text-[#0B1B3E]">
                    {s.fieldGallery}
                  </label>
                  {productForm.galleryUrls.length < 6 && (
                    <button
                      type="button"
                      onClick={() =>
                        setProductForm({
                          ...productForm,
                          galleryUrls: [...productForm.galleryUrls, STUDIO_IMAGE_PRESETS[0].src],
                          galleryLabels: [
                            ...productForm.galleryLabels,
                            `View ${productForm.galleryUrls.length + 1}`,
                          ],
                        })
                      }
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#155EEF] hover:underline cursor-pointer"
                    >
                      <ImagePlus className="w-3.5 h-3.5" />
                      <span>{s.fieldAddGalleryImage}</span>
                    </button>
                  )}
                </div>

                {productForm.galleryUrls.length < 6 && (
                  <label
                    onDragOver={(e) => {
                      e.preventDefault();
                      setIsDraggingGallery(true);
                    }}
                    onDragLeave={() => setIsDraggingGallery(false)}
                    onDrop={handleGalleryDrop}
                    className={`flex flex-col sm:flex-row items-center justify-center gap-3 p-4 rounded-2xl border-2 border-dashed transition-colors cursor-pointer ${
                      isDraggingGallery
                        ? 'border-[#155EEF] bg-blue-50/70'
                        : 'border-slate-300 bg-[#F8FAFE] hover:border-[#155EEF]/60 hover:bg-blue-50/30'
                    }`}
                  >
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      disabled={uploadingGallerySlot !== null}
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        if (e.target.files?.length) {
                          void handleProductBatchImageUpload(e.target.files);
                        }
                        e.target.value = '';
                      }}
                      className="hidden"
                    />
                    <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-[#155EEF] shrink-0">
                      {uploadingGallerySlot === 'batch' ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Upload className="w-4 h-4" />
                      )}
                    </div>
                    <div className="text-center sm:text-start">
                      <p className="text-xs font-semibold text-[#0B1B3E]">
                        {uploadingGallerySlot === 'batch' ? s.fieldUploading : s.fieldUploadMultiple}
                      </p>
                      <p className="text-[11px] text-slate-500 mt-0.5">{s.fieldDropHint}</p>
                    </div>
                  </label>
                )}

                {productUploadError && (
                  <div className="flex items-center gap-2 rounded-xl bg-red-50 border border-red-200 px-3 py-2 text-xs font-medium text-[#E1262D]">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{productUploadError}</span>
                  </div>
                )}

                {productForm.galleryUrls.map((url, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col sm:flex-row gap-2.5 items-stretch sm:items-center bg-[#F8FAFE] p-3 rounded-xl border border-slate-200/80"
                  >
                    <div className="flex items-center gap-2.5 shrink-0">
                      <img
                        src={url}
                        alt={productForm.galleryLabels[idx] || s.fieldImagePreviewAlt}
                        referrerPolicy="no-referrer"
                        className="w-12 h-12 rounded-lg object-cover border border-slate-200 bg-white shrink-0"
                      />
                      <label className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200 bg-white hover:border-[#155EEF] hover:text-[#155EEF] text-xs font-semibold text-[#0B1B3E] transition-colors cursor-pointer whitespace-nowrap">
                        <input
                          type="file"
                          accept="image/*"
                          disabled={uploadingGallerySlot !== null}
                          onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              void handleProductSingleImageUpload(file, idx);
                            }
                            e.target.value = '';
                          }}
                          className="hidden"
                        />
                        {uploadingGallerySlot === idx ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin text-[#155EEF]" />
                        ) : (
                          <Upload className="w-3.5 h-3.5 text-[#155EEF]" />
                        )}
                        <span>{uploadingGallerySlot === idx ? s.fieldUploading : s.fieldUploadImage}</span>
                      </label>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 flex-1 items-center">
                      <select
                        value={STUDIO_IMAGE_PRESETS.some((p) => p.src === url) ? url : ''}
                        onChange={(e) => {
                          if (!e.target.value) return;
                          const nextUrls = [...productForm.galleryUrls];
                          nextUrls[idx] = e.target.value;
                          setProductForm({ ...productForm, galleryUrls: nextUrls });
                        }}
                        className="sm:col-span-4 rounded-lg border border-slate-200 bg-white px-2.5 py-2 text-xs text-[#0B1B3E]"
                      >
                        <option value="">{s.fieldPresetSelect}</option>
                        {STUDIO_IMAGE_PRESETS.map((preset) => (
                          <option key={preset.src} value={preset.src}>
                            {preset.label}
                          </option>
                        ))}
                      </select>

                      <input
                        type="text"
                        value={url.startsWith('data:image/') ? '[Uploaded Photo Ready]' : url}
                        onChange={(e) => {
                          const nextUrls = [...productForm.galleryUrls];
                          nextUrls[idx] = e.target.value;
                          setProductForm({ ...productForm, galleryUrls: nextUrls });
                        }}
                        placeholder={s.fieldCustomUrlPlaceholder}
                        className="sm:col-span-4 rounded-lg border border-slate-200 bg-white px-2.5 py-2 text-xs font-mono text-[#0B1B3E]"
                      />

                      <input
                        type="text"
                        value={productForm.galleryLabels[idx] || ''}
                        onChange={(e) => {
                          const nextLabels = [...productForm.galleryLabels];
                          nextLabels[idx] = e.target.value;
                          setProductForm({ ...productForm, galleryLabels: nextLabels });
                        }}
                        placeholder={s.fieldImageCaptionPlaceholder}
                        className="sm:col-span-3 rounded-lg border border-slate-200 bg-white px-2.5 py-2 text-xs text-[#0B1B3E]"
                      />

                      <div className="sm:col-span-1 flex justify-end">
                        {productForm.galleryUrls.length > 1 && (
                          <button
                            type="button"
                            onClick={() => {
                              setProductForm({
                                ...productForm,
                                galleryUrls: productForm.galleryUrls.filter((_, i) => i !== idx),
                                galleryLabels: productForm.galleryLabels.filter((_, i) => i !== idx),
                              });
                            }}
                            className="p-1.5 text-slate-400 hover:text-[#E1262D] cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Auto-Attached Social Media Links Preview */}
              <div className="rounded-2xl bg-[#F8FAFE] border border-slate-200/80 p-4 space-y-2.5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="text-xs font-bold text-[#0B1B3E]">{s.socialAutoAttachLabel}</p>
                    <p className="text-[11px] text-slate-500">{s.socialAutoAttachSub}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setProductModalOpen(false);
                      setActiveTab('social');
                    }}
                    className="text-xs font-semibold text-[#155EEF] hover:underline cursor-pointer"
                  >
                    {s.socialManageShortcut}
                  </button>
                </div>
                {hasAnySocialLink(socialLinks) ? (
                  <SocialLinksBar links={socialLinks} lang={lang} compact />
                ) : (
                  <p className="text-xs text-slate-500">{s.socialNoLinksYet}</p>
                )}
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setProductModalOpen(false)}
                  className="px-5 py-2.5 rounded-full border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer"
                >
                  {s.dashCancelBtn}
                </button>
                <button
                  type="submit"
                  disabled={savingProduct || uploadingGallerySlot !== null}
                  className="px-6 py-2.5 rounded-full bg-[#155EEF] hover:bg-[#0B1B3E] text-white text-sm font-semibold cursor-pointer disabled:opacity-60"
                >
                  {savingProduct ? s.dashSaving : s.dashSaveProductBtn}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- Blog Post Add / Edit Modal --- */}
      {postModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#0B1B3E]/65 backdrop-blur-xs"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white rounded-3xl border border-slate-200 shadow-2xl p-6 sm:p-8">
            <div className="flex items-center justify-between gap-4 pb-5 border-b border-slate-100">
              <h2 className="font-display font-extrabold text-xl sm:text-2xl text-[#0B1B3E]">
                {editingPostId ? s.dashEditPost : s.dashAddPost}
              </h2>
              <button
                type="button"
                onClick={() => setPostModalOpen(false)}
                className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSavePost} className="mt-6 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#0B1B3E] mb-1.5">
                    {s.fieldPostTitle}
                  </label>
                  <input
                    type="text"
                    required
                    value={postForm.title}
                    onChange={(e) => setPostForm({ ...postForm, title: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-[#F8FAFE] px-3.5 py-2.5 text-sm text-[#0B1B3E]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#0B1B3E] mb-1.5">
                    {s.fieldSlug}
                  </label>
                  <input
                    type="text"
                    value={postForm.slug}
                    onChange={(e) => setPostForm({ ...postForm, slug: e.target.value })}
                    placeholder="custom-article-slug"
                    disabled={Boolean(editingPostId)}
                    className="w-full rounded-xl border border-slate-200 bg-[#F8FAFE] px-3.5 py-2.5 text-sm font-mono text-[#0B1B3E] disabled:opacity-60"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#0B1B3E] mb-1.5">
                    {s.fieldPostCategory}
                  </label>
                  <select
                    value={postForm.category}
                    onChange={(e) =>
                      setPostForm({ ...postForm, category: e.target.value as BlogCategory })
                    }
                    className="w-full rounded-xl border border-slate-200 bg-[#F8FAFE] px-3 py-2.5 text-sm text-[#0B1B3E]"
                  >
                    {BLOG_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {s.blogCategoryNames[cat] ?? cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#0B1B3E] mb-1.5">
                    {s.fieldStatus}
                  </label>
                  <select
                    value={postForm.status}
                    onChange={(e) =>
                      setPostForm({ ...postForm, status: e.target.value as 'published' | 'draft' })
                    }
                    className="w-full rounded-xl border border-slate-200 bg-[#F8FAFE] px-3 py-2.5 text-sm text-[#0B1B3E]"
                  >
                    <option value="published">{s.dashStatusPublished}</option>
                    <option value="draft">{s.dashStatusDraft}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#0B1B3E] mb-1.5">
                    {s.fieldPostReadTime}
                  </label>
                  <input
                    type="text"
                    value={postForm.readTime}
                    onChange={(e) => setPostForm({ ...postForm, readTime: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-[#F8FAFE] px-3 py-2.5 text-sm text-[#0B1B3E]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#0B1B3E] mb-1.5">
                    {s.fieldPostDate}
                  </label>
                  <input
                    type="date"
                    value={postForm.publishedAt}
                    onChange={(e) => setPostForm({ ...postForm, publishedAt: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-[#F8FAFE] px-3 py-2.5 text-sm font-mono text-[#0B1B3E]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#0B1B3E] mb-1.5">
                    {s.fieldPostAuthor}
                  </label>
                  <input
                    type="text"
                    value={postForm.authorName}
                    onChange={(e) => setPostForm({ ...postForm, authorName: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-[#F8FAFE] px-3.5 py-2.5 text-sm text-[#0B1B3E]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#0B1B3E] mb-1.5">
                    {s.fieldPostTags}
                  </label>
                  <input
                    type="text"
                    value={tagsText}
                    onChange={(e) => setTagsText(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-[#F8FAFE] px-3.5 py-2.5 text-sm text-[#0B1B3E]"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="block text-xs font-semibold text-[#0B1B3E]">
                  {s.fieldPostCoverImage}
                </label>

                <div className="flex flex-col sm:flex-row gap-4 items-stretch bg-[#F8FAFE] p-3.5 rounded-2xl border border-slate-200/80">
                  <img
                    src={postForm.coverImage}
                    alt={postForm.title || s.fieldImagePreviewAlt}
                    referrerPolicy="no-referrer"
                    className="w-full sm:w-44 aspect-[16/10] rounded-xl object-cover border border-slate-200 bg-white shrink-0"
                  />

                  <div className="flex-1 space-y-2.5">
                    <label
                      onDragOver={(e) => {
                        e.preventDefault();
                        setIsDraggingCover(true);
                      }}
                      onDragLeave={() => setIsDraggingCover(false)}
                      onDrop={handleCoverDrop}
                      className={`flex items-center justify-center gap-2.5 px-4 py-3 rounded-xl border-2 border-dashed transition-colors cursor-pointer ${
                        isDraggingCover
                          ? 'border-[#155EEF] bg-blue-50/70'
                          : 'border-slate-300 bg-white hover:border-[#155EEF]/60'
                      }`}
                    >
                      <input
                        type="file"
                        accept="image/*"
                        disabled={uploadingCover}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            void handleBlogCoverUpload(file);
                          }
                          e.target.value = '';
                        }}
                        className="hidden"
                      />
                      {uploadingCover ? (
                        <Loader2 className="w-4 h-4 animate-spin text-[#155EEF]" />
                      ) : (
                        <Upload className="w-4 h-4 text-[#155EEF]" />
                      )}
                      <span className="text-xs font-semibold text-[#0B1B3E]">
                        {uploadingCover ? s.fieldUploading : s.fieldUploadImage}
                      </span>
                      <span className="hidden md:inline text-[11px] text-slate-400">
                        · {s.fieldDropHint}
                      </span>
                    </label>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <select
                        value={
                          STUDIO_IMAGE_PRESETS.some((p) => p.src === postForm.coverImage)
                            ? postForm.coverImage
                            : ''
                        }
                        onChange={(e) => {
                          if (e.target.value) setPostForm({ ...postForm, coverImage: e.target.value });
                        }}
                        className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs text-[#0B1B3E]"
                      >
                        <option value="">{s.fieldPresetSelect}</option>
                        {STUDIO_IMAGE_PRESETS.map((preset) => (
                          <option key={preset.src} value={preset.src}>
                            {preset.label}
                          </option>
                        ))}
                      </select>
                      <input
                        type="text"
                        value={
                          postForm.coverImage.startsWith('data:image/')
                            ? '[Uploaded Photo Ready]'
                            : postForm.coverImage
                        }
                        onChange={(e) => setPostForm({ ...postForm, coverImage: e.target.value })}
                        placeholder={s.fieldCustomUrlPlaceholder}
                        className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-mono text-[#0B1B3E]"
                      />
                    </div>
                  </div>
                </div>

                {postUploadError && (
                  <div className="flex items-center gap-2 rounded-xl bg-red-50 border border-red-200 px-3 py-2 text-xs font-medium text-[#E1262D]">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{postUploadError}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0B1B3E] mb-1.5">
                  {s.fieldPostExcerpt}
                </label>
                <textarea
                  rows={2}
                  required
                  value={postForm.excerpt}
                  onChange={(e) => setPostForm({ ...postForm, excerpt: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 bg-[#F8FAFE] px-3.5 py-2.5 text-sm text-[#0B1B3E]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0B1B3E] mb-1.5">
                  {s.fieldPostContent}
                </label>
                <textarea
                  rows={7}
                  required
                  value={postForm.content}
                  onChange={(e) => setPostForm({ ...postForm, content: e.target.value })}
                  className="w-full rounded-xl border border-slate-200 bg-[#F8FAFE] px-3.5 py-2.5 text-sm text-[#0B1B3E] leading-relaxed"
                />
              </div>

              {/* Auto-Attached Social Media Links Preview */}
              <div className="rounded-2xl bg-[#F8FAFE] border border-slate-200/80 p-4 space-y-2.5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="text-xs font-bold text-[#0B1B3E]">{s.socialAutoAttachLabel}</p>
                    <p className="text-[11px] text-slate-500">{s.socialAutoAttachSub}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setPostModalOpen(false);
                      setActiveTab('social');
                    }}
                    className="text-xs font-semibold text-[#155EEF] hover:underline cursor-pointer"
                  >
                    {s.socialManageShortcut}
                  </button>
                </div>
                {hasAnySocialLink(socialLinks) ? (
                  <SocialLinksBar links={socialLinks} lang={lang} compact />
                ) : (
                  <p className="text-xs text-slate-500">{s.socialNoLinksYet}</p>
                )}
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setPostModalOpen(false)}
                  className="px-5 py-2.5 rounded-full border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer"
                >
                  {s.dashCancelBtn}
                </button>
                <button
                  type="submit"
                  disabled={savingPost || uploadingCover}
                  className="px-6 py-2.5 rounded-full bg-[#E1262D] hover:bg-[#C61D24] text-white text-sm font-semibold cursor-pointer disabled:opacity-60"
                >
                  {savingPost ? s.dashSaving : s.dashSavePostBtn}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
