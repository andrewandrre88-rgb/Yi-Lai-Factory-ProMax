import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Crosshair } from 'lucide-react';
import { LanguageCode } from '../data/factoryData';
import { getAppStrings, getLocalizedNozzleColours } from '../data/translations';

interface NozzleLabProps {
  lang: LanguageCode;
  onRequestSample: (configSummary: string) => void;
}

const PATTERNS = ['Spray', 'Stream', 'Foam'] as const;
const NECK_FINISHES = ['28/400', '28/410', '24/410'] as const;
const BOTTLE_STYLES = [
  { id: 'clear-pet', fill: 'rgba(255,255,255,0.08)', stroke: 'rgba(147,197,253,0.45)' },
  { id: 'amber-glass', fill: 'rgba(180,83,9,0.35)', stroke: 'rgba(251,191,36,0.6)' },
  { id: 'frosted-hdpe', fill: 'rgba(241,245,249,0.88)', stroke: 'rgba(203,213,225,0.9)' },
] as const;

export function NozzleLab({ lang, onRequestSample }: NozzleLabProps) {
  const s = getAppStrings(lang);
  const nozzleColours = getLocalizedNozzleColours(lang);
  const [pattern, setPattern] = useState<(typeof PATTERNS)[number]>('Spray');
  const [selectedColourId, setSelectedColourId] = useState(nozzleColours[0].id);
  const [neckFinish, setNeckFinish] = useState<(typeof NECK_FINISHES)[number]>('28/400');
  const [bottleStyleId, setBottleStyleId] = useState<(typeof BOTTLE_STYLES)[number]['id']>(BOTTLE_STYLES[0].id);
  const [pantoneNote, setPantoneNote] = useState('');
  const [showLogoImprint, setShowLogoImprint] = useState(true);
  const [testBurstCount, setTestBurstCount] = useState(0);
  const [isTesting, setIsTesting] = useState(false);

  const selectedColour = nozzleColours.find((c) => c.id === selectedColourId) ?? nozzleColours[0];
  const bottleStyle = BOTTLE_STYLES.find((b) => b.id === bottleStyleId) ?? BOTTLE_STYLES[0];
  const patternLabel = s.labPatterns[pattern];
  const bottleLabel = s.labBottles[bottleStyle.id];

  const handleTestSpray = () => {
    setIsTesting(true);
    setTestBurstCount((c) => c + 1);
    window.setTimeout(() => setIsTesting(false), 380);
  };

  const handleRequestCustomSample = () => {
    const pantoneTxt = pantoneNote.trim()
      ? `Pantone: ${pantoneNote.trim()}`
      : `${selectedColour.name} (${selectedColour.pantone})`;
    const logoTxt = showLogoImprint ? s.labLogoOn : s.labLogoOff;
    onRequestSample(
      `Nozzle Lab — ${patternLabel} | ${pantoneTxt} | ${neckFinish} | ${bottleLabel} | ${logoTxt}.`
    );
  };

  const shroudIsLight = selectedColour.id === 'pure-white' || selectedColour.id === 'amber-gold';

  return (
    <section
      id="customize"
      className="relative overflow-hidden bg-gradient-to-b from-[#081534] via-[#0B1E49] to-[#081534] text-white py-20 sm:py-24"
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Configuration Controls */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <p className="text-xs font-semibold tracking-wider text-[#FF7A80] uppercase">
                {s.labKicker}
              </p>
              <h2 className="mt-2 font-display font-extrabold text-3xl sm:text-5xl tracking-tight leading-[1.12] text-balance">
                {s.labTitle}
              </h2>
              <p className="mt-4 text-sm sm:text-base text-blue-100/85 leading-relaxed max-w-lg">
                {s.labSub}
              </p>
            </div>

            {/* 1. Nozzle Output */}
            <div>
              <p className="text-xs font-semibold text-blue-100 tracking-wide mb-2.5">
                {s.labStepOutput}
              </p>
              <div className="flex flex-wrap gap-2.5">
                {PATTERNS.map((item) => {
                  const active = pattern === item;
                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => {
                        setPattern(item);
                        handleTestSpray();
                      }}
                      className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-150 cursor-pointer border ${
                        active
                          ? 'bg-white text-[#081534] border-white shadow-sm'
                          : 'bg-transparent text-blue-100 border-white/25 hover:border-white/60'
                      }`}
                    >
                      {s.labPatterns[item]}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Resin Colour */}
            <div>
              <p className="text-xs font-semibold text-blue-100 tracking-wide mb-2.5">
                {s.labStepColour} — <span className="text-white">{selectedColour.name}</span>{' '}
                <span className="font-mono text-blue-200/80">({selectedColour.pantone})</span>
              </p>
              <div className="flex flex-wrap items-center gap-3">
                {nozzleColours.map((col) => {
                  const active = col.id === selectedColour.id;
                  return (
                    <button
                      key={col.id}
                      type="button"
                      onClick={() => setSelectedColourId(col.id)}
                      title={`${col.name} (${col.pantone})`}
                      aria-label={col.name}
                      style={{ backgroundColor: col.hex }}
                      className={`w-10 h-10 rounded-full transition-transform duration-150 cursor-pointer ${
                        active
                          ? 'ring-2 ring-white ring-offset-2 ring-offset-[#0B1E49] scale-110'
                          : 'ring-1 ring-white/25 hover:scale-105'
                      }`}
                    />
                  );
                })}
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-3">
                <input
                  type="text"
                  value={pantoneNote}
                  onChange={(e) => setPantoneNote(e.target.value)}
                  placeholder={s.labPantonePlaceholder}
                  aria-label={s.labPantonePlaceholder}
                  className="bg-white/10 border border-white/20 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-white placeholder:text-blue-200/60 focus:outline-none focus:border-white w-64"
                />
                <button
                  type="button"
                  onClick={() => setShowLogoImprint((prev) => !prev)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-colors cursor-pointer ${
                    showLogoImprint
                      ? 'bg-[#155EEF] border-[#60A5FA] text-white'
                      : 'bg-white/5 border-white/20 text-blue-100 hover:border-white/40'
                  }`}
                >
                  {showLogoImprint ? s.labLogoOn : s.labLogoOff}
                </button>
              </div>
            </div>

            {/* 3. Neck Finish & Bottle Pairing */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-semibold text-blue-100 tracking-wide mb-2">
                  {s.labStepNeck}
                </p>
                <div className="flex flex-wrap gap-2">
                  {NECK_FINISHES.map((neck) => (
                    <button
                      key={neck}
                      type="button"
                      onClick={() => setNeckFinish(neck)}
                      className={`px-3.5 py-2 rounded-lg font-mono text-xs font-semibold border transition-colors cursor-pointer ${
                        neckFinish === neck
                          ? 'bg-[#155EEF] border-[#60A5FA] text-white'
                          : 'bg-white/5 border-white/20 text-blue-100 hover:border-white/45'
                      }`}
                    >
                      {neck}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold text-blue-100 tracking-wide mb-2">
                  {s.labStepBottle}
                </p>
                <div className="flex flex-wrap gap-2">
                  {BOTTLE_STYLES.map((b) => (
                    <button
                      key={b.id}
                      type="button"
                      onClick={() => setBottleStyleId(b.id)}
                      className={`px-3 py-2 rounded-lg text-xs font-semibold border transition-colors cursor-pointer ${
                        bottleStyle.id === b.id
                          ? 'bg-white text-[#081534] border-white'
                          : 'bg-white/5 border-white/20 text-blue-100 hover:border-white/45'
                      }`}
                    >
                      {s.labBottles[b.id]}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={handleRequestCustomSample}
                className="inline-flex items-center gap-2.5 bg-[#E1262D] hover:bg-[#C61D24] text-white font-semibold text-sm sm:text-base px-6 py-3.5 rounded-full transition-colors cursor-pointer shadow-lg"
              >
                <span>{s.labRequestSample}</span>
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </button>
            </div>
          </div>

          {/* Right Live Customizer Preview */}
          <div className="lg:col-span-6">
            <div className="relative rounded-3xl border border-white/15 bg-gradient-to-br from-[#0F265C]/85 to-[#09173B]/95 p-6 sm:p-10 shadow-2xl overflow-hidden">
              <div dir="ltr">
                <svg
                  viewBox="0 0 420 360"
                  onClick={handleTestSpray}
                  className="w-full h-auto max-h-[380px] mx-auto select-none cursor-pointer"
                  role="img"
                  aria-label={`${selectedColour.name} · ${patternLabel}`}
                >
                {/* Rotating Outer CAD Ring */}
                <motion.circle
                  cx="210"
                  cy="170"
                  r="138"
                  stroke="rgba(147,197,253,0.22)"
                  strokeWidth="1.5"
                  strokeDasharray="5 7"
                  fill="none"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
                  style={{ transformOrigin: '210px 170px' }}
                />

                {/* Bottle Neck & Body Preview */}
                <path
                  d="M150 285C150 264 166 254 184 254H216C234 254 250 264 250 285V335H150V285Z"
                  fill={bottleStyle.fill}
                  stroke={bottleStyle.stroke}
                  strokeWidth="2"
                />
                <rect x="195" y="254" width="10" height="81" rx="3" fill="rgba(147,197,253,0.35)" />

                {/* Ribbed Closure */}
                <motion.rect
                  x="154"
                  y="214"
                  width="92"
                  height="40"
                  rx="6"
                  animate={{ fill: selectedColour.hex }}
                  transition={{ duration: 0.25 }}
                  stroke={selectedColour.id === 'matte-black' ? '#475569' : 'rgba(255,255,255,0.2)'}
                  strokeWidth="1.5"
                />
                {[165, 177, 189, 201, 213, 225, 237].map((x) => (
                  <line
                    key={x}
                    x1={x}
                    y1="221"
                    x2={x}
                    y2="247"
                    stroke={shroudIsLight ? 'rgba(15,23,42,0.25)' : 'rgba(0,0,0,0.28)'}
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                ))}

                {/* Main Custom Shroud */}
                <motion.path
                  d="M172 214V138C172 108 192 92 222 92H284C294 92 301 99 301 109V136C301 146 294 152 284 152H242C232 152 227 158 227 168V214H172Z"
                  animate={{ fill: selectedColour.hex }}
                  transition={{ duration: 0.25 }}
                  stroke={selectedColour.id === 'matte-black' ? '#475569' : 'rgba(255,255,255,0.2)'}
                  strokeWidth="1.5"
                />

                {/* Inner Bevel Highlight */}
                <path
                  d="M186 202V140C186 118 199 106 222 106H268"
                  stroke={shroudIsLight ? 'rgba(15,23,42,0.16)' : 'rgba(255,255,255,0.35)'}
                  strokeWidth="4"
                  strokeLinecap="round"
                  fill="none"
                />

                {/* Optional Brand Logo Pad Print on Shroud */}
                {showLogoImprint && (
                  <g transform="translate(185, 165)">
                    <rect
                      x="0"
                      y="0"
                      width="32"
                      height="16"
                      rx="3"
                      fill="none"
                      stroke={shroudIsLight ? '#0B1B3E' : '#FFFFFF'}
                      strokeOpacity="0.7"
                      strokeWidth="1.2"
                    />
                    <text
                      x="16"
                      y="11"
                      textAnchor="middle"
                      fontSize="7"
                      fontWeight="700"
                      fill={shroudIsLight ? '#0B1B3E' : '#FFFFFF'}
                      opacity="0.85"
                    >
                      LOGO
                    </text>
                  </g>
                )}

                {/* Animated Trigger Lever */}
                <motion.path
                  d="M242 142H272C277 142 280 146 279 151L261 213C259 218 254 221 249 219L239 215C235 213 234 208 235 203L242 142Z"
                  fill="#F8FAFC"
                  animate={{
                    rotate: isTesting ? -22 : 0,
                    x: isTesting ? -6 : 0,
                  }}
                  transition={{ type: 'spring', stiffness: 480, damping: 20 }}
                  style={{ originX: '256px', originY: '146px' }}
                />

                {/* Nozzle Tip */}
                <rect x="297" y="102" width="22" height="40" rx="4" fill="#E1262D" />
                {pattern === 'Foam' && (
                  <rect x="319" y="108" width="8" height="28" rx="2" fill="#FCA5A5" />
                )}

                {/* Idle Guide Spray + Active Burst on Test Spray */}
                <AnimatePresence>
                  {isTesting ? (
                    <motion.g key={`lab-burst-${testBurstCount}`}>
                      {pattern === 'Spray' &&
                        [
                          { dx: 36, dy: -20, r: 3.2 },
                          { dx: 54, dy: -10, r: 2.8 },
                          { dx: 60, dy: 0, r: 3.4 },
                          { dx: 54, dy: 12, r: 2.8 },
                          { dx: 38, dy: 22, r: 3.0 },
                          { dx: 76, dy: -24, r: 2.2 },
                          { dx: 82, dy: 2, r: 2.4 },
                          { dx: 76, dy: 24, r: 2.2 },
                        ].map((p, idx) => (
                          <motion.circle
                            key={idx}
                            cx={322}
                            cy={122}
                            r={p.r}
                            fill="#93C5FD"
                            initial={{ cx: 322, cy: 122, opacity: 1, scale: 0.4 }}
                            animate={{ cx: 322 + p.dx, cy: 122 + p.dy, opacity: 0, scale: 1.3 }}
                            transition={{ duration: 0.34, ease: 'easeOut' }}
                          />
                        ))}

                      {pattern === 'Stream' && (
                        <motion.line
                          x1="322"
                          y1="122"
                          x2="412"
                          y2="122"
                          stroke="#60A5FA"
                          strokeWidth="4.5"
                          strokeLinecap="round"
                          initial={{ pathLength: 0, opacity: 1 }}
                          animate={{ pathLength: 1, opacity: [1, 1, 0] }}
                          transition={{ duration: 0.3, ease: 'easeOut' }}
                        />
                      )}

                      {pattern === 'Foam' &&
                        [
                          { dx: 24, dy: -6, r: 8 },
                          { dx: 40, dy: -16, r: 6.5 },
                          { dx: 42, dy: 12, r: 7 },
                          { dx: 60, dy: 0, r: 9 },
                          { dx: 74, dy: -12, r: 6 },
                        ].map((b, idx) => (
                          <motion.circle
                            key={idx}
                            cx={328}
                            cy={122}
                            r={b.r}
                            fill="rgba(219,234,254,0.9)"
                            stroke="#60A5FA"
                            strokeWidth="1.5"
                            initial={{ cx: 328, cy: 122, scale: 0.3, opacity: 1 }}
                            animate={{ cx: 328 + b.dx, cy: 122 + b.dy, scale: 1.25, opacity: 0 }}
                            transition={{ duration: 0.36, ease: 'easeOut' }}
                          />
                        ))}
                    </motion.g>
                  ) : (
                    <g opacity="0.6">
                      {pattern === 'Spray' && (
                        <g fill="#93C5FD">
                          <circle cx="332" cy="122" r="2.2" />
                          <circle cx="348" cy="112" r="2" />
                          <circle cx="350" cy="132" r="2" />
                          <circle cx="368" cy="104" r="1.6" />
                          <circle cx="372" cy="122" r="1.8" />
                          <circle cx="368" cy="140" r="1.6" />
                        </g>
                      )}
                      {pattern === 'Stream' && (
                        <line
                          x1="324"
                          y1="122"
                          x2="398"
                          y2="122"
                          stroke="#60A5FA"
                          strokeWidth="3.5"
                          strokeLinecap="round"
                          strokeDasharray="10 6"
                        />
                      )}
                      {pattern === 'Foam' && (
                        <g fill="rgba(219,234,254,0.75)" stroke="#60A5FA" strokeWidth="1.4">
                          <circle cx="338" cy="122" r="7" />
                          <circle cx="353" cy="112" r="5.5" />
                          <circle cx="355" cy="132" r="6" />
                        </g>
                      )}
                    </g>
                  )}
                </AnimatePresence>
                </svg>
              </div>

              {/* Spec Readout & Test Trigger Bar */}
              <div className="mt-4 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2.5">
                  <div className="inline-flex items-center gap-2 bg-white/10 px-3.5 py-1.5 rounded-full">
                    <span
                      className="w-3 h-3 rounded-full border border-white/40"
                      style={{ backgroundColor: selectedColour.hex }}
                    />
                    <span className="font-semibold">
                      {pantoneNote.trim() || selectedColour.name} · {patternLabel}
                    </span>
                  </div>
                  <span className="font-mono text-blue-200 hidden sm:inline">
                    {neckFinish} · {bottleLabel}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleTestSpray}
                  className="inline-flex items-center gap-1.5 bg-white/15 hover:bg-white/25 text-white font-semibold px-3.5 py-1.5 rounded-full transition-colors cursor-pointer"
                >
                  <Crosshair className="w-3.5 h-3.5 text-[#FF7A80]" />
                  <span>{s.labTestSpray}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
