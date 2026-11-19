import { BlogPost } from './blogData';
import { PRODUCT_CATEGORIES } from './factoryData';
import { CmsProductRecord, SeoSettings } from '../services/cmsService';

export interface SeoFaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface SeoProWorkspace {
  faqItems: SeoFaqItem[];
  indexNowKey: string;
  completedDirectories: string[];
  trackedKeywords: string[];
  enableFaqSchema: boolean;
  enableItemListSchema: boolean;
  enableHreflangTags: boolean;
}

export const CORE_KEYWORD_PILLARS: ReadonlyArray<{
  id: string;
  label: string;
  primaryKeyword: string;
  pack: string[];
}> = [
  {
    id: 'trigger-sprayer',
    label: 'Trigger Sprayers',
    primaryKeyword: 'trigger sprayer',
    pack: [
      'trigger sprayer',
      'trigger sprayer manufacturer',
      '28/410 trigger sprayer',
      'heavy duty trigger sprayer China',
      'chemical resistant trigger sprayer',
      'mini trigger sprayer wholesale',
    ],
  },
  {
    id: 'lotion-pump',
    label: 'Lotion Pumps',
    primaryKeyword: 'lotion pump',
    pack: [
      'lotion pump',
      'lotion pump manufacturer',
      '24/410 lotion pump',
      '28/410 shampoo lotion pump',
      'lock-down lotion pump supplier',
      'cosmetic dispenser pump factory',
    ],
  },
  {
    id: 'foam-pump',
    label: 'Foam Pumps',
    primaryKeyword: 'foam pump',
    pack: [
      'foam pump',
      'foam pump manufacturer',
      'foam trigger sprayer',
      'foaming soap dispenser pump',
      '40mm foam pump wholesale',
      'car wash foam trigger OEM',
    ],
  },
  {
    id: 'fine-mist',
    label: 'Fine Mist Sprayers',
    primaryKeyword: 'fine mist sprayer',
    pack: [
      'fine mist sprayer',
      'fine mist sprayer manufacturer',
      '20/410 fine mist atomizer',
      '18/415 perfume mist sprayer',
      'cosmetic fine mist pump factory',
      'pocket mist sprayer supplier',
    ],
  },
];

export const DEFAULT_SEO_FAQS: SeoFaqItem[] = [
  {
    id: 'faq-moq-leadtime',
    question: 'What is the MOQ and production lead time for trigger sprayers, lotion pumps, foam pumps, and fine mist sprayers?',
    answer:
      'Yi Lai Plastics standard MOQ is 10,000 pcs per SKU (20,000 pcs for select mini triggers and closures), with 15 to 22 day factory production lead times from Yuyao, Ningbo and direct FOB Ningbo container consolidation.',
  },
  {
    id: 'faq-neck-sizes',
    question: 'Which SPI bottle neck finishes are supported across your sprayers and lotion pumps?',
    answer:
      'We manufacture in-house moulds for 18/410, 18/415, 20/410, 24/410, 28/400, 28/410, and 40/400 SPI neck finishes, with custom angle-cut LDPE dip tubes matched to your exact bottle height within ±1.0 mm.',
  },
  {
    id: 'faq-springs-chemical',
    question: 'Do you offer 316 stainless steel or metal-free springs for bleach and acidic cleaners?',
    answer:
      'Yes. Standard household cleaners use external 304 stainless steel springs, while sodium hypochlorite bleach, bathroom descalers, and alkaline degreasers can be built with 316 marine-grade stainless steel springs or all-plastic metal-free valves.',
  },
  {
    id: 'faq-pantone-samples',
    question: 'Can we order custom Pantone colors and free test samples before bulk production?',
    answer:
      'Yes. Our Yuyao colour room matches any Pantone solid coated code across PP shrouds, triggers, lotion pump collars, and bottle caps, and we ship a free 50-piece technical sample kit for leak and compatibility testing.',
  },
];

export const SEARCH_ENGINE_CONSOLE_LINKS: ReadonlyArray<{
  id: string;
  name: string;
  region: string;
  url: string;
  actionLabel: string;
}> = [
  {
    id: 'google',
    name: 'Google Search Console',
    region: 'Global #1',
    url: 'https://search.google.com/search-console',
    actionLabel: 'Submit Sitemap',
  },
  {
    id: 'bing',
    name: 'Bing & Yahoo Webmaster',
    region: 'Global + Copilot',
    url: 'https://www.bing.com/webmasters',
    actionLabel: 'Import / IndexNow',
  },
  {
    id: 'yandex',
    name: 'Yandex Webmaster',
    region: 'CIS / Eastern Europe',
    url: 'https://webmaster.yandex.com/',
    actionLabel: 'Verify & Crawl',
  },
  {
    id: 'baidu',
    name: 'Baidu Ziyuan Search',
    region: 'China Domestic',
    url: 'https://ziyuan.baidu.com/',
    actionLabel: 'Submit URLs',
  },
  {
    id: 'google-rich',
    name: 'Google Rich Results Test',
    region: 'Schema Validator',
    url: 'https://search.google.com/test/rich-results',
    actionLabel: 'Test JSON-LD',
  },
  {
    id: 'pagespeed',
    name: 'PageSpeed Insights',
    region: 'Core Web Vitals',
    url: 'https://pagespeed.web.dev/',
    actionLabel: 'Audit Speed',
  },
];

export const B2B_DIRECTORY_TARGETS: ReadonlyArray<{
  id: string;
  name: string;
  category: string;
  authorityNote: string;
  url: string;
}> = [
  {
    id: 'gbp',
    name: 'Google Business Profile',
    category: 'Local & Map Pack',
    authorityNote: 'Factory address in Yuyao, Ningbo + product photos',
    url: 'https://business.google.com/',
  },
  {
    id: 'bing-places',
    name: 'Bing Places for Business',
    category: 'Bing & Edge Search',
    authorityNote: 'Syncs manufacturing NAP & catalog URLs',
    url: 'https://www.bingplaces.com/',
  },
  {
    id: 'linkedin-company',
    name: 'LinkedIn Company Page',
    category: 'B2B Authority Signal',
    authorityNote: 'Builds brand entity & Schema.org sameAs trust',
    url: 'https://www.linkedin.com/company/setup/new/',
  },
  {
    id: 'alibaba-store',
    name: 'Alibaba Gold Supplier Profile',
    category: 'B2B Packaging Buyer Intent',
    authorityNote: 'Link official domain for high-intent referral traffic',
    url: 'https://www.alibaba.com/',
  },
  {
    id: 'made-in-china',
    name: 'Made-in-China.com Factory',
    category: 'China Export Directory',
    authorityNote: 'Targets trigger sprayer & lotion pump importers',
    url: 'https://www.made-in-china.com/',
  },
  {
    id: 'europages',
    name: 'Europages B2B Directory',
    category: 'European Importers',
    authorityNote: 'High-DA backlink for EU/UK packaging buyers',
    url: 'https://www.europages.com/',
  },
  {
    id: 'kompass',
    name: 'Kompass Industrial Index',
    category: 'Global B2B Classification',
    authorityNote: 'Multilingual manufacturer listing (EN/ES/AR)',
    url: 'https://www.kompass.com/',
  },
  {
    id: 'youtube-demos',
    name: 'YouTube Factory & Spray Demos',
    category: 'Video Search & Google Carousel',
    authorityNote: 'Embed 60° spray test & moulding line videos',
    url: 'https://studio.youtube.com/',
  },
];

const SEO_WORKSPACE_STORAGE_KEY = 'yilai_seo_pro_workspace_v1';

export const DEFAULT_SEO_WORKSPACE: SeoProWorkspace = {
  faqItems: DEFAULT_SEO_FAQS,
  indexNowKey: 'yilai8899triggerlotionfoamfinemist2026',
  completedDirectories: [],
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
  enableFaqSchema: true,
  enableItemListSchema: true,
  enableHreflangTags: true,
};

export function loadSeoWorkspace(): SeoProWorkspace {
  if (typeof window === 'undefined') return DEFAULT_SEO_WORKSPACE;
  try {
    const raw = window.localStorage.getItem(SEO_WORKSPACE_STORAGE_KEY);
    if (!raw) return DEFAULT_SEO_WORKSPACE;
    const parsed = JSON.parse(raw) as Partial<SeoProWorkspace>;
    return {
      faqItems:
        Array.isArray(parsed.faqItems) && parsed.faqItems.length > 0
          ? parsed.faqItems
          : DEFAULT_SEO_FAQS,
      indexNowKey:
        typeof parsed.indexNowKey === 'string' && parsed.indexNowKey.trim().length >= 8
          ? parsed.indexNowKey.trim()
          : DEFAULT_SEO_WORKSPACE.indexNowKey,
      completedDirectories: Array.isArray(parsed.completedDirectories)
        ? parsed.completedDirectories
        : [],
      trackedKeywords:
        Array.isArray(parsed.trackedKeywords) && parsed.trackedKeywords.length > 0
          ? parsed.trackedKeywords
          : DEFAULT_SEO_WORKSPACE.trackedKeywords,
      enableFaqSchema: parsed.enableFaqSchema !== false,
      enableItemListSchema: parsed.enableItemListSchema !== false,
      enableHreflangTags: parsed.enableHreflangTags !== false,
    };
  } catch {
    return DEFAULT_SEO_WORKSPACE;
  }
}

export function saveSeoWorkspace(workspace: SeoProWorkspace): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(SEO_WORKSPACE_STORAGE_KEY, JSON.stringify(workspace));
    window.dispatchEvent(new Event('yilai-seo-workspace-updated'));
  } catch {
    // Ignore storage quota errors
  }
}

export function estimateTitlePixels(text: string): number {
  let px = 0;
  for (const ch of text) {
    if (/[A-ZWM@]/.test(ch)) px += 11.5;
    else if (/[ilI.,|!:'" ]/.test(ch)) px += 4.5;
    else px += 8.6;
  }
  return Math.round(px);
}

export function estimateDescPixels(text: string): number {
  let px = 0;
  for (const ch of text) {
    if (/[A-ZWM]/.test(ch)) px += 8.2;
    else if (/[ilI.,|!:'" ]/.test(ch)) px += 3.5;
    else px += 6.2;
  }
  return Math.round(px);
}

export function generateLongTailKeywords(
  baseTerm: string,
  neckSize: string,
  modifier: string
): string[] {
  const cleanBase = baseTerm.trim().toLowerCase();
  const cleanNeck = neckSize.trim();
  const cleanMod = modifier.trim().toLowerCase();
  const candidates = [
    `${cleanBase} ${cleanMod}`,
    `${cleanNeck} ${cleanBase}`,
    `${cleanNeck} ${cleanBase} ${cleanMod}`,
    `custom ${cleanBase} ${cleanMod}`,
    `wholesale ${cleanBase} China`,
    `${cleanBase} factory Ningbo`,
    `${cleanBase} OEM Yuyao`,
    `bulk ${cleanBase} supplier`,
    `chemical resistant ${cleanBase}`,
    `FOB Ningbo ${cleanBase}`,
  ];
  return Array.from(new Set(candidates.map((c) => c.replace(/\s+/g, ' ').trim())));
}

export interface KeywordAnalysisRow {
  keyword: string;
  inTitle: boolean;
  inDesc: boolean;
  inKeywordsMeta: boolean;
  productMatches: number;
  blogMatches: number;
  totalOccurrences: number;
  status: 'Strong' | 'Partial' | 'Missing';
}

export function analyzeKeywordsAcrossSite(
  keywords: string[],
  seo: SeoSettings,
  products: CmsProductRecord[],
  blogPosts: BlogPost[]
): KeywordAnalysisRow[] {
  const titleLower = seo.siteTitle.toLowerCase();
  const descLower = seo.metaDescription.toLowerCase();
  const metaKwLower = seo.keywords.join(' , ').toLowerCase();

  const productTexts =
    products.length > 0
      ? products
          .filter((p) => p.status === 'active')
          .map((p) =>
            `${p.model} ${p.categoryId} ${p.description} ${p.applications} ${p.features.join(' ')}`.toLowerCase()
          )
      : PRODUCT_CATEGORIES.flatMap((cat) =>
          cat.variants.map((v) =>
            `${cat.name} ${v.model} ${v.description} ${v.applications} ${v.features.join(' ')}`.toLowerCase()
          )
        );

  const blogTexts = blogPosts
    .filter((b) => b.status === 'published')
    .map((b) => `${b.title} ${b.excerpt} ${b.content} ${b.tags.join(' ')}`.toLowerCase());

  return keywords.map((kw) => {
    const clean = kw.trim();
    const lower = clean.toLowerCase();
    const inTitle = lower.length > 0 && titleLower.includes(lower);
    const inDesc = lower.length > 0 && descLower.includes(lower);
    const inKeywordsMeta = lower.length > 0 && metaKwLower.includes(lower);

    let productMatches = 0;
    let totalOccurrences = 0;

    const escapeRegex = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = lower ? new RegExp(escapeRegex(lower), 'gi') : null;

    if (regex) {
      totalOccurrences += (seo.siteTitle.match(regex) ?? []).length;
      totalOccurrences += (seo.metaDescription.match(regex) ?? []).length;
      totalOccurrences += (seo.keywords.join(', ').match(regex) ?? []).length;

      for (const txt of productTexts) {
        const hits = txt.match(regex)?.length ?? 0;
        if (hits > 0) productMatches += 1;
        totalOccurrences += hits;
      }
      for (const txt of blogTexts) {
        const hits = txt.match(regex)?.length ?? 0;
        totalOccurrences += hits;
      }
    }

    let blogMatches = 0;
    if (regex) {
      for (const txt of blogTexts) {
        if ((txt.match(regex)?.length ?? 0) > 0) blogMatches += 1;
      }
    }

    const scoreSignals =
      (inTitle ? 2 : 0) +
      (inDesc ? 2 : 0) +
      (inKeywordsMeta ? 1 : 0) +
      (productMatches > 0 ? 1 : 0) +
      (blogMatches > 0 ? 1 : 0);

    const status: 'Strong' | 'Partial' | 'Missing' =
      scoreSignals >= 4 ? 'Strong' : scoreSignals >= 1 ? 'Partial' : 'Missing';

    return {
      keyword: clean,
      inTitle,
      inDesc,
      inKeywordsMeta,
      productMatches,
      blogMatches,
      totalOccurrences,
      status,
    };
  });
}

export function buildEnhancedSitemapXml(
  baseUrl: string,
  activeProducts: CmsProductRecord[],
  publishedPosts: BlogPost[]
): string {
  const base = baseUrl.replace(/\/+$/, '');
  const today = new Date().toISOString().slice(0, 10);

  const staticPages = [
    { loc: `${base}/`, priority: '1.0', freq: 'weekly', image: `${base}/src/assets/images/product_trigger_sprayer_1795008502569.jpg` },
    { loc: `${base}/?page=products`, priority: '0.9', freq: 'weekly', image: `${base}/src/assets/images/product_lotion_pump_1795008503779.jpg` },
    { loc: `${base}/?page=blog`, priority: '0.8', freq: 'weekly', image: `${base}/src/assets/images/factory_injection_moulding_1795005762839.jpg` },
  ];

  const categoryUrls = PRODUCT_CATEGORIES.map((cat) => ({
    loc: `${base}/?page=products&category=${encodeURIComponent(cat.id)}`,
    priority: '0.85',
    freq: 'weekly',
    image: cat.image.startsWith('http') ? cat.image : `${base}${cat.image}`,
  }));

  const productUrls =
    activeProducts.length > 0
      ? activeProducts.map((p) => ({
          loc: `${base}/?page=products&product=${encodeURIComponent(p.slug)}`,
          priority: '0.8',
          freq: 'monthly',
          image:
            p.galleryUrls[0] && !p.galleryUrls[0].startsWith('data:')
              ? p.galleryUrls[0].startsWith('http')
                ? p.galleryUrls[0]
                : `${base}${p.galleryUrls[0]}`
              : '',
        }))
      : PRODUCT_CATEGORIES.flatMap((c) =>
          c.variants.map((v) => ({
            loc: `${base}/?page=products&product=${encodeURIComponent(v.slug)}`,
            priority: '0.8',
            freq: 'monthly',
            image: v.gallery[0]?.src ? `${base}${v.gallery[0].src}` : '',
          }))
        );

  const postUrls = publishedPosts.map((post) => ({
    loc: `${base}/?page=blog&post=${encodeURIComponent(post.slug)}`,
    priority: '0.75',
    freq: 'monthly',
    image:
      post.coverImage && !post.coverImage.startsWith('data:')
        ? post.coverImage.startsWith('http')
          ? post.coverImage
          : `${base}${post.coverImage}`
        : '',
  }));

  const allUrls = [...staticPages, ...categoryUrls, ...productUrls, ...postUrls];

  const escapeXml = (s: string) =>
    s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
    '        xmlns:xhtml="http://www.w3.org/1999/xhtml"',
    '        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">',
    ...allUrls.map((u) => {
      const sep = u.loc.includes('?') ? '&amp;' : '?';
      const escapedLoc = escapeXml(u.loc);
      return [
        '  <url>',
        `    <loc>${escapedLoc}</loc>`,
        `    <lastmod>${today}</lastmod>`,
        `    <changefreq>${u.freq}</changefreq>`,
        `    <priority>${u.priority}</priority>`,
        `    <xhtml:link rel="alternate" hreflang="en" href="${escapedLoc}${sep}lang=en" />`,
        `    <xhtml:link rel="alternate" hreflang="es" href="${escapedLoc}${sep}lang=es" />`,
        `    <xhtml:link rel="alternate" hreflang="ar" href="${escapedLoc}${sep}lang=ar" />`,
        `    <xhtml:link rel="alternate" hreflang="x-default" href="${escapedLoc}" />`,
        u.image
          ? `    <image:image>\n      <image:loc>${escapeXml(u.image)}</image:loc>\n    </image:image>`
          : '',
        '  </url>',
      ]
        .filter(Boolean)
        .join('\n');
    }),
    '</urlset>',
  ].join('\n');
}

export function buildEnhancedRobotsTxt(baseUrl: string, robotsIndex: boolean, allowAiBots: boolean): string {
  const base = baseUrl.replace(/\/+$/, '');
  const directive = robotsIndex ? 'Allow: /' : 'Disallow: /';
  const aiDirective = robotsIndex && allowAiBots ? 'Allow: /' : 'Disallow: /';

  return [
    'User-agent: *',
    directive,
    '',
    'User-agent: Googlebot',
    directive,
    '',
    'User-agent: Googlebot-Image',
    directive,
    '',
    'User-agent: Bingbot',
    directive,
    '',
    'User-agent: DuckDuckBot',
    directive,
    '',
    'User-agent: Yandex',
    directive,
    '',
    'User-agent: Baiduspider',
    directive,
    '',
    'User-agent: Applebot',
    directive,
    '',
    'User-agent: OAI-SearchBot',
    aiDirective,
    '',
    'User-agent: PerplexityBot',
    aiDirective,
    '',
    'User-agent: GPTBot',
    aiDirective,
    '',
    `Sitemap: ${base}/sitemap.xml`,
  ].join('\n');
}

export function buildLlmsTxtContent(baseUrl: string, seo: SeoSettings): string {
  const base = baseUrl.replace(/\/+$/, '');
  return [
    '# Yi Lai Plastics Industry',
    '',
    `> ${seo.metaDescription}`,
    '',
    '## Core Manufacturing Capabilities (Yuyao, Ningbo, China)',
    '- **Trigger Sprayers**: 28/400 & 28/410 standard, heavy-duty chemical-resistant (316 SS spring), foaming & stream/mist/off nozzles',
    '- **Mini Trigger Sprayers**: 20/410 & 24/410 compact cosmetic & car care trigger atomizers',
    '- **Foam Pumps & Foam Triggers**: 40/400 foaming soap pumps & 28/410 aerated foam trigger sprayers',
    '- **Lotion Pumps**: 24/410 & 28/410 clip-lock and screw-lock dispensers (1.8 ml to 4.0 ml dosage)',
    '- **Fine Mist Sprayers**: 18/415, 20/410, 24/410 cosmetic & perfume atomizers (0.10–0.18 ml mist output)',
    '- **Bottle Caps & Closures**: Flip-top caps, disc-top caps, ribbed screw closures & induction-sealed liners',
    '',
    '## Key Factory Specifications',
    '- Location: Yuyao, Ningbo, Zhejiang, China (Direct FOB Ningbo Port export)',
    '- Quality Control: ISO 9001, -0.06 MPa vacuum leak testing, 100% automated camera & spray inspection',
    '- Customization: In-house Pantone masterbatch matching, custom mould tooling, 304/316 stainless steel or metal-free springs',
    '- MOQ: 10,000–20,000 pcs per SKU · Free 50-piece technical sample kit available',
    '',
    '## Canonical Pages',
    `- Home: ${base}/`,
    `- Full Product Catalogue: ${base}/?page=products`,
    `- Engineering & Packaging Journal: ${base}/?page=blog`,
    `- Sitemap: ${base}/sitemap.xml`,
  ].join('\n');
}
