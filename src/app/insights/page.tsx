import Image from 'next/image';
import Link from 'next/link';
import PageHero from '@/components/PageHero';
import { CorporateCTA } from '@/components/Sections';
import { articles } from '@/lib/content';
import { formatDate, pageMeta } from '@/lib/seo';

export const metadata = pageMeta({ title: 'News and Insights', description: 'Corporate announcements, project milestones and insights on renewable energy, electric mobility and ICT in Zambia from Donmac Group.', path: '/insights' });

const CATEGORIES = ['Corporate announcements', 'Project milestones', 'Renewable energy insights', 'Electric mobility developments', 'ICT and digital transformation', 'Technology partnerships', 'Industry events', 'Thought leadership'];

export default function Page() {
  const list = articles();
  const [lead, ...rest] = list;
  const used = new Set(list.map((a) => a.category));
  return (
    <>
      <PageHero eyebrow="News and insights" title="Perspectives on energy, technology and mobility in Zambia." crumbs={[{ href: '/', label: 'Home' }, { label: 'Insights' }]} size="sm" />
      <section className="py-16 sm:py-20">
        <div className="container">
          <ul className="flex flex-wrap gap-2" aria-label="Categories">{CATEGORIES.map((c) => (<li key={c} className={`chip ${used.has(c) ? 'border-brand-red/30 text-brand-red' : 'border-dashed text-ink-soft'}`}>{c}</li>))}</ul>
          {lead && (
            <Link href={`/insights/${lead.slug}`} className="group mt-10 grid overflow-hidden rounded-3xl border border-mist-line bg-white shadow-card lg:grid-cols-2">
              <div className="relative min-h-[280px]"><Image src={lead.image} alt={lead.imageAlt} fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover transition duration-700 group-hover:scale-105" /></div>
              <div className="flex flex-col justify-center p-8 sm:p-12">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-orange">{lead.category}</p>
                <h2 className="mt-3 text-h2 group-hover:text-brand-red">{lead.title}</h2>
                <p className="mt-4 text-lg text-ink-soft">{lead.excerpt}</p>
                <p className="mt-6 text-sm text-ink-mute"><time dateTime={lead.date}>{formatDate(lead.date)}</time> · {lead.author}</p>
              </div>
            </Link>
          )}
          <ul className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((a) => (
              <li key={a.slug}><Link href={`/insights/${a.slug}`} className="group flex h-full flex-col overflow-hidden rounded-3xl border border-mist-line bg-white shadow-card transition hover:-translate-y-1 hover:shadow-lift">
                <div className="relative aspect-[16/10]"><Image src={a.image} alt={a.imageAlt} fill sizes="(min-width:1024px) 33vw, 100vw" className="object-cover" /></div>
                <div className="flex flex-1 flex-col p-6"><p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-orange">{a.category}</p><h3 className="mt-2 text-xl font-bold group-hover:text-brand-red">{a.title}</h3><p className="mt-2 text-sm text-ink-soft">{a.excerpt}</p><p className="mt-auto pt-5 text-xs text-ink-mute"><time dateTime={a.date}>{formatDate(a.date)}</time> · {a.author}</p></div>
              </Link></li>
            ))}
          </ul>
        </div>
      </section>
      <CorporateCTA />
    </>
  );
}
