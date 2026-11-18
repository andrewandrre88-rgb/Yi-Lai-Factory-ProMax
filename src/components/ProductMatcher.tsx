import { useState } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { LanguageCode } from '../data/factoryData';
import { getAppStrings, getLocalizedMatcherOptions } from '../data/translations';
import { ProductIcon } from './ProductIcon';

interface ProductMatcherProps {
  lang: LanguageCode;
  onRequestSamples: (categoryId: string, note: string) => void;
  onSeeRange: (categoryId: string) => void;
}

export function ProductMatcher({ lang, onRequestSamples, onSeeRange }: ProductMatcherProps) {
  const s = getAppStrings(lang);
  const options = getLocalizedMatcherOptions(lang);
  const [selectedId, setSelectedId] = useState(options[0].id);
  const current = options.find((item) => item.id === selectedId) ?? options[0];

  return (
    <section className="py-16 sm:py-24 bg-white border-y border-slate-100">
      <div className="max-w-[1000px] mx-auto px-5 sm:px-8">
        <div className="text-center">
          <p className="text-xs font-semibold tracking-wider text-[#E1262D] uppercase">
            {s.matcherKicker}
          </p>
          <h2 className="mt-2 font-display font-extrabold text-3xl sm:text-4xl text-[#0B1B3E] tracking-tight text-balance">
            {s.matcherTitle}
          </h2>
          <p className="mt-2.5 text-sm sm:text-base text-slate-600">
            {s.matcherSub}
          </p>
        </div>

        {/* Interactive Formula Filter Controls */}
        <div
          className="mt-8 flex flex-wrap items-center justify-center gap-2.5"
          role="tablist"
          aria-label={s.matcherKicker}
        >
          {options.map((option) => {
            const active = option.id === selectedId;
            return (
              <button
                key={option.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setSelectedId(option.id)}
                className={`px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-150 whitespace-nowrap shrink-0 cursor-pointer border ${
                  active
                    ? 'bg-[#0B1B3E] text-white border-[#0B1B3E] shadow-sm'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-[#155EEF] hover:text-[#155EEF]'
                }`}
              >
                {option.label}
              </button>
            );
          })}
        </div>

        {/* Matched Dispenser Card */}
        <div className="mt-8 bg-[#F6F9FE] rounded-3xl border border-slate-200/90 p-6 sm:p-10 flex flex-col md:flex-row items-start md:items-center gap-7">
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-[#155EEF] text-white flex items-center justify-center shrink-0 shadow-sm">
            <ProductIcon categoryId={current.recommendedCategoryId} className="w-11 h-11" />
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold tracking-wider text-[#155EEF] uppercase">
              {s.matcherRecommended}
            </p>
            <h3 className="mt-1 font-display font-extrabold text-2xl sm:text-3xl text-[#0B1B3E] tracking-tight">
              {current.recommendedTitle}
            </h3>
            <p className="mt-1.5 text-xs font-mono text-slate-500 tabular-nums">
              {current.dosageSpec} · {current.neckSpec}
            </p>
            <p className="mt-3 text-sm sm:text-base text-slate-700 leading-relaxed">
              {current.rationale}
            </p>
            <p className="mt-2.5 inline-flex items-start gap-2 text-xs text-slate-600">
              <CheckCircle2 className="w-4 h-4 text-[#155EEF] shrink-0 mt-0.5" />
              <span>{current.compatibilityNote}</span>
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() =>
                  onRequestSamples(
                    current.recommendedCategoryId,
                    `${current.label} — ${current.recommendedTitle}: ${current.dosageSpec} (${current.neckSpec}).`
                  )
                }
                className="inline-flex items-center gap-2 bg-[#E1262D] hover:bg-[#C61D24] text-white font-semibold text-sm px-5 py-2.5 rounded-full transition-colors cursor-pointer"
              >
                <span>{s.matcherRequestSamples}</span>
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </button>
              <button
                type="button"
                onClick={() => onSeeRange(current.recommendedCategoryId)}
                className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-[#0B1B3E] border border-slate-300 font-semibold text-sm px-5 py-2.5 rounded-full transition-colors cursor-pointer"
              >
                <span>{s.matcherSeeRange}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
