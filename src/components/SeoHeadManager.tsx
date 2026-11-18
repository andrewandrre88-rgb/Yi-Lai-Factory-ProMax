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

function upsertCanonical(href: string) {
  const head = document.head;
  let link = head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
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
}: SeoHeadManagerProps) {
  useEffect(() => {
    const origin = window.location.origin;
    const baseCanonical =
      seo.canonicalUrl || `${origin}${window.location.pathname}`;

    let resolvedTitle = seo.siteTitle;
    let resolvedDescription = seo.metaDescription;
    let resolvedOgTitle = seo.ogTitle || seo.siteTitle;
    let resolvedOgDesc = seo.ogDescription || seo.metaDescription;
    let resolvedType: 'website' | 'product' | 'article' = 'website';
    let resolvedImage = resolveShareUrl(seo.ogImage, origin);

    if (activePage === 'products' && activeProduct) {
      resolvedTitle = `${activeProduct.variant.model} — ${activeProduct.category.name} | Yi Lai Plastics`;
      resolvedDescription = activeProduct.variant.description.slice(0, 160);
      resolvedOgTitle = resolvedTitle;
      resolvedOgDesc = resolvedDescription;
      resolvedType = 'product';
      const firstPhoto = activeProduct.variant.gallery[0]?.src ?? '';
      const productImg = resolveShareUrl(firstPhoto, origin);
      if (productImg) resolvedImage = productImg;
    } else if (activePage === 'products') {
      resolvedTitle = 'Products Catalogue — Trigger Sprayers & Lotion Pumps | Yi Lai';
      resolvedOgTitle = resolvedTitle;
    } else if (activePage === 'blog' && activePost) {
      resolvedTitle = `${activePost.title} | Yi Lai Factory Journal`;
      resolvedDescription = activePost.excerpt.slice(0, 160);
      resolvedOgTitle = resolvedTitle;
      resolvedOgDesc = resolvedDescription;
      resolvedType = 'article';
      const cover = resolveShareUrl(activePost.coverImage, origin);
      if (cover) resolvedImage = cover;
    } else if (activePage === 'blog') {
      resolvedTitle = 'Factory Journal — Packaging Engineering & Export Guides | Yi Lai';
      resolvedOgTitle = resolvedTitle;
    }

    document.title = resolvedTitle;

    const robotsContent =
      activePage === 'dashboard'
        ? 'noindex, nofollow'
        : seo.robotsIndex
        ? 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
        : 'noindex, nofollow';

    upsertMeta('name', 'description', resolvedDescription);
    upsertMeta('name', 'keywords', seo.keywords.join(', '));
    upsertMeta('name', 'robots', robotsContent);

    upsertCanonical(baseCanonical);

    upsertMeta('property', 'og:type', resolvedType);
    upsertMeta('property', 'og:site_name', 'Yi Lai Plastics Industry');
    upsertMeta('property', 'og:title', resolvedOgTitle);
    upsertMeta('property', 'og:description', resolvedOgDesc);
    upsertMeta('property', 'og:url', baseCanonical);
    upsertMeta('property', 'og:image', resolvedImage);
    upsertMeta('property', 'og:locale', lang === 'es' ? 'es_ES' : lang === 'ar' ? 'ar_SA' : 'en_US');

    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', resolvedOgTitle);
    upsertMeta('name', 'twitter:description', resolvedOgDesc);
    upsertMeta('name', 'twitter:image', resolvedImage);

    // Search Engine Webmaster Verification Meta Tags
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
      name: 'Yi Lai Plastics Industry',
      url: baseCanonical,
      description: seo.metaDescription,
      telephone: '+86-137-5705-0848',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Yuyao',
        addressRegion: 'Ningbo, Zhejiang',
        addressCountry: 'CN',
      },
      ...(sameAsUrls.length > 0 ? { sameAs: sameAsUrls } : {}),
    };

    const websiteNode: Record<string, unknown> = {
      '@type': 'WebSite',
      name: 'Yi Lai Plastics Industry',
      url: baseCanonical,
      description: seo.metaDescription,
      inLanguage: ['en', 'es', 'ar'],
    };

    const graphNodes: Record<string, unknown>[] = [organizationNode, websiteNode];

    if (activePage === 'products' && activeProduct) {
      graphNodes.push({
        '@type': 'Product',
        name: activeProduct.variant.model,
        category: activeProduct.category.name,
        description: activeProduct.variant.description,
        sku: activeProduct.variant.slug,
        material: activeProduct.variant.materials,
        brand: {
          '@type': 'Brand',
          name: 'Yi Lai Plastics',
        },
        ...(resolvedImage ? { image: [resolvedImage] } : {}),
      });
    } else if (activePage === 'blog' && activePost) {
      graphNodes.push({
        '@type': 'Article',
        headline: activePost.title,
        description: activePost.excerpt,
        datePublished: activePost.publishedAt,
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
  }, [seo, socialLinks, lang, activePage, activeProduct, activePost]);

  return null;
}
