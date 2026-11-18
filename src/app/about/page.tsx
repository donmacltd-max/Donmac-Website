import Image from 'next/image';
import Link from 'next/link';
import PageHero from '@/components/PageHero';
import Icon from '@/components/Icon';
import { CorporateCTA, StrengthGrid } from '@/components/Sections';
import { ArrowLink, Circuit, SectionHead } from '@/components/ui';
import { company, leaders } from '@/lib/content';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({ title: 'About Us', description: 'Donmac Group: a Zambian citizen-owned technology and infrastructure group established in 2011. History, vision, mission, values, governance, quality and HSE.', path: '/about' });

export default function Page() {
  const c = company();
  const ls = leaders();
  return (
    <>
      <PageHero eyebrow="About Donmac" title="From a single Zambian enterprise to a diversified technology and infrastructure group." image="/images/site/team-site-safety.jpg" alt="Donmac project team in safety equipment" crumbs={[{ href: '/', label: 'Home' }, { label: 'About us' }]} />

      <section className="py-20 sm:py-24">
        <div className="container grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionHead eyebrow="Our purpose" title={c.purpose} />
          </div>
          <div className="reveal space-y-4 text-lg leading-relaxed text-ink-soft lg:col-span-5">
            <p>Donmac Limited was incorporated in Lusaka on 23 May 2011 as a 100% Zambian citizen-owned company. We supply, design, deliver, install, procure and maintain customer-specific products and services for public institutions, private enterprises, mines, utilities and development partners.</p>
            <p>Today we operate as Donmac Group, combining local insight with international standards to deliver projects that governments, financiers, miners, utilities and enterprises can depend on.</p>
          </div>
        </div>
        <div className="container mt-16 grid gap-6 md:grid-cols-2">
          <div className="reveal rounded-3xl bg-brand-red p-8 text-white sm:p-10"><p className="text-sm font-bold uppercase tracking-[0.2em] text-white/70">Vision</p><p className="mt-4 text-xl font-semibold leading-relaxed">{c.vision}</p></div>
          <div className="reveal rounded-3xl bg-ink p-8 text-white sm:p-10"><p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-ember">Mission</p><p className="mt-4 text-xl font-semibold leading-relaxed">{c.mission}</p></div>
        </div>
      </section>

      <section className="bg-mist py-20 sm:py-24">
        <div className="container">
          <SectionHead eyebrow="Core values" title="What we stand for" />
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {c.values.map((v: any, i: number) => (
              <li key={v.title} className={`reveal rounded-2xl border border-mist-line bg-white p-6 ${i === 6 ? 'sm:col-span-2 lg:col-span-1' : ''}`}><h3 className="text-lg font-bold">{v.title}</h3><p className="mt-2 text-sm leading-relaxed text-ink-soft">{v.text}</p></li>
            ))}
          </ul>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="container grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHead eyebrow="Our journey" title="Milestones since 2011" text="A steady progression built on delivery, trust and reinvestment." />
          </div>
          <ol className="relative border-l-2 border-brand-red/20 lg:col-span-8">
            {c.timeline.map((t: any) => (
              <li key={t.year} className="reveal relative pb-10 pl-10 last:pb-0">
                <span className="absolute -left-[11px] top-1 h-5 w-5 rounded-full border-4 border-white bg-brand-red ring-2 ring-brand-red/30" aria-hidden="true" />
                <p className="text-sm font-extrabold tracking-wide text-brand-orange">{t.year}</p>
                <h3 className="mt-1 text-xl font-bold">{t.title}</h3>
                <p className="mt-2 max-w-2xl leading-relaxed text-ink-soft">{t.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="dark-surface relative overflow-hidden py-20 text-white sm:py-24">
        <Circuit className="-right-40 top-0 w-[1000px] text-white/[0.07]" />
        <div className="container relative">
          <SectionHead dark eyebrow="Group structure" title="A lean, accountable structure" text={c.structure.note} />
          <div className="reveal mt-12 flex flex-col items-center gap-4 text-center">
            <div className="rounded-2xl border border-white/20 bg-white/5 px-8 py-4 font-bold">{c.structure.top}</div>
            <span className="h-6 w-px bg-white/30" aria-hidden="true" />
            <div className="rounded-2xl bg-brand-red px-8 py-4 font-bold">{c.structure.shared}</div>
            <span className="h-6 w-px bg-white/30" aria-hidden="true" />
            <div className="grid w-full gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {c.structure.units.map((u: string) => (<div key={u} className="rounded-2xl border border-white/15 bg-white/5 px-4 py-4 font-semibold">{u}</div>))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="container">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <SectionHead eyebrow="Leadership" title="Experienced leadership, from boardroom to site" />
            <ArrowLink href="/leadership" className="reveal shrink-0">Meet the leadership team</ArrowLink>
          </div>
          <ul className="mt-12 grid gap-6 md:grid-cols-3">
            {ls.map((l) => (
              <li key={l.slug} className="reveal overflow-hidden rounded-3xl border border-mist-line bg-white shadow-card">
                <div className="relative aspect-[4/3] bg-mist"><Image src={l.photo} alt={`Portrait of ${l.name}`} fill sizes="(min-width:768px) 30vw, 100vw" className="object-cover object-top" /></div>
                <div className="p-6"><h3 className="text-lg font-bold">{l.name}</h3><p className="text-sm font-semibold text-brand-red">{l.role}</p></div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-mist py-20 sm:py-24">
        <div className="container">
          <SectionHead eyebrow="Why choose Donmac" title="A single, accountable partner" />
          <div className="mt-12"><StrengthGrid items={c.whyDonmac} cols={3} /></div>
        </div>
      </section>

      <section className="py-20 sm:py-24">
        <div className="container grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHead eyebrow="Engineering expertise" title="Multidisciplinary capability from concept to lifetime support" />
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {c.capabilities.map((x: any) => (<li key={x.title} className="reveal rounded-2xl border border-mist-line p-5"><p className="font-bold">{x.title}</p><p className="mt-1 text-sm text-ink-soft">{x.text}</p></li>))}
            </ul>
          </div>
          <div className="reveal relative min-h-[360px] overflow-hidden rounded-3xl">
            <Image src="/images/energy/inverter-commissioning.jpg" alt="Donmac engineer commissioning inverter and battery systems" fill sizes="(min-width:1024px) 45vw, 100vw" className="object-cover" />
          </div>
        </div>
      </section>

      <section className="bg-mist py-20 sm:py-24">
        <div className="container grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHead eyebrow="Health, safety and environment" title="Safety is a precondition for work, never a trade-off." />
            <ul className="mt-8 space-y-3">{c.hse.map((h: any) => (<li key={h.title} className="reveal flex gap-4 rounded-2xl bg-white p-5"><Icon name="shield" className="h-6 w-6 shrink-0 text-brand-red" /><div><p className="font-bold">{h.title}</p><p className="text-sm text-ink-soft">{h.text}</p></div></li>))}</ul>
          </div>
          <div>
            <SectionHead eyebrow="Quality assurance" title="Quality is engineered in, not inspected after." />
            <ul className="reveal mt-8 flex flex-wrap gap-2">{c.quality.map((q: string) => (<li key={q} className="rounded-full border border-brand-red/20 bg-white px-4 py-2 text-sm font-semibold text-brand-red">{q}</li>))}</ul>
            <p className="reveal mt-6 leading-relaxed text-ink-soft">Every project closes with formal completion certification, as-built documentation and warranty terms, with manufacturer warranties of up to five years on equipment, giving clients and financiers full confidence in the asset delivered.</p>
          </div>
        </div>
      </section>

      <section id="governance" className="py-20 sm:py-24">
        <div className="container">
          <SectionHead eyebrow="Corporate governance and compliance" title="Fully registered, tax-compliant and regulated" text="Donmac meets the due-diligence requirements of government tenders, development finance institutions, banks and corporate partners. Certificates are available on request." />
          <div className="mt-10 grid gap-4 md:grid-cols-3">{c.governance.map((g: any) => (<div key={g.title} className="reveal rounded-2xl border border-mist-line p-6"><p className="font-bold">{g.title}</p><p className="mt-1 text-sm text-ink-soft">{g.text}</p></div>))}</div>
          <ul className="reveal mt-10 grid gap-px overflow-hidden rounded-3xl bg-mist-line md:grid-cols-2">
            {c.compliance.map((x: any) => (<li key={x.body + x.item} className="flex gap-4 bg-white p-5"><span className="w-28 shrink-0 text-sm font-extrabold text-brand-red">{x.body}</span><span className="text-sm text-ink-soft">{x.item}</span></li>))}
          </ul>
          <div className="reveal mt-8"><Link href="/contact" className="btn-ghost">Request compliance documents</Link></div>
        </div>
      </section>
      <CorporateCTA />
    </>
  );
}
