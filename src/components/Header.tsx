import { useState } from 'react';
import { ArrowRight, Menu, X } from 'lucide-react';
import { BrandMark } from './BrandMark';
import { LanguageCode, UI_TRANSLATIONS } from '../data/factoryData';
import { getAppStrings } from '../data/translations';

export type AppPage = 'home' | 'products' | 'blog' | 'dashboard';

interface HeaderProps {
  lang: LanguageCode;
  activePage: AppPage;
  onNavigatePage: (page: AppPage, sectionId?: string) => void;
  onRequestQuote: () => void;
}

export function Header({
  lang,
  activePage,
  onNavigatePage,
  onRequestQuote,
}: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const t = UI_TRANSLATIONS[lang];
  const s = getAppStrings(lang);

  const handleHomeSection = (sectionId: string) => {
    setMobileOpen(false);
    onNavigatePage('home', sectionId);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 h-16 flex items-center justify-between gap-6">
        {/* Zone 1: Brand Title */}
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            handleHomeSection('top');
          }}
          className="flex items-center gap-2.5 text-[#0B1B3E] font-display font-extrabold text-lg tracking-tight whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#155EEF] rounded"
        >
          <BrandMark className="w-8 h-8 shrink-0" />
          <span>{s.brandShort}</span>
        </a>

        {/* Zone 2: Concise single-line text nav links */}
        <nav className="hidden lg:flex items-center gap-5 xl:gap-6 text-sm font-medium text-slate-600" aria-label="Primary">
          <a
            href="#products"
            onClick={(e) => {
              e.preventDefault();
              setMobileOpen(false);
              onNavigatePage('products');
            }}
            aria-current={activePage === 'products' ? 'page' : undefined}
            className={`transition-colors duration-150 whitespace-nowrap shrink-0 py-1 border-b-2 ${
              activePage === 'products'
                ? 'text-[#155EEF] border-[#155EEF] font-semibold'
                : 'border-transparent hover:text-[#155EEF] hover:border-[#155EEF]'
            }`}
          >
            {t.navProducts}
          </a>
          <a
            href="#customize"
            onClick={(e) => {
              e.preventDefault();
              handleHomeSection('customize');
            }}
            className="hover:text-[#155EEF] transition-colors duration-150 whitespace-nowrap shrink-0 py-1 border-b-2 border-transparent hover:border-[#155EEF]"
          >
            {t.navCustomize}
          </a>
          <a
            href="#factory"
            onClick={(e) => {
              e.preventDefault();
              handleHomeSection('factory');
            }}
            className="hover:text-[#155EEF] transition-colors duration-150 whitespace-nowrap shrink-0 py-1 border-b-2 border-transparent hover:border-[#155EEF]"
          >
            {t.navFactory}
          </a>
          <a
            href="#export"
            onClick={(e) => {
              e.preventDefault();
              handleHomeSection('export');
            }}
            className="hover:text-[#155EEF] transition-colors duration-150 whitespace-nowrap shrink-0 py-1 border-b-2 border-transparent hover:border-[#155EEF]"
          >
            {t.navExport}
          </a>
          <a
            href="#blog"
            onClick={(e) => {
              e.preventDefault();
              setMobileOpen(false);
              onNavigatePage('blog');
            }}
            aria-current={activePage === 'blog' ? 'page' : undefined}
            className={`transition-colors duration-150 whitespace-nowrap shrink-0 py-1 border-b-2 ${
              activePage === 'blog'
                ? 'text-[#155EEF] border-[#155EEF] font-semibold'
                : 'border-transparent hover:text-[#155EEF] hover:border-[#155EEF]'
            }`}
          >
            {t.navBlog}
          </a>
          <a
            href="#quote"
            onClick={(e) => {
              e.preventDefault();
              handleHomeSection('quote');
            }}
            className="hover:text-[#155EEF] transition-colors duration-150 whitespace-nowrap shrink-0 py-1 border-b-2 border-transparent hover:border-[#155EEF]"
          >
            {t.navContact}
          </a>
          <a
            href="#dashboard"
            onClick={(e) => {
              e.preventDefault();
              setMobileOpen(false);
              onNavigatePage('dashboard');
            }}
            aria-current={activePage === 'dashboard' ? 'page' : undefined}
            className={`transition-colors duration-150 whitespace-nowrap shrink-0 py-1 border-b-2 ${
              activePage === 'dashboard'
                ? 'text-[#155EEF] border-[#155EEF] font-semibold'
                : 'border-transparent hover:text-[#155EEF] hover:border-[#155EEF]'
            }`}
          >
            {t.navDashboard}
          </a>
        </nav>

        {/* Zone 3: Primary Action + Mobile Drawer Toggle */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => {
              setMobileOpen(false);
              onRequestQuote();
            }}
            className="hidden sm:inline-flex items-center gap-2 bg-[#E1262D] hover:bg-[#C61D24] text-white font-semibold text-sm px-5 py-2.5 rounded-full transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E1262D]"
          >
            <span>{t.requestQuote}</span>
            <ArrowRight className="w-4 h-4 rtl:rotate-180" />
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg text-[#0B1B3E] hover:bg-slate-100 transition-colors"
            aria-label={mobileOpen ? s.menuCloseAria : s.menuOpenAria}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-5 py-4 space-y-2">
          <a
            href="#products"
            onClick={(e) => {
              e.preventDefault();
              setMobileOpen(false);
              onNavigatePage('products');
            }}
            className={`block py-2.5 text-base font-medium ${
              activePage === 'products' ? 'text-[#155EEF] font-bold' : 'text-[#0B1B3E] hover:text-[#155EEF]'
            }`}
          >
            {t.navProducts}
          </a>
          <a
            href="#customize"
            onClick={(e) => {
              e.preventDefault();
              handleHomeSection('customize');
            }}
            className="block py-2.5 text-base font-medium text-[#0B1B3E] hover:text-[#155EEF]"
          >
            {t.navCustomize}
          </a>
          <a
            href="#factory"
            onClick={(e) => {
              e.preventDefault();
              handleHomeSection('factory');
            }}
            className="block py-2.5 text-base font-medium text-[#0B1B3E] hover:text-[#155EEF]"
          >
            {t.navFactory}
          </a>
          <a
            href="#export"
            onClick={(e) => {
              e.preventDefault();
              handleHomeSection('export');
            }}
            className="block py-2.5 text-base font-medium text-[#0B1B3E] hover:text-[#155EEF]"
          >
            {t.navExport}
          </a>
          <a
            href="#blog"
            onClick={(e) => {
              e.preventDefault();
              setMobileOpen(false);
              onNavigatePage('blog');
            }}
            className={`block py-2.5 text-base font-medium ${
              activePage === 'blog' ? 'text-[#155EEF] font-bold' : 'text-[#0B1B3E] hover:text-[#155EEF]'
            }`}
          >
            {t.navBlog}
          </a>
          <a
            href="#quote"
            onClick={(e) => {
              e.preventDefault();
              handleHomeSection('quote');
            }}
            className="block py-2.5 text-base font-medium text-[#0B1B3E] hover:text-[#155EEF]"
          >
            {t.navContact}
          </a>
          <a
            href="#dashboard"
            onClick={(e) => {
              e.preventDefault();
              setMobileOpen(false);
              onNavigatePage('dashboard');
            }}
            className={`block py-2.5 text-base font-medium ${
              activePage === 'dashboard' ? 'text-[#155EEF] font-bold' : 'text-[#0B1B3E] hover:text-[#155EEF]'
            }`}
          >
            {t.navDashboard}
          </a>
          <button
            type="button"
            onClick={() => {
              setMobileOpen(false);
              onRequestQuote();
            }}
            className="w-full mt-2 inline-flex items-center justify-center gap-2 bg-[#E1262D] text-white font-semibold text-sm px-5 py-3 rounded-full"
          >
            <span>{t.requestQuote}</span>
            <ArrowRight className="w-4 h-4 rtl:rotate-180" />
          </button>
        </div>
      )}
    </header>
  );
}
