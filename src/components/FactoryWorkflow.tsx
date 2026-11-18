import { useState, useEffect } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { FACTORY_IMAGES, LanguageCode } from '../data/factoryData';
import { getAppStrings } from '../data/translations';

interface FactoryWorkflowProps {
  lang: LanguageCode;
}

export function FactoryWorkflow({ lang }: FactoryWorkflowProps) {
  const s = getAppStrings(lang);
  const [activeStage, setActiveStage] = useState(1);
  const [autoPlay, setAutoPlay] = useState(true);

  const stages = [
    { id: 1, code: s.factoryStageCodes[0], title: s.factoryStageTitles[0], detail: s.factoryStageDetails[0] },
    { id: 2, code: s.factoryStageCodes[1], title: s.factoryStageTitles[1], detail: s.factoryStageDetails[1] },
    { id: 3, code: s.factoryStageCodes[2], title: s.factoryStageTitles[2], detail: s.factoryStageDetails[2] },
    { id: 4, code: s.factoryStageCodes[3], title: s.factoryStageTitles[3], detail: s.factoryStageDetails[3] },
  ];

  const facilityPhotos = [
    {
      src: FACTORY_IMAGES.moulding,
      alt: s.factoryPhotoCaptions[0],
      caption: s.factoryPhotoCaptions[0],
    },
    {
      src: FACTORY_IMAGES.assembly,
      alt: s.factoryPhotoCaptions[1],
      caption: s.factoryPhotoCaptions[1],
    },
    {
      src: FACTORY_IMAGES.exportPacking,
      alt: s.factoryPhotoCaptions[2],
      caption: s.factoryPhotoCaptions[2],
    },
  ];

  useEffect(() => {
    if (!autoPlay) return;
    const timer = window.setInterval(() => {
      setActiveStage((prev) => (prev % stages.length) + 1);
    }, 2400);
    return () => window.clearInterval(timer);
  }, [autoPlay, stages.length]);

  return (
    <section id="factory" className="py-16 sm:py-24 bg-white">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold tracking-wider text-[#E1262D] uppercase">
            {s.factoryKicker}
          </p>
          <h2 className="mt-2 font-display font-extrabold text-3xl sm:text-4xl text-[#0B1B3E] tracking-tight text-balance">
            {s.factoryTitle}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            {s.factorySub}
          </p>
        </div>

        {/* Interactive Production Line Simulator Banner */}
        <div className="mt-10 rounded-3xl dark-blueprint-grid bg-[#071535] p-6 sm:p-8 text-white shadow-sm">
          {/* Interactive 4-Station Buttons */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {stages.map((st) => {
              const selected = activeStage === st.id;
              return (
                <button
                  key={st.id}
                  type="button"
                  onClick={() => {
                    setAutoPlay(false);
                    setActiveStage(st.id);
                  }}
                  className={`text-start px-4 py-3 rounded-xl border transition-all duration-150 cursor-pointer ${
                    selected
                      ? 'bg-[#155EEF] border-[#60A5FA] text-white shadow-md'
                      : 'bg-white/5 border-white/15 text-blue-100 hover:bg-white/10'
                  }`}
                >
                  <span className="font-mono text-xs font-bold tracking-wider block">
                    {st.code}
                  </span>
                  <span className="text-xs text-blue-100/90 mt-0.5 block truncate">
                    {st.title}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Animated Conveyor Schematic */}
          <div className="mt-8 relative pt-4 pb-6 border-b-4 border-dashed border-[#1E3A8A]">
            <div dir="ltr" className="grid grid-cols-5 gap-3 sm:gap-6 items-end justify-items-center">
              {[
                { color: '#94A3B8', trigger: false, verified: false, stageMatch: 1 },
                { color: '#F2B705', trigger: false, verified: false, stageMatch: 1 },
                { color: '#155EEF', trigger: true, verified: false, stageMatch: 2 },
                { color: '#129A63', trigger: true, verified: false, stageMatch: 3 },
                { color: '#FFFFFF', trigger: true, verified: true, stageMatch: 4 },
              ].map((unit, idx) => {
                const isHighlighted = activeStage === unit.stageMatch;
                return (
                  <div
                    key={idx}
                    className={`flex flex-col items-center transition-all duration-300 ${
                      isHighlighted ? 'scale-115 -translate-y-1 opacity-100' : 'opacity-65'
                    }`}
                  >
                    <svg viewBox="0 0 64 64" className="w-14 h-14 sm:w-16 sm:h-16" aria-hidden="true">
                      <path
                        d="M16 54V26C16 17 22 12 31 12H46C49 12 51 14 51 17V24C51 27 49 29 46 29H35C32 29 31 31 31 34V54H16Z"
                        fill={unit.color}
                      />
                      <rect x="49" y="14" width="6" height="12" rx="1.5" fill="#CBD5E1" />
                      {unit.trigger && (
                        <path
                          d="M36 26H44L39 49H34L36 26Z"
                          fill={idx === 2 ? '#E1262D' : idx === 3 ? '#F8FAFC' : '#155EEF'}
                        />
                      )}
                    </svg>
                    {unit.verified && (
                      <span dir={lang === 'ar' ? 'rtl' : 'ltr'} className="mt-1 inline-flex items-center gap-1 text-[11px] font-mono text-emerald-300">
                        <CheckCircle2 className="w-3.5 h-3.5" /> {s.factoryQcPass}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Active Station Description + Auto-Cycle Toggle */}
          <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm text-blue-100 max-w-3xl">
              <strong className="text-white">
                {stages.find((st) => st.id === activeStage)?.title}:
              </strong>{' '}
              {stages.find((st) => st.id === activeStage)?.detail}
            </p>
            <button
              type="button"
              onClick={() => setAutoPlay((prev) => !prev)}
              className="text-xs font-mono font-semibold px-3 py-1.5 rounded-lg border border-white/20 bg-white/5 hover:bg-white/15 text-blue-100 transition-colors cursor-pointer shrink-0"
            >
              {autoPlay ? s.factoryPauseLine : s.factoryAutoCycleLine}
            </button>
          </div>
        </div>

        {/* 5 Numbered Manufacturing Steps */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {s.factorySteps.map((step) => (
            <div key={step.num} className="relative pt-2">
              <div
                className={`w-11 h-11 rounded-full font-mono text-sm font-bold flex items-center justify-center border-2 ${
                  step.num === '05'
                    ? 'bg-[#E1262D] border-[#E1262D] text-white'
                    : step.accent === 'crimson'
                    ? 'bg-white border-[#E1262D] text-[#E1262D]'
                    : 'bg-white border-[#155EEF] text-[#155EEF]'
                }`}
              >
                {step.num}
              </div>
              <h3 className="mt-4 font-display font-bold text-base text-[#0B1B3E]">
                {step.title}
              </h3>
              <p className="mt-1.5 text-sm text-slate-600 leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Featured Factory Campus Entrance Photo */}
        <figure className="mt-12 rounded-3xl overflow-hidden border border-slate-200 bg-slate-100 shadow-xs">
          <div className="aspect-[16/8] sm:aspect-[21/9] overflow-hidden bg-slate-200">
            <img
              src={FACTORY_IMAGES.exterior}
              alt={s.factoryCampusCaption}
              referrerPolicy="no-referrer"
              loading="lazy"
              className="w-full h-full object-cover object-center"
            />
          </div>
          <figcaption className="px-5 py-3.5 bg-white text-xs sm:text-sm font-semibold text-[#0B1B3E] border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
            <span>{s.factoryCampusCaption}</span>
            <span className="font-mono text-xs text-slate-500">{s.factoryCampusSub}</span>
          </figcaption>
        </figure>

        {/* 3 Real Factory Floor Photographs */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {facilityPhotos.map((photo) => (
            <figure
              key={photo.src}
              className="group rounded-2xl overflow-hidden border border-slate-200 bg-slate-100"
            >
              <div className="aspect-[4/3] overflow-hidden bg-slate-200">
                <img
                  src={photo.src}
                  alt={photo.alt}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <figcaption className="px-4 py-3 bg-white text-xs sm:text-sm font-semibold text-[#0B1B3E] border-t border-slate-100">
                {photo.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
