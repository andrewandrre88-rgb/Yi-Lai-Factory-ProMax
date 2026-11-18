import { LanguageCode } from '../data/factoryData';

export interface SocialMediaLinks {
  facebook: string;
  instagram: string;
  tiktok: string;
  youtube: string;
  linkedin: string;
}

export type SocialPlatformKey = keyof SocialMediaLinks;

export interface SocialPlatformMeta {
  key: SocialPlatformKey;
  label: string;
  placeholder: string;
  accentBg: string;
  accentText: string;
}

export const EMPTY_SOCIAL_LINKS: SocialMediaLinks = {
  facebook: '',
  instagram: '',
  tiktok: '',
  youtube: '',
  linkedin: '',
};

export const SOCIAL_PLATFORMS: readonly SocialPlatformMeta[] = [
  {
    key: 'facebook',
    label: 'Facebook',
    placeholder: 'https://www.facebook.com/yilaipackaging',
    accentBg: 'bg-[#1877F2]/10 hover:bg-[#1877F2] text-[#1877F2] hover:text-white border-[#1877F2]/25',
    accentText: 'text-[#1877F2]',
  },
  {
    key: 'instagram',
    label: 'Instagram',
    placeholder: 'https://www.instagram.com/yilaipackaging',
    accentBg: 'bg-[#E4405F]/10 hover:bg-[#E4405F] text-[#E4405F] hover:text-white border-[#E4405F]/25',
    accentText: 'text-[#E4405F]',
  },
  {
    key: 'tiktok',
    label: 'TikTok',
    placeholder: 'https://www.tiktok.com/@yilaipackaging',
    accentBg: 'bg-[#0B1B3E]/8 hover:bg-[#0B1B3E] text-[#0B1B3E] hover:text-white border-[#0B1B3E]/20',
    accentText: 'text-[#0B1B3E]',
  },
  {
    key: 'youtube',
    label: 'YouTube',
    placeholder: 'https://www.youtube.com/@yilaipackaging',
    accentBg: 'bg-[#FF0000]/10 hover:bg-[#FF0000] text-[#D90000] hover:text-white border-[#FF0000]/25',
    accentText: 'text-[#D90000]',
  },
  {
    key: 'linkedin',
    label: 'LinkedIn',
    placeholder: 'https://www.linkedin.com/company/yilaipackaging',
    accentBg: 'bg-[#0A66C2]/10 hover:bg-[#0A66C2] text-[#0A66C2] hover:text-white border-[#0A66C2]/25',
    accentText: 'text-[#0A66C2]',
  },
] as const;

export function SocialPlatformIcon({
  platform,
  className = 'w-4 h-4',
}: {
  platform: SocialPlatformKey;
  className?: string;
}) {
  switch (platform) {
    case 'facebook':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
          <path d="M13.5 22v-8.2h2.75l.41-3.2H13.5V8.56c0-.93.26-1.56 1.59-1.56h1.7V4.14c-.3-.04-1.31-.13-2.49-.13-2.46 0-4.15 1.5-4.15 4.26v2.33H7.36v3.2h2.79V22h3.35z" />
        </svg>
      );
    case 'instagram':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
        </svg>
      );
    case 'tiktok':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3 15.28 6.34 6.34 0 0 0 9.34 21.6a6.34 6.34 0 0 0 6.34-6.34V8.76a8.28 8.28 0 0 0 4.77 1.5V6.81c-.3 0-.59-.04-.86-.12z" />
        </svg>
      );
    case 'youtube':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
          <path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.38.55A3.02 3.02 0 0 0 .5 6.19C0 8.07 0 12 0 12s0 3.93.5 5.81a3.02 3.02 0 0 0 2.12 2.14c1.88.55 9.38.55 9.38.55s7.5 0 9.38-.55a3.02 3.02 0 0 0 2.12-2.14C24 15.93 24 12 24 12s0-3.93-.5-5.81zM9.55 15.57V8.43L15.82 12l-6.27 3.57z" />
        </svg>
      );
    case 'linkedin':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
        </svg>
      );
  }
}

const SECTION_HEADINGS: Record<LanguageCode, string> = {
  en: 'Official Social Channels',
  es: 'Redes Sociales Oficiales',
  ar: 'قنوات التواصل الرسمية',
};

export function SocialLinksBar({
  links,
  lang,
  compact = false,
}: {
  links?: SocialMediaLinks | null;
  lang: LanguageCode;
  compact?: boolean;
}) {
  if (!links) return null;

  const activeItems = SOCIAL_PLATFORMS.filter((platform) => {
    const raw = links[platform.key];
    return typeof raw === 'string' && /^https?:\/\//i.test(raw.trim());
  });

  if (activeItems.length === 0) return null;

  return (
    <div
      className={
        compact
          ? 'flex flex-wrap items-center gap-2'
          : 'bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 space-y-3'
      }
    >
      {!compact && (
        <p className="text-xs font-semibold text-[#0B1B3E]">
          {SECTION_HEADINGS[lang]}
        </p>
      )}
      <div className="flex flex-wrap items-center gap-2">
        {activeItems.map((platform) => (
          <a
            key={platform.key}
            href={links[platform.key].trim()}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-1.5 rounded-full border font-semibold transition-colors ${
              compact ? 'px-2.5 py-1 text-[11px]' : 'px-3.5 py-1.5 text-xs'
            } ${platform.accentBg}`}
          >
            <SocialPlatformIcon platform={platform.key} className="w-3.5 h-3.5 shrink-0" />
            <span>{platform.label}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
