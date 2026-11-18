import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView, useReducedMotion } from 'motion/react';
import { ArrowRight, Check, Crosshair, RotateCcw } from 'lucide-react';
import { LanguageCode, UI_TRANSLATIONS } from '../data/factoryData';
import { getAppStrings } from '../data/translations';
import { LanguageSwitcher } from './LanguageSwitcher';

interface HeroSectionProps {
  lang: LanguageCode;
  onChangeLang: (lang: LanguageCode) => void;
  onExploreProducts: () => void;
  onViewCatalog: () => void;
}

const HERO_MODES = ['spray', 'stream', 'foam'] as const;
type HeroMode = (typeof HERO_MODES)[number];

const MODE_LABELS: Record<LanguageCode, Record<HeroMode, string>> = {
  en: { spray: 'spray', stream: 'stream', foam: 'foam' },
  es: { spray: 'atomizado', stream: 'chorro', foam: 'espuma' },
  ar: { spray: 'رذاذ', stream: 'تيار', foam: 'رغوة' },
};

function AnimatedKpiNumber({
  target,
  delay = 0,
  shouldAnimate,
}: {
  target: number;
  delay?: number;
  shouldAnimate: boolean;
}) {
  const prefersReduced = useReducedMotion();
  const [displayValue, setDisplayValue] = useState(prefersReduced ? target : 0);

  useEffect(() => {
    if (prefersReduced) {
      setDisplayValue(target);
      return;
    }
    if (!shouldAnimate) return;

    let rafId = 0;
    let startTime = 0;
    const duration = 1150;

    const timeoutId = window.setTimeout(() => {
      const step = (now: number) => {
        if (!startTime) startTime = now;
        const progress = Math.min((now - startTime) / duration, 1);
        // Smooth ease-out quintic curve
        const eased = 1 - Math.pow(1 - progress, 4);
        setDisplayValue(Math.round(target * eased));
        if (progress < 1) {
          rafId = window.requestAnimationFrame(step);
        }
      };
      rafId = window.requestAnimationFrame(step);
    }, delay);

    return () => {
      window.clearTimeout(timeoutId);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, [target, delay, shouldAnimate, prefersReduced]);

  return (
    <motion.div
      initial={prefersReduced ? false : { opacity: 0, y: 12, scale: 0.92 }}
      animate={shouldAnimate || prefersReduced ? { opacity: 1, y: 0, scale: 1 } : {}}
      whileHover={prefersReduced ? undefined : { y: -2, scale: 1.04 }}
      transition={{
        duration: 0.45,
        delay: delay / 1000,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="inline-flex items-baseline font-display font-extrabold text-3xl sm:text-4xl tracking-tight tabular-nums select-none"
    >
      {displayValue}
      <motion.span
        initial={prefersReduced ? false : { scale: 0.5, opacity: 0 }}
        animate={
          prefersReduced
            ? { scale: 1, opacity: 1 }
            : shouldAnimate
            ? {
                opacity: 1,
                scale: [1, 1.24, 1],
                rotate: [0, 10, 0],
              }
            : {}
        }
        transition={{
          opacity: { duration: 0.3, delay: delay / 1000 + 0.15 },
          scale: {
            duration: 2.2,
            delay: delay / 1000 + 1.05,
            repeat: Infinity,
            repeatDelay: 2.8,
            ease: 'easeInOut',
          },
          rotate: {
            duration: 2.2,
            delay: delay / 1000 + 1.05,
            repeat: Infinity,
            repeatDelay: 2.8,
            ease: 'easeInOut',
          },
        }}
        className="inline-block text-[#FF8C8F] ms-0.5"
      >
        +
      </motion.span>
    </motion.div>
  );
}

export function HeroSection({
  lang,
  onChangeLang,
  onExploreProducts,
  onViewCatalog,
}: HeroSectionProps) {
  const t = UI_TRANSLATIONS[lang];
  const s = getAppStrings(lang);
  const [modeIndex, setModeIndex] = useState(0);
  const [pullCount, setPullCount] = useState(0);
  const [isSqueezing, setIsSqueezing] = useState(false);
  const kpiStripRef = useRef<HTMLDivElement | null>(null);
  const kpiInView = useInView(kpiStripRef, { once: true, amount: 0.3 });

  const activeMode = HERO_MODES[modeIndex];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setModeIndex((prev) => (prev + 1) % HERO_MODES.length);
    }, 3400);
    return () => window.clearInterval(timer);
  }, []);

  const handlePullTrigger = () => {
    setIsSqueezing(true);
    setPullCount((c) => c + 1);
    window.setTimeout(() => setIsSqueezing(false), 320);
  };

  const totalMl = (pullCount * 1.25).toFixed(2);

  return (
    <section id="top" className="relative overflow-hidden bg-gradient-to-b from-[#FFFFFF] via-[#F7FAFF] to-[#EEF4FD] pt-6 pb-12 sm:pb-16">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
        {/* Regional Trust Line + Language Selector Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-slate-200/70">
          <p className="text-xs sm:text-sm font-medium text-slate-600 tracking-tight">
            {t.heroTrust}
          </p>

          <LanguageSwitcher lang={lang} onChangeLang={onChangeLang} />
        </div>

        {/* Main 2-Column Split Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch pt-10 lg:pt-12">
          {/* Left Copy Column */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <h1
              className={`font-display font-extrabold text-[#0B1B3E] text-[clamp(2.4rem,4.5vw,3.9rem)] tracking-tight text-balance ${
                lang === 'ar' ? 'leading-[1.24]' : 'leading-[1.06]'
              }`}
            >
              {t.heroTitlePrefix}{' '}
              <span className="inline-block min-w-[140px] overflow-hidden align-bottom">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={`${lang}-${activeMode}`}
                    initial={{ y: 18, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -18, opacity: 0 }}
                    transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                    className="inline-block text-[#0B1B3E]"
                  >
                    {MODE_LABELS[lang][activeMode]},
                  </motion.span>
                </AnimatePresence>
              </span>
              <br />
              <span className="relative inline-block text-[#155EEF]">
                {t.heroTitleHighlight}
                <svg
                  viewBox="0 0 260 14"
                  fill="none"
                  className="absolute -bottom-1.5 left-0 w-full h-3 pointer-events-none"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <motion.path
                    d="M3 10.5C68 3.5 182 2 257 8.5"
                    stroke="#E1262D"
                    strokeWidth="4.5"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.85, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  />
                </svg>
              </span>
              <br />
              <span className="text-[#E1262D]">{t.heroTitleSuffix}</span>
            </h1>

            <p className="mt-6 text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
              {t.heroSub}
            </p>

            {/* Primary & Secondary Actions */}
            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <button
                type="button"
                onClick={onExploreProducts}
                className="inline-flex items-center gap-2.5 bg-[#155EEF] hover:bg-[#0F4CD4] text-white font-semibold text-sm sm:text-base px-6 py-3.5 rounded-full transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#155EEF]"
              >
                <span>{t.exploreProducts}</span>
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </button>

              <button
                type="button"
                onClick={onViewCatalog}
                className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-[#0B1B3E] border border-slate-300 font-semibold text-sm sm:text-base px-6 py-3.5 rounded-full transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0B1B3E]"
              >
                <span>{t.getFreeSamples}</span>
              </button>
            </div>

            {/* Clean Capability Checkmarks */}
            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-600">
              <span className="inline-flex items-center gap-1.5">
                <Check className="w-4 h-4 text-[#155EEF]" />
                {s.heroCheck1}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Check className="w-4 h-4 text-[#155EEF]" />
                {s.heroCheck2}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Check className="w-4 h-4 text-[#155EEF]" />
                {s.heroCheck3}
              </span>
            </div>
          </div>

          {/* Right Interactive Trigger Showcase */}
          <div className="lg:col-span-6 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, y: 18, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-[490px] aspect-square flex items-center justify-center bg-white/90 rounded-3xl border border-slate-200/80 p-6 shadow-sm overflow-hidden"
            >
              {/* Soft Reactive Radial Aura Behind Sprayer */}
              <motion.div
                animate={{
                  scale: isSqueezing ? [1, 1.16, 1] : [1, 1.04, 1],
                  opacity: isSqueezing ? [0.45, 0.85, 0.45] : [0.3, 0.5, 0.3],
                }}
                transition={{
                  duration: isSqueezing ? 0.35 : 4.2,
                  repeat: isSqueezing ? 0 : Infinity,
                  ease: 'easeInOut',
                }}
                className="pointer-events-none absolute inset-10 rounded-full bg-radial from-blue-200/50 via-blue-100/20 to-transparent blur-xl"
                aria-hidden="true"
              />

              {/* Interactive Sprayer SVG Assembly */}
              <motion.svg
                viewBox="0 0 400 400"
                onClick={handlePullTrigger}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.985 }}
                transition={{ type: 'spring', stiffness: 320, damping: 22 }}
                className="relative z-10 w-full h-full max-w-[385px] select-none cursor-pointer"
                aria-label="Interactive trigger sprayer diagram — click to pull trigger"
              >
                <defs>
                  <linearGradient id="ringBlue" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#155EEF" />
                    <stop offset="55%" stopColor="#2E7BF6" />
                    <stop offset="100%" stopColor="#0F4CD4" />
                  </linearGradient>
                  <linearGradient id="swoopRed" x1="0" y1="0" x2="1" y2="0.5">
                    <stop offset="0%" stopColor="#E1262D" />
                    <stop offset="100%" stopColor="#FF4D54" />
                  </linearGradient>
                </defs>

                {/* Outer Cobalt Circle with Kinetic Pulse */}
                <motion.circle
                  cx="200"
                  cy="200"
                  r="148"
                  stroke="url(#ringBlue)"
                  strokeWidth="16"
                  fill="#F8FBFF"
                  animate={{
                    scale: isSqueezing ? [1, 1.03, 1] : 1,
                    strokeWidth: isSqueezing ? [16, 19, 16] : 16,
                  }}
                  transition={{ duration: 0.32, ease: 'easeOut' }}
                  style={{ transformOrigin: '200px 200px' }}
                />

                {/* Rotating Secondary Blueprint Gauge Ring */}
                <motion.circle
                  cx="200"
                  cy="200"
                  r="131"
                  stroke="#93C5FD"
                  strokeWidth="1.5"
                  strokeDasharray="8 10"
                  fill="none"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 36, repeat: Infinity, ease: 'linear' }}
                  style={{ transformOrigin: '200px 200px' }}
                />

                {/* Crimson Dynamic Orbit Swoop with Living Motion */}
                <motion.path
                  d="M44 185C108 98 258 76 364 142C342 184 316 226 286 262C312 206 322 170 330 154C244 106 122 124 44 185Z"
                  fill="url(#swoopRed)"
                  animate={{
                    rotate: isSqueezing ? [0, 4, 0] : [0, 1.8, 0, -1.5, 0],
                    scale: isSqueezing ? [1, 1.045, 1] : [1, 1.01, 1],
                  }}
                  transition={{
                    duration: isSqueezing ? 0.32 : 5.5,
                    repeat: isSqueezing ? 0 : Infinity,
                    ease: 'easeInOut',
                  }}
                  style={{ transformOrigin: '205px 175px' }}
                />

                {/* Bottle Neck & Animated Liquid Draw */}
                <path
                  d="M150 282C150 264 166 254 182 254H218C234 254 250 264 250 282V312H150V282Z"
                  fill="#E8F0FE"
                  stroke="#93B4F5"
                  strokeWidth="2.5"
                />
                {/* Bottle Liquid Meniscus */}
                <motion.path
                  d="M153 289 Q176 284 200 289 T247 289 V310 H153 Z"
                  fill="#BFDBFE"
                  animate={{
                    y: isSqueezing ? [0, -3, 0] : [0, 1.5, 0],
                  }}
                  transition={{
                    duration: isSqueezing ? 0.3 : 2.6,
                    repeat: isSqueezing ? 0 : Infinity,
                    ease: 'easeInOut',
                  }}
                />
                {/* Dip Tube */}
                <rect x="195" y="254" width="10" height="58" rx="3" fill="#93B4F5" />
                {/* Upward Suction Pulse Inside Dip Tube on Squeeze */}
                <AnimatePresence>
                  {isSqueezing && (
                    <motion.circle
                      key={`draw-${pullCount}`}
                      cx="200"
                      cy="306"
                      r="3.2"
                      fill="#155EEF"
                      initial={{ cy: 306, opacity: 1 }}
                      animate={{ cy: 256, opacity: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeOut' }}
                    />
                  )}
                </AnimatePresence>

                {/* Sprayer Head Assembly with Mechanical Recoil */}
                <motion.g
                  animate={{
                    y: isSqueezing ? [0, 2.5, 0] : [0, -2, 0],
                    rotate: isSqueezing ? [0, -1.5, 0] : 0,
                  }}
                  transition={{
                    duration: isSqueezing ? 0.26 : 3.6,
                    repeat: isSqueezing ? 0 : Infinity,
                    ease: 'easeInOut',
                  }}
                  style={{ transformOrigin: '200px 235px' }}
                >
                  {/* Animated Ergonomic Trigger (kept as first child <g> for structural continuity) */}
                  <motion.g
                    animate={{
                      rotate: isSqueezing ? -22 : 0,
                      x: isSqueezing ? -7 : 0,
                    }}
                    transition={{ type: 'spring', stiffness: 520, damping: 20 }}
                    style={{ originX: '248px', originY: '158px' }}
                  >
                    <path
                      d="M236 154H263C267 154 270 158 269 162L254 216C252 221 247 224 242 222L234 219C230 217 229 212 230 207L236 154Z"
                      fill="#E1262D"
                    />
                    <line x1="242" y1="170" x2="256" y2="170" stroke="#F87171" strokeWidth="2.5" strokeLinecap="round" />
                    <line x1="240" y1="184" x2="253" y2="184" stroke="#F87171" strokeWidth="2.5" strokeLinecap="round" />
                    <line x1="238" y1="198" x2="250" y2="198" stroke="#F87171" strokeWidth="2.5" strokeLinecap="round" />
                  </motion.g>

                  {/* Ribbed Screw Closure */}
                  <rect x="155" y="218" width="90" height="38" rx="6" fill="#155EEF" />
                  {[166, 177, 188, 199, 210, 221, 232].map((x) => (
                    <line
                      key={x}
                      x1={x}
                      y1="224"
                      x2={x}
                      y2="250"
                      stroke="#0D43B8"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                  ))}

                  {/* Main Trigger Shroud */}
                  <path
                    d="M174 218V154C174 128 192 114 218 114H272C281 114 287 120 287 129V152C287 161 281 166 272 166H236C228 166 224 171 224 179V218H174Z"
                    fill="#155EEF"
                  />
                  <path
                    d="M186 206V156C186 136 198 126 218 126H256"
                    stroke="#60A5FA"
                    strokeWidth="4"
                    strokeLinecap="round"
                    fill="none"
                  />

                  {/* Nozzle Cap & Orifice Pulse */}
                  <rect x="284" y="122" width="18" height="32" rx="4" fill="#0B1B3E" />
                  <motion.circle
                    cx="297"
                    cy="138"
                    r="3.2"
                    fill="#60A5FA"
                    animate={{
                      scale: isSqueezing ? [1, 1.8, 1] : [1, 1.25, 1],
                      opacity: isSqueezing ? 1 : [0.75, 1, 0.75],
                    }}
                    transition={{
                      duration: isSqueezing ? 0.25 : 2,
                      repeat: isSqueezing ? 0 : Infinity,
                    }}
                    style={{ transformOrigin: '297px 138px' }}
                  />
                </motion.g>

                {/* Ambient Floating Precision Micro-Sparkles */}
                <motion.path
                  d="M348 82L351 90L359 93L351 96L348 104L345 96L337 93L345 90Z"
                  fill="#3B82F6"
                  animate={{ scale: [0.8, 1.15, 0.8], opacity: [0.4, 0.9, 0.4], rotate: [0, 15, 0] }}
                  transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
                  style={{ transformOrigin: '348px 93px' }}
                />
                <motion.path
                  d="M66 278L68.5 284L74.5 286.5L68.5 289L66 295L63.5 289L57.5 286.5L63.5 284Z"
                  fill="#E1262D"
                  animate={{ scale: [0.75, 1.2, 0.75], opacity: [0.35, 0.85, 0.35], rotate: [0, -18, 0] }}
                  transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 0.7 }}
                  style={{ transformOrigin: '66px 286.5px' }}
                />

                {/* Multi-Particle Spray / Stream / Foam Burst on Trigger Squeeze */}
                <AnimatePresence>
                  {isSqueezing && (
                    <motion.g key={`burst-${pullCount}`}>
                      {activeMode === 'spray' &&
                        [
                          { dx: 38, dy: -22, r: 3.6, delay: 0 },
                          { dx: 52, dy: -12, r: 3.2, delay: 0.02 },
                          { dx: 56, dy: 0, r: 3.8, delay: 0.01 },
                          { dx: 52, dy: 14, r: 3.1, delay: 0.03 },
                          { dx: 39, dy: 24, r: 3.4, delay: 0.02 },
                          { dx: 74, dy: -28, r: 2.4, delay: 0.04 },
                          { dx: 82, dy: -10, r: 2.6, delay: 0.05 },
                          { dx: 84, dy: 4, r: 2.8, delay: 0.04 },
                          { dx: 79, dy: 19, r: 2.4, delay: 0.06 },
                          { dx: 70, dy: 32, r: 2.1, delay: 0.05 },
                        ].map((p, idx) => (
                          <motion.circle
                            key={idx}
                            cx={304}
                            cy={138}
                            r={p.r}
                            fill={idx % 2 === 0 ? '#155EEF' : '#60A5FA'}
                            initial={{ cx: 304, cy: 138, opacity: 0.95, scale: 0.4 }}
                            animate={{
                              cx: 304 + p.dx,
                              cy: 138 + p.dy,
                              opacity: 0,
                              scale: 1.25,
                            }}
                            transition={{ duration: 0.32, delay: p.delay, ease: [0.16, 1, 0.3, 1] }}
                          />
                        ))}

                      {activeMode === 'stream' && (
                        <>
                          <motion.path
                            d="M304 138H388"
                            stroke="#155EEF"
                            strokeWidth="4.5"
                            strokeLinecap="round"
                            initial={{ pathLength: 0, opacity: 1 }}
                            animate={{ pathLength: 1, opacity: [1, 1, 0] }}
                            transition={{ duration: 0.28, ease: 'easeOut' }}
                          />
                          <motion.circle
                            cx="388"
                            cy="138"
                            r="6"
                            stroke="#3B82F6"
                            strokeWidth="2"
                            fill="none"
                            initial={{ scale: 0.2, opacity: 0.9 }}
                            animate={{ scale: 1.8, opacity: 0 }}
                            transition={{ duration: 0.28, delay: 0.1 }}
                            style={{ transformOrigin: '388px 138px' }}
                          />
                        </>
                      )}

                      {activeMode === 'foam' &&
                        [
                          { dx: 24, dy: -6, r: 7.5, delay: 0 },
                          { dx: 38, dy: -16, r: 6.5, delay: 0.03 },
                          { dx: 40, dy: 10, r: 7, delay: 0.02 },
                          { dx: 56, dy: -4, r: 8.5, delay: 0.05 },
                          { dx: 64, dy: 14, r: 6, delay: 0.06 },
                          { dx: 72, dy: -14, r: 5.5, delay: 0.07 },
                        ].map((b, idx) => (
                          <motion.circle
                            key={idx}
                            cx={308}
                            cy={138}
                            r={b.r}
                            fill="#EFF6FF"
                            stroke="#2563EB"
                            strokeWidth="1.6"
                            initial={{ cx: 308, cy: 138, scale: 0.3, opacity: 0.95 }}
                            animate={{
                              cx: 308 + b.dx,
                              cy: 138 + b.dy,
                              scale: 1.2,
                              opacity: 0,
                            }}
                            transition={{ duration: 0.36, delay: b.delay, ease: 'easeOut' }}
                          />
                        ))}
                    </motion.g>
                  )}
                </AnimatePresence>
              </motion.svg>

              {/* Top Right Mode Pill Selector */}
              <div className="absolute top-4 right-4 z-20 flex items-center gap-1 bg-slate-100/95 p-1 rounded-lg border border-slate-200">
                {HERO_MODES.map((m, idx) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setModeIndex(idx)}
                    className={`px-2.5 py-1 text-xs font-semibold rounded-md capitalize transition-colors cursor-pointer ${
                      activeMode === m
                        ? 'bg-white text-[#0B1B3E] shadow-xs'
                        : 'text-slate-500 hover:text-[#0B1B3E]'
                    }`}
                  >
                    {MODE_LABELS[lang][m]}
                  </button>
                ))}
              </div>

              {/* Bottom Interactive Trigger Controls & Real Dosage Telemetry */}
              <div className="absolute bottom-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-3">
                <motion.button
                  type="button"
                  onClick={handlePullTrigger}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 bg-[#0B1B3E] hover:bg-[#155EEF] text-white font-semibold text-sm px-4 py-2.5 rounded-full transition-colors duration-150 cursor-pointer shadow-md"
                >
                  <Crosshair className="w-4 h-4 text-[#E1262D]" />
                  <span>{t.pullTrigger}</span>
                </motion.button>

                <motion.div
                  key={pullCount}
                  initial={pullCount > 0 ? { scale: 1.08 } : false}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 420, damping: 22 }}
                  className="flex items-center gap-2.5 bg-slate-50 border border-slate-200 px-3.5 py-2 rounded-full text-xs font-mono tabular-nums text-[#0B1B3E]"
                >
                  <span>
                    {pullCount} {pullCount === 1 ? s.strokeSingular : s.strokePlural} · {totalMl} ml
                  </span>
                  {pullCount > 0 && (
                    <button
                      type="button"
                      onClick={() => setPullCount(0)}
                      className="text-slate-400 hover:text-[#E1262D] transition-colors cursor-pointer"
                      aria-label={s.resetCounterAria}
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                  )}
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Full-Width 4-Column KPI Strip */}
        <div
          ref={kpiStripRef}
          className="mt-12 bg-gradient-to-r from-[#155EEF] via-[#1354DB] to-[#206CF5] rounded-2xl px-6 sm:px-10 py-8 text-white shadow-sm"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <AnimatedKpiNumber target={15} delay={0} shouldAnimate={kpiInView} />
              <p className="mt-1.5 text-sm text-blue-100 font-medium">{t.kpiYears}</p>
            </div>
            <div>
              <AnimatedKpiNumber target={200} delay={110} shouldAnimate={kpiInView} />
              <p className="mt-1.5 text-sm text-blue-100 font-medium">{t.kpiEmployees}</p>
            </div>
            <div>
              <AnimatedKpiNumber target={65} delay={220} shouldAnimate={kpiInView} />
              <p className="mt-1.5 text-sm text-blue-100 font-medium">{t.kpiMachines}</p>
            </div>
            <div>
              <AnimatedKpiNumber target={13} delay={330} shouldAnimate={kpiInView} />
              <p className="mt-1.5 text-sm text-blue-100 font-medium">{t.kpiLines}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
