import Image from 'next/image';
import Link from 'next/link';

/** Official Donmac Limited logo (full lockup), used exactly as designed. */
export default function Logo({ className = 'h-16 w-auto', priority = false }: { className?: string; priority?: boolean }) {
  return (
    <Link href="/" className="inline-flex shrink-0 items-center" aria-label="Donmac Group home">
      <Image src="/images/brand/donmac-logo-full.png" alt="Donmac Limited: Solar, ICT, E-Mobility. Serving You All The Way!" width={1523} height={1020} priority={priority} quality={95} sizes="(min-width:640px) 120px, 96px" className={className} />
    </Link>
  );
}
