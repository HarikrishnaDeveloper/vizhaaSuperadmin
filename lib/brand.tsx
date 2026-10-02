import Image from 'next/image';

// Official Vizhaa logo mark. Source art: public/brand/vizhaa-mark.png (1024×827).
const RATIO = 1024 / 827;

export function VizhaaMark({ height = 32, className = '', priority }: { height?: number; className?: string; priority?: boolean }) {
  return (
    <Image
      src="/brand/vizhaa-mark.png"
      alt="Vizhaa"
      width={Math.round(height * RATIO)}
      height={height}
      priority={priority}
      className={`shrink-0 select-none ${className}`}
      draggable={false}
    />
  );
}
