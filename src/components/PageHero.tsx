import Image from 'next/image';
import type { ReactNode } from 'react';
import { Breadcrumbs, Circuit } from './ui';

export default function PageHero({ eyebrow, title, text, image, alt = '', video, poster, crumbs, children, size = 'md' }: {
  eyebrow?: string; title: ReactNode; text?: ReactNode; image?: string; alt?: string; video?: string; poster?: string;
  crumbs?: { href?: string; label: string }[]; children?: ReactNode; size?: 'sm' | 'md' | 'lg';
}) {
  const h = size === 'lg' ? 'min-h-[78vh]' : size === 'sm' ? 'min-h-[38vh]' : 'min-h-[58vh]';
  return (
    <section className={`relative isolate flex ${h} items-end overflow-hidden bg-ink text-white`}>
      {image && <Image src={image} alt={alt} fill priority sizes="100vw" className="-z-20 object-cover" />}
      {video && (
        <video className="absolute inset-0 -z-20 h-full w-full object-cover motion-reduce:hidden" autoPlay muted loop playsInline preload="metadata" poster={poster || image} aria-hidden="true">
          <source src={video} type="video/mp4" />
        </video>
      )}
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/70 to-ink/20" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-brand-wine/80 via-brand-wine/30 to-transparent" />
      {!image && <div className="dark-surface absolute inset-0 -z-20" />}
      <Circuit className="-right-24 top-0 -z-10 w-[900px] text-white/10" />
      <div className="container relative pb-14 pt-24 sm:pb-20">
        {crumbs && <div className="mb-6"><Breadcrumbs items={crumbs} /></div>}
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1 className="mt-4 max-w-4xl text-h1 text-white">{title}</h1>
        {text && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80 sm:text-xl">{text}</p>}
        {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
      </div>
    </section>
  );
}
