import { useState, useEffect, useMemo } from 'react';
import { motion } from 'motion/react';
import {
  ArrowLeft,
  ArrowRight,
  Download,
  FileDown,
  Search,
  SlidersHorizontal,
} from 'lucide-react';
import { LanguageCode, ProductCategory, ProductVariant } from '../data/factoryData';
import {
  CATALOG_2026_PDF_URL,
  CATALOG_MODELS_2026,
  CATALOG_SERIES_META,
  CatalogSeriesId,
  LOTION_CUSTOMIZATION_MATRIX,
  TRIGGER_CLOSURE_CODES,
  TRIGGER_LEVER_CODES,
  TRIGGER_NOZZLE_CODES,
  TRIGGER_SHROUD_STYLES,
} from '../data/catalog2026Data';
import { getAppStrings, getLocalizedCategories } from '../data/translations';
import { LanguageSwitcher } from './LanguageSwitcher';
import { ProductIcon } from './ProductIcon';

interface ProductsPageProps {
  lang: LanguageCode;
  onChangeLang: (lang: LanguageCode) => void;
  categoriesOverride?: ProductCategory[];
  initialCategoryId?: string | null;
  onBackHome: () => void;
  onOpenProductDetail: (category: ProductCategory, variant: ProductVariant) => void;
  onViewCategoryModal: (category: ProductCategory) => void;
  onQuoteVariant: (categoryId: string, variant: ProductVariant) => void;
  onGoToNozzleLab: () => void;
}

const NECK_SIZES = [
  'FEA',
  '20/410',
  '24/410',
  '28/400',
  '28/410',
  '28/415',
  '33/',
  '38 mm',
  '62 mm',
] as const;

export function ProductsPage({
  lang,
  onChangeLang,
  categoriesOverride,
  initialCategoryId,
  onBackHome,
  onOpenProductDetail,
  onViewCategoryModal,
  onQuoteVariant,
  onGoToNozzleLab,
}: ProductsPageProps) {
  const s = getAppStrings(lang);
  const categories = categoriesOverride ?? getLocalizedCategories(lang);

  const [selectedCategoryId, setSelectedCategoryId] = useState<string>(initialCategoryId || 'all');
  const [selectedNeck, setSelectedNeck] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCatalogSeries, setSelectedCatalogSeries] = useState<CatalogSeriesId | 'all'>('all');

  useEffect(() => {
    if (initialCategoryId) {
      setSelectedCategoryId(initialCategoryId);
    }
  }, [initialCategoryId]);

  // Keep the 2026 Full Directory aligned cleanly when user filters top category
  useEffect(() => {
    if (selectedCategoryId === 'all') {
      setSelectedCatalogSeries('all');
      return;
    }
    const matchingSeries = CATALOG_SERIES_META.filter((m) => m.siteCategoryId === selectedCategoryId);
    if (matchingSeries.length === 1) {
      setSelectedCatalogSeries(matchingSeries[0].id);
    } else {
      setSelectedCatalogSeries('all');
    }
  }, [selectedCategoryId]);

  const handleDownloadCatalogue = () => {
    const lines = [
      'NINGBO YILAIPULIN PLASTIC INDUSTRY CO., LTD. (YI LAI PLASTICS) — 2026 CATALOG',
      'Factory: Yuyao, Ningbo, Zhejiang, China | Email: yilaiplastics@gmail.com | Tel: +86 137 5705 0848',
      '=================================================================================',
      '',
      ...categories.flatMap((cat) => [
        `${cat.index}. ${cat.name.toUpperCase()}`,
        `   ${cat.summary}`,
        `   ${s.productsNeckFinishLabel}: ${cat.neckRange} | ${s.productsDosageLabel}: ${cat.outputRange} | ${s.detailMoqPrefix}: ${cat.moq}`,
        ...cat.variants.map(
          (v) =>
            `   - ${v.model}: ${v.neckFinish} | ${s.productsDosageLabel} ${v.dosage} | ${s.modalClosure} ${v.closureStyle} | ${s.modalSpring} ${v.springType}`
        ),
        '',
      ]),
      'COMPLETE 2026 PDF CATALOG DIRECTORY (81 MODELS)',
      '---------------------------------------------------------------------------------',
      ...CATALOG_MODELS_2026.map(
        (m) =>
          `${m.code} | ${m.name} | Neck: ${m.neckSizes} | Material: ${m.material} | Output: ${m.output} | ${m.feature} (Catalog p.${m.page})`
      ),
    ];

    const blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Ningbo-Yilaipulin-Yi-Lai-Dispensing-Catalogue-2026-${lang}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const query = searchQuery.trim().toLowerCase();

  const filteredCategories = categories
    .filter((cat) => {
      if (selectedCategoryId !== 'all' && cat.id !== selectedCategoryId) return false;
      return true;
    })
    .map((cat) => {
      const matchingVariants = cat.variants.filter((v) => {
        const matchesNeck =
          selectedNeck === 'all' ||
          v.neckFinish.toLowerCase().includes(selectedNeck.toLowerCase());
        const matchesQuery =
          !query ||
          cat.name.toLowerCase().includes(query) ||
          v.model.toLowerCase().includes(query) ||
          v.applications.toLowerCase().includes(query) ||
          v.neckFinish.toLowerCase().includes(query) ||
          v.closureStyle.toLowerCase().includes(query);
        return matchesNeck && matchesQuery;
      });
      return { ...cat, variants: matchingVariants };
    })
    .filter((cat) => cat.variants.length > 0);

  const filteredCatalogModels = useMemo(() => {
    return CATALOG_MODELS_2026.filter((item) => {
      if (selectedCategoryId !== 'all' && item.siteCategoryId !== selectedCategoryId) {
        return false;
      }
      if (selectedCatalogSeries !== 'all' && item.seriesId !== selectedCatalogSeries) {
        return false;
      }
      if (
        selectedNeck !== 'all' &&
        !item.neckSizes.toLowerCase().includes(selectedNeck.toLowerCase())
      ) {
        return false;
      }
      if (query) {
        const haystack =
          `${item.code} ${item.name} ${item.neckSizes} ${item.material} ${item.feature} ${item.applications}`.toLowerCase();
        if (!haystack.includes(query)) return false;
      }
      return true;
    });
  }, [selectedCategoryId, selectedCatalogSeries, selectedNeck, query]);

  const handleQuoteCatalogModel = (entry: (typeof CATALOG_MODELS_2026)[number]) => {
    const parentCat = categories.find((c) => c.id === entry.siteCategoryId) ?? categories[0];
    const syntheticVariant: ProductVariant = {
      slug: entry.code.toLowerCase(),
      model: `${entry.code} — ${entry.name}`,
      neckFinish: entry.neckSizes,
      dosage: entry.output,
      closureStyle: entry.feature,
      springType: entry.material,
      moq: parentCat.moq,
      materials: entry.material,
      leadTime: '15–20 days',
      applications: entry.applications,
      description: `${entry.name} (${entry.code}, 2026 Catalog p.${entry.page})`,
      features: [entry.feature],
      gallery: [{ src: parentCat.image, label: entry.code }],
    };
    onQuoteVariant(entry.siteCategoryId, syntheticVariant);
  };

  return (
    <div className="bg-[#F6F9FE] min-h-screen pb-20">
      {/* Page Hero Banner */}
      <section className="bg-gradient-to-b from-white to-[#EEF4FD] border-b border-slate-200/80 pt-8 pb-12">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <button
              type="button"
              onClick={onBackHome}
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-[#155EEF] transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
              <span>{s.productsBackHome}</span>
            </button>

            <div className="flex flex-wrap items-center gap-4">
              <LanguageSwitcher lang={lang} onChangeLang={onChangeLang} />
              <a
                href={CATALOG_2026_PDF_URL}
                download="Ningbo-Yilaipulin-Yi-Lai-Plastics-2026-Catalog.pdf"
                className="inline-flex items-center gap-2 bg-[#E1262D] hover:bg-[#C61D24] text-white text-xs sm:text-sm font-semibold px-4 py-2 rounded-full transition-colors cursor-pointer"
              >
                <FileDown className="w-4 h-4" />
                <span>{s.productsDownloadSpec}</span>
              </a>
              <button
                type="button"
                onClick={handleDownloadCatalogue}
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#155EEF] hover:text-[#0B1B3E] transition-colors cursor-pointer"
              >
                <span>Spec Sheet (.TXT)</span>
                <Download className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="mt-7 max-w-3xl">
            <p className="text-xs font-semibold tracking-wider text-[#E1262D] uppercase">
              {s.productsKicker}
            </p>
            <h1 className="mt-2 font-display font-extrabold text-3xl sm:text-5xl text-[#0B1B3E] tracking-tight text-balance">
              {s.productsTitle}
            </h1>
            <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
              {s.productsSub}
            </p>
          </div>

          {/* Search & Neck Finish Controls */}
          <div className="mt-8 bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 shadow-xs space-y-4">
            <div className="flex flex-col md:flex-row gap-4 md:items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 text-slate-400 absolute start-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={s.productsSearchPlaceholder}
                  aria-label={s.productsSearchPlaceholder}
                  className="w-full rounded-xl border border-slate-200 bg-[#F8FAFE] ps-10 pe-4 py-2.5 text-sm text-[#0B1B3E] placeholder:text-slate-400 focus:outline-none focus:border-[#155EEF] focus:bg-white transition-colors"
                />
              </div>

              <div className="flex flex-wrap items-center gap-1.5">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 me-1">
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  {s.productsNeckLabel}
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedNeck('all')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer border ${
                    selectedNeck === 'all'
                      ? 'bg-[#155EEF] text-white border-[#155EEF]'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-[#155EEF]'
                  }`}
                >
                  {s.productsAllNecks}
                </button>
                {NECK_SIZES.map((neck) => {
                  const active = selectedNeck === neck;
                  return (
                    <button
                      key={neck}
                      type="button"
                      onClick={() => setSelectedNeck(neck)}
                      className={`px-2.5 py-1.5 rounded-lg text-xs font-mono font-semibold transition-colors cursor-pointer border ${
                        active
                          ? 'bg-[#155EEF] text-white border-[#155EEF]'
                          : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-[#155EEF]'
                      }`}
                    >
                      {neck}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Category Tabs */}
            <div
              className="pt-3 border-t border-slate-100 flex flex-wrap gap-2"
              role="tablist"
              aria-label={s.productsKicker}
            >
              <button
                type="button"
                role="tab"
                aria-selected={selectedCategoryId === 'all'}
                onClick={() => setSelectedCategoryId('all')}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-colors cursor-pointer border ${
                  selectedCategoryId === 'all'
                    ? 'bg-[#0B1B3E] text-white border-[#0B1B3E]'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-[#155EEF]'
                }`}
              >
                {s.productsAllSeries} ({categories.length})
              </button>
              {categories.map((cat) => {
                const active = selectedCategoryId === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setSelectedCategoryId(cat.id)}
                    className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-colors cursor-pointer border whitespace-nowrap ${
                      active
                        ? 'bg-[#0B1B3E] text-white border-[#0B1B3E]'
                        : 'bg-white text-slate-600 border-slate-200 hover:border-[#155EEF]'
                    }`}
                  >
                    {cat.index}. {cat.shortName}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Series Cards */}
      <section className="max-w-[1280px] mx-auto px-5 sm:px-8 pt-10 space-y-10">
        {filteredCategories.length === 0 && filteredCatalogModels.length === 0 ? (
          <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center">
            <h2 className="font-display font-bold text-xl text-[#0B1B3E]">
              {s.productsEmptyTitle}
            </h2>
            <p className="mt-2 text-sm text-slate-600">{s.productsEmptySub}</p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategoryId('all');
                setSelectedCatalogSeries('all');
                setSelectedNeck('all');
                setSearchQuery('');
              }}
              className="mt-5 inline-flex items-center gap-2 bg-[#155EEF] text-white text-sm font-semibold px-5 py-2.5 rounded-full cursor-pointer"
            >
              {s.productsResetFilters}
            </button>
          </div>
        ) : (
          filteredCategories.map((cat) => {
            const fullCategory = categories.find((c) => c.id === cat.id) ?? cat;
            const seriesApplications = CATALOG_SERIES_META.filter(
              (m) => m.siteCategoryId === cat.id
            ).flatMap((m) => m.applications);

            return (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs"
              >
                {/* Series Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 pb-6 border-b border-slate-100">
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center text-white shrink-0 ${
                        cat.accent === 'crimson' ? 'bg-[#E1262D]' : 'bg-[#155EEF]'
                      }`}
                    >
                      <ProductIcon categoryId={cat.id} className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="font-mono text-xs font-semibold text-slate-400">
                        {s.productsSeriesLabel} {cat.index} · {cat.neckRange} · {cat.outputRange}
                      </p>
                      <h2 className="mt-1 font-display font-extrabold text-2xl text-[#0B1B3E] tracking-tight">
                        {cat.name}
                      </h2>
                      <p className="mt-1.5 text-sm text-slate-600 max-w-2xl">{cat.summary}</p>
                      {seriesApplications.length > 0 && (
                        <p className="mt-2 text-xs text-slate-500">
                          <span className="font-semibold text-slate-700">Applications:</span>{' '}
                          {Array.from(new Set(seriesApplications)).join(' · ')}
                        </p>
                      )}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => onViewCategoryModal(fullCategory)}
                    className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#155EEF] hover:text-[#0B1B3E] whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <span>{s.productsCompareSeries}</span>
                    <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                  </button>
                </div>

                {/* Models Grid inside Series */}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {cat.variants.map((variant) => (
                    <div
                      key={variant.model}
                      className="group rounded-2xl border border-slate-200/90 bg-[#F8FAFE] hover:border-[#155EEF]/60 overflow-hidden flex flex-col justify-between transition-all duration-200 hover:shadow-md"
                    >
                      <div>
                        <button
                          type="button"
                          onClick={() => onOpenProductDetail(fullCategory, variant)}
                          className="relative aspect-[4/3] w-full bg-slate-100 overflow-hidden border-b border-slate-200/70 block cursor-pointer text-start"
                          aria-label={`${s.productsViewProduct}: ${variant.model}`}
                        >
                          <img
                            src={variant.gallery[0]?.src ?? cat.image}
                            alt={`${variant.model} — ${cat.name}`}
                            referrerPolicy="no-referrer"
                            loading="lazy"
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        </button>

                        <div className="p-5 pb-0">
                          <div className="flex items-start justify-between gap-2">
                            <button
                              type="button"
                              onClick={() => onOpenProductDetail(fullCategory, variant)}
                              className="font-display font-bold text-base text-[#0B1B3E] hover:text-[#155EEF] transition-colors text-start cursor-pointer"
                            >
                              {variant.model}
                            </button>
                            <span className="font-mono text-xs font-semibold text-[#155EEF] shrink-0 tabular-nums">
                              {variant.moq}
                            </span>
                          </div>

                          <p className="mt-1.5 text-xs text-slate-600 line-clamp-2 leading-relaxed">
                            {variant.description}
                          </p>

                          <dl className="mt-3.5 space-y-1.5 text-xs text-slate-600">
                            <div className="flex justify-between gap-3">
                              <dt className="text-slate-400 font-medium">
                                {s.productsNeckFinishLabel}
                              </dt>
                              <dd className="font-mono font-semibold text-[#0B1B3E] tabular-nums text-end">
                                {variant.neckFinish}
                              </dd>
                            </div>
                            <div className="flex justify-between gap-3">
                              <dt className="text-slate-400 font-medium">
                                {s.productsDosageLabel}
                              </dt>
                              <dd className="font-mono font-semibold text-[#0B1B3E] tabular-nums text-end">
                                {variant.dosage}
                              </dd>
                            </div>
                            <div className="flex justify-between gap-3">
                              <dt className="text-slate-400 font-medium">
                                {s.productsGalleryLabel}
                              </dt>
                              <dd className="font-mono text-slate-700 text-end">
                                {variant.gallery.length} {s.productsPhotosWord}
                              </dd>
                            </div>
                          </dl>
                        </div>
                      </div>

                      <div className="p-5 pt-4 flex items-center gap-2.5">
                        <button
                          type="button"
                          onClick={() => onOpenProductDetail(fullCategory, variant)}
                          className="flex-1 inline-flex items-center justify-center gap-1.5 bg-[#0B1B3E] hover:bg-[#155EEF] text-white font-semibold text-xs sm:text-sm px-4 py-2.5 rounded-full transition-colors cursor-pointer"
                        >
                          <span>{s.productsViewProduct}</span>
                          <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                        </button>
                        <button
                          type="button"
                          onClick={() => onQuoteVariant(cat.id, variant)}
                          className="inline-flex items-center justify-center bg-white hover:bg-red-50 text-[#E1262D] border border-[#E1262D]/35 font-semibold text-xs sm:text-sm px-4 py-2.5 rounded-full transition-colors cursor-pointer shrink-0"
                        >
                          {s.productsQuoteBtn}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })
        )}

        {/* Complete 2026 PDF Catalog Model Directory (81 Models · 8 Series) */}
        <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-5 border-b border-slate-100">
            <div>
              <p className="text-xs font-semibold tracking-wider text-[#E1262D] uppercase">
                Ningbo Yilaipulin Plastic Industry Co., Ltd. · Catalog Index
              </p>
              <h2 className="mt-1 font-display font-extrabold text-2xl sm:text-3xl text-[#0B1B3E] tracking-tight">
                2026 Full Catalog Model Directory ({filteredCatalogModels.length} / {CATALOG_MODELS_2026.length})
              </h2>
              <p className="mt-1.5 text-sm text-slate-600 max-w-2xl">
                Every model code across all 8 catalog chapters (p. 4–98). Filter by chapter or request an instant quotation on any SKU.
              </p>
            </div>

            <a
              href={CATALOG_2026_PDF_URL}
              download="Ningbo-Yilaipulin-Yi-Lai-Plastics-2026-Catalog.pdf"
              className="inline-flex items-center gap-2 bg-[#0B1B3E] hover:bg-[#155EEF] text-white text-xs sm:text-sm font-semibold px-5 py-2.5 rounded-full transition-colors whitespace-nowrap shrink-0"
            >
              <FileDown className="w-4 h-4" />
              <span>Download Full 98p Catalog PDF</span>
            </a>
          </div>

          {/* 8 Catalog Series Tabs */}
          <div className="mt-5 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setSelectedCatalogSeries('all')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-colors cursor-pointer ${
                selectedCatalogSeries === 'all'
                  ? 'bg-[#155EEF] text-white border-[#155EEF]'
                  : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-[#155EEF]'
              }`}
            >
              All 8 Chapters ({CATALOG_MODELS_2026.length})
            </button>
            {CATALOG_SERIES_META.map((series) => {
              const active = selectedCatalogSeries === series.id;
              const count = CATALOG_MODELS_2026.filter((m) => m.seriesId === series.id).length;
              return (
                <button
                  key={series.id}
                  type="button"
                  onClick={() => setSelectedCatalogSeries(series.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-colors cursor-pointer ${
                    active
                      ? 'bg-[#155EEF] text-white border-[#155EEF]'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-[#155EEF]'
                  }`}
                >
                  {series.seriesNum}. {series.name} ({count})
                </button>
              );
            })}
          </div>

          {/* Technical Directory Table */}
          {filteredCatalogModels.length === 0 ? (
            <p className="py-10 text-center text-sm text-slate-500">
              {s.productsEmptyTitle} — try clearing your neck or keyword filter.
            </p>
          ) : (
            <div className="mt-6 overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 font-semibold text-xs uppercase tracking-wider">
                    <th className="py-3 pe-4">Model</th>
                    <th className="py-3 pe-4">Product Name</th>
                    <th className="py-3 pe-4">Neck Finish</th>
                    <th className="py-3 pe-4">Material</th>
                    <th className="py-3 pe-4">Output / Dose</th>
                    <th className="py-3 pe-4">Feature</th>
                    <th className="py-3 pe-4 text-right">Page</th>
                    <th className="py-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredCatalogModels.map((entry) => (
                    <tr key={entry.code} className="hover:bg-[#F8FAFE] transition-colors">
                      <td className="py-3 pe-4 font-mono font-bold text-[#155EEF] whitespace-nowrap">
                        {entry.code}
                      </td>
                      <td className="py-3 pe-4 font-semibold text-[#0B1B3E] min-w-[200px]">
                        {entry.name}
                        <span className="block text-xs font-normal text-slate-500">
                          {entry.applications}
                        </span>
                      </td>
                      <td className="py-3 pe-4 font-mono text-xs text-slate-700 whitespace-nowrap tabular-nums">
                        {entry.neckSizes}
                      </td>
                      <td className="py-3 pe-4 font-mono text-xs text-slate-700 whitespace-nowrap">
                        {entry.material}
                      </td>
                      <td className="py-3 pe-4 font-mono text-xs text-[#0B1B3E] whitespace-nowrap tabular-nums">
                        {entry.output}
                      </td>
                      <td className="py-3 pe-4 text-xs text-slate-600 min-w-[180px]">
                        {entry.feature}
                      </td>
                      <td className="py-3 pe-4 text-right font-mono text-xs text-slate-400 tabular-nums whitespace-nowrap">
                        p. {entry.page}
                      </td>
                      <td className="py-3 text-right whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => handleQuoteCatalogModel(entry)}
                          className="inline-flex items-center gap-1 text-xs font-semibold text-[#E1262D] hover:text-[#0B1B3E] cursor-pointer"
                        >
                          <span>{s.productsQuoteBtn}</span>
                          <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Customization Reference Matrices (p. 26-27 Trigger + p. 49 Lotion) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-7 shadow-xs space-y-4">
            <div>
              <p className="text-xs font-semibold tracking-wider text-[#155EEF] uppercase">
                Trigger Customization Matrix · p. 26–27
              </p>
              <h3 className="mt-1 font-display font-bold text-xl text-[#0B1B3E]">
                Modular Nozzles, Triggers, Closures &amp; 14 Shrouds
              </h3>
            </div>

            <div className="space-y-3 text-xs text-slate-600">
              <div>
                <p className="font-semibold text-[#0B1B3E]">Nozzle Options (N1–N6)</p>
                <p className="mt-1 font-mono text-slate-600">
                  {TRIGGER_NOZZLE_CODES.map((n) => `${n.code}: ${n.label}`).join(' · ')}
                </p>
              </div>
              <div>
                <p className="font-semibold text-[#0B1B3E]">Trigger Styles (T1–T6)</p>
                <p className="mt-1 font-mono text-slate-600">
                  {TRIGGER_LEVER_CODES.map((t) => `${t.code}: ${t.label}`).join(' · ')}
                </p>
              </div>
              <div>
                <p className="font-semibold text-[#0B1B3E]">Closures (C1–C5)</p>
                <p className="mt-1 font-mono text-slate-600">
                  {TRIGGER_CLOSURE_CODES.map((c) => `${c.code}: ${c.neck}`).join(' · ')}
                </p>
              </div>
              <div>
                <p className="font-semibold text-[#0B1B3E]">14 Shroud Cover Options</p>
                <p className="mt-1 font-mono text-slate-600">
                  {TRIGGER_SHROUD_STYLES.map((sh) => sh.code).join(' · ')}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-7 shadow-xs space-y-4">
            <div>
              <p className="text-xs font-semibold tracking-wider text-[#E1262D] uppercase">
                Lotion Pump Customization Matrix · p. 49
              </p>
              <h3 className="mt-1 font-display font-bold text-xl text-[#0B1B3E]">
                Lock Mechanisms, Collar Finishes &amp; 25+ Actuator Shapes
              </h3>
            </div>

            <div className="space-y-3 text-xs text-slate-600">
              <div>
                <p className="font-semibold text-[#0B1B3E]">Lock Mechanisms (L1–L3)</p>
                <ul className="mt-1 space-y-1">
                  {LOTION_CUSTOMIZATION_MATRIX.locks.map((l) => (
                    <li key={l.code}>
                      <span className="font-mono font-bold text-[#155EEF]">{l.code}</span> ·{' '}
                      <span className="font-semibold text-[#0B1B3E]">{l.name}</span> — {l.note}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-semibold text-[#0B1B3E]">Closure Finishes (C1–C3)</p>
                <ul className="mt-1 space-y-1">
                  {LOTION_CUSTOMIZATION_MATRIX.finishes.map((f) => (
                    <li key={f.code}>
                      <span className="font-mono font-bold text-[#E1262D]">{f.code}</span> ·{' '}
                      <span className="font-semibold text-[#0B1B3E]">{f.name}</span> — {f.note}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-semibold text-[#0B1B3E]">Compatible Bottle Neck Sizes</p>
                <p className="mt-1 font-mono text-slate-600 tabular-nums">
                  {LOTION_CUSTOMIZATION_MATRIX.necks.join(' · ')} —{' '}
                  {LOTION_CUSTOMIZATION_MATRIX.actuatorNote}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Customizer Callout */}
        <div className="rounded-3xl bg-[#081534] text-white p-7 sm:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="text-xs font-semibold tracking-wider text-[#FF7A80] uppercase">
              {s.productsLabKicker}
            </p>
            <h2 className="mt-1.5 font-display font-extrabold text-2xl sm:text-3xl tracking-tight">
              {s.productsLabTitle}
            </h2>
            <p className="mt-2 text-sm text-blue-100/80 max-w-2xl">{s.productsLabSub}</p>
          </div>
          <button
            type="button"
            onClick={onGoToNozzleLab}
            className="inline-flex items-center gap-2 bg-white hover:bg-blue-50 text-[#081534] font-semibold text-sm px-6 py-3.5 rounded-full transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <span>{s.productsLabBtn}</span>
            <ArrowRight className="w-4 h-4 rtl:rotate-180" />
          </button>
        </div>
      </section>
    </div>
  );
}
