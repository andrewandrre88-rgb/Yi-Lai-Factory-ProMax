import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight, Download, Search, SlidersHorizontal } from 'lucide-react';
import { LanguageCode, ProductCategory, ProductVariant } from '../data/factoryData';
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

const NECK_SIZES = ['18/415', '20/410', '24/410', '28/400', '28/410', '33/410'] as const;

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

  useEffect(() => {
    if (initialCategoryId) {
      setSelectedCategoryId(initialCategoryId);
    }
  }, [initialCategoryId]);

  const handleDownloadCatalogue = () => {
    const lines = [
      'YI LAI PLASTICS INDUSTRY — TECHNICAL DISPENSING CATALOGUE (2026)',
      'Factory: Yuyao, Ningbo, Zhejiang, China | Email: yilaiplastics@gmail.com',
      '=========================================================================',
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
    ];

    const blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Yi-Lai-Plastics-Dispensing-Catalogue-2026-${lang}.txt`;
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
        const matchesNeck = selectedNeck === 'all' || v.neckFinish.includes(selectedNeck);
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
              <button
                type="button"
                onClick={handleDownloadCatalogue}
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#155EEF] hover:text-[#0B1B3E] transition-colors cursor-pointer"
              >
                <span>{s.productsDownloadSpec}</span>
                <Download className="w-4 h-4" />
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
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono font-semibold transition-colors cursor-pointer border ${
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
            <div className="pt-3 border-t border-slate-100 flex flex-wrap gap-2" role="tablist" aria-label={s.productsKicker}>
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

      {/* Full Series & Model Specification List */}
      <section className="max-w-[1280px] mx-auto px-5 sm:px-8 pt-10 space-y-10">
        {filteredCategories.length === 0 ? (
          <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center">
            <h2 className="font-display font-bold text-xl text-[#0B1B3E]">
              {s.productsEmptyTitle}
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              {s.productsEmptySub}
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategoryId('all');
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
                      <p className="mt-1.5 text-sm text-slate-600 max-w-2xl">
                        {cat.summary}
                      </p>
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
                              <dt className="text-slate-400 font-medium">{s.productsNeckFinishLabel}</dt>
                              <dd className="font-mono font-semibold text-[#0B1B3E] tabular-nums text-end">
                                {variant.neckFinish}
                              </dd>
                            </div>
                            <div className="flex justify-between gap-3">
                              <dt className="text-slate-400 font-medium">{s.productsDosageLabel}</dt>
                              <dd className="font-mono font-semibold text-[#0B1B3E] tabular-nums text-end">
                                {variant.dosage}
                              </dd>
                            </div>
                            <div className="flex justify-between gap-3">
                              <dt className="text-slate-400 font-medium">{s.productsGalleryLabel}</dt>
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

        {/* Bottom Customizer Callout */}
        <div className="rounded-3xl bg-[#081534] text-white p-7 sm:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="text-xs font-semibold tracking-wider text-[#FF7A80] uppercase">
              {s.productsLabKicker}
            </p>
            <h2 className="mt-1.5 font-display font-extrabold text-2xl sm:text-3xl tracking-tight">
              {s.productsLabTitle}
            </h2>
            <p className="mt-2 text-sm text-blue-100/80 max-w-2xl">
              {s.productsLabSub}
            </p>
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

