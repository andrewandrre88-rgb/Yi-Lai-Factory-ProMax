import { useEffect } from 'react';
import { ArrowRight, X } from 'lucide-react';
import { LanguageCode, ProductCategory, ProductVariant } from '../data/factoryData';
import { getAppStrings } from '../data/translations';
import { ProductIcon } from './ProductIcon';

interface ProductSpecModalProps {
  lang: LanguageCode;
  category: ProductCategory | null;
  onClose: () => void;
  onSelectForQuote: (categoryId: string, variant: ProductVariant) => void;
}

export function ProductSpecModal({
  lang,
  category,
  onClose,
  onSelectForQuote,
}: ProductSpecModalProps) {
  const s = getAppStrings(lang);

  useEffect(() => {
    if (!category) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [category, onClose]);

  if (!category) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#0B1B3E]/65 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-product-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl max-h-[88vh] overflow-y-auto bg-white rounded-3xl border border-slate-200 shadow-2xl p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-4">
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center text-white shrink-0 ${
                category.accent === 'crimson' ? 'bg-[#E1262D]' : 'bg-[#155EEF]'
              }`}
            >
              <ProductIcon categoryId={category.id} className="w-6 h-6" />
            </div>
            <div>
              <p className="text-xs font-mono font-semibold text-slate-400">
                {s.productsSeriesLabel} {category.index} · {category.neckRange}
              </p>
              <h3
                id="modal-product-title"
                className="font-display font-extrabold text-2xl text-[#0B1B3E] tracking-tight"
              >
                {category.name}
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors cursor-pointer shrink-0"
            aria-label={s.modalCloseAria}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="mt-5 text-sm sm:text-base text-slate-600 leading-relaxed">
          {category.summary}
        </p>

        <div className="mt-6 space-y-4">
          {category.variants.map((variant) => (
            <div
              key={variant.model}
              className="rounded-2xl border border-slate-200 bg-[#F8FAFE] p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-5"
            >
              <div className="space-y-2 flex-1">
                <div className="flex flex-wrap items-center gap-3">
                  <h4 className="font-display font-bold text-base sm:text-lg text-[#0B1B3E]">
                    {variant.model}
                  </h4>
                  <span className="font-mono text-xs font-semibold text-[#155EEF]">
                    {variant.neckFinish}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 text-xs text-slate-600">
                  <p>
                    <span className="font-semibold text-slate-800">{s.modalDosage}</span>{' '}
                    <span className="font-mono tabular-nums">{variant.dosage}</span>
                  </p>
                  <p>
                    <span className="font-semibold text-slate-800">{s.modalClosure}</span> {variant.closureStyle}
                  </p>
                  <p>
                    <span className="font-semibold text-slate-800">{s.modalSpring}</span> {variant.springType}
                  </p>
                  <p>
                    <span className="font-semibold text-slate-800">{s.modalMoq}</span>{' '}
                    <span className="font-mono tabular-nums">{variant.moq}</span>
                  </p>
                </div>

                <p className="text-xs text-slate-500 pt-1">
                  <span className="font-semibold text-slate-700">{s.modalApps}</span> {variant.applications}
                </p>
              </div>

              <button
                type="button"
                onClick={() => onSelectForQuote(category.id, variant)}
                className="inline-flex items-center justify-center gap-2 bg-[#E1262D] hover:bg-[#C61D24] text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-full transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <span>{s.modalQuoteBtn}</span>
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

