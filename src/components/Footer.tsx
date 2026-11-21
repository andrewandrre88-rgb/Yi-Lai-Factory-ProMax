import { BrandMark } from './BrandMark';
import { LanguageCode, ProductCategory, UI_TRANSLATIONS } from '../data/factoryData';
import { CATALOG_2026_PDF_URL } from '../data/catalog2026Data';
import { getAppStrings, getLocalizedCategories } from '../data/translations';

interface FooterProps {
  lang: LanguageCode;
  onSelectCategory: (category: ProductCategory) => void;
  onNavigateSection: (sectionId: string) => void;
  onOpenProductsPage: () => void;
  onOpenBlogPage?: () => void;
  onOpenDashboardPage?: () => void;
}

export function Footer({
  lang,
  onSelectCategory,
  onNavigateSection,
  onOpenProductsPage,
  onOpenBlogPage,
  onOpenDashboardPage,
}: FooterProps) {
  const s = getAppStrings(lang);
  const t = UI_TRANSLATIONS[lang];
  const categories = getLocalizedCategories(lang);

  return (
    <footer className="bg-[#06122E] text-white border-t border-white/10">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center p-1">
                <BrandMark className="w-8 h-8" />
              </div>
              <div>
                <p className="font-display font-extrabold text-base tracking-tight">
                  {s.brandFull}
                </p>
                <p className="text-xs text-blue-200/80">
                  Ningbo Yilaipulin Plastic Industry Co., Ltd. · {s.footerSince}
                </p>
              </div>
            </div>
            <p className="mt-4 text-sm text-blue-100/75 leading-relaxed max-w-sm">
              {s.footerSummary}
            </p>
          </div>

          <div className="md:col-span-3">
            <h3 className="text-xs font-semibold tracking-wider text-blue-200/70 uppercase">
              {s.footerColProducts}
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {categories.map((cat) => (
                <li key={cat.id}>
                  <button
                    type="button"
                    onClick={() => onSelectCategory(cat)}
                    className="text-blue-100/85 hover:text-white transition-colors cursor-pointer text-start"
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h3 className="text-xs font-semibold tracking-wider text-blue-200/70 uppercase">
              {s.footerColFactory}
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-blue-100/85">
              <li>
                <button
                  type="button"
                  onClick={onOpenProductsPage}
                  className="hover:text-white transition-colors cursor-pointer text-start"
                >
                  {s.footerLinkRange}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateSection('customize')}
                  className="hover:text-white transition-colors cursor-pointer text-start"
                >
                  {s.footerLinkLab}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateSection('factory')}
                  className="hover:text-white transition-colors cursor-pointer text-start"
                >
                  {s.footerLinkLines}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateSection('export')}
                  className="hover:text-white transition-colors cursor-pointer text-start"
                >
                  {s.footerLinkExport}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateSection('quote')}
                  className="hover:text-white transition-colors cursor-pointer text-start"
                >
                  {s.footerLinkQuote}
                </button>
              </li>
              {onOpenBlogPage && (
                <li>
                  <button
                    type="button"
                    onClick={onOpenBlogPage}
                    className="hover:text-white transition-colors cursor-pointer text-start"
                  >
                    {t.navBlog}
                  </button>
                </li>
              )}
              {onOpenDashboardPage && (
                <li>
                  <button
                    type="button"
                    onClick={onOpenDashboardPage}
                    className="hover:text-white transition-colors cursor-pointer text-start"
                  >
                    {t.navDashboard}
                  </button>
                </li>
              )}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h3 className="text-xs font-semibold tracking-wider text-blue-200/70 uppercase">
              {s.footerColContact}
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-blue-100/85">
              <li>
                <a href="mailto:yilaiplastics@gmail.com" className="hover:text-white transition-colors break-all">
                  yilaiplastics@gmail.com
                </a>
              </li>
              <li dir="ltr" className="font-mono text-xs">+86 137 5705 0848</li>
              <li className="text-xs text-blue-200/75">
                {s.quoteAddressValue}
              </li>
              <li>
                <a
                  href={CATALOG_2026_PDF_URL}
                  download="Ningbo-Yilaipulin-Yi-Lai-Plastics-2026-Catalog.pdf"
                  className="text-xs font-semibold text-blue-200 hover:text-white underline underline-offset-4 transition-colors"
                >
                  2026 Catalog (PDF)
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-blue-200/65">
          <p>{s.footerCopyright}</p>
          <p>{s.footerBottomRight}</p>
        </div>
      </div>
    </footer>
  );
}
