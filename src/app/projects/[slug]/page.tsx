import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import PageHero from '@/components/PageHero';
import Icon from '@/components/Icon';
import { ProjectCard, ArtTile } from '@/components/Cards';
import { CorporateCTA } from '@/components/Sections';
import { JsonLd } from '@/components/ui';
import { industryName, project, projects, unit, unitName } from '@/lib/content';
import { pageMeta, SITE_URL } from '@/lib/seo';

export function generateStaticParams() { return projects().map((p) => ({ slug: p.slug })); }
export function generateMetadata({ params }: { params: { slug: string } }) {
  const p = project(params.slug); if (!p) return {};
  return pageMeta({ title: p.title, description: p.summary, path: `/projects/${p.slug}`, image: p.images[0]?.src });
}

export default function Page({ params }: { params: { slug: string } }) {
  const p = project(params.slug); if (!p) notFound();
  const u = unit(p.unit);
  const related = projects().filter((x) => x.slug !== p.slug && (x.unit === p.unit || x.industry === p.industry)).slice(0, 3);
  const facts = [['Client', p.client], ['Business division', unitName(p.unit)], ['Industry', industryName(p.industry)], ['Location', p.location], ['Year', p.year], ['Status', p.status]].filter(([, v]) => v);
  return (
    <>
      <PageHero eyebrow={`${unitName(p.unit)} · ${p.type}`} title={p.title} text={p.summary} image={p.images[0]?.src} alt={p.images[0]?.alt} crumbs={[{ href: '/', label: 'Home' }, { href: '/projects', label: 'Projects' }, { label: p.title }]} />
      <section className="py-16 sm:py-20">
        <div className="container grid gap-12 lg:grid-cols-12">
          <aside className="lg:col-span-4">
            <div className="card lg:sticky lg:top-32">
              <dl className="divide-y divide-mist-line">
                {facts.map(([k, v]) => (<div key={k} className="px-6 py-4"><dt className="text-xs font-bold uppercase tracking-[0.14em] text-ink-mute">{k}</dt><dd className="mt-1 font-semibold">{v}</dd></div>))}
              </dl>
              <div className="border-t border-mist-line p-6"><Link href={`/request-quotation?unit=${p.unit}`} className="btn-primary w-full">Discuss a similar project</Link></div>
            </div>
          </aside>
          <div className="space-y-14 lg:col-span-8">
            <div>
              <h2 className="text-2xl font-extrabold">Technical specifications</h2>
              <dl className="mt-5 grid gap-px overflow-hidden rounded-2xl bg-mist-line sm:grid-cols-2">
                {p.specs.map((s) => (<div key={s.label} className="bg-white p-5"><dt className="text-xs font-bold uppercase tracking-[0.14em] text-ink-mute">{s.label}</dt><dd className="mt-1 text-lg font-bold text-brand-red">{s.value}</dd></div>))}
              </dl>
            </div>
            <div>
              <h2 className="text-2xl font-extrabold">Project scope</h2>
              <ul className="mt-5 grid gap-2 sm:grid-cols-2">{p.scope.map((s) => (<li key={s} className="flex gap-2"><Icon name="check" className="mt-1 h-4 w-4 shrink-0 text-brand-orange" strokeWidth={2.2} />{s}</li>))}</ul>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl bg-mist p-6"><h2 className="text-lg font-extrabold">The challenge</h2><p className="mt-2 leading-relaxed text-ink-soft">{p.challenge}</p></div>
              <div className="rounded-2xl bg-ink p-6 text-white"><h2 className="text-lg font-extrabold">Our solution</h2><p className="mt-2 leading-relaxed text-white/75">{p.solution}</p></div>
            </div>
            <div>
              <h2 className="text-2xl font-extrabold">Outcomes</h2>
              <ul className="mt-5 grid gap-3 sm:grid-cols-3">{p.outcomes.map((o) => (<li key={o} className="rounded-2xl border border-brand-red/15 bg-brand-red/[0.03] p-5 font-semibold">{o}</li>))}</ul>
            </div>
            <div>
              <h2 className="text-2xl font-extrabold">Gallery</h2>
              {p.images.length ? (
                <ul className="mt-5 grid gap-4 sm:grid-cols-2">
                  {p.images.map((im) => (<li key={im.src}><figure className="overflow-hidden rounded-2xl bg-mist"><div className="relative aspect-[4/3]"><Image src={im.src} alt={im.alt} fill sizes="(min-width:1024px) 30vw, (min-width:640px) 45vw, 100vw" className="object-cover" /></div><figcaption className="p-3 text-sm text-ink-soft">{im.alt}</figcaption></figure></li>))}
                </ul>
              ) : (<div className="mt-5 aspect-[16/7] overflow-hidden rounded-2xl"><ArtTile icon="village" label="Project photography to follow" /></div>)}
            </div>
            <div>
              <h2 className="text-2xl font-extrabold">Related services</h2>
              <ul className="mt-5 flex flex-wrap gap-2">{p.relatedServices.map((r) => (<li key={r.href}><Link href={r.href} className="chip hover:border-brand-red hover:text-brand-red">{r.label}</Link></li>))}</ul>
            </div>
          </div>
        </div>
      </section>
      {related.length > 0 && (
        <section className="bg-mist py-16 sm:py-20">
          <div className="container">
            <h2 className="text-h2">Related projects</h2>
            <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{related.map((r) => (<li key={r.slug}><ProjectCard p={r} unitLabel={unitName(r.unit)} industryLabel={industryName(r.industry)} /></li>))}</ul>
          </div>
        </section>
      )}
      <CorporateCTA title={u ? `Planning a ${u.name.replace('Donmac ', '').toLowerCase()} project?` : undefined} />
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'CreativeWork', name: p.title, about: p.summary, url: `${SITE_URL}/projects/${p.slug}`, creator: { '@type': 'Organization', name: 'Donmac Group' }, locationCreated: p.location }} />
    </>
  );
}
