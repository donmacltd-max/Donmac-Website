import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import Icon from './Icon';
import PageHero from './PageHero';
import EnquiryForm from './EnquiryForm';
import { ProjectCard } from './Cards';
import { CorporateCTA, PartnerWall, ServiceGrid, StrengthGrid } from './Sections';
import { Circuit, JsonLd, SectionHead } from './ui';
import { company, industryName, projects, unit as getUnit, unitName } from '@/lib/content';
import { SITE_URL } from '@/lib/seo';

export default function UnitPage({ slug, afterServices, beforeEnquiry, defaults = {} }: { slug: string; afterServices?: ReactNode; beforeEnquiry?: ReactNode; defaults?: Record<string, string> }) {
  const u = getUnit(slug)!;
  const featured = projects().filter((p) => u.featuredProjects.includes(p.slug));
  const c = company();
  return (
    <>
      <PageHero eyebrow={`${u.capability ? 'Capability' : 'Business division'} ${u.number}`} title={u.heroTitle} text={u.heroText} image={u.heroImage} alt={u.heroAlt} video={u.heroVideo || undefined} size="lg"
        crumbs={[{ href: '/', label: 'Home' }, { href: '/business-divisions', label: 'Business divisions' }, { label: u.name }]}>
        <Link href="#enquire" className="btn-primary">{u.cta.title}</Link>
        <Link href="#services" className="btn-ghost-light">View services</Link>
      </PageHero>

      {/* Intro */}
      <section className="py-20 sm:py-24">
        <div className="container grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="eyebrow">{u.name}</p>
            <h2 className="reveal mt-4 text-h2">{u.introTitle}</h2>
            <p className="reveal mt-6 text-lg leading-relaxed text-ink-soft">{u.intro}</p>
          </div>
          <ul className="reveal grid content-start gap-3 lg:col-span-5">
            {u.introPoints.map((p) => (
              <li key={p} className="flex items-start gap-3 rounded-2xl border border-mist-line bg-mist p-4 font-semibold text-ink">
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-red text-white"><Icon name="check" className="h-4 w-4" strokeWidth={2.4} /></span>{p}
              </li>
            ))}
          </ul>
        </div>
        {u.showcaseVideo && (
          <div className="container mt-16">
            <figure className="reveal overflow-hidden rounded-3xl bg-ink">
              <video className="aspect-video w-full object-cover" controls muted playsInline preload="none" poster={u.showcaseVideo.poster}>
                <source src={u.showcaseVideo.src} type="video/mp4" />
              </video>
              <figcaption className="px-6 py-4 text-sm text-white/70">{u.showcaseVideo.caption}</figcaption>
            </figure>
          </div>
        )}
      </section>

      {/* Services */}
      <section id="services" className="bg-mist py-20 sm:py-24">
        <div className="container">
          <SectionHead eyebrow="Services" title={`What ${u.name} delivers`} text="Each service is backed by the Group's engineering, procurement, QA/QC and HSE systems." />
          <nav aria-label="Services on this page" className="reveal mt-8 flex flex-wrap gap-2">
            {u.services.map((s) => (<a key={s.id} href={`#${s.id}`} className="chip hover:border-brand-red hover:text-brand-red">{s.title}</a>))}
          </nav>
          <div className="mt-10"><ServiceGrid services={u.services} unit={u.slug} /></div>
        </div>
      </section>

      {afterServices}

      {/* Strengths */}
      <section className="dark-surface relative overflow-hidden py-20 text-white sm:py-24">
        <Circuit className="-right-40 top-0 w-[1000px] text-white/[0.07]" />
        <div className="container relative">
          <SectionHead dark eyebrow="Capability" title={u.strengthsTitle} />
          <div className="mt-12"><StrengthGrid items={u.strengths} dark cols={u.strengths.length % 3 === 0 && u.strengths.length < 8 ? 3 : 4} /></div>
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {c.methodology.map((m: any) => (
              <div key={m.step} className="reveal rounded-2xl border border-white/10 p-5">
                <span className="text-xs font-bold text-brand-ember">{m.step}</span>
                <p className="mt-2 font-bold">{m.title}</p>
                <p className="mt-1 text-sm text-white/60">{m.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured projects */}
      {featured.length > 0 && (
        <section className="py-20 sm:py-24">
          <div className="container">
            <SectionHead eyebrow="Featured projects" title="Delivered and commissioned" />
            <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {featured.map((p) => (<li key={p.slug} className="reveal"><ProjectCard p={p} unitLabel={unitName(p.unit)} industryLabel={industryName(p.industry)} /></li>))}
            </ul>
          </div>
        </section>
      )}

      {/* ICT references */}
      {u.references && (
        <section className="py-20 sm:py-24">
          <div className="container grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <SectionHead eyebrow="Client experience" title="Trusted by institutions of national significance" text="Donmac has delivered ICT procurement, installation, configuration and support for public institutions and development organisations including:" />
              <Link href="/projects/institutional-ict-supply" className="link-arrow mt-6">Institutional ICT supply <Icon name="arrow" className="h-4 w-4" /></Link>
            </div>
            <ul className="reveal grid gap-px self-start overflow-hidden rounded-3xl bg-mist-line sm:grid-cols-2 lg:col-span-7">
              {c.ictReferences.map((r: string) => (<li key={r} className="bg-white p-5 font-semibold text-ink">{r}</li>))}
            </ul>
          </div>
        </section>
      )}

      {/* Partners */}
      {u.partnerGroup && (
        <section className="bg-mist py-20 sm:py-24">
          <div className="container">
            <SectionHead eyebrow="Technology partners" title="Genuine, warranted technology" />
            <div className="mt-12"><PartnerWall only={u.partnerGroup} /></div>
          </div>
        </section>
      )}

      {beforeEnquiry}

      {/* Enquiry */}
      <section id="enquire" className="py-20 sm:py-24">
        <div className="container grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="eyebrow">Enquire</p>
            <h2 className="mt-4 text-h2">{u.cta.title}</h2>
            <p className="mt-5 text-lg leading-relaxed text-ink-soft">{u.cta.text}</p>
            <div className="mt-8 rounded-2xl border border-mist-line bg-mist p-6 text-sm">
              <p className="font-bold text-ink">Prefer to talk?</p>
              <p className="mt-2 text-ink-soft">Call <a className="font-semibold text-brand-red" href="tel:+260966810170">+260 966 810170</a> or email <a className="font-semibold text-brand-red" href="mailto:sales@donmacltd.com">sales@donmacltd.com</a>.</p>
            </div>
          </div>
          <div className="lg:col-span-8"><div className="card p-6 sm:p-10"><EnquiryForm variant={u.formVariant} defaults={defaults} /></div></div>
        </div>
      </section>

      <CorporateCTA />
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'Service', name: u.name, provider: { '@type': 'Organization', name: 'Donmac Group' }, areaServed: 'Zambia', url: `${SITE_URL}/${u.slug}`, description: u.metaDescription, hasOfferCatalog: { '@type': 'OfferCatalog', name: `${u.name} services`, itemListElement: u.services.map((s) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: s.title } })) } }} />
    </>
  );
}

export function unitMeta(slug: string) {
  const u = getUnit(slug)!;
  return { title: { absolute: u.metaTitle }, description: u.metaDescription, path: `/${slug}`, image: u.cardImage };
}
