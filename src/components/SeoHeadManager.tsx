import { useEffect } from 'react';
import { LanguageCode, ProductCategory, ProductVariant } from '../data/factoryData';
import { BlogPost } from '../data/blogData';
import { SOCIAL_PLATFORMS, SocialMediaLinks } from './SocialLinksBar';
import { SeoSettings } from '../services/cmsService';

interface SeoHeadManagerProps {
  seo: SeoSettings;
  socialLinks: SocialMediaLinks;
  lang: LanguageCode;
  activePage: 'home' | 'products' | 'blog' | 'dashboard';
  activeProduct?: { category: ProductCategory; variant: ProductVariant } | null;
  activePost?: BlogPost | null;
  categories?: ProductCategory[];
}

function upsertMeta(attrName: 'name' | 'property', key: string, content: string) {
  const head = document.head;
  let tag = head.querySelector<HTMLMetaElement>(`meta[${attrName}="${key}"]`);
  if (!content) {
    if (tag) tag.remove();
    return;
  }
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attrName, key);
    head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

function upsertLink(rel: string, href: string, hreflang?: string) {
  const head = document.head;
  const selector = hreflang
    ? `link[rel="${rel}"][hreflang="${hreflang}"]`
    : `link[rel="${rel}"]:not([hreflang])`;
  let link = head.querySelector<HTMLLinkElement>(selector);
  if (!href) {
    if (link) link.remove();
    return;
  }
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', rel);
    if (hreflang) link.setAttribute('hreflang', hreflang);
    head.appendChild(link);
  }
  link.setAttribute('href', href);
}

function resolveShareUrl(rawUrl: string, origin: string): string {
  const trimmed = rawUrl.trim();
  if (!trimmed || trimmed.startsWith('data:')) return '';
  if (/^https?:\/\//i.test(trimmed)) return trimmed;
  return `${origin}${trimmed.startsWith('/') ? trimmed : `/${trimmed}`}`;
}

export function SeoHeadManager({
  seo,
  socialLinks,
  lang,
  activePage,
  activeProduct,
  activePost,
  categories = [],
}: SeoHeadManagerProps) {
  useEffect(() => {
    const origin = window.location.origin;
    const baseCanonical = (
      seo.canonicalUrl || 'https://yilaiplastics.online' || `${origin}${window.location.pathname}`
    ).replace(/\/+$/, '');

    let pageUrl = `${baseCanonical}/`;
    if (activePage === 'products' && activeProduct) {
      pageUrl = `${baseCanonical}/?page=products&product=${encodeURIComponent(activeProduct.variant.slug)}`;
    } else if (activePage === 'products') {
      pageUrl = `${baseCanonical}/?page=products`;
    } else if (activePage === 'blog' && activePost) {
      pageUrl = `${baseCanonical}/?page=blog&post=${encodeURIComponent(activePost.slug)}`;
    } else if (activePage === 'blog') {
      pageUrl = `${baseCanonical}/?page=blog`;
    }

    let resolvedTitle = seo.siteTitle;
    let resolvedDescription = seo.metaDescription;
    let resolvedOgTitle = seo.ogTitle || seo.siteTitle;
    let resolvedOgDesc = seo.ogDescription || seo.metaDescription;
    let resolvedType: 'website' | 'product' | 'article' = 'website';
    let resolvedImage = resolveShareUrl(seo.ogImage, baseCanonical);
    let resolvedKeywords = [...seo.keywords];

    const autoApply = seo.autoApplyToNewContent !== false;

    if (activePage === 'products' && activeProduct) {
      resolvedTitle = `${activeProduct.variant.model} — ${activeProduct.category.name} | Yi Lai Plastics`;
      resolvedDescription =
        activeProduct.variant.description.trim().slice(0, 160) || seo.metaDescription;
      resolvedOgTitle = resolvedTitle;
      resolvedOgDesc = resolvedDescription;
      resolvedType = 'product';
      const firstPhoto = activeProduct.variant.gallery[0]?.src ?? '';
      const productImg = resolveShareUrl(firstPhoto, baseCanonical);
      if (productImg) resolvedImage = productImg;

      const productKeywords = [
        activeProduct.variant.model,
        activeProduct.category.name,
        activeProduct.variant.neckFinish,
        ...activeProduct.variant.applications
          .split(',')
          .map((a) => a.trim())
          .filter(Boolean),
      ];
      resolvedKeywords = autoApply
        ? Array.from(new Set([...productKeywords, ...seo.keywords])).slice(0, 30)
        : productKeywords;
    } else if (activePage === 'products') {
      resolvedTitle = 'Trigger Sprayers, Lotion Pumps, Foam & Fine Mist | Yi Lai';
      resolvedDescription =
        'Browse 28/410 trigger sprayers, lotion pumps, foam pumps, fine mist sprayers, and bottle closures manufactured in Yuyao, Ningbo.';
      resolvedOgTitle = resolvedTitle;
      resolvedOgDesc = resolvedDescription;
    } else if (activePage === 'blog' && activePost) {
      resolvedTitle = `${activePost.title} | Yi Lai Factory Journal`;
      resolvedDescription = activePost.excerpt.trim().slice(0, 160) || seo.metaDescription;
      resolvedOgTitle = resolvedTitle;
      resolvedOgDesc = resolvedDescription;
      resolvedType = 'article';
      const cover = resolveShareUrl(activePost.coverImage, baseCanonical);
      if (cover) resolvedImage = cover;

      resolvedKeywords = autoApply
        ? Array.from(new Set([...activePost.tags, activePost.category, ...seo.keywords])).slice(0, 30)
        : [...activePost.tags, activePost.category];
    } else if (activePage === 'blog') {
      resolvedTitle = 'Sprayer & Pump Engineering Guides — Yi Lai Factory Journal';
      resolvedDescription =
        'Technical guides on trigger sprayers, lotion pumps, foam pumps, fine mist atomizers, SPI neck finishes, and 316 SS springs.';
      resolvedOgTitle = resolvedTitle;
      resolvedOgDesc = resolvedDescription;
    }

    document.title = resolvedTitle;

    const robotsContent =
      activePage === 'dashboard'
        ? 'noindex, nofollow'
        : seo.robotsIndex
        ? 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
        : 'noindex, nofollow';

    upsertMeta('name', 'description', resolvedDescription);
    upsertMeta('name', 'keywords', resolvedKeywords.join(', '));
    upsertMeta('name', 'robots', robotsContent);
    upsertMeta('name', 'author', 'Yi Lai Plastics Industry');
    upsertMeta('name', 'geo.region', 'CN-ZJ');
    upsertMeta('name', 'geo.placename', 'Yuyao, Ningbo, Zhejiang, China');

    upsertLink('canonical', pageUrl);

    if (seo.enableHreflangTags !== false && activePage !== 'dashboard') {
      const sep = pageUrl.includes('?') ? '&' : '?';
      upsertLink('alternate', `${pageUrl}${sep}lang=en`, 'en');
      upsertLink('alternate', `${pageUrl}${sep}lang=es`, 'es');
      upsertLink('alternate', `${pageUrl}${sep}lang=ar`, 'ar');
      upsertLink('alternate', pageUrl, 'x-default');
    } else {
      upsertLink('alternate', '', 'en');
      upsertLink('alternate', '', 'es');
      upsertLink('alternate', '', 'ar');
      upsertLink('alternate', '', 'x-default');
    }

    upsertMeta('property', 'og:type', resolvedType);
    upsertMeta('property', 'og:site_name', 'Yi Lai Plastics Industry');
    upsertMeta('property', 'og:title', resolvedOgTitle);
    upsertMeta('property', 'og:description', resolvedOgDesc);
    upsertMeta('property', 'og:url', pageUrl);
    upsertMeta('property', 'og:image', resolvedImage);
    upsertMeta(
      'property',
      'og:locale',
      lang === 'es' ? 'es_ES' : lang === 'ar' ? 'ar_SA' : 'en_US'
    );

    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', resolvedOgTitle);
    upsertMeta('name', 'twitter:description', resolvedOgDesc);
    upsertMeta('name', 'twitter:image', resolvedImage);

    // Search Engine Webmaster Verification Meta Tags (applied across every route)
    upsertMeta('name', 'google-site-verification', seo.googleVerification);
    upsertMeta('name', 'msvalidate.01', seo.bingVerification);
    upsertMeta('name', 'yandex-verification', seo.yandexVerification);
    upsertMeta('name', 'baidu-site-verification', seo.baiduVerification);

    // Dynamic Schema.org JSON-LD Structured Data
    const sameAsUrls = SOCIAL_PLATFORMS.flatMap((p) => {
      if (p.key === 'gmail') return [];
      const arr = socialLinks[p.key];
      return Array.isArray(arr) ? arr.filter((u) => /^https?:\/\//i.test(u)) : [];
    });

    const organizationNode: Record<string, unknown> = {
      '@type': 'Organization',
      '@id': `${baseCanonical}/#organization`,
      name: 'Yi Lai Plastics Industry',
      url: `${baseCanonical}/`,
      description: seo.metaDescription,
      telephone: '+86-137-5705-0848',
      knowsAbout: [
        'Trigger Sprayers',
        'Lotion Pumps',
        'Foam Pumps',
        'Fine Mist Sprayers',
        'Plastic Bottle Closures',
        'Injection Moulding',
      ],
      areaServed: [
        'Global',
        'North America',
        'Europe',
        'Middle East',
        'South America',
        'Southeast Asia',
      ],
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Yuyao',
        addressRegion: 'Ningbo, Zhejiang',
        addressCountry: 'CN',
      },
      ...(resolvedImage ? { logo: resolvedImage } : {}),
      ...(sameAsUrls.length > 0 ? { sameAs: sameAsUrls } : {}),
    };

    const websiteNode: Record<string, unknown> = {
      '@type': 'WebSite',
      '@id': `${baseCanonical}/#website`,
      name: 'Yi Lai Plastics Industry',
      url: `${baseCanonical}/`,
      description: seo.metaDescription,
      inLanguage: ['en', 'es', 'ar'],
      publisher: { '@id': `${baseCanonical}/#organization` },
      potentialAction: {
        '@type': 'SearchAction',
        target: `${baseCanonical}/?page=products&q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    };

    const breadcrumbItems: Array<Record<string, unknown>> = [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `${baseCanonical}/`,
      },
    ];
    if (activePage === 'products') {
      breadcrumbItems.push({
        '@type': 'ListItem',
        position: 2,
        name: 'Products Catalogue',
        item: `${baseCanonical}/?page=products`,
      });
      if (activeProduct) {
        breadcrumbItems.push({
          '@type': 'ListItem',
          position: 3,
          name: activeProduct.variant.model,
          item: pageUrl,
        });
      }
    } else if (activePage === 'blog') {
      breadcrumbItems.push({
        '@type': 'ListItem',
        position: 2,
        name: 'Factory Journal',
        item: `${baseCanonical}/?page=blog`,
      });
      if (activePost) {
        breadcrumbItems.push({
          '@type': 'ListItem',
          position: 3,
          name: activePost.title,
          item: pageUrl,
        });
      }
    }

    const breadcrumbNode: Record<string, unknown> = {
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbItems,
    };

    const graphNodes: Record<string, unknown>[] = [
      organizationNode,
      websiteNode,
      breadcrumbNode,
    ];

    if (seo.enableItemListSchema !== false && categories.length > 0 && activePage !== 'dashboard') {
      graphNodes.push({
        '@type': 'ItemList',
        name: 'Yi Lai Plastics Trigger Sprayers, Lotion Pumps, Foam Pumps & Fine Mist Sprayers',
        numberOfItems: categories.length,
        itemListElement: categories.map((cat, idx) => ({
          '@type': 'ListItem',
          position: idx + 1,
          name: cat.name,
          description: cat.summary,
          url: `${baseCanonical}/?page=products&category=${encodeURIComponent(cat.id)}`,
        })),
      });
    }

    if (
      seo.enableFaqSchema !== false &&
      Array.isArray(seo.faqItems) &&
      seo.faqItems.length > 0 &&
      activePage !== 'dashboard'
    ) {
      graphNodes.push({
        '@type': 'FAQPage',
        mainEntity: seo.faqItems.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      });
    }

    if (activePage === 'products' && activeProduct) {
      graphNodes.push({
        '@type': 'Product',
        name: activeProduct.variant.model,
        url: pageUrl,
        category: activeProduct.category.name,
        description: activeProduct.variant.description,
        sku: activeProduct.variant.slug,
        material: activeProduct.variant.materials,
        keywords: resolvedKeywords.join(', '),
        brand: {
          '@type': 'Brand',
          name: 'Yi Lai Plastics',
        },
        manufacturer: { '@id': `${baseCanonical}/#organization` },
        additionalProperty: [
          {
            '@type': 'PropertyValue',
            name: 'SPI Neck Finish',
            value: activeProduct.variant.neckFinish,
          },
          {
            '@type': 'PropertyValue',
            name: 'Dosage Output',
            value: activeProduct.variant.dosage,
          },
          {
            '@type': 'PropertyValue',
            name: 'Spring System',
            value: activeProduct.variant.springType,
          },
          { '@type': 'PropertyValue', name: 'MOQ', value: activeProduct.variant.moq },
        ],
        offers: {
          '@type': 'Offer',
          url: pageUrl,
          availability: 'https://schema.org/InStock',
          priceCurrency: 'USD',
          businessFunction: 'http://purl.org/goodrelations/v1#Sell',
          eligibleQuantity: {
            '@type': 'QuantitativeValue',
            value: activeProduct.variant.moq,
          },
        },
        ...(resolvedImage ? { image: [resolvedImage] } : {}),
      });
    } else if (activePage === 'blog' && activePost) {
      graphNodes.push({
        '@type': 'Article',
        headline: activePost.title,
        description: activePost.excerpt,
        mainEntityOfPage: pageUrl,
        url: pageUrl,
        datePublished: activePost.publishedAt,
        articleSection: activePost.category,
        keywords: resolvedKeywords.join(', '),
        author: {
          '@type': 'Organization',
          name: activePost.authorName,
        },
        publisher: {
          '@type': 'Organization',
          name: 'Yi Lai Plastics Industry',
        },
        ...(resolvedImage ? { image: [resolvedImage] } : {}),
      });
    }

    let scriptTag = document.head.querySelector<HTMLScriptElement>('#yilai-structured-data');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = 'yilai-structured-data';
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': graphNodes,
    });
  }, [seo, socialLinks, lang, activePage, activeProduct, activePost, categories]);

  return null;
}
