import { LanguageCode } from '../data/factoryData';

export const MAX_ACCOUNTS_PER_PLATFORM = 5;

export interface SocialMediaLinks {
  facebook: string[];
  instagram: string[];
  tiktok: string[];
  youtube: string[];
  linkedin: string[];
  x: string[];
  snapchat: string[];
  pinterest: string[];
  gmail: string[];
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
  facebook: [],
  instagram: [],
  tiktok: [],
  youtube: [],
  linkedin: [],
  x: [],
  snapchat: [],
  pinterest: [],
  gmail: [],
};

export const SOCIAL_PLATFORMS: readonly SocialPlatformMeta[] = [
  {
    key: 'facebook',
    label: 'Facebook',
    placeholder: 'https://www.facebook.com/yilaipackaging',
    accentBg:
      'bg-[#1877F2]/10 hover:bg-[#1877F2] text-[#1877F2] hover:text-white border-[#1877F2]/25',
    accentText: 'text-[#1877F2]',
  },
  {
    key: 'instagram',
    label: 'Instagram',
    placeholder: 'https://www.instagram.com/yilaipackaging',
    accentBg:
      'bg-[#E4405F]/10 hover:bg-[#E4405F] text-[#E4405F] hover:text-white border-[#E4405F]/25',
    accentText: 'text-[#E4405F]',
  },
  {
    key: 'tiktok',
    label: 'TikTok',
    placeholder: 'https://www.tiktok.com/@yilaipackaging',
    accentBg:
      'bg-[#0B1B3E]/8 hover:bg-[#0B1B3E] text-[#0B1B3E] hover:text-white border-[#0B1B3E]/20',
    accentText: 'text-[#0B1B3E]',
  },
  {
    key: 'youtube',
    label: 'YouTube',
    placeholder: 'https://www.youtube.com/@yilaipackaging',
    accentBg:
      'bg-[#FF0000]/10 hover:bg-[#FF0000] text-[#D90000] hover:text-white border-[#FF0000]/25',
    accentText: 'text-[#D90000]',
  },
  {
    key: 'linkedin',
    label: 'LinkedIn',
    placeholder: 'https://www.linkedin.com/company/yilaipackaging',
    accentBg:
      'bg-[#0A66C2]/10 hover:bg-[#0A66C2] text-[#0A66C2] hover:text-white border-[#0A66C2]/25',
    accentText: 'text-[#0A66C2]',
  },
  {
    key: 'x',
    label: 'X (Twitter)',
    placeholder: 'https://x.com/yilaipackaging',
    accentBg:
      'bg-slate-900/8 hover:bg-slate-900 text-slate-900 hover:text-white border-slate-900/20',
    accentText: 'text-slate-900',
  },
  {
    key: 'snapchat',
    label: 'Snapchat',
    placeholder: 'https://www.snapchat.com/add/yilaipackaging',
    accentBg:
      'bg-[#FACC15]/20 hover:bg-[#EAB308] text-[#854D0E] hover:text-white border-[#EAB308]/35',
    accentText: 'text-[#CA8A04]',
  },
  {
    key: 'pinterest',
    label: 'Pinterest',
    placeholder: 'https://www.pinterest.com/yilaipackaging',
    accentBg:
      'bg-[#E60023]/10 hover:bg-[#E60023] text-[#BD081C] hover:text-white border-[#E60023]/25',
    accentText: 'text-[#E60023]',
  },
  {
    key: 'gmail',
    label: 'Gmail',
    placeholder: 'sales@gmail.com or mailto:sales@gmail.com',
    accentBg:
      'bg-[#EA4335]/10 hover:bg-[#EA4335] text-[#C5221F] hover:text-white border-[#EA4335]/25',
    accentText: 'text-[#EA4335]',
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
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={className}
          aria-hidden="true"
        >
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
    case 'x':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
    case 'snapchat':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
          <path d="M12.06 2c-3.06 0-5.13 2.02-5.13 5.26v1.54c-.47.17-.95.11-1.36-.04-.35-.13-.74.08-.84.45-.1.36.07.75.42.92.8.39 1.37.8 1.48 1.35.12.6-.35 1.47-1.45 2.45-.94.84-2.16 1.24-2.6 1.36-.34.09-.56.42-.48.77.08.35.39.59.75.59.17 0 .35-.03.54-.08.45-.12.95-.02 1.39.27.49.32.78.84 1.15 1.35.33.46.84.72 1.41.72.29 0 .59-.07.9-.2.53-.22 1.11-.14 1.75.1.68.26 1.38.53 2.08.53s1.4-.27 2.08-.53c.64-.24 1.22-.32 1.75-.1.31.13.61.2.9.2.57 0 1.08-.26 1.41-.72.37-.51.66-1.03 1.15-1.35.44-.29.94-.39 1.39-.27.19.05.37.08.54.08.36 0 .67-.24.75-.59.08-.35-.14-.68-.48-.77-.44-.12-1.66-.52-2.6-1.36-1.1-.98-1.57-1.85-1.45-2.45.11-.55.68-.96 1.48-1.35.35-.17.52-.56.42-.92-.1-.37-.49-.58-.84-.45-.41.15-.89.21-1.36.04V7.26C17.19 4.02 15.12 2 12.06 2z" />
        </svg>
      );
    case 'pinterest':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
          <path d="M12.02 2C6.49 2 2 6.49 2 12.02c0 4.24 2.64 7.87 6.37 9.32-.09-.79-.17-2.01.03-2.87.18-.78 1.18-5.01 1.18-5.01s-.3-.6-.3-1.49c0-1.4.81-2.45 1.82-2.45.86 0 1.27.64 1.27 1.42 0 .86-.55 2.15-.83 3.35-.24 1 .5 1.82 1.49 1.82 1.79 0 3.16-1.88 3.16-4.6 0-2.41-1.73-4.09-4.2-4.09-2.86 0-4.54 2.15-4.54 4.37 0 .86.33 1.79.75 2.3.08.1.09.19.07.29-.08.31-.25 1-.28 1.14-.04.18-.15.22-.34.13-1.26-.59-2.05-2.43-2.05-3.91 0-3.18 2.31-6.11 6.67-6.11 3.5 0 6.22 2.49 6.22 5.83 0 3.48-2.19 6.28-5.24 6.28-1.02 0-1.99-.53-2.32-1.16l-.63 2.4c-.23.88-.84 1.98-1.26 2.65.95.29 1.95.45 3 .45 5.53 0 10.02-4.49 10.02-10.02C22.04 6.49 17.55 2 12.02 2z" />
        </svg>
      );
    case 'gmail':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
          <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" />
        </svg>
      );
  }
}

const SECTION_HEADINGS: Record<LanguageCode, string> = {
  en: 'Official Social Channels',
  es: 'Redes Sociales Oficiales',
  ar: 'قنوات التواصل الرسمية',
};

function getDisplayList(rawValue: unknown): string[] {
  if (Array.isArray(rawValue)) {
    return rawValue
      .filter((v): v is string => typeof v === 'string')
      .map((v) => v.trim())
      .filter((v) => /^(https?:\/\/|mailto:)/i.test(v))
      .slice(0, MAX_ACCOUNTS_PER_PLATFORM);
  }
  if (typeof rawValue === 'string' && /^(https?:\/\/|mailto:)/i.test(rawValue.trim())) {
    return [rawValue.trim()];
  }
  return [];
}

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

  const entries = SOCIAL_PLATFORMS.flatMap((platform) => {
    const urls = getDisplayList(links[platform.key]);
    return urls.map((url, idx) => ({
      platform,
      url,
      index: idx,
      total: urls.length,
    }));
  });

  if (entries.length === 0) return null;

  return (
    <div
      className={
        compact
          ? 'flex flex-wrap items-center gap-2'
          : 'bg-white rounded-2xl border border-slate-200/90 p-4 sm:p-5 space-y-3'
      }
    >
      {!compact && (
        <p className="text-xs font-semibold text-[#0B1B3E]">{SECTION_HEADINGS[lang]}</p>
      )}
      <div className="flex flex-wrap items-center gap-2">
        {entries.map(({ platform, url, index, total }) => {
          const isMailto = /^mailto:/i.test(url);
          const cleanLabel =
            total > 1 ? `${platform.label} #${index + 1}` : platform.label;
          const displayTitle = isMailto ? url.replace(/^mailto:/i, '') : url;

          return (
            <a
              key={`${platform.key}-${index}`}
              href={url}
              title={displayTitle}
              {...(isMailto ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
              className={`inline-flex items-center gap-1.5 rounded-full border font-semibold transition-colors ${
                compact ? 'px-2.5 py-1 text-[11px]' : 'px-3.5 py-1.5 text-xs'
              } ${platform.accentBg}`}
            >
              <SocialPlatformIcon platform={platform.key} className="w-3.5 h-3.5 shrink-0" />
              <span>{cleanLabel}</span>
            </a>
          );
        })}
      </div>
    </div>
  );
}
