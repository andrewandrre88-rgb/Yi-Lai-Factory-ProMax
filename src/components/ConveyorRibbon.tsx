import { LanguageCode } from '../data/factoryData';
import { getAppStrings } from '../data/translations';

interface ConveyorRibbonProps {
  lang: LanguageCode;
}

export function ConveyorRibbon({ lang }: ConveyorRibbonProps) {
  const s = getAppStrings(lang);

  return (
    <div dir="ltr" className="relative overflow-hidden py-8 bg-white select-none" aria-hidden="true">
      {/* Blue Back Ribbon */}
      <div className="bg-[#155EEF] text-white py-3 -rotate-2 scale-105 shadow-sm">
        <div className="flex w-max animate-marquee-reverse gap-8 items-center">
          {[...s.conveyorBlue, ...s.conveyorBlue, ...s.conveyorBlue].map((item, idx) => (
            <span
              key={idx}
              dir={lang === 'ar' ? 'rtl' : 'ltr'}
              className="font-display font-bold text-xs sm:text-sm tracking-wider whitespace-nowrap flex items-center gap-8"
            >
              <span>{item}</span>
              <span className="text-blue-200">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* Crimson Front Ribbon */}
      <div className="bg-[#E1262D] text-white py-3.5 rotate-1 scale-105 -mt-4 shadow-md">
        <div className="flex w-max animate-marquee gap-8 items-center">
          {[...s.conveyorRed, ...s.conveyorRed, ...s.conveyorRed].map((item, idx) => (
            <span
              key={idx}
              dir={lang === 'ar' ? 'rtl' : 'ltr'}
              className="font-display font-extrabold text-sm sm:text-base tracking-wide whitespace-nowrap flex items-center gap-8"
            >
              <span>{item}</span>
              <span className="text-red-200">✦</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
