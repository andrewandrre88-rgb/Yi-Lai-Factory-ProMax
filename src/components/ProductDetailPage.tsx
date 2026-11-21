import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight, CheckCircle2, FileDown, Palette, ShieldCheck, Truck } from 'lucide-react';
import { LanguageCode, ProductCategory, ProductVariant } from '../data/factoryData';
import {
  CATALOG_2026_PDF_URL,
  CATALOG_MODELS_2026,
  CATALOG_SERIES_META,
} from '../data/catalog2026Data';
import { getAppStrings } from '../data/translations';
import { LanguageSwitcher } from './LanguageSwitcher';
import { SocialLinksBar, SocialMediaLinks } from './SocialLinksBar';
import { hasAnySocialLink } from '../services/cmsService';
import {
  buildWhatsAppUrl,
  WHATSAPP_NUMBER_DISPLAY,
  WhatsAppIcon,
} from './WhatsAppIcon';

interface ProductDetailPageProps {
  lang: LanguageCode;
  onChangeLang: (lang: LanguageCode) => void;
  category: ProductCategory;
  variant: ProductVariant;
  globalSocialLinks?: SocialMediaLinks;
  onBackToProducts: () => void;
  onSelectRelatedVariant: (category: ProductCategory, variant: ProductVariant) => void;
  onRequestQuote: (categoryId: string, variant: ProductVariant, customNote: string) => void;
  onOpenNozzleLab: () => void;
}

export function ProductDetailPage({
  lang,
  onChangeLang,
  category,
  variant,
  globalSocialLinks,
  onBackToProducts,
  onSelectRelatedVariant,
  onRequestQuote,
  onOpenNozzleLab,
}: ProductDetailPageProps) {
  const s = getAppStrings(lang);
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [colourIdx, setColourIdx] = useState(0);
  const [volumeIdx, setVolumeIdx] = useState(1);

  useEffect(() => {
    setActiveImageIdx(0);
  }, [variant.slug]);

  const activeImage = variant.gallery[activeImageIdx] ?? variant.gallery[0];
  const relatedVariants = category.variants.filter((v) => v.slug !== variant.slug);
  const selectedColour = s.detailColours[colourIdx] ?? s.detailColours[0];
  const selectedVolume = s.detailVolumes[volumeIdx] ?? s.detailVolumes[1];

  const matchingCatalogSeries = CATALOG_SERIES_META.filter(
    (m) => m.siteCategoryId === category.id
  );
  const matchingCatalogModels = CATALOG_MODELS_2026.filter(
    (m) => m.siteCategoryId === category.id
  );

  return (
    <div className="bg-[#F6F9FE] min-h-screen pb-20">
      {/* Breadcrumb & Top Bar */}
      <div className="bg-white border-b border-slate-200/80">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-8 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-slate-500">
            <button
              type="button"
              onClick={onBackToProducts}
              className="inline-flex items-center gap-1.5 font-semibold text-[#0B1B3E] hover:text-[#155EEF] transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
              <span>{s.detailAllProducts}</span>
            </button>
            <span aria-hidden="true">/</span>
            <button
              type="button"
              onClick={onBackToProducts}
              className="hover:text-[#155EEF] transition-colors cursor-pointer"
            >
              {category.name}
            </button>
            <span aria-hidden="true">/</span>
            <span className="font-semibold text-[#155EEF]">{variant.model}</span>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <LanguageSwitcher lang={lang} onChangeLang={onChangeLang} />
            <a
              href={CATALOG_2026_PDF_URL}
              download="Ningbo-Yilaipulin-Yi-Lai-Plastics-2026-Catalog.pdf"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#155EEF] hover:text-[#0B1B3E] transition-colors"
            >
              <FileDown className="w-3.5 h-3.5 text-[#E1262D]" />
              <span>2026 Catalog PDF</span>
            </a>
            <span className="font-mono text-xs text-slate-500">
              {s.productsSeriesLabel} {category.index} · {s.detailFobNote}
            </span>
          </div>
        </div>
      </div>

      {/* Main Two-Column Product Detail Layout */}
      <section className="max-w-[1280px] mx-auto px-5 sm:px-8 pt-8 sm:pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Multi-Image Interactive Gallery */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative aspect-[4/3] w-full rounded-3xl overflow-hidden bg-white border border-slate-200/90 shadow-sm">
              <motion.img
                key={activeImage.src + activeImageIdx}
                initial={{ opacity: 0.4, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.25 }}
                src={activeImage.src}
                alt={`${variant.model} — ${activeImage.label}`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-3 start-3 bg-[#0B1B3E]/85 backdrop-blur-xs text-white text-xs font-medium px-3.5 py-1.5 rounded-full">
                {activeImage.label}
              </div>
              <div className="absolute bottom-3 end-3 bg-white/90 text-[#0B1B3E] font-mono text-xs font-semibold px-3 py-1.5 rounded-full border border-slate-200/80 tabular-nums">
                {activeImageIdx + 1} / {variant.gallery.length}
              </div>
            </div>

            {/* 4-Thumbnail Gallery Switcher */}
            <div className="grid grid-cols-4 gap-3">
              {variant.gallery.map((item, idx) => {
                const isActive = idx === activeImageIdx;
                return (
                  <button
                    key={`${item.label}-${idx}`}
                    type="button"
                    onClick={() => setActiveImageIdx(idx)}
                    className={`group text-start rounded-2xl overflow-hidden border-2 transition-all cursor-pointer bg-white ${
                      isActive
                        ? 'border-[#155EEF] shadow-sm'
                        : 'border-slate-200 hover:border-slate-300 opacity-80 hover:opacity-100'
                    }`}
                  >
                    <div className="aspect-[4/3] w-full overflow-hidden bg-slate-100">
                      <img
                        src={item.src}
                        alt={item.label}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                      />
                    </div>
                    <p className="px-2 py-1.5 text-[11px] font-medium text-[#0B1B3E] truncate">
                      {item.label}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Description, Technical Specs & Quote Builder */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <p className="text-xs font-semibold tracking-wider text-[#E1262D] uppercase">
                {category.name} · {s.productsSeriesLabel} {category.index}
              </p>
              <h1 className="mt-1.5 font-display font-extrabold text-3xl sm:text-4xl text-[#0B1B3E] tracking-tight text-balance">
                {variant.model}
              </h1>
              <p className="mt-2 font-mono text-xs sm:text-sm text-[#155EEF] font-semibold tabular-nums">
                {s.detailNeckPrefix} {variant.neckFinish} · {s.detailOutputPrefix} {variant.dosage} · {s.detailMoqPrefix} {variant.moq}
              </p>
            </div>

            {/* Detailed Product Description */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 space-y-4">
              <h2 className="font-display font-bold text-base text-[#0B1B3E]">
                {s.detailOverviewTitle}
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                {variant.description}
              </p>

              <ul className="space-y-2 pt-2 border-t border-slate-100">
                {variant.features.map((feat) => (
                  <li key={feat} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-[#155EEF] shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Technical Specifications Grid */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6">
              <h2 className="font-display font-bold text-base text-[#0B1B3E] mb-4">
                {s.detailTechSpecsTitle}
              </h2>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-xs sm:text-sm">
                <div className="border-b border-slate-100 pb-2">
                  <dt className="text-slate-400 text-xs">{s.detailSpecNeck}</dt>
                  <dd className="font-mono font-semibold text-[#0B1B3E] mt-0.5 tabular-nums">
                    {variant.neckFinish}
                  </dd>
                </div>
                <div className="border-b border-slate-100 pb-2">
                  <dt className="text-slate-400 text-xs">{s.detailSpecDosage}</dt>
                  <dd className="font-mono font-semibold text-[#0B1B3E] mt-0.5 tabular-nums">
                    {variant.dosage}
                  </dd>
                </div>
                <div className="border-b border-slate-100 pb-2">
                  <dt className="text-slate-400 text-xs">{s.detailSpecClosure}</dt>
                  <dd className="font-semibold text-[#0B1B3E] mt-0.5">{variant.closureStyle}</dd>
                </div>
                <div className="border-b border-slate-100 pb-2">
                  <dt className="text-slate-400 text-xs">{s.detailSpecSpring}</dt>
                  <dd className="font-semibold text-[#0B1B3E] mt-0.5">{variant.springType}</dd>
                </div>
                <div className="border-b border-slate-100 pb-2">
                  <dt className="text-slate-400 text-xs">{s.detailSpecMaterials}</dt>
                  <dd className="font-semibold text-[#0B1B3E] mt-0.5">{variant.materials}</dd>
                </div>
                <div className="border-b border-slate-100 pb-2">
                  <dt className="text-slate-400 text-xs">{s.detailSpecLeadTime}</dt>
                  <dd className="font-mono font-semibold text-[#0B1B3E] mt-0.5 tabular-nums">
                    {variant.leadTime}
                  </dd>
                </div>
                <div className="sm:col-span-2 pt-1">
                  <dt className="text-slate-400 text-xs">{s.detailSpecApps}</dt>
                  <dd className="font-medium text-slate-700 mt-0.5">{variant.applications}</dd>
                </div>
              </dl>
            </div>

            {/* Interactive Quote & Sample Configuration */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 space-y-4">
              <div>
                <p className="text-xs font-semibold text-[#0B1B3E] mb-2">
                  {s.detailPrefColour} <span className="text-[#155EEF]">{selectedColour.name}</span>
                </p>
                <div className="flex flex-wrap items-center gap-2.5">
                  {s.detailColours.map((c, idx) => {
                    const active = idx === colourIdx;
                    return (
                      <button
                        key={c.name}
                        type="button"
                        onClick={() => setColourIdx(idx)}
                        title={c.name}
                        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                          active
                            ? 'bg-[#0B1B3E] text-white border-[#0B1B3E]'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-[#155EEF]'
                        }`}
                      >
                        <span
                          className={`w-3 h-3 rounded-full shrink-0 ${c.border ? 'border border-slate-300' : ''}`}
                          style={{ background: c.hex }}
                        />
                        <span>{c.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold text-[#0B1B3E] mb-2">
                  {s.detailTargetVolume}
                </p>
                <div className="flex flex-wrap gap-2">
                  {s.detailVolumes.map((vol, idx) => (
                    <button
                      key={vol}
                      type="button"
                      onClick={() => setVolumeIdx(idx)}
                      className={`px-3.5 py-1.5 rounded-lg font-mono text-xs font-semibold border transition-colors cursor-pointer ${
                        idx === volumeIdx
                          ? 'bg-[#155EEF] text-white border-[#155EEF]'
                          : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-[#155EEF]'
                      }`}
                    >
                      {vol}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() =>
                    onRequestQuote(
                      category.id,
                      variant,
                      `${variant.model} | ${s.detailNeckPrefix}: ${variant.neckFinish} | ${selectedColour.name} | ${selectedVolume}`
                    )
                  }
                  className="flex-1 min-w-[220px] inline-flex items-center justify-center gap-2 bg-[#E1262D] hover:bg-[#C61D24] text-white font-semibold text-sm px-6 py-3.5 rounded-full transition-colors cursor-pointer shadow-sm"
                >
                  <span>{s.detailRequestSamplesBtn}</span>
                  <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                </button>

                <button
                  type="button"
                  onClick={onOpenNozzleLab}
                  className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-[#0B1B3E] border border-slate-300 font-semibold text-sm px-5 py-3.5 rounded-full transition-colors cursor-pointer"
                >
                  <Palette className="w-4 h-4 text-[#155EEF]" />
                  <span>{s.detailCustomizeBtn}</span>
                </button>

                <a
                  href={buildWhatsAppUrl(
                    `${variant.model} (${variant.neckFinish}) — ${selectedColour.name}, ${selectedVolume}`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2.5 bg-[#16A34A] hover:bg-[#15803D] text-white font-semibold text-sm px-6 py-3.5 rounded-full transition-colors cursor-pointer shadow-sm"
                >
                  <WhatsAppIcon className="w-5 h-5 shrink-0" />
                  <span>{s.whatsappCtaLabel}</span>
                  <span
                    dir="ltr"
                    className="font-mono text-xs font-semibold bg-black/15 px-2.5 py-0.5 rounded-full tabular-nums"
                  >
                    {WHATSAPP_NUMBER_DISPLAY}
                  </span>
                </a>
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate-500">
                <span className="inline-flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#155EEF]" />
                  {s.detailCertBadge1}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-[#155EEF]" />
                  {s.detailCertBadge2}
                </span>
              </div>
            </div>

            <SocialLinksBar
              links={
                hasAnySocialLink(variant.socialLinks)
                  ? variant.socialLinks
                  : globalSocialLinks
              }
              lang={lang}
            />
          </div>
        </div>

        {/* 2026 PDF Catalog Reference & Series Lineup */}
        {matchingCatalogModels.length > 0 && (
          <div className="mt-14 pt-10 border-t border-slate-200/80">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <p className="text-xs font-semibold tracking-wider text-[#E1262D] uppercase">
                  2026 Product Catalog Series ·{' '}
                  {matchingCatalogSeries.map((ms) => ms.pageRange).join(' & ')}
                </p>
                <h2 className="mt-1 font-display font-extrabold text-2xl text-[#0B1B3E] tracking-tight">
                  Complete Catalog Model Codes ({matchingCatalogModels.length} SKUs)
                </h2>
                {matchingCatalogSeries.length > 0 && (
                  <p className="mt-1.5 text-xs sm:text-sm text-slate-600">
                    {Array.from(
                      new Set(matchingCatalogSeries.flatMap((ms) => ms.highlights))
                    ).join(' · ')}
                  </p>
                )}
              </div>

              <a
                href={CATALOG_2026_PDF_URL}
                download="Ningbo-Yilaipulin-Yi-Lai-Plastics-2026-Catalog.pdf"
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#155EEF] hover:text-[#0B1B3E] shrink-0"
              >
                <FileDown className="w-4 h-4 text-[#E1262D]" />
                <span>Download Catalog PDF</span>
              </a>
            </div>

            <div className="mt-5 bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-slate-200 bg-[#F8FAFE] text-slate-500 font-semibold text-xs uppercase tracking-wider">
                      <th className="py-3 px-4">Code</th>
                      <th className="py-3 px-4">Catalog Model</th>
                      <th className="py-3 px-4">Neck</th>
                      <th className="py-3 px-4">Output / Spec</th>
                      <th className="py-3 px-4">Feature</th>
                      <th className="py-3 px-4 text-right">Page</th>
                      <th className="py-3 px-4 text-right">Quote</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {matchingCatalogModels.map((item) => (
                      <tr key={item.code} className="hover:bg-[#F8FAFE] transition-colors">
                        <td className="py-2.5 px-4 font-mono font-bold text-[#155EEF] whitespace-nowrap">
                          {item.code}
                        </td>
                        <td className="py-2.5 px-4 font-semibold text-[#0B1B3E]">{item.name}</td>
                        <td className="py-2.5 px-4 font-mono text-xs text-slate-700 whitespace-nowrap tabular-nums">
                          {item.neckSizes}
                        </td>
                        <td className="py-2.5 px-4 font-mono text-xs text-[#0B1B3E] whitespace-nowrap tabular-nums">
                          {item.output}
                        </td>
                        <td className="py-2.5 px-4 text-xs text-slate-600">{item.feature}</td>
                        <td className="py-2.5 px-4 text-right font-mono text-xs text-slate-400 tabular-nums whitespace-nowrap">
                          p. {item.page}
                        </td>
                        <td className="py-2.5 px-4 text-right whitespace-nowrap">
                          <button
                            type="button"
                            onClick={() =>
                              onRequestQuote(
                                category.id,
                                variant,
                                `Catalog Model ${item.code} (${item.name}) | Neck: ${item.neckSizes} | Output: ${item.output} | ${selectedColour.name} | ${selectedVolume}`
                              )
                            }
                            className="inline-flex items-center gap-1 text-xs font-semibold text-[#E1262D] hover:text-[#0B1B3E] cursor-pointer"
                          >
                            <span>{s.productsQuoteBtn}</span>
                            <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Related Models in This Series */}
        {relatedVariants.length > 0 && (
          <div className="mt-14 pt-10 border-t border-slate-200/80">
            <h2 className="font-display font-extrabold text-2xl text-[#0B1B3E] tracking-tight">
              {s.detailMoreInSeries} {category.name}
            </h2>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedVariants.map((rel) => (
                <button
                  key={rel.slug}
                  type="button"
                  onClick={() => onSelectRelatedVariant(category, rel)}
                  className="group text-start bg-white rounded-2xl border border-slate-200/90 hover:border-[#155EEF] overflow-hidden shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col"
                >
                  <div className="aspect-[4/3] w-full overflow-hidden bg-slate-100 border-b border-slate-100">
                    <img
                      src={rel.gallery[0].src}
                      alt={rel.model}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-5">
                    <p className="font-mono text-xs text-[#155EEF] font-semibold">
                      {rel.neckFinish} · {rel.dosage}
                    </p>
                    <h3 className="mt-1 font-display font-bold text-base text-[#0B1B3E] group-hover:text-[#155EEF] transition-colors">
                      {rel.model}
                    </h3>
                    <p className="mt-1.5 text-xs text-slate-600 line-clamp-2">
                      {rel.description}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

