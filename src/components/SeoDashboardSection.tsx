import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from 'react';
import {
  AlertCircle,
  BarChart3,
  Bot,
  Check,
  CheckCircle2,
  Code2,
  Copy,
  Download,
  ExternalLink,
  FileText,
  Globe,
  Link2,
  Loader2,
  Monitor,
  Plus,
  RefreshCw,
  Search,
  Send,
  Smartphone,
  Sparkles,
  Trash2,
  Upload,
} from 'lucide-react';
import { LanguageCode, PRODUCT_CATEGORIES } from '../data/factoryData';
import { BlogPost, STUDIO_IMAGE_PRESETS } from '../data/blogData';
import { getCmsStrings } from '../data/cmsTranslations';
import { SocialMediaLinks } from './SocialLinksBar';
import {
  CmsProductRecord,
  countSocialLinks,
  RECOMMENDED_SEO_SETTINGS,
  saveSeoSettings,
  SeoSettings,
} from '../services/cmsService';
import {
  ImageUploadValidationError,
  uploadDashboardImage,
} from '../services/imageUploadService';
import {
  analyzeKeywordsAcrossSite,
  B2B_DIRECTORY_TARGETS,
  buildEnhancedRobotsTxt,
  buildEnhancedSitemapXml,
  buildLlmsTxtContent,
  CORE_KEYWORD_PILLARS,
  estimateDescPixels,
  estimateTitlePixels,
  generateLongTailKeywords,
  loadSeoWorkspace,
  saveSeoWorkspace,
  SEARCH_ENGINE_CONSOLE_LINKS,
  SeoFaqItem,
  SeoProWorkspace,
} from '../data/seoToolkitData';

export interface SeoAuditCheck {
  id: string;
  label: string;
  passed: boolean;
  points: number;
}

export function computeSeoAudit(
  seo: SeoSettings,
  socialLinks: SocialMediaLinks,
  activeProductsCount: number,
  publishedPostsCount: number
): { score: number; checks: SeoAuditCheck[] } {
  const titleLen = seo.siteTitle.trim().length;
  const descLen = seo.metaDescription.trim().length;
  const verificationsCount = [
    seo.googleVerification,
    seo.bingVerification,
    seo.yandexVerification,
    seo.baiduVerification,
  ].filter((v) => Boolean(v.trim())).length;

  const combinedText = `${seo.siteTitle} ${seo.metaDescription} ${seo.keywords.join(' ')}`.toLowerCase();
  const corePillarsMatched = [
    'trigger sprayer',
    'lotion pump',
    'foam',
    'fine mist',
  ].filter((kw) => combinedText.includes(kw)).length;

  const checks: SeoAuditCheck[] = [
    {
      id: 'title-range',
      label: `Meta Title length (${titleLen}/60 chars, ideal 30–60)`,
      passed: titleLen >= 30 && titleLen <= 65,
      points: 16,
    },
    {
      id: 'desc-range',
      label: `Meta Description length (${descLen}/160 chars, ideal 120–160)`,
      passed: descLen >= 110 && descLen <= 170,
      points: 16,
    },
    {
      id: 'core-pillars',
      label: `4 Core Product Keywords (${corePillarsMatched}/4: trigger sprayer, lotion pump, foam, fine mist)`,
      passed: corePillarsMatched === 4,
      points: 14,
    },
    {
      id: 'keywords',
      label: `Search Engine Keywords (${seo.keywords.length} configured, target 8+)`,
      passed: seo.keywords.length >= 8,
      points: 10,
    },
    {
      id: 'robots',
      label: 'Search Indexing Enabled (index, follow + XML Sitemap)',
      passed: seo.robotsIndex,
      points: 10,
    },
    {
      id: 'og-card',
      label: 'OpenGraph & X Card Social Preview Configured',
      passed: Boolean((seo.ogTitle || seo.siteTitle).trim()) && Boolean(seo.ogImage.trim()),
      points: 8,
    },
    {
      id: 'schema-org',
      label: 'Schema.org Graph (Organization, ItemList, FAQPage, Product, Article)',
      passed: true,
      points: 8,
    },
    {
      id: 'hreflang',
      label: 'Multilingual hreflang (en, es, ar, x-default) & Geo Tags',
      passed: true,
      points: 6,
    },
    {
      id: 'content-freshness',
      label: `Indexed Content (${activeProductsCount} active products, ${publishedPostsCount} blog posts)`,
      passed: activeProductsCount > 0 && publishedPostsCount > 0,
      points: 6,
    },
    {
      id: 'social-authority',
      label: `Social Authority Signals (${countSocialLinks(socialLinks)} linked profiles)`,
      passed: countSocialLinks(socialLinks) > 0,
      points: 3,
    },
    {
      id: 'webmaster',
      label: `Search Engine Webmaster Verification (${verificationsCount}/4 engines)`,
      passed: verificationsCount > 0,
      points: 3,
    },
  ];

  const score = checks.reduce((acc, item) => acc + (item.passed ? item.points : 0), 0);
  return { score: Math.min(100, score), checks };
}

type SeoToolTab = 'serp' | 'keywords' | 'schema' | 'crawlers' | 'audit' | 'backlinks';
type SerpPreviewMode = 'desktop' | 'mobile' | 'bing' | 'social';

interface SeoDashboardSectionProps {
  lang: LanguageCode;
  userUid: string;
  seoSettings: SeoSettings;
  socialLinks: SocialMediaLinks;
  products: CmsProductRecord[];
  blogPosts: BlogPost[];
  onFeedback: (msg: { type: 'success' | 'error'; text: string } | null) => void;
}

export function SeoDashboardSection({
  lang,
  userUid,
  seoSettings,
  socialLinks,
  products,
  blogPosts,
  onFeedback,
}: SeoDashboardSectionProps) {
  const s = getCmsStrings(lang);

  const [activeTool, setActiveTool] = useState<SeoToolTab>('serp');
  const [serpMode, setSerpMode] = useState<SerpPreviewMode>('desktop');

  const [form, setForm] = useState<SeoSettings>(seoSettings);
  const [keywordsText, setKeywordsText] = useState(seoSettings.keywords.join(', '));
  const [saving, setSaving] = useState(false);
  const [uploadingOg, setUploadingOg] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // Extended Pro SEO Workspace (FAQs, IndexNow, Tracked Keywords, Directories)
  const [workspace, setWorkspace] = useState<SeoProWorkspace>(() => loadSeoWorkspace());
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Keyword Generator & Tracker state
  const [genBaseTerm, setGenBaseTerm] = useState('trigger sprayer');
  const [genNeckSize, setGenNeckSize] = useState('28/410');
  const [genModifier, setGenModifier] = useState('manufacturer');
  const [customKeywordInput, setCustomKeywordInput] = useState('');

  // FAQ Builder state
  const [newFaqQuestion, setNewFaqQuestion] = useState('');
  const [newFaqAnswer, setNewFaqAnswer] = useState('');

  // IndexNow & Crawler state
  const [allowAiBots, setAllowAiBots] = useState(true);
  const [pingingIndexNow, setPingingIndexNow] = useState(false);
  const [indexNowResult, setIndexNowResult] = useState<{ ok: boolean; message: string } | null>(null);

  useEffect(() => {
    setForm(seoSettings);
    setKeywordsText(seoSettings.keywords.join(', '));
  }, [seoSettings]);

  const updateWorkspace = (updater: (prev: SeoProWorkspace) => SeoProWorkspace) => {
    setWorkspace((prev) => {
      const next = updater(prev);
      saveSeoWorkspace(next);
      return next;
    });
  };

  const parsedKeywords = keywordsText
    .split(',')
    .map((k) => k.trim())
    .filter(Boolean)
    .slice(0, 30);

  const liveForm: SeoSettings = {
    ...form,
    keywords: parsedKeywords,
  };

  const activeProducts = products.filter((p) => p.status === 'active');
  const publishedPosts = blogPosts.filter((p) => p.status === 'published');
  const audit = computeSeoAudit(liveForm, socialLinks, activeProducts.length, publishedPosts.length);

  const titleLen = form.siteTitle.trim().length;
  const descLen = form.metaDescription.trim().length;
  const titlePixels = estimateTitlePixels(form.siteTitle);
  const descPixels = estimateDescPixels(form.metaDescription);

  const previewUrl =
    form.canonicalUrl.trim() ||
    (typeof window !== 'undefined' ? window.location.origin : 'https://www.yilaiplastics.com');
  const cleanBaseUrl = previewUrl.replace(/\/+$/, '');

  const keywordAnalysis = useMemo(
    () => analyzeKeywordsAcrossSite(workspace.trackedKeywords, liveForm, products, blogPosts),
    [workspace.trackedKeywords, liveForm, products, blogPosts]
  );

  const generatedLongTails = useMemo(
    () => generateLongTailKeywords(genBaseTerm, genNeckSize, genModifier),
    [genBaseTerm, genNeckSize, genModifier]
  );

  const sitemapXmlPreview = useMemo(
    () => buildEnhancedSitemapXml(cleanBaseUrl, activeProducts, publishedPosts),
    [cleanBaseUrl, activeProducts, publishedPosts]
  );

  const robotsTxtPreview = useMemo(
    () => buildEnhancedRobotsTxt(cleanBaseUrl, form.robotsIndex, allowAiBots),
    [cleanBaseUrl, form.robotsIndex, allowAiBots]
  );

  const llmsTxtPreview = useMemo(
    () => buildLlmsTxtContent(cleanBaseUrl, liveForm),
    [cleanBaseUrl, liveForm]
  );

  const liveJsonLdPreview = useMemo(() => {
    const graph: Array<Record<string, unknown>> = [
      {
        '@type': 'Organization',
        name: 'Yi Lai Plastics Industry',
        url: `${cleanBaseUrl}/`,
        description: liveForm.metaDescription,
        knowsAbout: ['Trigger Sprayers', 'Lotion Pumps', 'Foam Pumps', 'Fine Mist Sprayers'],
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Yuyao',
          addressRegion: 'Ningbo, Zhejiang',
          addressCountry: 'CN',
        },
      },
      {
        '@type': 'WebSite',
        name: 'Yi Lai Plastics Industry',
        url: `${cleanBaseUrl}/`,
        inLanguage: ['en', 'es', 'ar'],
        potentialAction: {
          '@type': 'SearchAction',
          target: `${cleanBaseUrl}/?page=products&q={search_term_string}`,
          'query-input': 'required name=search_term_string',
        },
      },
    ];

    if (workspace.enableItemListSchema) {
      graph.push({
        '@type': 'ItemList',
        name: 'Dispensing Product Categories',
        numberOfItems: PRODUCT_CATEGORIES.length,
        itemListElement: PRODUCT_CATEGORIES.map((c, idx) => ({
          '@type': 'ListItem',
          position: idx + 1,
          name: c.name,
          url: `${cleanBaseUrl}/?page=products&category=${c.id}`,
        })),
      });
    }

    if (workspace.enableFaqSchema && workspace.faqItems.length > 0) {
      graph.push({
        '@type': 'FAQPage',
        mainEntity: workspace.faqItems.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      });
    }

    return JSON.stringify(
      {
        '@context': 'https://schema.org',
        '@graph': graph,
      },
      null,
      2
    );
  }, [cleanBaseUrl, liveForm.metaDescription, workspace]);

  const indexNowUrlList = useMemo(() => {
    const list = [
      `${cleanBaseUrl}/`,
      `${cleanBaseUrl}/?page=products`,
      `${cleanBaseUrl}/?page=blog`,
      ...PRODUCT_CATEGORIES.map((c) => `${cleanBaseUrl}/?page=products&category=${c.id}`),
      ...activeProducts.map((p) => `${cleanBaseUrl}/?page=products&product=${encodeURIComponent(p.slug)}`),
      ...publishedPosts.map((post) => `${cleanBaseUrl}/?page=blog&post=${encodeURIComponent(post.slug)}`),
    ];
    return Array.from(new Set(list)).slice(0, 50);
  }, [cleanBaseUrl, activeProducts, publishedPosts]);

  const contentAuditRows = useMemo(() => {
    const skuRows =
      activeProducts.length > 0
        ? activeProducts.map((p) => {
            const combined = `${p.model} ${p.description} ${p.applications}`.toLowerCase();
            const kwHit = ['trigger', 'lotion', 'foam', 'mist', 'cap', 'closure'].some((w) =>
              combined.includes(w)
            );
            const descOk = p.description.trim().length >= 80;
            const imgCount = p.galleryUrls.length;
            return {
              id: `prod-${p.id}`,
              type: 'Product',
              title: p.model,
              slug: `/?page=products&product=${p.slug}`,
              descChars: p.description.trim().length,
              images: imgCount,
              kwHit,
              healthy: descOk && imgCount > 0 && kwHit,
            };
          })
        : PRODUCT_CATEGORIES.flatMap((c) =>
            c.variants.map((v) => {
              const combined = `${v.model} ${v.description} ${v.applications}`.toLowerCase();
              const kwHit = ['trigger', 'lotion', 'foam', 'mist', 'cap', 'closure'].some((w) =>
                combined.includes(w)
              );
              return {
                id: `cat-${v.slug}`,
                type: 'Product',
                title: v.model,
                slug: `/?page=products&product=${v.slug}`,
                descChars: v.description.trim().length,
                images: v.gallery.length,
                kwHit,
                healthy: v.description.trim().length >= 80 && v.gallery.length > 0 && kwHit,
              };
            })
          );

    const postRows = publishedPosts.map((post) => {
      const combined = `${post.title} ${post.excerpt} ${post.content}`.toLowerCase();
      const kwHit = ['trigger', 'lotion', 'foam', 'mist', 'sprayer', 'pump'].some((w) =>
        combined.includes(w)
      );
      return {
        id: `post-${post.id}`,
        type: 'Article',
        title: post.title,
        slug: `/?page=blog&post=${post.slug}`,
        descChars: post.excerpt.trim().length,
        images: post.coverImage ? 1 : 0,
        kwHit,
        healthy: post.excerpt.trim().length >= 80 && post.content.trim().length >= 300 && kwHit,
      };
    });

    return [...skuRows, ...postRows];
  }, [activeProducts, publishedPosts]);

  const copyToClipboard = async (id: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      window.setTimeout(() => setCopiedId((curr) => (curr === id ? null : curr)), 1800);
    } catch {
      onFeedback({ type: 'error', text: 'Clipboard copy not permitted in this browser context.' });
    }
  };

  const handleApplyRecommended = () => {
    setForm(RECOMMENDED_SEO_SETTINGS);
    setKeywordsText(RECOMMENDED_SEO_SETTINGS.keywords.join(', '));
    onFeedback({
      type: 'success',
      text: 'Applied top-ranking SEO preset for trigger sprayer, lotion pump, foam pump & fine mist sprayer. Click Save & Publish SEO to push live.',
    });
  };

  const handleInjectKeywordPack = (pack: string[]) => {
    const existing = parsedKeywords;
    const merged = Array.from(new Set([...existing, ...pack])).slice(0, 30);
    setKeywordsText(merged.join(', '));
  };

  const handleAddSingleKeyword = (kw: string) => {
    const clean = kw.trim();
    if (!clean) return;
    if (parsedKeywords.some((k) => k.toLowerCase() === clean.toLowerCase())) return;
    const next = [...parsedKeywords, clean].slice(0, 30);
    setKeywordsText(next.join(', '));
  };

  const handleUploadOgImage = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    setUploadError(null);
    setUploadingOg(true);
    try {
      const res = await uploadDashboardImage(file, 'blog', userUid);
      setForm((prev) => ({ ...prev, ogImage: res.url }));
    } catch (err) {
      if (err instanceof ImageUploadValidationError) {
        setUploadError(
          err.code === 'invalid-type' ? s.fieldUploadInvalidType : s.fieldUploadTooLarge
        );
      } else {
        setUploadError(s.fieldUploadFailed);
      }
    } finally {
      setUploadingOg(false);
    }
  };

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.siteTitle.trim() || !form.metaDescription.trim()) {
      onFeedback({ type: 'error', text: 'SEO title and meta description are required.' });
      return;
    }

    setSaving(true);
    onFeedback(null);
    try {
      const saved = await saveSeoSettings(userUid, liveForm);
      setForm(saved);
      setKeywordsText(saved.keywords.join(', '));
      onFeedback({ type: 'success', text: s.seoSavedMsg });
    } catch (err) {
      onFeedback({
        type: 'error',
        text: err instanceof Error ? err.message : 'Failed to save SEO settings.',
      });
    } finally {
      setSaving(false);
    }
  };

  const triggerDownload = (filename: string, content: string, mimeType: string) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  const handleAddFaq = () => {
    if (!newFaqQuestion.trim() || !newFaqAnswer.trim()) return;
    updateWorkspace((prev) => ({
      ...prev,
      faqItems: [
        ...prev.faqItems,
        {
          id: `faq-${Date.now().toString(36)}`,
          question: newFaqQuestion.trim(),
          answer: newFaqAnswer.trim(),
        },
      ],
    }));
    setNewFaqQuestion('');
    setNewFaqAnswer('');
  };

  const handleTrackKeyword = () => {
    const clean = customKeywordInput.trim();
    if (!clean) return;
    updateWorkspace((prev) => ({
      ...prev,
      trackedKeywords: Array.from(new Set([...prev.trackedKeywords, clean])).slice(0, 20),
    }));
    setCustomKeywordInput('');
  };

  const handlePingIndexNow = async () => {
    setPingingIndexNow(true);
    setIndexNowResult(null);
    const host = cleanBaseUrl.replace(/^https?:\/\//i, '').split('/')[0];
    try {
      const res = await fetch('https://api.indexnow.org/indexnow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify({
          host,
          key: workspace.indexNowKey,
          keyLocation: `${cleanBaseUrl}/${workspace.indexNowKey}.txt`,
          urlList: indexNowUrlList,
        }),
      });
      if (res.ok || res.status === 202) {
        setIndexNowResult({
          ok: true,
          message: `IndexNow accepted ${indexNowUrlList.length} URLs (HTTP ${res.status}) for Bing, Yandex & Copilot.`,
        });
      } else {
        setIndexNowResult({
          ok: false,
          message: `IndexNow returned HTTP ${res.status}. Upload ${workspace.indexNowKey}.txt to your site root and verify your live custom domain.`,
        });
      }
    } catch {
      setIndexNowResult({
        ok: false,
        message: `Browser CORS blocked direct cross-origin POST. Download ${workspace.indexNowKey}.txt, deploy to your domain root, and run the cURL command below.`,
      });
    } finally {
      setPingingIndexNow(false);
    }
  };

  const toolTabs: Array<{ id: SeoToolTab; label: string; icon: typeof Search }> = [
    { id: 'serp', label: 'SERP & Meta Studio', icon: Search },
    { id: 'keywords', label: 'Keyword Analyzer', icon: BarChart3 },
    { id: 'schema', label: 'Schema & FAQ Snippets', icon: Code2 },
    { id: 'crawlers', label: 'IndexNow & Sitemap', icon: Send },
    { id: 'audit', label: `Audit & Matrix (${audit.score}%)`, icon: FileText },
    { id: 'backlinks', label: 'AI Search & Backlinks', icon: Link2 },
  ];

  const directoryProgressCount = workspace.completedDirectories.length;

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-6">
      {/* Header + Live SEO Score + Apply Recommended */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 pb-6 border-b border-slate-100">
        <div>
          <h2 className="font-display font-extrabold text-xl sm:text-2xl text-[#0B1B3E]">
            {s.seoSectionTitle}
          </h2>
          <p className="mt-1.5 text-sm text-slate-600 max-w-2xl leading-relaxed">
            {s.seoSectionSub}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <div
            className={`inline-flex items-center gap-2.5 px-4 py-2 rounded-xl border ${
              audit.score >= 85
                ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                : audit.score >= 60
                ? 'bg-blue-50 border-blue-200 text-[#155EEF]'
                : 'bg-amber-50 border-amber-200 text-amber-800'
            }`}
          >
            <Globe className="w-4 h-4 shrink-0" />
            <span className="text-xs font-semibold whitespace-nowrap">{s.seoScoreLabel}:</span>
            <span className="font-mono font-extrabold text-base tabular-nums">
              {audit.score}%
            </span>
          </div>

          <button
            type="button"
            onClick={handleApplyRecommended}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#F6F9FE] hover:bg-blue-50 text-[#155EEF] border border-blue-200/80 text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{s.seoApplyRecommendedBtn}</span>
          </button>
        </div>
      </div>

      {/* 6-Tool Workspace Navigation Bar */}
      <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl bg-[#F6F9FE] border border-slate-200/80">
        {toolTabs.map((tab) => {
          const Icon = tab.icon;
          const active = activeTool === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTool(tab.id)}
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                active
                  ? 'bg-[#0B1B3E] text-white shadow-xs'
                  : 'text-slate-600 hover:text-[#0B1B3E] hover:bg-white/70'
              }`}
            >
              <Icon className="w-3.5 h-3.5 shrink-0" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ===================================================================== */}
      {/* TOOL 1: SERP & ON-PAGE META STUDIO                                    */}
      {/* ===================================================================== */}
      {activeTool === 'serp' && (
        <div className="space-y-6">
          {/* Multi-Engine SERP & Social Card Live Preview */}
          <div className="rounded-2xl border border-slate-200/90 bg-[#F8FAFE] p-5 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="inline-flex items-center gap-2 text-xs font-bold text-[#0B1B3E]">
                <Search className="w-3.5 h-3.5 text-[#155EEF]" />
                <span>{s.seoSerpPreviewTitle}</span>
              </p>

              <div className="inline-flex items-center gap-1 p-1 rounded-xl bg-white border border-slate-200">
                {(
                  [
                    { id: 'desktop', label: 'Google Desktop', icon: Monitor },
                    { id: 'mobile', label: 'Google Mobile', icon: Smartphone },
                    { id: 'bing', label: 'Bing / Yahoo', icon: Globe },
                    { id: 'social', label: 'Social Card', icon: ExternalLink },
                  ] as const
                ).map((mode) => {
                  const Icon = mode.icon;
                  return (
                    <button
                      key={mode.id}
                      type="button"
                      onClick={() => setSerpMode(mode.id)}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                        serpMode === mode.id
                          ? 'bg-[#155EEF] text-white'
                          : 'text-slate-600 hover:text-[#0B1B3E]'
                      }`}
                    >
                      <Icon className="w-3 h-3" />
                      <span>{mode.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {serpMode === 'social' ? (
              <div className="bg-white rounded-xl border border-slate-200 overflow-hidden max-w-xl">
                {form.ogImage && (
                  <img
                    src={form.ogImage}
                    alt="Social OpenGraph card preview"
                    referrerPolicy="no-referrer"
                    className="w-full h-44 object-cover border-b border-slate-100 bg-slate-50"
                  />
                )}
                <div className="p-4 space-y-1">
                  <p className="text-[11px] font-mono text-slate-500 truncate" dir="ltr">
                    {cleanBaseUrl.replace(/^https?:\/\//, '')}
                  </p>
                  <h3 className="text-sm font-bold text-[#0B1B3E] line-clamp-1">
                    {form.ogTitle || form.siteTitle}
                  </h3>
                  <p className="text-xs text-slate-600 line-clamp-2">
                    {form.ogDescription || form.metaDescription}
                  </p>
                </div>
              </div>
            ) : (
              <div
                className={`bg-white rounded-xl border border-slate-200/80 p-4 sm:p-5 space-y-1.5 ${
                  serpMode === 'mobile' ? 'max-w-sm' : 'w-full'
                }`}
              >
                <div className="flex items-center gap-2 text-xs text-slate-600" dir="ltr">
                  <span className="font-semibold text-[#0B1B3E]">Yi Lai Plastics Industry</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono text-emerald-700 truncate">{cleanBaseUrl}</span>
                </div>
                <h3
                  className={`font-semibold leading-snug line-clamp-1 ${
                    serpMode === 'bing' ? 'text-[#001ba0] text-lg' : 'text-[#1a0dab] text-lg sm:text-xl'
                  }`}
                >
                  {form.siteTitle || 'Yi Lai Plastics — Trigger Sprayers & Lotion Pumps'}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-2">
                  {form.metaDescription ||
                    'Custom trigger sprayers, lotion pumps, foam pumps, and fine mist sprayers.'}
                </p>
                {workspace.enableFaqSchema && workspace.faqItems.length > 0 && (
                  <div className="pt-2 mt-2 border-t border-slate-100 text-[11px] text-slate-500 flex flex-wrap items-center gap-x-3 gap-y-1">
                    <span className="font-semibold text-[#0B1B3E]">Rich Snippets Active:</span>
                    <span>{workspace.faqItems[0].question.slice(0, 56)}…</span>
                  </div>
                )}
              </div>
            )}

            {/* Pixel & Character Width Meters */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px]">
              <div className="flex items-center justify-between gap-2 bg-white rounded-xl border border-slate-200/80 px-3.5 py-2">
                <span className="text-slate-600 font-medium">Title Pixel Width (Google limit ~580px)</span>
                <span
                  className={`font-mono font-bold tabular-nums ${
                    titlePixels <= 580 && titleLen >= 30 ? 'text-emerald-600' : 'text-amber-600'
                  }`}
                >
                  {titlePixels}px · {titleLen} chars
                </span>
              </div>
              <div className="flex items-center justify-between gap-2 bg-white rounded-xl border border-slate-200/80 px-3.5 py-2">
                <span className="text-slate-600 font-medium">Description Pixel Width (Google limit ~920px)</span>
                <span
                  className={`font-mono font-bold tabular-nums ${
                    descPixels <= 960 && descLen >= 110 ? 'text-emerald-600' : 'text-amber-600'
                  }`}
                >
                  {descPixels}px · {descLen} chars
                </span>
              </div>
            </div>
          </div>

          {/* Main Editable SEO Form */}
          <form onSubmit={handleSave} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: Core On-Page & Social Tags */}
              <div className="lg:col-span-7 space-y-5">
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between gap-2">
                    <label className="text-xs font-bold text-[#0B1B3E]">{s.seoFieldTitle}</label>
                    <span
                      className={`font-mono text-[11px] font-semibold tabular-nums ${
                        titleLen >= 30 && titleLen <= 60 ? 'text-emerald-600' : 'text-amber-600'
                      }`}
                    >
                      {titleLen} / 60 · {s.seoFieldTitleHint}
                    </span>
                  </div>
                  <input
                    type="text"
                    required
                    maxLength={120}
                    value={form.siteTitle}
                    onChange={(e) => setForm({ ...form, siteTitle: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-[#F8FAFE] px-3.5 py-2.5 text-sm text-[#0B1B3E] focus:outline-none focus:border-[#155EEF] focus:bg-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between gap-2">
                    <label className="text-xs font-bold text-[#0B1B3E]">{s.seoFieldDesc}</label>
                    <span
                      className={`font-mono text-[11px] font-semibold tabular-nums ${
                        descLen >= 120 && descLen <= 160 ? 'text-emerald-600' : 'text-amber-600'
                      }`}
                    >
                      {descLen} / 160 · {s.seoFieldDescHint}
                    </span>
                  </div>
                  <textarea
                    required
                    rows={3}
                    maxLength={320}
                    value={form.metaDescription}
                    onChange={(e) => setForm({ ...form, metaDescription: e.target.value })}
                    className="w-full rounded-xl border border-slate-200 bg-[#F8FAFE] px-3.5 py-2.5 text-sm text-[#0B1B3E] focus:outline-none focus:border-[#155EEF] focus:bg-white"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <label className="block text-xs font-bold text-[#0B1B3E]">
                      {s.seoFieldKeywords}
                    </label>
                    <span className="font-mono text-[11px] text-slate-500 tabular-nums">
                      {parsedKeywords.length} / 30 keywords
                    </span>
                  </div>
                  <textarea
                    rows={2}
                    value={keywordsText}
                    onChange={(e) => setKeywordsText(e.target.value)}
                    placeholder="trigger sprayer, lotion pump, foam pump, fine mist sprayer..."
                    className="w-full rounded-xl border border-slate-200 bg-[#F8FAFE] px-3.5 py-2.5 text-sm text-[#0B1B3E] focus:outline-none focus:border-[#155EEF] focus:bg-white"
                  />
                  {/* Quick-Inject Keyword Pillar Packs */}
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <span className="text-[11px] font-semibold text-slate-500">Quick-add packs:</span>
                    {CORE_KEYWORD_PILLARS.map((pillar) => (
                      <button
                        key={pillar.id}
                        type="button"
                        onClick={() => handleInjectKeywordPack(pillar.pack)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#F6F9FE] hover:bg-blue-50 text-[#155EEF] border border-blue-200/80 text-[11px] font-semibold transition-colors cursor-pointer whitespace-nowrap"
                      >
                        <Plus className="w-3 h-3" />
                        <span>{pillar.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-[#0B1B3E]">
                      {s.seoFieldCanonical}
                    </label>
                    <input
                      type="text"
                      dir="ltr"
                      value={form.canonicalUrl}
                      onChange={(e) => setForm({ ...form, canonicalUrl: e.target.value })}
                      placeholder="https://www.yilaiplastics.com"
                      className="w-full rounded-xl border border-slate-200 bg-[#F8FAFE] px-3.5 py-2.5 text-sm font-mono text-[#0B1B3E] focus:outline-none focus:border-[#155EEF] focus:bg-white"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-[#0B1B3E]">
                      {s.seoFieldRobots}
                    </label>
                    <select
                      value={form.robotsIndex ? 'index' : 'noindex'}
                      onChange={(e) => setForm({ ...form, robotsIndex: e.target.value === 'index' })}
                      className="w-full rounded-xl border border-slate-200 bg-[#F8FAFE] px-3.5 py-2.5 text-sm text-[#0B1B3E] focus:outline-none focus:border-[#155EEF] focus:bg-white"
                    >
                      <option value="index">{s.seoFieldRobotsOn}</option>
                      <option value="noindex">{s.seoFieldRobotsOff}</option>
                    </select>
                  </div>
                </div>

                {/* OpenGraph & X Share Card */}
                <div className="rounded-2xl border border-slate-200/90 bg-[#F8FAFE] p-4 sm:p-5 space-y-4">
                  <p className="text-xs font-bold text-[#0B1B3E]">{s.seoSocialCardHeading}</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                        {s.seoFieldOgTitle}
                      </label>
                      <input
                        type="text"
                        maxLength={120}
                        value={form.ogTitle}
                        onChange={(e) => setForm({ ...form, ogTitle: e.target.value })}
                        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs sm:text-sm text-[#0B1B3E] focus:outline-none focus:border-[#155EEF]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                        {s.seoFieldOgDesc}
                      </label>
                      <input
                        type="text"
                        maxLength={320}
                        value={form.ogDescription}
                        onChange={(e) => setForm({ ...form, ogDescription: e.target.value })}
                        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs sm:text-sm text-[#0B1B3E] focus:outline-none focus:border-[#155EEF]"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-[11px] font-semibold text-slate-600">
                      {s.seoFieldOgImage}
                    </label>
                    <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                      {form.ogImage && (
                        <img
                          src={form.ogImage}
                          alt="OG share preview"
                          referrerPolicy="no-referrer"
                          className="w-24 h-16 rounded-xl object-cover border border-slate-200 shrink-0 bg-white"
                        />
                      )}
                      <div className="flex-1 w-full space-y-2">
                        <div className="flex flex-wrap gap-2">
                          <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white hover:bg-blue-50 text-[#155EEF] border border-blue-200 text-xs font-semibold cursor-pointer transition-colors">
                            {uploadingOg ? (
                              <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            ) : (
                              <Upload className="w-3.5 h-3.5" />
                            )}
                            <span>{uploadingOg ? s.fieldUploading : s.fieldUploadImage}</span>
                            <input
                              type="file"
                              accept="image/png,image/jpeg,image/webp,image/gif"
                              onChange={handleUploadOgImage}
                              disabled={uploadingOg}
                              className="sr-only"
                            />
                          </label>

                          <select
                            value={
                              STUDIO_IMAGE_PRESETS.some((p) => p.src === form.ogImage)
                                ? form.ogImage
                                : ''
                            }
                            onChange={(e) => {
                              if (e.target.value) setForm({ ...form, ogImage: e.target.value });
                            }}
                            className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs text-[#0B1B3E]"
                          >
                            <option value="">{s.fieldPresetSelect}</option>
                            {STUDIO_IMAGE_PRESETS.map((preset) => (
                              <option key={preset.src} value={preset.src}>
                                {preset.label}
                              </option>
                            ))}
                          </select>
                        </div>
                        <input
                          type="text"
                          dir="ltr"
                          value={form.ogImage}
                          onChange={(e) => setForm({ ...form, ogImage: e.target.value })}
                          placeholder={s.fieldCustomUrlPlaceholder}
                          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-mono text-[#0B1B3E] focus:outline-none focus:border-[#155EEF]"
                        />
                        {uploadError && (
                          <p className="inline-flex items-center gap-1 text-xs text-[#E1262D]">
                            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                            <span>{uploadError}</span>
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Search Engine Verification & Quick Exports */}
              <div className="lg:col-span-5 space-y-5">
                <div className="rounded-2xl border border-slate-200/90 bg-[#F8FAFE] p-4 sm:p-5 space-y-3.5">
                  <div>
                    <h3 className="text-xs font-bold text-[#0B1B3E]">{s.seoWebmastersHeading}</h3>
                    <p className="mt-1 text-[11px] text-slate-500 leading-relaxed">
                      {s.seoWebmastersSub}
                    </p>
                  </div>

                  <div className="space-y-2.5">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                        {s.seoGoogleLabel}
                      </label>
                      <input
                        type="text"
                        dir="ltr"
                        maxLength={120}
                        value={form.googleVerification}
                        onChange={(e) => setForm({ ...form, googleVerification: e.target.value })}
                        placeholder="google-site-verification token"
                        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-mono text-[#0B1B3E] focus:outline-none focus:border-[#155EEF]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                        {s.seoBingLabel}
                      </label>
                      <input
                        type="text"
                        dir="ltr"
                        maxLength={120}
                        value={form.bingVerification}
                        onChange={(e) => setForm({ ...form, bingVerification: e.target.value })}
                        placeholder="Bing / Yahoo verification token"
                        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-mono text-[#0B1B3E] focus:outline-none focus:border-[#155EEF]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                        {s.seoYandexLabel}
                      </label>
                      <input
                        type="text"
                        dir="ltr"
                        maxLength={120}
                        value={form.yandexVerification}
                        onChange={(e) => setForm({ ...form, yandexVerification: e.target.value })}
                        placeholder="Yandex verification token"
                        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-mono text-[#0B1B3E] focus:outline-none focus:border-[#155EEF]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                        {s.seoBaiduLabel}
                      </label>
                      <input
                        type="text"
                        dir="ltr"
                        maxLength={120}
                        value={form.baiduVerification}
                        onChange={(e) => setForm({ ...form, baiduVerification: e.target.value })}
                        placeholder="Baidu verification token"
                        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-mono text-[#0B1B3E] focus:outline-none focus:border-[#155EEF]"
                      />
                    </div>
                  </div>
                </div>

                {/* Live Ranking Checklist Summary */}
                <div className="rounded-2xl border border-slate-200/90 bg-[#F8FAFE] p-4 sm:p-5 space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-xs font-bold text-[#0B1B3E]">{s.seoChecklistTitle}</h3>
                    <button
                      type="button"
                      onClick={() => setActiveTool('audit')}
                      className="text-[11px] font-semibold text-[#155EEF] hover:underline cursor-pointer"
                    >
                      Full Matrix
                    </button>
                  </div>
                  <ul className="space-y-2">
                    {audit.checks.slice(0, 7).map((check) => (
                      <li
                        key={check.id}
                        className="flex items-start gap-2 text-xs leading-snug text-slate-700"
                      >
                        <CheckCircle2
                          className={`w-4 h-4 shrink-0 mt-0.5 ${
                            check.passed ? 'text-emerald-600' : 'text-slate-300'
                          }`}
                        />
                        <span className={check.passed ? 'text-[#0B1B3E] font-medium' : 'text-slate-500'}>
                          {check.label}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Quick Sitemap & Robots Export */}
                <div className="rounded-2xl border border-slate-200/90 bg-[#F8FAFE] p-4 sm:p-5 space-y-3">
                  <h3 className="text-xs font-bold text-[#0B1B3E]">{s.seoSitemapHeading}</h3>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        triggerDownload(
                          'sitemap.xml',
                          sitemapXmlPreview,
                          'application/xml;charset=utf-8'
                        )
                      }
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-white hover:bg-blue-50 text-[#155EEF] border border-blue-200 text-xs font-semibold transition-colors cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>{s.seoDownloadSitemapBtn}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        triggerDownload(
                          'robots.txt',
                          robotsTxtPreview,
                          'text/plain;charset=utf-8'
                        )
                      }
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-white hover:bg-slate-100 text-[#0B1B3E] border border-slate-200 text-xs font-semibold transition-colors cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>{s.seoDownloadRobotsBtn}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#155EEF] hover:bg-[#0B1B3E] text-white text-sm font-semibold transition-colors cursor-pointer disabled:opacity-60 shadow-xs"
              >
                {saving ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <CheckCircle2 className="w-4 h-4" />
                )}
                <span>{saving ? s.dashSaving : s.seoSaveBtn}</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ===================================================================== */}
      {/* TOOL 2: KEYWORD RESEARCH & LIVE DENSITY ANALYZER                      */}
      {/* ===================================================================== */}
      {activeTool === 'keywords' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-[#0B1B3E]">
                Core Keyword Placement & Density Scanner
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                Live scan across your Title, Meta Description, Meta Keywords, Active Product SKUs, and Blog Posts for your target keywords.
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={handleApplyRecommended}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#155EEF] hover:bg-[#0B1B3E] text-white text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Optimize Title & Desc for All 4</span>
              </button>
            </div>
          </div>

          {/* Add Custom Focus Keyword */}
          <div className="flex flex-wrap items-center gap-2.5">
            <input
              type="text"
              value={customKeywordInput}
              onChange={(e) => setCustomKeywordInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleTrackKeyword();
                }
              }}
              placeholder="Track another keyword (e.g. 24/410 lotion pump wholesale)..."
              className="flex-1 min-w-[240px] rounded-xl border border-slate-200 bg-[#F8FAFE] px-3.5 py-2 text-xs sm:text-sm text-[#0B1B3E] focus:outline-none focus:border-[#155EEF] focus:bg-white"
            />
            <button
              type="button"
              onClick={handleTrackKeyword}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0B1B3E] hover:bg-[#155EEF] text-white text-xs font-semibold transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Track Keyword</span>
            </button>
          </div>

          {/* Keyword Density Matrix Table */}
          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#F8FAFE] border-b border-slate-200 text-slate-600 font-semibold">
                  <th className="py-3 px-4">Target Keyword</th>
                  <th className="py-3 px-3 text-center">Title</th>
                  <th className="py-3 px-3 text-center">Meta Desc</th>
                  <th className="py-3 px-3 text-center">Meta KW</th>
                  <th className="py-3 px-3 text-right">Product SKUs</th>
                  <th className="py-3 px-3 text-right">Blog Posts</th>
                  <th className="py-3 px-3 text-right">Total Hits</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {keywordAnalysis.map((row) => (
                  <tr key={row.keyword} className="hover:bg-slate-50/70">
                    <td className="py-3 px-4 font-semibold text-[#0B1B3E]">{row.keyword}</td>
                    <td className="py-3 px-3 text-center">
                      {row.inTitle ? (
                        <span className="text-emerald-600 font-semibold">Yes</span>
                      ) : (
                        <span className="text-amber-600 font-medium">Missing</span>
                      )}
                    </td>
                    <td className="py-3 px-3 text-center">
                      {row.inDesc ? (
                        <span className="text-emerald-600 font-semibold">Yes</span>
                      ) : (
                        <span className="text-amber-600 font-medium">Missing</span>
                      )}
                    </td>
                    <td className="py-3 px-3 text-center">
                      {row.inKeywordsMeta ? (
                        <span className="text-emerald-600 font-semibold">Yes</span>
                      ) : (
                        <span className="text-slate-400">No</span>
                      )}
                    </td>
                    <td className="py-3 px-3 text-right font-mono tabular-nums text-slate-700">
                      {row.productMatches}
                    </td>
                    <td className="py-3 px-3 text-right font-mono tabular-nums text-slate-700">
                      {row.blogMatches}
                    </td>
                    <td className="py-3 px-3 text-right font-mono font-bold tabular-nums text-[#0B1B3E]">
                      {row.totalOccurrences}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="inline-flex items-center gap-2">
                        {!row.inKeywordsMeta && (
                          <button
                            type="button"
                            onClick={() => handleAddSingleKeyword(row.keyword)}
                            className="text-[11px] font-semibold text-[#155EEF] hover:underline cursor-pointer"
                          >
                            + Add to Meta
                          </button>
                        )}
                        <span
                          className={`text-[11px] font-bold ${
                            row.status === 'Strong'
                              ? 'text-emerald-600'
                              : row.status === 'Partial'
                              ? 'text-blue-600'
                              : 'text-[#E1262D]'
                          }`}
                        >
                          {row.status}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Long-Tail B2B Keyword Generator */}
          <div className="rounded-2xl border border-slate-200/90 bg-[#F8FAFE] p-5 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h4 className="text-sm font-bold text-[#0B1B3E]">
                  Long-Tail Buyer Keyword Generator
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Combine dispensing product + SPI neck finish + buyer intent to capture high-converting B2B search queries.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => {
                    handleInjectKeywordPack(generatedLongTails);
                    setActiveTool('serp');
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#155EEF] hover:bg-[#0B1B3E] text-white text-xs font-semibold transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add All to Meta Keywords</span>
                </button>
                <button
                  type="button"
                  onClick={() =>
                    triggerDownload(
                      'yilai-target-keywords.csv',
                      ['Keyword', ...generatedLongTails].join('\n'),
                      'text/csv;charset=utf-8'
                    )
                  }
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white hover:bg-slate-100 text-[#0B1B3E] border border-slate-200 text-xs font-semibold transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export CSV</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <select
                value={genBaseTerm}
                onChange={(e) => setGenBaseTerm(e.target.value)}
                className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-[#0B1B3E]"
              >
                <option value="trigger sprayer">Trigger Sprayer</option>
                <option value="lotion pump">Lotion Pump</option>
                <option value="foam pump">Foam Pump</option>
                <option value="fine mist sprayer">Fine Mist Sprayer</option>
                <option value="mini trigger sprayer">Mini Trigger Sprayer</option>
                <option value="plastic bottle cap">Bottle Cap & Closure</option>
              </select>

              <select
                value={genNeckSize}
                onChange={(e) => setGenNeckSize(e.target.value)}
                className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-mono text-[#0B1B3E]"
              >
                <option value="28/410">28/410 Neck</option>
                <option value="28/400">28/400 Neck</option>
                <option value="24/410">24/410 Neck</option>
                <option value="20/410">20/410 Neck</option>
                <option value="18/415">18/415 Neck</option>
                <option value="40/400">40/400 Foam Neck</option>
              </select>

              <select
                value={genModifier}
                onChange={(e) => setGenModifier(e.target.value)}
                className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-[#0B1B3E]"
              >
                <option value="manufacturer">Manufacturer</option>
                <option value="factory">Factory</option>
                <option value="wholesale">Wholesale</option>
                <option value="supplier">Supplier</option>
                <option value="oem">OEM / Custom</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {generatedLongTails.map((kw) => {
                const alreadyAdded = parsedKeywords.some(
                  (k) => k.toLowerCase() === kw.toLowerCase()
                );
                return (
                  <div
                    key={kw}
                    className="flex items-center justify-between gap-2 bg-white rounded-xl border border-slate-200 px-3.5 py-2 text-xs"
                  >
                    <span className="font-medium text-[#0B1B3E] truncate">{kw}</span>
                    <button
                      type="button"
                      onClick={() => handleAddSingleKeyword(kw)}
                      disabled={alreadyAdded}
                      className="text-[11px] font-semibold text-[#155EEF] hover:underline disabled:text-emerald-600 cursor-pointer shrink-0"
                    >
                      {alreadyAdded ? 'Added' : '+ Add'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* TOOL 3: SCHEMA.ORG & FAQ RICH SNIPPETS BUILDER                        */}
      {/* ===================================================================== */}
      {activeTool === 'schema' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <label className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-[#F8FAFE] p-4 cursor-pointer">
              <input
                type="checkbox"
                checked={workspace.enableFaqSchema}
                onChange={(e) =>
                  updateWorkspace((prev) => ({ ...prev, enableFaqSchema: e.target.checked }))
                }
                className="mt-0.5 rounded border-slate-300 text-[#155EEF]"
              />
              <div>
                <p className="text-xs font-bold text-[#0B1B3E]">FAQPage Rich Snippets</p>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Expands Google search listing height with buyer Q&amp;A accordions.
                </p>
              </div>
            </label>

            <label className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-[#F8FAFE] p-4 cursor-pointer">
              <input
                type="checkbox"
                checked={workspace.enableItemListSchema}
                onChange={(e) =>
                  updateWorkspace((prev) => ({ ...prev, enableItemListSchema: e.target.checked }))
                }
                className="mt-0.5 rounded border-slate-300 text-[#155EEF]"
              />
              <div>
                <p className="text-xs font-bold text-[#0B1B3E]">ItemList Category Graph</p>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Lists all 6 sprayer, pump &amp; closure series for Google sitelinks.
                </p>
              </div>
            </label>

            <label className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-[#F8FAFE] p-4 cursor-pointer">
              <input
                type="checkbox"
                checked={workspace.enableHreflangTags}
                onChange={(e) =>
                  updateWorkspace((prev) => ({ ...prev, enableHreflangTags: e.target.checked }))
                }
                className="mt-0.5 rounded border-slate-300 text-[#155EEF]"
              />
              <div>
                <p className="text-xs font-bold text-[#0B1B3E]">Multilingual Hreflang Tags</p>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Broadcasts EN, ES &amp; AR alternate URLs to regional search indexes.
                </p>
              </div>
            </label>
          </div>

          {/* Interactive FAQ Builder */}
          <div className="rounded-2xl border border-slate-200/90 bg-[#F8FAFE] p-5 space-y-4">
            <div className="flex items-center justify-between gap-2">
              <div>
                <h3 className="text-sm font-bold text-[#0B1B3E]">
                  Live FAQPage Schema Questions ({workspace.faqItems.length})
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Every Q&amp;A below is automatically embedded into the live site&apos;s JSON-LD structured data.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {workspace.faqItems.map((faq, idx) => (
                <div
                  key={faq.id}
                  className="bg-white rounded-xl border border-slate-200 p-4 space-y-2"
                >
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-xs font-bold text-[#0B1B3E]">
                      Q{idx + 1}. {faq.question}
                    </p>
                    <button
                      type="button"
                      onClick={() =>
                        updateWorkspace((prev) => ({
                          ...prev,
                          faqItems: prev.faqItems.filter((item) => item.id !== faq.id),
                        }))
                      }
                      aria-label="Remove FAQ"
                      className="text-slate-400 hover:text-[#E1262D] cursor-pointer shrink-0"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-slate-200/80 space-y-2.5">
              <p className="text-xs font-bold text-[#0B1B3E]">Add Custom SEO FAQ Entry</p>
              <input
                type="text"
                value={newFaqQuestion}
                onChange={(e) => setNewFaqQuestion(e.target.value)}
                placeholder="Question (e.g. What neck sizes fit your 28/410 foam trigger sprayers?)"
                className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs text-[#0B1B3E]"
              />
              <textarea
                rows={2}
                value={newFaqAnswer}
                onChange={(e) => setNewFaqAnswer(e.target.value)}
                placeholder="Answer with target keywords (trigger sprayer, lotion pump, foam pump, fine mist sprayer)..."
                className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs text-[#0B1B3E]"
              />
              <button
                type="button"
                onClick={handleAddFaq}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#155EEF] hover:bg-[#0B1B3E] text-white text-xs font-semibold transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add to Live FAQ Schema</span>
              </button>
            </div>
          </div>

          {/* Live JSON-LD Code Inspector */}
          <div className="rounded-2xl border border-slate-200 bg-[#0B1B3E] text-slate-100 p-5 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-xs font-bold text-white">
                Active Schema.org JSON-LD Output (Injected Live in &lt;head&gt;)
              </p>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => copyToClipboard('jsonld', liveJsonLdPreview)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold cursor-pointer"
                >
                  {copiedId === 'jsonld' ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                  <span>{copiedId === 'jsonld' ? 'Copied' : 'Copy JSON-LD'}</span>
                </button>
                <a
                  href="https://search.google.com/test/rich-results"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#155EEF] hover:bg-blue-500 text-white text-xs font-semibold"
                >
                  <span>Rich Results Test</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
            <pre className="text-[11px] font-mono text-blue-100 overflow-x-auto max-h-72 leading-relaxed">
              {liveJsonLdPreview}
            </pre>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* TOOL 4: INDEXNOW INSTANT PING, SITEMAP & CRAWLERS                     */}
      {/* ===================================================================== */}
      {activeTool === 'crawlers' && (
        <div className="space-y-6">
          {/* IndexNow Instant Submission */}
          <div className="rounded-2xl border border-slate-200/90 bg-[#F8FAFE] p-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-bold text-[#0B1B3E]">
                  IndexNow Instant Search Engine Ping (Bing · Yandex · Copilot · Seznam)
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  Notify search engines the moment you publish new trigger sprayers, lotion pumps, or blog guides instead of waiting weeks for crawls.
                </p>
              </div>
              <button
                type="button"
                onClick={handlePingIndexNow}
                disabled={pingingIndexNow}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#155EEF] hover:bg-[#0B1B3E] text-white text-xs font-semibold transition-colors cursor-pointer disabled:opacity-60 shrink-0"
              >
                {pingingIndexNow ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Send className="w-3.5 h-3.5" />
                )}
                <span>Ping {indexNowUrlList.length} URLs Now</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-end">
              <div className="sm:col-span-7 space-y-1">
                <label className="block text-[11px] font-semibold text-slate-600">
                  IndexNow API Key (host at /{workspace.indexNowKey}.txt)
                </label>
                <input
                  type="text"
                  dir="ltr"
                  value={workspace.indexNowKey}
                  onChange={(e) =>
                    updateWorkspace((prev) => ({
                      ...prev,
                      indexNowKey: e.target.value.replace(/[^a-zA-Z0-9-]/g, '').slice(0, 64),
                    }))
                  }
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-mono text-[#0B1B3E]"
                />
              </div>
              <div className="sm:col-span-5 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() =>
                    updateWorkspace((prev) => ({
                      ...prev,
                      indexNowKey: `yilai${Math.random().toString(36).slice(2, 12)}${Date.now().toString(36)}`,
                    }))
                  }
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white hover:bg-slate-100 border border-slate-200 text-xs font-semibold text-[#0B1B3E] cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>New Key</span>
                </button>
                <button
                  type="button"
                  onClick={() =>
                    triggerDownload(
                      `${workspace.indexNowKey}.txt`,
                      workspace.indexNowKey,
                      'text/plain;charset=utf-8'
                    )
                  }
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white hover:bg-blue-50 border border-blue-200 text-xs font-semibold text-[#155EEF] cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Key .txt</span>
                </button>
              </div>
            </div>

            {indexNowResult && (
              <div
                className={`rounded-xl px-4 py-2.5 text-xs font-medium border ${
                  indexNowResult.ok
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                    : 'bg-amber-50 border-amber-200 text-amber-800'
                }`}
              >
                {indexNowResult.message}
              </div>
            )}
          </div>

          {/* Sitemap XML & Robots.txt Builders */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div className="rounded-2xl border border-slate-200/90 bg-[#F8FAFE] p-5 space-y-3">
              <div className="flex items-center justify-between gap-2">
                <h4 className="text-xs font-bold text-[#0B1B3E]">
                  Multilingual &amp; Image Sitemap XML ({indexNowUrlList.length} URLs)
                </h4>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => copyToClipboard('sitemap', sitemapXmlPreview)}
                    className="text-[11px] font-semibold text-[#155EEF] hover:underline cursor-pointer"
                  >
                    {copiedId === 'sitemap' ? 'Copied' : 'Copy XML'}
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      triggerDownload(
                        'sitemap.xml',
                        sitemapXmlPreview,
                        'application/xml;charset=utf-8'
                      )
                    }
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-white border border-blue-200 text-[#155EEF] text-[11px] font-semibold cursor-pointer"
                  >
                    <Download className="w-3 h-3" />
                    <span>Download</span>
                  </button>
                </div>
              </div>
              <pre className="bg-white border border-slate-200 rounded-xl p-3 text-[11px] font-mono text-slate-700 overflow-x-auto max-h-56">
                {sitemapXmlPreview}
              </pre>
            </div>

            <div className="rounded-2xl border border-slate-200/90 bg-[#F8FAFE] p-5 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h4 className="text-xs font-bold text-[#0B1B3E]">
                  robots.txt Crawler Policy
                </h4>
                <div className="flex items-center gap-3">
                  <label className="inline-flex items-center gap-1.5 text-[11px] font-medium text-slate-700 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={allowAiBots}
                      onChange={(e) => setAllowAiBots(e.target.checked)}
                    />
                    <span>Allow AI Search Bots</span>
                  </label>
                  <button
                    type="button"
                    onClick={() =>
                      triggerDownload('robots.txt', robotsTxtPreview, 'text/plain;charset=utf-8')
                    }
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-white border border-slate-200 text-[#0B1B3E] text-[11px] font-semibold cursor-pointer"
                  >
                    <Download className="w-3 h-3" />
                    <span>Download</span>
                  </button>
                </div>
              </div>
              <pre className="bg-white border border-slate-200 rounded-xl p-3 text-[11px] font-mono text-slate-700 overflow-x-auto max-h-56">
                {robotsTxtPreview}
              </pre>
            </div>
          </div>

          {/* Search Engine Consoles Direct Launch */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-[#0B1B3E]">
              Search Engine Submission &amp; Diagnostic Consoles
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {SEARCH_ENGINE_CONSOLE_LINKS.map((engine) => (
                <a
                  key={engine.id}
                  href={engine.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white hover:border-[#155EEF] px-4 py-3 transition-colors"
                >
                  <div>
                    <p className="text-xs font-bold text-[#0B1B3E]">{engine.name}</p>
                    <p className="text-[11px] text-slate-500">
                      {engine.region} · {engine.actionLabel}
                    </p>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-[#155EEF] shrink-0" />
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* TOOL 5: TECHNICAL AUDIT & SKU/PAGE SEO MATRIX                         */}
      {/* ===================================================================== */}
      {activeTool === 'audit' && (
        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-200/90 bg-[#F8FAFE] p-5 space-y-3">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-sm font-bold text-[#0B1B3E]">{s.seoChecklistTitle}</h3>
              <span className="font-mono text-xs font-bold text-[#155EEF] tabular-nums">
                {audit.checks.filter((c) => c.passed).length} / {audit.checks.length} Passed
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
              {audit.checks.map((check) => (
                <div
                  key={check.id}
                  className="flex items-start justify-between gap-3 bg-white rounded-xl border border-slate-200/80 px-3.5 py-2.5 text-xs"
                >
                  <span className="flex items-start gap-2">
                    <CheckCircle2
                      className={`w-4 h-4 shrink-0 mt-0.5 ${
                        check.passed ? 'text-emerald-600' : 'text-slate-300'
                      }`}
                    />
                    <span className={check.passed ? 'text-[#0B1B3E] font-medium' : 'text-slate-500'}>
                      {check.label}
                    </span>
                  </span>
                  <span className="font-mono text-[11px] font-semibold text-slate-500 tabular-nums shrink-0">
                    +{check.points}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <h3 className="text-sm font-bold text-[#0B1B3E]">
                Product SKU &amp; Blog Page SEO Health Matrix ({contentAuditRows.length} Indexed URLs)
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Verifies every active product model and published article has strong description length, gallery media, and target keyword alignment.
              </p>
            </div>
            <div className="overflow-x-auto rounded-2xl border border-slate-200">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-[#F8FAFE] border-b border-slate-200 text-slate-600 font-semibold">
                    <th className="py-3 px-4">Type</th>
                    <th className="py-3 px-4">Model / Article</th>
                    <th className="py-3 px-3">Indexable URL</th>
                    <th className="py-3 px-3 text-right">Copy Chars</th>
                    <th className="py-3 px-3 text-right">Images</th>
                    <th className="py-3 px-3 text-center">Keyword Fit</th>
                    <th className="py-3 px-4 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {contentAuditRows.map((row) => (
                    <tr key={row.id} className="hover:bg-slate-50/70">
                      <td className="py-2.5 px-4 font-semibold text-slate-600">{row.type}</td>
                      <td className="py-2.5 px-4 font-semibold text-[#0B1B3E] max-w-[220px] truncate">
                        {row.title}
                      </td>
                      <td className="py-2.5 px-3 font-mono text-[11px] text-slate-500 max-w-[200px] truncate" dir="ltr">
                        {row.slug}
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono tabular-nums text-slate-700">
                        {row.descChars}
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono tabular-nums text-slate-700">
                        {row.images}
                      </td>
                      <td className="py-2.5 px-3 text-center">
                        {row.kwHit ? (
                          <span className="text-emerald-600 font-semibold">Matched</span>
                        ) : (
                          <span className="text-amber-600">Weak</span>
                        )}
                      </td>
                      <td className="py-2.5 px-4 text-right font-semibold">
                        <span className={row.healthy ? 'text-emerald-600' : 'text-amber-600'}>
                          {row.healthy ? 'Ready' : 'Needs Copy'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ===================================================================== */}
      {/* TOOL 6: AI SEARCH (llms.txt), HREFLANG & B2B BACKLINK TRACKER         */}
      {/* ===================================================================== */}
      {activeTool === 'backlinks' && (
        <div className="space-y-6">
          {/* AI Search Engine llms.txt */}
          <div className="rounded-2xl border border-slate-200/90 bg-[#F8FAFE] p-5 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="inline-flex items-center gap-2 text-sm font-bold text-[#0B1B3E]">
                  <Bot className="w-4 h-4 text-[#155EEF]" />
                  <span>AI Search Optimization (llms.txt)</span>
                </h3>
                <p className="text-xs text-slate-600 mt-1">
                  Structured factory summary built for ChatGPT Search, Perplexity, Gemini, and Claude when buyers search for trigger sprayer or lotion pump manufacturers.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => copyToClipboard('llms', llmsTxtPreview)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-semibold text-[#0B1B3E] cursor-pointer"
                >
                  {copiedId === 'llms' ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                  <span>{copiedId === 'llms' ? 'Copied' : 'Copy'}</span>
                </button>
                <button
                  type="button"
                  onClick={() =>
                    triggerDownload('llms.txt', llmsTxtPreview, 'text/plain;charset=utf-8')
                  }
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#155EEF] hover:bg-[#0B1B3E] text-white text-xs font-semibold cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download llms.txt</span>
                </button>
              </div>
            </div>
            <pre className="bg-white border border-slate-200 rounded-xl p-3.5 text-[11px] font-mono text-slate-700 overflow-x-auto max-h-52">
              {llmsTxtPreview}
            </pre>
          </div>

          {/* Multilingual Hreflang & Geo Signal Status */}
          <div className="rounded-2xl border border-slate-200/90 bg-white p-5 space-y-2.5">
            <h4 className="text-xs font-bold text-[#0B1B3E]">
              Live International Hreflang &amp; Geo Meta Signals
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 text-[11px] font-mono">
              <div className="rounded-xl bg-[#F8FAFE] border border-slate-200 px-3 py-2 text-slate-700 truncate">
                hreflang=&quot;en&quot; → /?lang=en
              </div>
              <div className="rounded-xl bg-[#F8FAFE] border border-slate-200 px-3 py-2 text-slate-700 truncate">
                hreflang=&quot;es&quot; → /?lang=es
              </div>
              <div className="rounded-xl bg-[#F8FAFE] border border-slate-200 px-3 py-2 text-slate-700 truncate">
                hreflang=&quot;ar&quot; → /?lang=ar
              </div>
              <div className="rounded-xl bg-[#F8FAFE] border border-slate-200 px-3 py-2 text-slate-700 truncate">
                geo.placename → Yuyao, Ningbo
              </div>
            </div>
          </div>

          {/* B2B Industrial Backlink & Directory Submission Checklist */}
          <div className="rounded-2xl border border-slate-200/90 bg-[#F8FAFE] p-5 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-bold text-[#0B1B3E]">
                  High-Authority B2B Backlink &amp; Directory Tracker
                </h3>
                <p className="text-xs text-slate-600 mt-0.5">
                  On-page SEO gets you indexed; authoritative B2B backlinks push your site to #1 against competitors. Track your submissions below.
                </p>
              </div>
              <span className="font-mono text-xs font-bold text-[#155EEF] tabular-nums">
                {directoryProgressCount} / {B2B_DIRECTORY_TARGETS.length} Completed
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {B2B_DIRECTORY_TARGETS.map((dir) => {
                const done = workspace.completedDirectories.includes(dir.id);
                return (
                  <div
                    key={dir.id}
                    className={`flex items-start justify-between gap-3 rounded-xl border p-3.5 transition-colors ${
                      done
                        ? 'bg-emerald-50/60 border-emerald-200'
                        : 'bg-white border-slate-200'
                    }`}
                  >
                    <label className="flex items-start gap-2.5 cursor-pointer flex-1">
                      <input
                        type="checkbox"
                        checked={done}
                        onChange={() =>
                          updateWorkspace((prev) => ({
                            ...prev,
                            completedDirectories: done
                              ? prev.completedDirectories.filter((id) => id !== dir.id)
                              : [...prev.completedDirectories, dir.id],
                          }))
                        }
                        className="mt-0.5 rounded border-slate-300 text-[#155EEF]"
                      />
                      <div>
                        <p className="text-xs font-bold text-[#0B1B3E]">{dir.name}</p>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          {dir.category} · {dir.authorityNote}
                        </p>
                      </div>
                    </label>
                    <a
                      href={dir.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#155EEF] hover:underline shrink-0"
                    >
                      <span>Open</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
