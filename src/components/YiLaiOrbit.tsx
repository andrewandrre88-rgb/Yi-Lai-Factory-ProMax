import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BrandMark } from './BrandMark';
import { LanguageCode, ProductCategory } from '../data/factoryData';
import { getAppStrings, getLocalizedCategories } from '../data/translations';
import { ProductIcon } from './ProductIcon';

interface YiLaiOrbitProps {
  lang: LanguageCode;
  onSelectCategory: (category: ProductCategory) => void;
  onOpenCatalogue?: () => void;
}

export function YiLaiOrbit({ lang, onSelectCategory, onOpenCatalogue }: YiLaiOrbitProps) {
  const s = getAppStrings(lang);
  const categories = getLocalizedCategories(lang);
  const [paused, setPaused] = useState(false);
  const [hoveredCatId, setHoveredCatId] = useState<string | null>(null);
  const [angleOffset, setAngleOffset] = useState(0);
  const rafRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);

  const hoveredCat = hoveredCatId ? categories.find((c) => c.id === hoveredCatId) ?? null : null;

  useEffect(() => {
    const step = (timestamp: number) => {
      if (lastTimeRef.current !== null && !paused) {
        const delta = timestamp - lastTimeRef.current;
        setAngleOffset((prev) => (prev + delta * 0.008) % 360);
      }
      lastTimeRef.current = timestamp;
      rafRef.current = window.requestAnimationFrame(step);
    };

    rafRef.current = window.requestAnimationFrame(step);
    return () => {
      if (rafRef.current !== null) window.cancelAnimationFrame(rafRef.current);
    };
  }, [paused]);

  return (
    <section className="py-16 sm:py-20 bg-white border-b border-slate-100 overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-xs font-semibold tracking-wider text-[#E1262D] uppercase">
            {s.orbitKicker}
          </p>
          <h2 className="mt-2 font-display font-extrabold text-3xl sm:text-4xl text-[#0B1B3E] tracking-tight text-balance">
            {s.orbitTitle}
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base">
            {s.orbitSub}
          </p>
        </div>

        <div
          className="relative mt-12 mx-auto max-w-[840px] h-[390px] sm:h-[440px] flex items-center justify-center"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => {
            setPaused(false);
            setHoveredCatId(null);
          }}
        >
          {/* Animated Concentric Orbital Rings */}
          <svg
            viewBox="0 0 800 420"
            className="absolute inset-0 w-full h-full pointer-events-none"
            aria-hidden="true"
          >
            <ellipse
              cx="400"
              cy="210"
              rx="340"
              ry="155"
              stroke="#C7D7FA"
              strokeWidth="2"
              strokeDasharray="6 6"
              fill="none"
            />
            <motion.ellipse
              cx="400"
              cy="210"
              rx="235"
              ry="105"
              stroke="#E8EFFD"
              strokeWidth="8"
              fill="none"
              animate={{ opacity: [0.65, 1, 0.65] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />
          </svg>

          {/* Center Factory Emblem + Dynamic Hover Spec Preview */}
          <div className="relative z-10 w-44 h-44 sm:w-52 sm:h-52 rounded-full bg-white border border-blue-100 shadow-md flex flex-col items-center justify-center p-4 text-center">
            <AnimatePresence mode="wait">
              {hoveredCat ? (
                <motion.div
                  key={hoveredCat.id}
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.16 }}
                  className="flex flex-col items-center"
                >
                  <span className="font-mono text-[11px] font-bold text-[#E1262D]">
                    {s.orbitSeries} {hoveredCat.index}
                  </span>
                  <span className="mt-1 font-display font-extrabold text-sm sm:text-base text-[#0B1B3E] leading-tight">
                    {hoveredCat.name}
                  </span>
                  <span className="mt-1.5 font-mono text-[11px] text-[#155EEF] font-semibold">
                    {hoveredCat.outputRange}
                  </span>
                  <span className="mt-0.5 text-[10px] text-slate-500">
                    {hoveredCat.neckRange}
                  </span>
                </motion.div>
              ) : (
                <motion.div
                  key="default-emblem"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.16 }}
                  className="flex flex-col items-center"
                >
                  <BrandMark className="w-16 h-16 sm:w-20 sm:h-20" />
                  <span className="mt-1.5 text-[11px] font-semibold text-slate-500 whitespace-nowrap">
                    {paused ? s.orbitPaused : s.orbitPlant}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* 6 Smoothly Orbiting Product Nodes */}
          {categories.map((cat, idx) => {
            const baseDeg = idx * 60 + angleOffset;
            const rad = (baseDeg * Math.PI) / 180;
            const xPct = 50 + Math.cos(rad) * 41;
            const yPct = 50 + Math.sin(rad) * 37;
            const isHovered = hoveredCatId === cat.id;

            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => onSelectCategory(cat)}
                onMouseEnter={() => setHoveredCatId(cat.id)}
                onFocus={() => {
                  setPaused(true);
                  setHoveredCatId(cat.id);
                }}
                style={{
                  left: `${xPct}%`,
                  top: `${yPct}%`,
                  transform: `translate(-50%, -50%) scale(${isHovered ? 1.07 : 1})`,
                }}
                className={`absolute z-20 inline-flex items-center gap-2.5 bg-white border rounded-full py-1.5 ps-1.5 pe-4 shadow-sm transition-all duration-150 whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#155EEF] ${
                  isHovered
                    ? 'border-[#155EEF] shadow-md bg-[#F5F8FE]'
                    : 'border-slate-200 hover:border-[#155EEF]'
                }`}
              >
                <span
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-white shrink-0 ${
                    cat.accent === 'crimson' ? 'bg-[#E1262D]' : 'bg-[#155EEF]'
                  }`}
                >
                  <ProductIcon categoryId={cat.id} className="w-4 h-4" />
                </span>
                <span className="text-xs sm:text-sm font-semibold text-[#0B1B3E]">
                  {cat.shortName}
                </span>
              </button>
            );
          })}
        </div>

        {onOpenCatalogue && (
          <div className="mt-6 text-center">
            <button
              type="button"
              onClick={onOpenCatalogue}
              className="inline-flex items-center gap-2 bg-[#0B1B3E] hover:bg-[#155EEF] text-white font-semibold text-sm px-6 py-3 rounded-full transition-colors cursor-pointer shadow-xs"
            >
              <span>{s.orbitBrowseAll}</span>
              <span aria-hidden="true" className="rtl:inline-block rtl:rotate-180">→</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
