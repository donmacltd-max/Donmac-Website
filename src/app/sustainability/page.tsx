import Image from 'next/image';
import Link from 'next/link';
import PageHero from '@/components/PageHero';
import Icon from '@/components/Icon';
import { CorporateCTA } from '@/components/Sections';
import { Circuit, SectionHead } from '@/components/ui';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({ title: 'Sustainability and ESG', description: 'Donmac Group sustainability and ESG: renewable energy, rural electrification, electric mobility, local employment, responsible procurement and governance, aligned to SDGs 7, 9, 11 and 13.', path: '/sustainability' });

const pillars = [
  { icon: 'sun', title: 'Renewable energy deployment', text: 'Solar PV and storage that displace diesel and grid-only supply for businesses, institutions and mines.' },
  { icon: 'gauge', title: 'Energy efficiency', text: 'Right-sized systems, efficient lighting and monitoring that cut waste as well as cost.' },
  { icon: 'village', title: 'Rural electrification', text: 'Powering rural health posts and community facilities that previously lacked reliable electricity.' },
  { icon: 'car', title: 'Electric mobility', text: 'Electric vehicles and charging that reduce transport emissions and fuel import costs.' },
  { icon: 'leaf', title: 'Carbon emissions reduction', text: 'Every solar system and electric vehicle we deliver lowers the carbon intensity of the service it supports.' },
  { icon: 'people', title: 'Local employment and skills transfer', text: 'Creating jobs and transferring skills to young Zambian professionals and technicians.' },
  { icon: 'handshake', title: 'Community development', text: 'Prioritising underserved communities so every project leaves a positive, lasting footprint.' },
  { icon: 'box', title: 'Responsible procurement', text: 'Genuine, warranted products from vetted suppliers, with responsible handling of packaging and waste.' },
  { icon: 'shield', title: 'Corporate governance', text: 'Full statutory compliance, transparent procurement and accountable delivery.' },
];
const sdgs = [['7', 'Affordable and clean energy'], ['9', 'Industry, innovation and infrastructure'], ['11', 'Sustainable cities and communities'], ['13', 'Climate action']];

export default function Page() {
  return (
    <>
      <PageHero eyebrow="Sustainability and ESG" title="Clean energy, digital inclusion and electric mobility sit at the heart of everything we deliver." image="/images/energy/rooftop-array-red-roof.jpg" alt="Rooftop solar array" crumbs={[{ href: '/', label: 'Home' }, { label: 'Sustainability' }]} />
      <section className="py-20 sm:py-24">
        <div className="container">
          <div className="grid gap-6 md:grid-cols-3">
            {[['Environmental', 'Clean energy and lower emissions', 'Solar, storage and electric mobility that displace diesel and reduce carbon intensity.'], ['Social', 'Communities and jobs', 'Rural electrification, healthcare power, local employment and skills transfer.'], ['Governance', 'Compliance and ethics', 'Full statutory compliance, transparent procurement and accountable delivery.']].map(([k, t, x]) => (
              <div key={k} className="reveal rounded-3xl border border-mist-line p-8"><p className="text-sm font-extrabold uppercase tracking-[0.2em] text-brand-orange">{k}</p><h2 className="mt-3 text-2xl font-extrabold">{t}</h2><p className="mt-3 leading-relaxed text-ink-soft">{x}</p></div>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-mist py-20 sm:py-24">
        <div className="container">
          <SectionHead eyebrow="Our commitments" title="Where our work creates impact" />
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {pillars.map((p) => (<li key={p.title} className="reveal rounded-2xl bg-white p-6"><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-red/[0.07] text-brand-red"><Icon name={p.icon} /></span><h3 className="mt-4 text-lg font-bold">{p.title}</h3><p className="mt-2 text-sm leading-relaxed text-ink-soft">{p.text}</p></li>))}
          </ul>
        </div>
      </section>
      <section className="dark-surface relative overflow-hidden py-20 text-white sm:py-24">
        <Circuit className="-left-40 top-0 w-[1000px] text-white/[0.07]" />
        <div className="container relative">
          <SectionHead dark eyebrow="Aligned to global and national goals" title="UN Sustainable Development Goals" text="Our work supports Zambia's national development plans and the regional energy transition, making Donmac a natural partner for development finance institutions, multilateral organisations and climate-focused investors." />
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {sdgs.map(([n, t]) => (<li key={n} className="reveal rounded-3xl border border-white/15 bg-white/5 p-8"><p className="text-5xl font-extrabold text-brand-orange">SDG {n}</p><p className="mt-3 font-semibold">{t}</p></li>))}
          </ul>
        </div>
      </section>
      <section className="py-20 sm:py-24">
        <div className="container grid items-center gap-12 lg:grid-cols-2">
          <div className="reveal relative aspect-[4/3] overflow-hidden rounded-3xl"><Image src="/images/site/team-handover.jpg" alt="Donmac team members on site" fill sizes="(min-width:1024px) 45vw, 100vw" className="object-cover" /></div>
          <div>
            <SectionHead eyebrow="Measuring impact" title="We report outcomes we can verify." text="We measure success in lives improved, not only projects delivered. Quantified outcomes, such as energy generated, diesel displaced and emissions avoided, will be published here as verified project monitoring data becomes available." />
            <Link href="/projects" className="btn-red reveal mt-8">See our project outcomes</Link>
          </div>
        </div>
      </section>
      <CorporateCTA />
    </>
  );
}
