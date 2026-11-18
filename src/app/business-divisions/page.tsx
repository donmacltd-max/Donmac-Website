import Image from 'next/image';
import Link from 'next/link';
import PageHero from '@/components/PageHero';
import Icon from '@/components/Icon';
import { CorporateCTA } from '@/components/Sections';
import { SectionHead } from '@/components/ui';
import { company, units } from '@/lib/content';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({ title: 'Business Divisions', description: 'Donmac Energy, Donmac ICT, Donmac e-Mobility and Donmac Specialized Sourcing: four specialised units sharing one engineering, procurement and governance backbone.', path: '/business-divisions' });

export default function Page() {
  const all = units();
  const c = company();
  return (
    <>
      <PageHero eyebrow="Business divisions" title="Four specialised divisions. One accountable group." text="Each division delivers deep expertise in its field while drawing on shared engineering, procurement and project-governance strength." image="/images/site/team-site-visit.jpg" alt="Donmac team on site" crumbs={[{ href: '/', label: 'Home' }, { label: 'Business divisions' }]} />
      <section className="py-20 sm:py-24">
        <div className="container space-y-8">
          {all.filter((u) => !u.capability).map((u, i) => (
            <article key={u.slug} className="reveal grid overflow-hidden rounded-3xl border border-mist-line bg-white shadow-card lg:grid-cols-2">
              <div className={`relative min-h-[280px] ${i % 2 ? 'lg:order-2' : ''}`}><Image src={u.cardImage} alt={u.cardAlt} fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" /></div>
              <div className="flex flex-col p-8 sm:p-12">
                <span className="text-sm font-bold text-brand-orange">Division {u.number}</span>
                <h2 className="mt-2 text-h2">{u.name}</h2>
                <p className="mt-3 text-lg text-ink-soft">{u.tagline}</p>
                <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                  {u.services.slice(0, 6).map((s) => (<li key={s.id} className="flex gap-2 text-sm font-semibold text-ink"><Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-brand-orange" strokeWidth={2.2} />{s.title}</li>))}
                </ul>
                <div className="mt-auto flex flex-wrap gap-3 pt-8">
                  <Link href={`/${u.slug}`} className="btn-red">Explore {u.name}</Link>
                  <Link href={`/request-quotation?unit=${u.slug}`} className="btn-ghost">Request a quotation</Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="bg-mist py-20 sm:py-24">
        <div className="container">
          <SectionHead eyebrow="Additional capabilities" title="Construction and telecommunications" text="Delivered with the Group's engineering, sourcing, HSE and QA/QC backbone." />
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {all.filter((u) => u.capability).map((u) => (
              <Link key={u.slug} href={`/${u.slug}`} className="reveal group rounded-3xl border border-mist-line bg-white p-8 transition hover:shadow-lift">
                <h3 className="text-2xl font-extrabold group-hover:text-brand-red">{u.name}</h3>
                <p className="mt-2 text-ink-soft">{u.heroText}</p>
                <span className="link-arrow mt-6">Explore capability <Icon name="arrow" className="h-4 w-4" /></span>
              </Link>
            ))}
          </div>
          <div className="reveal mt-16 rounded-3xl bg-ink p-8 text-white sm:p-12">
            <p className="eyebrow">Shared group backbone</p>
            <p className="mt-4 text-xl font-semibold leading-relaxed sm:text-2xl">Engineering and technical services · Procurement and supply chain · Project management and QA/QC · HSE and compliance · Finance and governance</p>
            <p className="mt-4 text-white/65">{c.structure.note}</p>
          </div>
        </div>
      </section>
      <CorporateCTA />
    </>
  );
}
