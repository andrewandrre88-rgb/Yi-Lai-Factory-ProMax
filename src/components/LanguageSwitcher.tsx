import { LanguageCode } from '../data/factoryData';

interface LanguageSwitcherProps {
  lang: LanguageCode;
  onChangeLang: (lang: LanguageCode) => void;
}

const LANGUAGES: ReadonlyArray<{ code: LanguageCode; label: string }> = [
  { code: 'en', label: 'EN' },
  { code: 'es', label: 'ES' },
  { code: 'ar', label: 'العربية' },
];

export function LanguageSwitcher({ lang, onChangeLang }: LanguageSwitcherProps) {
  return (
    <div
      className="inline-flex items-center gap-1 p-1 bg-slate-100 rounded-lg border border-slate-200/80 shrink-0"
      role="group"
      aria-label="Language switcher"
    >
      {LANGUAGES.map((item) => (
        <button
          key={item.code}
          type="button"
          onClick={() => onChangeLang(item.code)}
          className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
            lang === item.code
              ? 'bg-[#0B1B3E] text-white shadow-sm'
              : 'text-slate-600 hover:text-[#0B1B3E]'
          }`}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
