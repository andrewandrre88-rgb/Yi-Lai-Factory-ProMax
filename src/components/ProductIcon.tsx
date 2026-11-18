interface ProductIconProps {
  categoryId: string;
  className?: string;
}

export function ProductIcon({ categoryId, className = 'w-6 h-6' }: ProductIconProps) {
  switch (categoryId) {
    case 'trigger-sprayers':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
          <path d="M7 20v-7a4 4 0 0 1 4-4h7v4h-5a1 1 0 0 0-1 1v6" />
          <path d="M14 13l-1.5 5" />
          <path d="M20 9.5l1.5-.5M20 12l2 1" />
        </svg>
      );
    case 'mini-trigger-sprayers':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
          <path d="M8 20v-6a3 3 0 0 1 3-3h6v3h-4v6" />
          <path d="M13 14l-1 4" />
          <circle cx="19" cy="12" r="1" fill="currentColor" />
        </svg>
      );
    case 'foam-triggers':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
          <path d="M6 20v-7a4 4 0 0 1 4-4h6v4h-5v7" />
          <circle cx="19" cy="9" r="1.5" />
          <circle cx="21" cy="12.5" r="1.2" />
          <circle cx="18.5" cy="14" r="1" />
        </svg>
      );
    case 'lotion-pumps':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
          <path d="M7 7h10l-1 3H8L7 7Z" />
          <path d="M12 10v4" />
          <rect x="8" y="14" width="8" height="6" rx="1.5" />
          <path d="M17 8h3v2" />
        </svg>
      );
    case 'fine-mist-sprayers':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
          <rect x="9" y="8" width="6" height="5" rx="1" />
          <rect x="7" y="13" width="10" height="7" rx="1.5" />
          <circle cx="18" cy="7" r="0.8" fill="currentColor" />
          <circle cx="20.5" cy="5.5" r="0.8" fill="currentColor" />
          <circle cx="20.5" cy="9" r="0.8" fill="currentColor" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
          <rect x="6" y="7" width="12" height="11" rx="2" />
          <path d="M10 10v5M14 10v5" />
          <path d="M8 7V5h8v2" />
        </svg>
      );
  }
}
