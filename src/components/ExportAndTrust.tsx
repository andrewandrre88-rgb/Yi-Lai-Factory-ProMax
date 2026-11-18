import { useState } from 'react';
import { ArrowRight, Building2, PackageCheck, Palette, Truck } from 'lucide-react';
import { LanguageCode } from '../data/factoryData';
import { getAppStrings, getLocalizedExportMarkets } from '../data/translations';

interface ExportAndTrustProps {
  lang: LanguageCode;
  onTalkExport: (regionName: string) => void;
}

const PILLAR_ICONS = [Building2, Palette, PackageCheck, Truck] as const;

export function ExportAndTrust({ lang, onTalkExport }: ExportAndTrustProps) {
  const s = getAppStrings(lang);
  const markets = getLocalizedExportMarkets(lang);
  const [selectedMarketId, setSelectedMarketId] = useState(markets[0].id);
  const activeMarket = markets.find((m) => m.id === selectedMarketId) ?? markets[0];

  return (
    <>
      {/* Why Buyers Choose Yi Lai */}
      <section className="py-16 sm:py-24 bg-[#F6F9FE] border-t border-slate-200/70">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            <div className="lg:col-span-5">
              <p className="text-xs font-semibold tracking-wider text-[#E1262D] uppercase">
                {s.whyKicker}
              </p>
              <h2 className="mt-2 font-display font-extrabold text-3xl sm:text-4xl text-[#0B1B3E] tracking-tight leading-[1.15] text-balance">
                {s.whyTitle}
              </h2>
              <p className="mt-4 text-sm sm:text-base text-slate-600 leading-relaxed">
                {s.whySub}
              </p>

              {/* Clean unboxed certification line */}
              <p className="mt-6 pt-5 border-t border-slate-200 text-xs font-mono font-semibold text-slate-500">
                {s.whyCerts}
              </p>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5">
              {s.whyPillars.map((pillar, idx) => {
                const Icon = PILLAR_ICONS[idx] ?? Building2;
                return (
                  <div
                    key={pillar.title}
                    className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs"
                  >
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        pillar.accent === 'crimson'
                          ? 'bg-red-50 text-[#E1262D]'
                          : 'bg-blue-50 text-[#155EEF]'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="mt-4 font-display font-bold text-base sm:text-lg text-[#0B1B3E]">
                      {pillar.title}
                    </h3>
                    <p className="mt-1.5 text-sm text-slate-600 leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Deep Cobalt Export Shipping Map */}
      <section
        id="export"
        className="py-20 sm:py-24 bg-gradient-to-br from-[#0F4CD4] via-[#155EEF] to-[#0E3EB0] text-white overflow-hidden"
      >
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-wider text-blue-200 uppercase">
              {s.exportKicker}
            </p>
            <h2 className="mt-2 font-display font-extrabold text-3xl sm:text-5xl tracking-tight text-balance">
              {s.exportTitle}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-blue-100 leading-relaxed">
              {s.exportSub}
            </p>
          </div>

          {/* Interactive World Logistics Map */}
          <div className="mt-10 rounded-3xl bg-[#0A349B]/55 border border-white/15 p-4 sm:p-8 backdrop-blur-xs">
            <div dir="ltr" className="relative w-full aspect-[16/7] min-h-[260px]">
              <svg
                viewBox="0 0 1000 430"
                className="w-full h-full select-none"
                role="img"
                aria-label={s.exportTitle}
              >
                {/* Simplified Stylized Continents */}
                <g fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.18)" strokeWidth="1">
                  {/* North America */}
                  <path d="M90 70 L240 60 L270 130 L210 190 L145 185 L110 135 Z" />
                  {/* South America */}
                  <path d="M235 225 L315 245 L335 315 L285 395 L250 380 L230 295 Z" />
                  {/* Europe */}
                  <path d="M445 75 L540 65 L560 130 L495 150 L445 130 Z" />
                  {/* Africa / Middle East */}
                  <path d="M455 165 L555 160 L595 210 L565 260 L525 350 L470 310 L445 230 Z" />
                  {/* Asia */}
                  <path d="M565 75 L820 75 L855 170 L780 235 L660 220 L595 165 Z" />
                  {/* Australia */}
                  <path d="M770 285 L865 280 L880 345 L790 355 Z" />
                </g>

                {/* Shipping Arcs from Ningbo (790, 175) */}
                {[
                  { id: 'middle-east', d: 'M790 175 Q680 155 565 205' },
                  { id: 'south-america', d: 'M790 175 Q540 335 285 305' },
                  { id: 'europe', d: 'M790 175 Q640 85 495 125' },
                  { id: 'north-america', d: 'M790 175 Q480 40 195 145' },
                ].map((route) => {
                  const isActive = route.id === selectedMarketId;
                  return (
                    <g key={route.id}>
                      <path
                        id={`route-${route.id}`}
                        d={route.d}
                        fill="none"
                        stroke={isActive ? '#FFFFFF' : 'rgba(255,255,255,0.38)'}
                        strokeWidth={isActive ? '2.8' : '1.5'}
                        strokeDasharray="6 6"
                      />
                      {isActive && (
                        <circle r="5" fill="#FF6B70" stroke="#FFFFFF" strokeWidth="1.5">
                          <animateMotion dur="2.6s" repeatCount="indefinite" path={route.d} />
                        </circle>
                      )}
                    </g>
                  );
                })}

                {/* Origin: Ningbo Port */}
                <g transform="translate(790, 175)">
                  <circle r="13" fill="rgba(225,38,45,0.28)" />
                  <circle r="7" fill="#E1262D" stroke="#FFFFFF" strokeWidth="2" />
                  <text x="16" y="-6" fill="#FFFFFF" fontSize="14" fontWeight="800">
                    {s.exportOriginTitle}
                  </text>
                  <text x="16" y="12" fill="#BFDBFE" fontSize="11.5">
                    {s.exportOriginSub}
                  </text>
                </g>

                {/* Destination Hub Pins */}
                {markets.map((market) => {
                  const px = (market.x / 100) * 1000;
                  const py = (market.y / 100) * 430;
                  const active = market.id === selectedMarketId;
                  return (
                    <g
                      key={market.id}
                      transform={`translate(${px}, ${py})`}
                      onClick={() => setSelectedMarketId(market.id)}
                      className="cursor-pointer"
                    >
                      <circle
                        r={active ? 14 : 10}
                        fill={active ? 'rgba(255,255,255,0.28)' : 'rgba(255,255,255,0.14)'}
                      />
                      <circle
                        r={active ? 6.5 : 5}
                        fill={active ? '#FFFFFF' : '#93C5FD'}
                      />
                      <text
                        x="0"
                        y="24"
                        textAnchor="middle"
                        fill="#FFFFFF"
                        fontSize="12.5"
                        fontWeight={active ? '800' : '600'}
                      >
                        {market.region.toUpperCase()}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Active Corridor Telemetry Strip */}
            <div className="mt-4 pt-4 border-t border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs sm:text-sm">
              <div>
                <span className="font-bold text-white">{activeMarket.region}:</span>{' '}
                <span className="text-blue-100">{activeMarket.hubs}</span>
              </div>
              <div className="font-mono text-blue-100 tabular-nums">
                {activeMarket.transitDays} · {activeMarket.incoterms}
              </div>
            </div>
          </div>

          {/* Interactive Market Region Cards */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {markets.map((market) => {
              const active = market.id === selectedMarketId;
              return (
                <button
                  key={market.id}
                  type="button"
                  onClick={() => setSelectedMarketId(market.id)}
                  className={`text-start rounded-2xl p-5 border transition-all duration-150 cursor-pointer flex flex-col justify-between ${
                    active
                      ? 'bg-white text-[#0B1B3E] border-white shadow-lg'
                      : 'bg-white/10 text-white border-white/15 hover:bg-white/15'
                  }`}
                >
                  <div>
                    <h3 className="font-display font-bold text-lg">{market.region}</h3>
                    <p
                      className={`mt-2 text-xs leading-relaxed ${
                        active ? 'text-slate-600' : 'text-blue-100'
                      }`}
                    >
                      {market.summary}
                    </p>
                  </div>

                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      onTalkExport(market.region);
                    }}
                    className={`mt-4 inline-flex items-center gap-1.5 text-xs font-semibold ${
                      active ? 'text-[#E1262D]' : 'text-blue-200 hover:text-white'
                    }`}
                  >
                    <span>
                      {s.exportQuotePrefix} {market.region}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
