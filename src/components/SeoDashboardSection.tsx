import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import {
  AlertCircle,
  CheckCircle2,
  Download,
  ExternalLink,
  Globe,
  Loader2,
  Search,
  Sparkles,
  Upload,
} from 'lucide-react';
import { LanguageCode } from '../data/factoryData';
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

  const checks: SeoAuditCheck[] = [
    {
      id: 'title-range',
      label: `Meta Title length (${titleLen}/60 chars, ideal 30–60)`,
      passed: titleLen >= 30 && titleLen <= 65,
      points: 18,
    },
    {
      id: 'desc-range',
      label: `Meta Description length (${descLen}/160 chars, ideal 120–160)`,
      passed: descLen >= 110 && descLen <= 170,
      points: 18,
    },
    {
      id: 'keywords',
      label: `Search Engine Keywords (${seo.keywords.length} configured)`,
      passed: seo.keywords.length >= 5,
      points: 14,
    },
    {
      id: 'robots',
      label: 'Search Indexing Enabled (index, follow + XML Sitemap)',
      passed: seo.robotsIndex,
      points: 12,
    },
    {
      id: 'og-card',
      label: 'OpenGraph & X Card Social Preview Configured',
      passed: Boolean((seo.ogTitle || seo.siteTitle).trim()) && Boolean(seo.ogImage.trim()),
      points: 10,
    },
    {
      id: 'schema-org',
      label: 'Schema.org JSON-LD (Organization, Product, Article)',
      passed: true,
      points: 10,
    },
    {
      id: 'content-freshness',
      label: `Indexed Content (${activeProductsCount} active products, ${publishedPostsCount} blog posts)`,
      passed: activeProductsCount > 0 && publishedPostsCount > 0,
      points: 10,
    },
    {
      id: 'social-authority',
      label: `Social Authority Signals (${countSocialLinks(socialLinks)} linked profiles)`,
      passed: countSocialLinks(socialLinks) > 0,
      points: 4,
    },
    {
      id: 'webmaster',
      label: `Search Engine Webmaster Verification (${verificationsCount}/4 engines)`,
      passed: verificationsCount > 0,
      points: 4,
    },
  ];

  const score = checks.reduce((acc, item) => acc + (item.passed ? item.points : 0), 0);
  return { score: Math.min(100, score), checks };
}

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

  const [form, setForm] = useState<SeoSettings>(seoSettings);
  const [keywordsText, setKeywordsText] = useState(seoSettings.keywords.join(', '));
  const [saving, setSaving] = useState(false);
  const [uploadingOg, setUploadingOg] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  useEffect(() => {
    setForm(seoSettings);
    setKeywordsText(seoSettings.keywords.join(', '));
  }, [seoSettings]);

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
  const previewUrl =
    form.canonicalUrl.trim() ||
    (typeof window !== 'undefined' ? window.location.origin : 'https://yilaiplastics.com');

  const handleApplyRecommended = () => {
    setForm(RECOMMENDED_SEO_SETTINGS);
    setKeywordsText(RECOMMENDED_SEO_SETTINGS.keywords.join(', '));
    onFeedback(null);
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

  const handleDownloadSitemap = () => {
    const base = previewUrl.replace(/\/+$/, '');
    const today = new Date().toISOString().slice(0, 10);
    const urls = [
      { loc: `${base}/`, priority: '1.0', freq: 'weekly' },
      { loc: `${base}/?page=products`, priority: '0.9', freq: 'weekly' },
      { loc: `${base}/?page=blog`, priority: '0.8', freq: 'weekly' },
      ...activeProducts.map((p) => ({
        loc: `${base}/?page=products&product=${encodeURIComponent(p.slug)}`,
        priority: '0.8',
        freq: 'monthly',
      })),
      ...publishedPosts.map((post) => ({
        loc: `${base}/?page=blog&post=${encodeURIComponent(post.slug)}`,
        priority: '0.7',
        freq: 'monthly',
      })),
    ];

    const xml = [
      '<?xml version="1.0" encoding="UTF-8"?>',
      '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
      ...urls.map(
        (u) =>
          `  <url>\n    <loc>${u.loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${u.freq}</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`
      ),
      '</urlset>',
    ].join('\n');

    triggerDownload('sitemap.xml', xml, 'application/xml;charset=utf-8');
  };

  const handleDownloadRobots = () => {
    const base = previewUrl.replace(/\/+$/, '');
    const content = [
      'User-agent: *',
      form.robotsIndex ? 'Allow: /' : 'Disallow: /',
      '',
      'User-agent: Googlebot',
      form.robotsIndex ? 'Allow: /' : 'Disallow: /',
      '',
      'User-agent: Bingbot',
      form.robotsIndex ? 'Allow: /' : 'Disallow: /',
      '',
      'User-agent: DuckDuckBot',
      form.robotsIndex ? 'Allow: /' : 'Disallow: /',
      '',
      'User-agent: Yandex',
      form.robotsIndex ? 'Allow: /' : 'Disallow: /',
      '',
      'User-agent: Baiduspider',
      form.robotsIndex ? 'Allow: /' : 'Disallow: /',
      '',
      `Sitemap: ${base}/sitemap.xml`,
    ].join('\n');

    triggerDownload('robots.txt', content, 'text/plain;charset=utf-8');
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-7">
      {/* Header + SEO Score */}
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
            className={`inline-flex items-center gap-2.5 px-4 py-2 rounded-2xl border ${
              audit.score >= 85
                ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                : audit.score >= 60
                ? 'bg-blue-50 border-blue-200 text-[#155EEF]'
                : 'bg-amber-50 border-amber-200 text-amber-800'
            }`}
          >
            <Globe className="w-4 h-4 shrink-0" />
            <span className="text-xs font-semibold">{s.seoScoreLabel}:</span>
            <span className="font-mono font-extrabold text-base tabular-nums">
              {audit.score}%
            </span>
          </div>

          <button
            type="button"
            onClick={handleApplyRecommended}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#F6F9FE] hover:bg-blue-50 text-[#155EEF] border border-blue-200/80 text-xs font-semibold transition-colors cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{s.seoApplyRecommendedBtn}</span>
          </button>
        </div>
      </div>

      {/* Live Search Engine Snippet Preview */}
      <div className="rounded-2xl border border-slate-200/90 bg-[#F8FAFE] p-5 space-y-3">
        <div className="flex items-center justify-between gap-3">
          <p className="inline-flex items-center gap-2 text-xs font-bold text-[#0B1B3E]">
            <Search className="w-3.5 h-3.5 text-[#155EEF]" />
            <span>{s.seoSerpPreviewTitle}</span>
          </p>
          <span className="font-mono text-[11px] text-slate-500">
            Google · Bing · DuckDuckGo · Yandex
          </span>
        </div>

        <div className="bg-white rounded-xl border border-slate-200/80 p-4 sm:p-5 space-y-1.5">
          <p className="text-xs font-mono text-emerald-700 truncate" dir="ltr">
            {previewUrl}
          </p>
          <h3 className="text-lg sm:text-xl font-semibold text-[#1a0dab] leading-snug line-clamp-1">
            {form.siteTitle || 'Yi Lai Plastics — Trigger Sprayers & Lotion Pumps'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-2">
            {form.metaDescription ||
              'Custom trigger sprayers, lotion pumps, fine mist atomizers, and bottle closures.'}
          </p>
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

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#0B1B3E]">
                {s.seoFieldKeywords}
              </label>
              <textarea
                rows={2}
                value={keywordsText}
                onChange={(e) => setKeywordsText(e.target.value)}
                placeholder="trigger sprayer manufacturer, lotion pump supplier, 28/410 sprayer..."
                className="w-full rounded-xl border border-slate-200 bg-[#F8FAFE] px-3.5 py-2.5 text-sm text-[#0B1B3E] focus:outline-none focus:border-[#155EEF] focus:bg-white"
              />
              <p className="text-[11px] text-slate-500">
                {s.seoFieldKeywordsHint} ({parsedKeywords.length}/30)
              </p>
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

          {/* Right Column: Search Engine Verification, Audit Checklist, Sitemap Tools */}
          <div className="lg:col-span-5 space-y-5">
            {/* Webmaster Verification Codes */}
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

            {/* All-Search-Engine Audit Checklist */}
            <div className="rounded-2xl border border-slate-200/90 bg-[#F8FAFE] p-4 sm:p-5 space-y-3">
              <h3 className="text-xs font-bold text-[#0B1B3E]">{s.seoChecklistTitle}</h3>
              <ul className="space-y-2">
                {audit.checks.map((check) => (
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

            {/* Live Sitemap & Robots Export */}
            <div className="rounded-2xl border border-slate-200/90 bg-[#F8FAFE] p-4 sm:p-5 space-y-3">
              <h3 className="text-xs font-bold text-[#0B1B3E]">{s.seoSitemapHeading}</h3>
              <div className="flex flex-wrap gap-2.5">
                <button
                  type="button"
                  onClick={handleDownloadSitemap}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white hover:bg-blue-50 text-[#155EEF] border border-blue-200 text-xs font-semibold transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{s.seoDownloadSitemapBtn}</span>
                </button>
                <button
                  type="button"
                  onClick={handleDownloadRobots}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white hover:bg-slate-100 text-[#0B1B3E] border border-slate-200 text-xs font-semibold transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{s.seoDownloadRobotsBtn}</span>
                </button>
                <a
                  href="https://search.google.com/search-console"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-semibold transition-colors"
                >
                  <span>Search Console</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
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
  );
}
