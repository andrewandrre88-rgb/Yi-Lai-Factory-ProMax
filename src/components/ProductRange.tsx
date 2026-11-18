import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Download } from 'lucide-react';
import { PRODUCT_CATEGORIES, ProductCategory } from '../data/factoryData';
import { ProductIcon } from './ProductIcon';

interface ProductRangeProps {
  onViewCategory: (category: ProductCategory) => void;
}

type RangeFilter = 'all' | 'triggers' | 'pumps-mist' | 'closures';

const FILTERS: { id: RangeFilter; label: string }[] = [
  { id: 'all', label: 'All lines' },
  { id: 'triggers', label: 'Trigger Sprayers' },
  { id: 'pumps-mist', label: 'Lotion & Fine Mist' },
  { id: 'closures', label: 'Bottle Caps' },
];

export function ProductRange({ onViewCategory }: ProductRangeProps) {
  const [filter, setFilter] = useState<RangeFilter>('all');

  const visibleCategories = PRODUCT_CATEGORIES.filter((cat) => {
    if (filter === 'all') return true;
    if (filter === 'triggers') {
      return ['trigger-sprayers', 'mini-trigger-sprayers', 'foam-triggers'].includes(cat.id);
    }
    if (filter === 'pumps-mist') {
      return ['lotion-pumps', 'fine-mist-sprayers'].includes(cat.id);
    }
    return cat.id === 'bottle-caps-closures';
  });

  const handleDownloadCatalogue = () => {
    const lines = [
      'YI LAI PLASTICS INDUSTRY — TECHNICAL DISPENSING CATALOGUE (2026)',
      'Factory: Yuyao, Ningbo, Zhejiang, China | Email: yilaiplastics@gmail.com',
      '=========================================================================',
      '',
      ...PRODUCT_CATEGORIES.flatMap((cat) => [
        `${cat.index}. ${cat.name.toUpperCase()}`,
        `   Summary: ${cat.summary}`,
        `   Neck Finishes: ${cat.neckRange} | Output: ${cat.outputRange} | Standard MOQ: ${cat.moq}`,
        ...cat.variants.map(
          (v) =>
            `   - ${v.model}: ${v.neckFinish} | Dosage ${v.dosage} | Closure: ${v.closureStyle} | Spring: ${v.springType}`
        ),
        '',
      ]),
    ];

    const blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Yi-Lai-Plastics-Dispensing-Catalogue-2026.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <section id="products" className="py-16 sm:py-24 bg-[#F6F9FE]">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-xl">
            <p className="text-xs font-semibold tracking-wider text-[#E1262D] uppercase">
              Our Product Range
            </p>
            <h2 className="mt-2 font-display font-extrabold text-3xl sm:text-4xl text-[#0B1B3E] tracking-tight text-balance">
              Dispensing solutions for every bottle on the shelf
            </h2>
          </div>

          <button
            type="button"
            onClick={handleDownloadCatalogue}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#155EEF] hover:text-[#0B1B3E] transition-colors whitespace-nowrap shrink-0 cursor-pointer py-2"
          >
            <span>Download technical spec sheet</span>
            <Download className="w-4 h-4" />
          </button>
        </div>

        {/* Interactive Product Family Filter Bar */}
        <div className="mt-7 flex flex-wrap items-center gap-2" role="tablist" aria-label="Filter product categories">
          {FILTERS.map((f) => {
            const active = filter === f.id;
            return (
              <button
                key={f.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setFilter(f.id)}
                className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer border ${
                  active
                    ? 'bg-[#0B1B3E] text-white border-[#0B1B3E]'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-[#155EEF] hover:text-[#155EEF]'
                }`}
              >
                {f.label}
              </button>
            );
          })}
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visibleCategories.map((cat, idx) => (
            <motion.article
              key={cat.id}
              layout
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.32, delay: idx * 0.04, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4 }}
              onClick={() => onViewCategory(cat)}
              className="group relative bg-white rounded-2xl border border-slate-200/90 hover:border-[#155EEF]/60 p-7 transition-shadow duration-200 hover:shadow-lg flex flex-col justify-between overflow-hidden cursor-pointer"
            >
              {/* Animated geometric arc accent */}
              <div
                className={`pointer-events-none absolute -top-12 -right-12 w-36 h-36 rounded-full border-[14px] opacity-[0.08] transition-transform duration-300 group-hover:scale-110 ${
                  cat.accent === 'crimson' ? 'border-[#E1262D]' : 'border-[#155EEF]'
                }`}
                aria-hidden="true"
              />

              <div>
                <div className="flex items-start justify-between gap-4">
                  <motion.div
                    whileHover={{ rotate: [0, -6, 4, 0] }}
                    transition={{ duration: 0.35 }}
                    className={`w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-xs ${
                      cat.accent === 'crimson' ? 'bg-[#E1262D]' : 'bg-[#155EEF]'
                    }`}
                  >
                    <ProductIcon categoryId={cat.id} className="w-6 h-6" />
                  </motion.div>
                  <span className="font-mono text-xs font-semibold text-slate-400 tabular-nums">
                    {cat.index}
                  </span>
                </div>

                <h3 className="mt-6 font-display font-bold text-xl text-[#0B1B3E] tracking-tight group-hover:text-[#155EEF] transition-colors">
                  {cat.name}
                </h3>

                <p className="mt-2.5 text-sm text-slate-600 leading-relaxed">
                  {cat.summary}
                </p>

                <p className="mt-4 pt-4 border-t border-slate-100 text-xs font-mono text-slate-500 tabular-nums">
                  {cat.neckRange} · {cat.outputRange}
                </p>
              </div>

              <div className="mt-5">
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#E1262D] group-hover:text-[#0B1B3E] transition-colors">
                  <span>View range</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-1.5" />
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
