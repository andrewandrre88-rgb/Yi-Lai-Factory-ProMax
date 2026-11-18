import { useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { LanguageCode } from '../data/factoryData';
import { getAppStrings } from '../data/translations';
import {
  buildWhatsAppUrl,
  WHATSAPP_NUMBER_DISPLAY,
  WhatsAppIcon,
} from './WhatsAppIcon';

interface ScrollDispenserRailProps {
  lang: LanguageCode;
}

export function ScrollDispenserRail({ lang }: ScrollDispenserRailProps) {
  const s = getAppStrings(lang);
  const { scrollYProgress } = useScroll();
  const liquidHeight = useTransform(scrollYProgress, [0, 1], [4, 46]);
  const liquidY = useTransform(scrollYProgress, [0, 1], [86, 44]);
  const [spraying, setSpraying] = useState(false);

  const handleClick = () => {
    setSpraying(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    window.setTimeout(() => setSpraying(false), 380);
  };

  return (
    <div className="fixed bottom-5 end-5 z-30 flex flex-col items-center gap-2.5">
      <motion.a
        href={buildWhatsAppUrl()}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.08, y: -2 }}
        whileTap={{ scale: 0.94 }}
        title={s.whatsappTitle}
        aria-label={s.whatsappTitle}
        className="group relative flex items-center justify-center w-14 h-14 rounded-2xl bg-[#25D366] hover:bg-[#1EBE5D] text-white border border-emerald-400/60 shadow-lg transition-colors cursor-pointer"
      >
        <WhatsAppIcon className="w-7 h-7" />
        <span
          dir="ltr"
          className="pointer-events-none hidden sm:block opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap absolute end-16 bg-[#0B1B3E] text-white font-mono text-xs font-semibold px-3 py-1.5 rounded-full shadow-md tabular-nums"
        >
          {WHATSAPP_NUMBER_DISPLAY}
        </span>
      </motion.a>

      <motion.button
        type="button"
        onClick={handleClick}
        whileHover={{ scale: 1.08, y: -2 }}
        whileTap={{ scale: 0.94 }}
        title={s.backToTopTitle}
        aria-label={s.backToTopTitle}
        className="hidden sm:flex items-center justify-center w-14 h-20 rounded-2xl bg-white/95 backdrop-blur-xs border border-slate-200/90 shadow-lg hover:border-[#155EEF] transition-colors cursor-pointer"
      >
        <svg viewBox="0 0 64 96" className="w-11 h-16 overflow-visible" aria-hidden="true">
          {/* Bottle Body Outline */}
          <rect
            x="14"
            y="38"
            width="32"
            height="52"
            rx="12"
            fill="#F8FAFC"
            stroke="#155EEF"
            strokeWidth="2.5"
          />

          {/* Scroll-Driven Liquid Fill */}
          <clipPath id="bottle-fill-clip">
            <rect x="16" y="40" width="28" height="48" rx="10" />
          </clipPath>
          <g clipPath="url(#bottle-fill-clip)">
            <motion.rect
              x="16"
              width="28"
              rx="4"
              fill="#155EEF"
              style={{ y: liquidY, height: liquidHeight }}
            />
          </g>

          {/* Ribbed Screw Collar */}
          <rect x="21" y="29" width="18" height="10" rx="2.5" fill="#0B1B3E" />

          {/* Sprayer Head */}
          <path
            d="M23 29V16C23 11 27 8 33 8H45C47 8 49 10 49 12V18C49 20 47 22 45 22H34C32 22 31 23 31 25V29H23Z"
            fill="#155EEF"
          />

          {/* Red Trigger */}
          <motion.path
            d="M36 21H43L39 32H34L36 21Z"
            fill="#E1262D"
            animate={{ rotate: spraying ? -20 : 0 }}
            style={{ originX: '39px', originY: '21px' }}
          />

          {/* Micro Spray Burst on Click */}
          <AnimatePresence>
            {spraying && (
              <motion.g
                initial={{ opacity: 1, x: 0 }}
                animate={{ opacity: 0, x: 10 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.32 }}
              >
                <circle cx="53" cy="14" r="2" fill="#155EEF" />
                <circle cx="57" cy="10" r="1.5" fill="#60A5FA" />
                <circle cx="57" cy="18" r="1.5" fill="#60A5FA" />
              </motion.g>
            )}
          </AnimatePresence>
        </svg>
      </motion.button>
    </div>
  );
}
