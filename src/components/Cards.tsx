import Image from 'next/image';
import Link from 'next/link';
import Icon from './Icon';
import type { Project, Unit } from '@/lib/types';

export function ArtTile({ icon, label, className = '' }: { icon: string; label?: string; className?: string }) {
  return (
    <div className={`dark-surface relative flex h-full w-full items-center justify-center overflow-hidden ${className}`}>
      <svg className="absolute inset-0 h-full w-full text-white/[0.07]" aria-hidden="true">
        <defs><pattern id={`g-${icon}`} width="28" height="28" patternUnits="userSpaceOnUse"><path d="M28 0H0v28" fill="none" stroke="currentColor" /></pattern></defs>
        <rect width="100%" height="100%" fill={`url(#g-${icon})`} />
      </svg>
      <div className="relative flex flex-col items-center gap-3 text-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/15 bg-white/5 text-brand-ember"><Icon name={icon} className="h-8 w-8" strokeWidth={1.4} /></span>
        {label && <span className="px-6 text-xs font-semibold uppercase tracking-[0.2em] text-white/50">{label}</span>}
      </div>
    </div>
  );
}

export function UnitCard({ u }: { u: Unit }) {
  return (
    <Link href={`/${u.slug}`} className="reveal group relative flex min-h-[460px] flex-col overflow-hidden rounded-3xl bg-ink text-white shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-lift">
      <Image src={u.cardImage} alt={u.cardAlt} fill sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw" className="object-cover opacity-70 transition duration-700 group-hover:scale-105 group-hover:opacity-50" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/75 to-ink/10" />
      <div className="relative mt-auto p-7">
        <span className="text-sm font-bold text-brand-ember">{u.number}</span>
        <h3 className="mt-2 text-2xl font-extrabold tracking-tight">{u.name}</h3>
        <p className="mt-2 text-white/75">{u.tagline}</p>
        <ul className="mt-5 space-y-2 border-t border-white/15 pt-5 text-sm text-white/85">
          {u.keyCapabilities.map((c) => (<li key={c} className="flex gap-2"><Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-brand-orange" strokeWidth={2.2} />{c}</li>))}
        </ul>
        <span className="mt-6 inline-flex items-center gap-2 font-semibold text-white">Explore solutions <Icon name="arrow" className="h-4 w-4 transition group-hover:translate-x-1.5" /></span>
      </div>
      <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-brand-orange transition duration-500 group-hover:scale-x-100" />
    </Link>
  );
}

export function ProjectCard({ p, unitLabel, industryLabel }: { p: Project; unitLabel: string; industryLabel: string }) {
  const img = p.images[0];
  const headline = p.specs[0];
  return (
    <Link href={`/projects/${p.slug}`} className="group flex h-full flex-col overflow-hidden rounded-3xl border border-mist-line bg-white shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-lift">
      <div className="relative aspect-[16/10] overflow-hidden bg-ink">
        {img ? <Image src={img.src} alt={img.alt} fill sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" className="object-cover transition duration-700 group-hover:scale-105" /> : <ArtTile icon="village" label="Project photography to follow" />}
        <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-brand-red">{unitLabel}</span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-ink-mute">{industryLabel}{p.year ? ` · ${p.year}` : ''}</p>
        <h3 className="mt-2 text-xl font-bold leading-snug text-ink group-hover:text-brand-red">{p.title}</h3>
        <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-ink-soft">{p.summary}</p>
        <dl className="mt-auto grid grid-cols-2 gap-3 border-t border-mist-line pt-4 text-sm">
          <div><dt className="text-xs text-ink-mute">Client</dt><dd className="font-semibold text-ink">{p.client}</dd></div>
          {headline && <div><dt className="text-xs text-ink-mute">{headline.label}</dt><dd className="font-semibold text-ink">{headline.value}</dd></div>}
        </dl>
      </div>
    </Link>
  );
}
