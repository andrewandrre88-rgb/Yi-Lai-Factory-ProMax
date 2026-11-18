import { useState } from 'react';
import { motion } from 'motion/react';
import { Layers, Maximize2 } from 'lucide-react';
import { LanguageCode } from '../data/factoryData';
import { getAppStrings, getLocalizedBlueprintParts } from '../data/translations';

interface EngineeringBlueprintProps {
  lang: LanguageCode;
}

export function EngineeringBlueprint({ lang }: EngineeringBlueprintProps) {
  const s = getAppStrings(lang);
  const parts = getLocalizedBlueprintParts(lang);
  const [exploded, setExploded] = useState(true);
  const [selectedPartId, setSelectedPartId] = useState<number>(1);

  const activePart = parts.find((p) => p.id === selectedPartId) ?? parts[0];
  const p1 = parts[0];
  const p2 = parts[1];
  const p3 = parts[2];
  const p4 = parts[3];
  const p5 = parts[4];
  const p6 = parts[5];

  return (
    <section className="py-14 sm:py-24 blueprint-grid bg-[#F9FBFF] border-b border-slate-200/70 overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Narrative & Interactive Part Selector */}
          <div className="lg:col-span-5 min-w-0">
            <p className="text-xs font-semibold tracking-wider text-[#E1262D] uppercase">
              {s.blueprintKicker}
            </p>
            <h2 className="mt-2 font-display font-extrabold text-3xl sm:text-4xl text-[#0B1B3E] tracking-tight leading-[1.15] text-balance">
              {s.blueprintTitle}
            </h2>
            <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
              {s.blueprintSub}
            </p>

            {/* 6 Clickable Part Indices */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
              {parts.map((part) => {
                const isSelected = part.id === selectedPartId;
                return (
                  <button
                    key={part.id}
                    type="button"
                    onClick={() => setSelectedPartId(part.id)}
                    className={`flex items-center gap-2.5 text-start p-2.5 rounded-xl border transition-all duration-150 cursor-pointer min-w-0 ${
                      isSelected
                        ? 'bg-white border-[#155EEF] shadow-xs'
                        : 'bg-white/50 border-slate-200/60 hover:bg-white hover:border-slate-300'
                    }`}
                  >
                    <span
                      className={`w-7 h-7 rounded-full text-xs font-mono font-bold flex items-center justify-center shrink-0 tabular-nums ${
                        isSelected
                          ? 'bg-[#155EEF] text-white'
                          : 'bg-[#E1262D] text-white'
                      }`}
                    >
                      {part.id}
                    </span>
                    <span className="text-sm font-semibold text-[#0B1B3E] truncate">
                      {part.name}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Active Part Engineering Specification Card */}
            <div className="mt-5 bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-sm sm:text-base font-display font-bold text-[#0B1B3E] tabular-nums">
                  0{activePart.id}. {activePart.name}
                </span>
                <span className="font-mono text-xs text-[#155EEF] font-semibold tabular-nums">
                  {activePart.tolerance}
                </span>
              </div>
              <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                {activePart.description}
              </p>
              <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-slate-500">
                <span>
                  <strong className="text-slate-700">{s.blueprintResinLabel}</strong> {activePart.material}
                </span>
                <span>
                  <strong className="text-slate-700">{s.blueprintOptionsLabel}</strong> {activePart.customization}
                </span>
              </div>
            </div>

            <div className="mt-6">
              <button
                type="button"
                onClick={() => setExploded((prev) => !prev)}
                className="inline-flex items-center gap-2.5 bg-[#155EEF] hover:bg-[#0F4CD4] text-white font-semibold text-sm px-5 py-3 rounded-full transition-colors cursor-pointer shadow-sm"
              >
                {exploded ? (
                  <>
                    <Layers className="w-4 h-4" />
                    <span>{s.blueprintAssembleBtn}</span>
                  </>
                ) : (
                  <>
                    <Maximize2 className="w-4 h-4" />
                    <span>{s.blueprintExplodeBtn}</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right Interactive CAD Exploded / Assembled SVG */}
          <div className="lg:col-span-7 min-w-0">
            <div dir="ltr" className="relative bg-white/90 rounded-3xl border border-slate-200/90 p-3 sm:p-6 md:p-8 shadow-xs overflow-hidden">
              <svg
                viewBox="0 0 680 430"
                className="w-full h-auto select-none block"
                role="img"
                aria-label={s.blueprintTitle}
              >
                {/* Dashed CAD Boundary Oval */}
                <ellipse
                  cx="340"
                  cy="210"
                  rx="200"
                  ry="160"
                  stroke="#C7D7FA"
                  strokeWidth="1.5"
                  strokeDasharray="5 5"
                  fill="none"
                />

                {/* 2. Shroud */}
                <motion.g
                  animate={{ x: 0, y: exploded ? -12 : 44 }}
                  transition={{ type: 'spring', stiffness: 220, damping: 24 }}
                  onClick={() => setSelectedPartId(2)}
                  className="cursor-pointer"
                >
                  <path
                    d="M285 190V115C285 90 303 76 329 76H383C392 76 398 82 398 91V114C398 123 392 128 383 128H347C339 128 335 133 335 141V190H285Z"
                    fill={selectedPartId === 2 ? '#0F4CD4' : '#155EEF'}
                    stroke={selectedPartId === 2 ? '#0B1B3E' : 'none'}
                    strokeWidth="2.5"
                  />
                  <path
                    d="M297 178V118C297 98 310 88 329 88H367"
                    stroke="#60A5FA"
                    strokeWidth="4"
                    strokeLinecap="round"
                    fill="none"
                  />
                </motion.g>

                {/* 1. Nozzle */}
                <motion.g
                  animate={{ x: exploded ? 56 : -18, y: exploded ? 0 : 32 }}
                  transition={{ type: 'spring', stiffness: 220, damping: 24 }}
                  onClick={() => setSelectedPartId(1)}
                  className="cursor-pointer"
                >
                  <rect
                    x="413"
                    y="84"
                    width="22"
                    height="36"
                    rx="4"
                    fill="#0B1B3E"
                    stroke={selectedPartId === 1 ? '#155EEF' : 'none'}
                    strokeWidth="2.5"
                  />
                  <circle cx="429" cy="102" r="3" fill="#60A5FA" />
                </motion.g>

                {/* 3. Trigger */}
                <motion.g
                  animate={{ x: exploded ? 36 : -26, y: exploded ? 26 : 22 }}
                  transition={{ type: 'spring', stiffness: 220, damping: 24 }}
                  onClick={() => setSelectedPartId(3)}
                  className="cursor-pointer"
                >
                  <path
                    d="M357 150H384C388 150 391 154 390 158L375 214C373 219 368 222 363 220L355 217C351 215 350 210 351 205L357 150Z"
                    fill="#E1262D"
                    stroke={selectedPartId === 3 ? '#0B1B3E' : 'none'}
                    strokeWidth="2.5"
                  />
                  <line x1="363" y1="168" x2="377" y2="168" stroke="#FCA5A5" strokeWidth="2.5" strokeLinecap="round" />
                  <line x1="361" y1="184" x2="374" y2="184" stroke="#FCA5A5" strokeWidth="2.5" strokeLinecap="round" />
                  <line x1="359" y1="200" x2="371" y2="200" stroke="#FCA5A5" strokeWidth="2.5" strokeLinecap="round" />
                </motion.g>

                {/* 4. Piston & Spring */}
                <motion.g
                  animate={{ x: exploded ? -68 : 76, y: exploded ? -8 : 28 }}
                  transition={{ type: 'spring', stiffness: 220, damping: 24 }}
                  onClick={() => setSelectedPartId(4)}
                  className="cursor-pointer"
                >
                  <rect
                    x="223"
                    y="124"
                    width="24"
                    height="46"
                    rx="4"
                    fill="#CBD5E1"
                    stroke={selectedPartId === 4 ? '#155EEF' : '#64748B'}
                    strokeWidth="2"
                  />
                  <path
                    d="M227 174L243 180L227 186L243 192L227 198L243 204"
                    stroke="#475569"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                </motion.g>

                {/* 5. Closure */}
                <motion.g
                  animate={{ x: 0, y: exploded ? 44 : 18 }}
                  transition={{ type: 'spring', stiffness: 220, damping: 24 }}
                  onClick={() => setSelectedPartId(5)}
                  className="cursor-pointer"
                >
                  <rect
                    x="267"
                    y="214"
                    width="86"
                    height="36"
                    rx="6"
                    fill="#155EEF"
                    stroke={selectedPartId === 5 ? '#0B1B3E' : 'none'}
                    strokeWidth="2.5"
                  />
                  {[279, 290, 301, 312, 323, 334, 345].map((x) => (
                    <line
                      key={x}
                      x1={x}
                      y1="220"
                      x2={x}
                      y2="244"
                      stroke="#0F43B5"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                  ))}
                </motion.g>

                {/* 6. Dip Tube */}
                <motion.g
                  animate={{ x: 0, y: exploded ? 72 : 12 }}
                  transition={{ type: 'spring', stiffness: 220, damping: 24 }}
                  onClick={() => setSelectedPartId(6)}
                  className="cursor-pointer"
                >
                  <rect
                    x="306"
                    y="256"
                    width="8"
                    height="92"
                    rx="3"
                    fill="#94A3B8"
                    stroke={selectedPartId === 6 ? '#155EEF' : 'none'}
                    strokeWidth="2"
                  />
                </motion.g>

                {/* Responsive Callout Numbers & Desktop-Safe Labels (Visible when exploded) */}
                {exploded && (
                  <g className="font-sans">
                    {/* 2 Shroud */}
                    <g onClick={() => setSelectedPartId(2)} className="cursor-pointer">
                      <line
                        x1="210"
                        y1="88"
                        x2="288"
                        y2="112"
                        stroke={selectedPartId === 2 ? '#155EEF' : '#E1262D'}
                        strokeWidth="1.75"
                      />
                      <circle cx="198" cy="86" r="14" fill={selectedPartId === 2 ? '#155EEF' : '#E1262D'} />
                      <text x="198" y="91" textAnchor="middle" fill="#fff" fontSize="13" fontWeight="700">2</text>
                      <text x="176" y="83" textAnchor="end" fill="#0B1B3E" fontSize="13.5" fontWeight="700" className="hidden sm:block">
                        {p2.name}
                      </text>
                      <text x="176" y="99" textAnchor="end" fill="#64748B" fontSize="11.5" className="hidden sm:block">
                        {p2.subtitle}
                      </text>
                    </g>

                    {/* 1 Nozzle */}
                    <g onClick={() => setSelectedPartId(1)} className="cursor-pointer">
                      <line
                        x1="484"
                        y1="102"
                        x2="518"
                        y2="82"
                        stroke={selectedPartId === 1 ? '#155EEF' : '#E1262D'}
                        strokeWidth="1.75"
                      />
                      <circle cx="528" cy="80" r="14" fill={selectedPartId === 1 ? '#155EEF' : '#E1262D'} />
                      <text x="528" y="85" textAnchor="middle" fill="#fff" fontSize="13" fontWeight="700">1</text>
                      <text x="550" y="77" fill="#0B1B3E" fontSize="13.5" fontWeight="700" className="hidden sm:block">
                        {p1.name}
                      </text>
                      <text x="550" y="93" fill="#64748B" fontSize="11.5" className="hidden sm:block">
                        {p1.subtitle}
                      </text>
                    </g>

                    {/* 3 Trigger */}
                    <g onClick={() => setSelectedPartId(3)} className="cursor-pointer">
                      <line
                        x1="422"
                        y1="205"
                        x2="494"
                        y2="230"
                        stroke={selectedPartId === 3 ? '#155EEF' : '#E1262D'}
                        strokeWidth="1.75"
                      />
                      <circle cx="508" cy="234" r="14" fill={selectedPartId === 3 ? '#155EEF' : '#E1262D'} />
                      <text x="508" y="239" textAnchor="middle" fill="#fff" fontSize="13" fontWeight="700">3</text>
                      <text x="530" y="231" fill="#0B1B3E" fontSize="13.5" fontWeight="700" className="hidden sm:block">
                        {p3.name}
                      </text>
                      <text x="530" y="247" fill="#64748B" fontSize="11.5" className="hidden sm:block">
                        {p3.subtitle}
                      </text>
                    </g>

                    {/* 4 Piston & Spring */}
                    <g onClick={() => setSelectedPartId(4)} className="cursor-pointer">
                      <line
                        x1="154"
                        y1="176"
                        x2="132"
                        y2="176"
                        stroke={selectedPartId === 4 ? '#155EEF' : '#E1262D'}
                        strokeWidth="1.75"
                      />
                      <circle cx="122" cy="176" r="14" fill={selectedPartId === 4 ? '#155EEF' : '#E1262D'} />
                      <text x="122" y="181" textAnchor="middle" fill="#fff" fontSize="13" fontWeight="700">4</text>
                      <text x="100" y="172" textAnchor="end" fill="#0B1B3E" fontSize="13.5" fontWeight="700" className="hidden sm:block">
                        {p4.name}
                      </text>
                      <text x="100" y="188" textAnchor="end" fill="#64748B" fontSize="11.5" className="hidden sm:block">
                        {p4.subtitle}
                      </text>
                    </g>

                    {/* 5 Closure */}
                    <g onClick={() => setSelectedPartId(5)} className="cursor-pointer">
                      <line
                        x1="266"
                        y1="276"
                        x2="210"
                        y2="276"
                        stroke={selectedPartId === 5 ? '#155EEF' : '#E1262D'}
                        strokeWidth="1.75"
                      />
                      <circle cx="196" cy="276" r="14" fill={selectedPartId === 5 ? '#155EEF' : '#E1262D'} />
                      <text x="196" y="281" textAnchor="middle" fill="#fff" fontSize="13" fontWeight="700">5</text>
                      <text x="174" y="272" textAnchor="end" fill="#0B1B3E" fontSize="13.5" fontWeight="700" className="hidden sm:block">
                        {p5.name}
                      </text>
                      <text x="174" y="288" textAnchor="end" fill="#64748B" fontSize="11.5" className="hidden sm:block">
                        {p5.subtitle}
                      </text>
                    </g>

                    {/* 6 Dip tube */}
                    <g onClick={() => setSelectedPartId(6)} className="cursor-pointer">
                      <line
                        x1="316"
                        y1="384"
                        x2="378"
                        y2="384"
                        stroke={selectedPartId === 6 ? '#155EEF' : '#E1262D'}
                        strokeWidth="1.75"
                      />
                      <circle cx="392" cy="384" r="14" fill={selectedPartId === 6 ? '#155EEF' : '#E1262D'} />
                      <text x="392" y="389" textAnchor="middle" fill="#fff" fontSize="13" fontWeight="700">6</text>
                      <text x="414" y="380" fill="#0B1B3E" fontSize="13.5" fontWeight="700" className="hidden sm:block">
                        {p6.name}
                      </text>
                      <text x="414" y="396" fill="#64748B" fontSize="11.5" className="hidden sm:block">
                        {p6.subtitle}
                      </text>
                    </g>
                  </g>
                )}
              </svg>

              {/* Crisp Mobile Callout Legend (replaces tiny SVG sub-text on narrow screens) */}
              {exploded && (
                <div className="mt-3 pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 sm:hidden">
                  {parts.map((part) => {
                    const active = part.id === selectedPartId;
                    return (
                      <button
                        key={part.id}
                        type="button"
                        onClick={() => setSelectedPartId(part.id)}
                        className={`flex items-center gap-2 text-start rounded-lg px-2 py-1.5 text-xs transition-colors ${
                          active ? 'bg-blue-50 text-[#155EEF]' : 'text-slate-600'
                        }`}
                      >
                        <span
                          className={`w-5 h-5 rounded-full text-[11px] font-mono font-bold flex items-center justify-center shrink-0 tabular-nums text-white ${
                            active ? 'bg-[#155EEF]' : 'bg-[#E1262D]'
                          }`}
                        >
                          {part.id}
                        </span>
                        <span className="font-semibold truncate">{part.name}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
