interface BrandMarkProps {
  className?: string;
}

export function BrandMark({ className = 'w-9 h-9' }: BrandMarkProps) {
  return (
    <img
      src="/assets/aistudio/Untitled_Design__5__efcb7640.png"
      alt="Yi Lai Plastics Industry logo"
      referrerPolicy="no-referrer"
      className={`${className} object-contain`}
    />
  );
}
