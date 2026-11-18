import Link from 'next/link';
import PageHero from '@/components/PageHero';
import Icon from '@/components/Icon';
import { CorporateCTA } from '@/components/Sections';
import { industries, project, unitName } from '@/lib/content';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({ title: 'Industries We Serve', description: 'Energy, ICT, e-mobility and sourcing solutions for government, mining, agriculture, manufacturing, healthcare, education, commercial enterprises, development organisations and transport in Zambia.', path: '/industries' });

export default function Page() {
  const ind = industries();
  return (
    <>
      <PageHero eyebrow="Industries" title="Tailored solutions for the sectors that drive Zambia's economy." text="We understand the procurement, compliance and performance expectations unique to each type of client." image="/images/site/site-meeting.jpg" alt="Donmac team meeting a client on site" crumbs={[{ href: '/', label: 'Home' }, { label: 'Industries' }]} />
      <nav aria-label="Industries" className="sticky top-[76px] sm:top-[88px] z-30 border-b border-mist-line bg-white/95 backdrop-blur md:top-[124px]">
        <ul className="container flex gap-2 overflow-x-auto py-3">{ind.map((i) => (<li key={i.slug} className="shrink-0"><a href={`#${i.slug}`} className="chip hover:border-brand-red hover:text-brand-red">{i.short}</a></li>))}</ul>
      </nav>
      <section className="py-16 sm:py-20">
        <div className="container space-y-6">
          {ind.map((i) => (
            <article key={i.slug} id={i.slug} className="reveal grid gap-8 rounded-3xl border border-mist-line bg-white p-8 shadow-card sm:p-10 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-red text-white"><Icon name={i.icon} /></span>
                <h2 className="mt-5 text-2xl font-extrabold sm:text-3xl">{i.name}</h2>
                <p className="mt-4 leading-relaxed text-ink-soft"><strong className="text-ink">The challenge. </strong>{i.challenge}</p>
              </div>
              <div className="lg:col-span-7">
                <h3 className="text-sm font-bold uppercase tracking-[0.16em] text-brand-orange">How Donmac helps</h3>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">{i.solutions.map((s) => (<li key={s} className="flex gap-2 rounded-xl bg-mist p-4 text-sm font-semibold"><Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-brand-orange" strokeWidth={2.2} />{s}</li>))}</ul>
                <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm">
                  {i.units.map((u) => (<Link key={u} href={`/${u}`} className="link-arrow">{unitName(u)}</Link>))}
                  {i.projects.map((p) => { const pr = project(p); return pr ? <Link key={p} href={`/projects/${p}`} className="font-semibold text-ink-soft underline-offset-4 hover:underline">Project: {pr.title}</Link> : null; })}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
      <CorporateCTA />
    </>
  );
}
