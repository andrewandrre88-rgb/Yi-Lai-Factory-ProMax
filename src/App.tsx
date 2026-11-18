import { useState, useEffect, useMemo } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth, PRIMARY_ADMIN_EMAIL } from './firebase';
import { ErrorBoundary } from './components/ErrorBoundary';
import { Header, AppPage } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ConveyorRibbon } from './components/ConveyorRibbon';
import { YiLaiOrbit } from './components/YiLaiOrbit';
import { ProductMatcher } from './components/ProductMatcher';
import { EngineeringBlueprint } from './components/EngineeringBlueprint';
import { NozzleLab } from './components/NozzleLab';
import { FactoryWorkflow } from './components/FactoryWorkflow';
import { ExportAndTrust } from './components/ExportAndTrust';
import { SprayRevealOffer } from './components/SprayRevealOffer';
import { QuoteSection, QuotePrefill } from './components/QuoteSection';
import { Footer } from './components/Footer';
import { ProductSpecModal } from './components/ProductSpecModal';
import { ProductsPage } from './components/ProductsPage';
import { ProductDetailPage } from './components/ProductDetailPage';
import { BlogPage } from './components/BlogPage';
import { DashboardPage } from './components/DashboardPage';
import { ScrollDispenserRail } from './components/ScrollDispenserRail';
import { SeoHeadManager } from './components/SeoHeadManager';
import {
  LanguageCode,
  ProductCategory,
  ProductVariant,
  UI_TRANSLATIONS,
} from './data/factoryData';
import { getLocalizedCategories } from './data/translations';
import { BlogPost, STARTER_BLOG_POSTS } from './data/blogData';
import { EMPTY_SOCIAL_LINKS, SocialMediaLinks } from './components/SocialLinksBar';
import {
  CmsProductRecord,
  cmsProductToVariant,
  DEFAULT_SEO_SETTINGS,
  SeoSettings,
  subscribeAdminBlogPosts,
  subscribeAdminProducts,
  subscribeCatalogSeeded,
  subscribePublicBlogPosts,
  subscribePublicProducts,
  subscribeSeoSettings,
  subscribeSocialLinks,
} from './services/cmsService';

export default function App() {
  const [lang, setLang] = useState<LanguageCode>('en');
  const [activePage, setActivePage] = useState<AppPage>('home');
  const [productsFilterId, setProductsFilterId] = useState<string | null>(null);
  const [selectedProductIds, setSelectedProductIds] = useState<{
    categoryId: string;
    variantSlug: string;
  } | null>(null);
  const [selectedBlogSlug, setSelectedBlogSlug] = useState<string | null>(null);
  const [activeModalCategoryId, setActiveModalCategoryId] = useState<string | null>(null);
  const [quotePrefill, setQuotePrefill] = useState<QuotePrefill | null>(null);

  const [user, setUser] = useState<User | null>(null);
  const [authReady, setAuthReady] = useState(false);
  const [catalogSeeded, setCatalogSeeded] = useState(false);
  const [catalogConfigReady, setCatalogConfigReady] = useState(false);
  const [firestoreProducts, setFirestoreProducts] = useState<CmsProductRecord[]>([]);
  const [firestoreBlogPosts, setFirestoreBlogPosts] = useState<BlogPost[]>([]);
  const [socialLinks, setSocialLinks] = useState<SocialMediaLinks>(EMPTY_SOCIAL_LINKS);
  const [seoSettings, setSeoSettings] = useState<SeoSettings>(DEFAULT_SEO_SETTINGS);

  useEffect(() => {
    document.documentElement.dir = UI_TRANSLATIONS[lang].dir;
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    const unsubAuth = onAuthStateChanged(auth, (nextUser) => {
      setUser(nextUser);
      setAuthReady(true);
    });
    const unsubSeed = subscribeCatalogSeeded((seeded, loaded) => {
      setCatalogSeeded(seeded);
      setCatalogConfigReady(loaded);
    });
    const unsubSocial = subscribeSocialLinks(setSocialLinks);
    const unsubSeo = subscribeSeoSettings(setSeoSettings);
    return () => {
      unsubAuth();
      unsubSeed();
      unsubSocial();
      unsubSeo();
    };
  }, []);

  useEffect(() => {
    if (!authReady) return;
    const isPrimary =
      Boolean(user?.emailVerified) &&
      user?.email?.toLowerCase() === PRIMARY_ADMIN_EMAIL.toLowerCase();

    const unsubProducts = isPrimary
      ? subscribeAdminProducts(setFirestoreProducts)
      : subscribePublicProducts(setFirestoreProducts);
    const unsubPosts = isPrimary
      ? subscribeAdminBlogPosts(setFirestoreBlogPosts)
      : subscribePublicBlogPosts(setFirestoreBlogPosts);

    return () => {
      unsubProducts();
      unsubPosts();
    };
  }, [authReady, user]);

  const baseCategories = useMemo(() => getLocalizedCategories(lang), [lang]);

  // If Firestore catalog has been seeded, use live Firestore active products grouped into the 6 localized categories.
  // Before first admin seeding, display localized starter categories; if unedited starter variants exist in Firestore, preserve ES/AR translations.
  const storefrontCategories = useMemo<ProductCategory[]>(() => {
    if (!catalogSeeded && firestoreProducts.length === 0) {
      return baseCategories;
    }

    const activeRecords = firestoreProducts.filter((p) => p.status === 'active');

    return baseCategories.map((cat) => {
      const recordsForCat = activeRecords.filter((r) => r.categoryId === cat.id);
      const mergedVariants: ProductVariant[] = recordsForCat.map((rec) => {
        const translatedMatch = cat.variants.find((v) => v.slug === rec.slug);
        if (translatedMatch && !rec.isEdited && lang !== 'en') {
          return translatedMatch;
        }
        return cmsProductToVariant(rec);
      });
      return {
        ...cat,
        variants: mergedVariants,
      };
    });
  }, [baseCategories, catalogSeeded, firestoreProducts, lang]);

  const storefrontBlogPosts = useMemo<BlogPost[]>(() => {
    if (!catalogSeeded && firestoreBlogPosts.length === 0) {
      return STARTER_BLOG_POSTS;
    }
    return firestoreBlogPosts;
  }, [catalogSeeded, firestoreBlogPosts]);

  const activeModalCategory = activeModalCategoryId
    ? storefrontCategories.find((c) => c.id === activeModalCategoryId) ?? null
    : null;

  const activeProductDetail = (() => {
    if (!selectedProductIds) return null;
    const category = storefrontCategories.find((c) => c.id === selectedProductIds.categoryId);
    if (!category) return null;
    const variant = category.variants.find((v) => v.slug === selectedProductIds.variantSlug);
    if (!variant) return null;
    return { category, variant };
  })();

  const scrollToSection = (id: string) => {
    window.setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 60);
  };

  const navigateToPage = (page: AppPage, sectionId?: string, categoryFilterId?: string) => {
    if (page === 'products') {
      setSelectedProductIds(null);
      setProductsFilterId(categoryFilterId || 'all');
      setActivePage('products');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (page === 'blog') {
      setSelectedProductIds(null);
      setSelectedBlogSlug(null);
      setActivePage('blog');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (page === 'dashboard') {
      setSelectedProductIds(null);
      setActivePage('dashboard');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setSelectedProductIds(null);
    setActivePage('home');
    if (sectionId) {
      if (sectionId === 'top') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        scrollToSection(sectionId);
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleOpenProductDetail = (category: ProductCategory, variant: ProductVariant) => {
    setActiveModalCategoryId(null);
    setActivePage('products');
    setSelectedProductIds({ categoryId: category.id, variantSlug: variant.slug });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleQuoteWithPrefill = (prefill: QuotePrefill) => {
    setQuotePrefill({ ...prefill });
    setActiveModalCategoryId(null);
    setSelectedProductIds(null);
    setActivePage('home');
    scrollToSection('quote');
  };

  const handleSelectVariantForQuote = (
    categoryId: string,
    variant: ProductVariant,
    customNote?: string
  ) => {
    handleQuoteWithPrefill({
      product: categoryId,
      requirements:
        customNote ||
        `${variant.model} | ${variant.neckFinish} | ${variant.dosage} | ${variant.closureStyle} | ${variant.springType}`,
    });
  };

  const activeBlogPostDetail =
    activePage === 'blog' && selectedBlogSlug
      ? storefrontBlogPosts.find(
          (p) => p.slug === selectedBlogSlug || p.id === selectedBlogSlug
        ) ?? null
      : null;

  return (
    <ErrorBoundary>
      <SeoHeadManager
        seo={seoSettings}
        socialLinks={socialLinks}
        lang={lang}
        activePage={activePage}
        activeProduct={activeProductDetail}
        activePost={activeBlogPostDetail}
      />
      <div className="min-h-screen flex flex-col bg-[#F6F9FE] text-[#0B1B3E]">
        <Header
          lang={lang}
          activePage={activePage}
          onNavigatePage={navigateToPage}
          onRequestQuote={() => navigateToPage('home', 'quote')}
        />

        <main className="flex-1">
          {activePage === 'dashboard' ? (
            <DashboardPage
              lang={lang}
              onChangeLang={setLang}
              user={user}
              authReady={authReady}
              catalogSeeded={catalogSeeded}
              catalogConfigReady={catalogConfigReady}
              products={firestoreProducts}
              blogPosts={storefrontBlogPosts}
              socialLinks={socialLinks}
              seoSettings={seoSettings}
              onBackHome={() => navigateToPage('home', 'top')}
              onOpenProductsPage={() => navigateToPage('products')}
              onOpenBlogPage={(slug) => {
                setSelectedBlogSlug(slug ?? null);
                setActivePage('blog');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          ) : activePage === 'blog' ? (
            <BlogPage
              lang={lang}
              onChangeLang={setLang}
              posts={storefrontBlogPosts}
              globalSocialLinks={socialLinks}
              selectedPostSlug={selectedBlogSlug}
              onSelectPost={setSelectedBlogSlug}
              onBackHome={() => navigateToPage('home', 'top')}
              onOpenDashboard={() => navigateToPage('dashboard')}
              onRequestSamples={(topicNote) =>
                handleQuoteWithPrefill({
                  product: 'custom-sample-pack',
                  requirements: topicNote,
                })
              }
            />
          ) : activePage === 'products' && activeProductDetail ? (
            <ProductDetailPage
              lang={lang}
              onChangeLang={setLang}
              category={activeProductDetail.category}
              variant={activeProductDetail.variant}
              globalSocialLinks={socialLinks}
              onBackToProducts={() => {
                setSelectedProductIds(null);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onSelectRelatedVariant={handleOpenProductDetail}
              onRequestQuote={handleSelectVariantForQuote}
              onOpenNozzleLab={() => navigateToPage('home', 'customize')}
            />
          ) : activePage === 'products' ? (
            <ProductsPage
              lang={lang}
              onChangeLang={setLang}
              categoriesOverride={storefrontCategories}
              initialCategoryId={productsFilterId}
              onBackHome={() => navigateToPage('home', 'top')}
              onOpenProductDetail={handleOpenProductDetail}
              onViewCategoryModal={(cat) => setActiveModalCategoryId(cat.id)}
              onQuoteVariant={handleSelectVariantForQuote}
              onGoToNozzleLab={() => navigateToPage('home', 'customize')}
            />
          ) : (
            <>
              <HeroSection
                lang={lang}
                onChangeLang={setLang}
                onExploreProducts={() => navigateToPage('products')}
                onViewCatalog={() => navigateToPage('products')}
              />

              <ConveyorRibbon lang={lang} />

              <YiLaiOrbit
                lang={lang}
                onSelectCategory={(cat) => navigateToPage('products', undefined, cat.id)}
                onOpenCatalogue={() => navigateToPage('products')}
              />

              <ProductMatcher
                lang={lang}
                onRequestSamples={(categoryId, note) =>
                  handleQuoteWithPrefill({
                    product: categoryId,
                    requirements: note,
                  })
                }
                onSeeRange={(categoryId) => navigateToPage('products', undefined, categoryId)}
              />

              <EngineeringBlueprint lang={lang} />

              <NozzleLab
                lang={lang}
                onRequestSample={(configSummary) =>
                  handleQuoteWithPrefill({
                    product: 'trigger-sprayers',
                    requirements: configSummary,
                  })
                }
              />

              <FactoryWorkflow lang={lang} />

              <ExportAndTrust
                lang={lang}
                onTalkExport={(regionName) =>
                  handleQuoteWithPrefill({
                    product: 'trigger-sprayers',
                    country: regionName,
                    requirements: `FOB Ningbo / CIF freight quote — ${regionName}`,
                  })
                }
              />

              <SprayRevealOffer
                lang={lang}
                onClaimOffer={(offerNote) =>
                  handleQuoteWithPrefill({
                    product: 'custom-sample-pack',
                    requirements: offerNote,
                  })
                }
              />

              <QuoteSection lang={lang} prefill={quotePrefill} />
            </>
          )}
        </main>

        <Footer
          lang={lang}
          onSelectCategory={(cat) => navigateToPage('products', undefined, cat.id)}
          onNavigateSection={(sectionId) => navigateToPage('home', sectionId)}
          onOpenProductsPage={() => navigateToPage('products')}
          onOpenBlogPage={() => navigateToPage('blog')}
          onOpenDashboardPage={() => navigateToPage('dashboard')}
        />

        <ProductSpecModal
          lang={lang}
          category={activeModalCategory}
          onClose={() => setActiveModalCategoryId(null)}
          onSelectForQuote={handleSelectVariantForQuote}
        />

        <ScrollDispenserRail lang={lang} />
      </div>
    </ErrorBoundary>
  );
}

