import Image from 'next/image';
import Link from 'next/link';
import Icon from './Icon';
import { ArtTile } from './Cards';
import { Circuit, SectionHead } from './ui';
import type { Service, Strength } from '@/lib/types';
import { partners } from '@/lib/content';

export function ServiceGrid({ services, unit }: { services: Service[]; unit: string }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {services.map((s, i) => (
        <article key={s.id} id={s.id} className="reveal group flex flex-col overflow-hidden rounded-3xl border border-mist-line bg-white shadow-card transition hover:shadow-lift">
          <div className={`relative aspect-[16/9] overflow-hidden ${s.imageFit === 'contain' ? 'bg-white' : ''}`} style={s.imageFit === 'contain' && s.imageBg ? { background: s.imageBg } : undefined}>
            {s.image ? <Image src={s.image} alt={s.alt || s.title} fill sizes="(min-width:1280px) 30vw, (min-width:768px) 45vw, 100vw" className={`${s.imageFit === 'contain' ? 'object-contain p-3' : 'object-cover'} transition duration-700 group-hover:scale-105`} /> : <ArtTile icon={s.icon || 'spark'} />}
            <span className="absolute left-4 top-4 flex h-9 min-w-9 items-center justify-center rounded-full bg-white px-2 text-sm font-extrabold text-brand-red">{String(i + 1).padStart(2, '0')}</span>
          </div>
          <div className="flex flex-1 flex-col p-6">
            <h3 className="text-h3 text-ink">{s.title}</h3>
            <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-soft">{s.summary}</p>
            <ul className="mt-4 grid gap-2 text-sm text-ink">
              {s.capabilities.map((c) => (<li key={c} className="flex gap-2"><Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-brand-orange" strokeWidth={2.2} />{c}</li>))}
            </ul>
            <div className="mt-auto flex flex-wrap items-center gap-4 pt-6">
              <Link href={`/request-quotation?unit=${unit}&service=${s.id}`} className="link-arrow">Enquire about this service <Icon name="arrow" className="h-4 w-4" /></Link>
              {s.link && <Link href={s.link} className="text-sm font-semibold text-ink-mute hover:text-ink">Learn more</Link>}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

export function StrengthGrid({ items, dark = false, cols = 4 }: { items: Strength[]; dark?: boolean; cols?: 3 | 4 }) {
  return (
    <div className={`grid gap-px overflow-hidden rounded-3xl ${dark ? 'bg-white/10' : 'bg-mist-line'} sm:grid-cols-2 ${cols === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'}`}>
      {items.map((s, i) => (
        <div key={s.title} className={`reveal p-7 ${dark ? 'bg-ink/60' : 'bg-white'}`}>
          <span className="text-sm font-bold text-brand-orange">{String(i + 1).padStart(2, '0')}</span>
          <h3 className={`mt-3 text-lg font-bold ${dark ? 'text-white' : 'text-ink'}`}>{s.title}</h3>
          <p className={`mt-2 text-sm leading-relaxed ${dark ? 'text-white/65' : 'text-ink-soft'}`}>{s.text}</p>
        </div>
      ))}
    </div>
  );
}

export function PartnerWall({ only }: { only?: string }) {
  const p = partners();
  const groups = (p.groups as { title: string; brands: string[] }[]).filter((g) => (only ? g.title === only : true));
  return (
    <div className="grid gap-10 lg:grid-cols-12">
      <div className="reveal lg:col-span-4">
        <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-brand-red">Authorised partnerships</h3>
        <ul className="mt-5 space-y-3">
          {(p.authorised as { name: string; detail: string }[]).map((a) => (
            <li key={a.name} className="rounded-2xl border border-brand-red/20 bg-white p-4">
              <p className="flex items-center gap-2 font-bold text-ink"><Icon name="shield" className="h-5 w-5 text-brand-red" />{a.name}</p>
              <p className="mt-1 text-sm text-ink-soft">{a.detail}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className="reveal lg:col-span-8">
        <h3 className="text-sm font-bold uppercase tracking-[0.18em] text-ink-mute">Brands supplied and integrated</h3>
        <div className="mt-5 space-y-6">
          {groups.map((g) => (
            <div key={g.title}>
              <p className="mb-3 text-sm font-semibold text-ink">{g.title}</p>
              <ul className="flex flex-wrap gap-2">
                {g.brands.map((b) => (<li key={b} className="rounded-xl border border-mist-line bg-white px-4 py-2.5 text-sm font-bold tracking-tight text-ink-soft">{b}</li>))}
              </ul>
            </div>
          ))}
        </div>
        <p className="mt-6 text-xs leading-relaxed text-ink-mute">{p.note} Trademarks belong to their respective owners.</p>
      </div>
    </div>
  );
}

export function CorporateCTA({ title = "Let's build what's next.", text = 'From concept to commissioning, we bring the expertise, technology and commitment to deliver your next project.' }: { title?: string; text?: string }) {
  return (
    <section className="dark-surface relative overflow-hidden">
      <Circuit className="-left-20 -top-10 w-[1000px] text-white/10" />
      <div className="container relative grid items-center gap-10 py-20 sm:py-24 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <p className="eyebrow">Start a conversation</p>
          <h2 className="mt-4 text-display text-white">{title}</h2>
          <p className="mt-5 max-w-2xl text-lg text-white/75">{text}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row lg:col-span-4 lg:flex-col lg:items-end">
          <Link href="/request-quotation" className="btn-primary min-w-[240px]">Request a Quotation</Link>
          <Link href="/contact" className="btn-ghost-light min-w-[240px]">Contact Our Team</Link>
        </div>
      </div>
    </section>
  );
}

export function StatBand({ stats }: { stats: { value: string; label: string }[] }) {
  return (
    <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl bg-mist-line lg:grid-cols-4">
      {stats.map((s) => (
        <div key={s.label} className="reveal flex flex-col bg-white p-6 sm:p-8">
          <dt className="order-2 mt-2 text-xs font-bold uppercase tracking-[0.16em] text-ink-mute">{s.label}</dt>
          <dd className="order-1 text-3xl font-extrabold tracking-tight text-brand-red sm:text-4xl">{s.value}</dd>
        </div>
      ))}
    </dl>
  );
}

export { SectionHead };
