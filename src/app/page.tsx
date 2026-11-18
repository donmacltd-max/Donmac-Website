import Image from 'next/image';
import Link from 'next/link';
import Icon from '@/components/Icon';
import { UnitCard } from '@/components/Cards';
import { CorporateCTA, PartnerWall, StatBand } from '@/components/Sections';
import { ArrowLink, Circuit, SectionHead } from '@/components/ui';
import ProjectExplorer from '@/components/ProjectExplorer';
import { company, industries, principalUnits, projects, site, units } from '@/lib/content';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({ title: 'Donmac Group | Clean Energy, ICT, e-Mobility and Sourcing in Zambia', description: 'Zambian-owned engineering and technology group delivering solar EPC, battery storage, enterprise ICT, electric vehicles and charging, and global equipment sourcing since 2011.', path: '/' });

export default function Home() {
  const s = site();
  const c = company();
  const us = principalUnits();
  const ind = industries();
  const featured = projects();
  const unitOpts = units().map((u) => ({ value: u.slug, label: u.name }));
  const indOpts = ind.map((i) => ({ value: i.slug, label: i.short }));
  const types = Array.from(new Set(featured.map((p) => p.type)));

  return (
    <>
      {/* 1. Hero */}
      <section className="relative isolate flex min-h-[calc(100svh-112px)] items-end overflow-hidden bg-ink text-white">
        <div className="hero-seq absolute inset-0 -z-20">
          {s.home.heroImages.map((im: { src: string; alt: string }, i: number) => (
            <div key={im.src} className="absolute inset-0"><Image src={im.src} alt={i === 0 ? im.alt : ''} fill priority={i === 0} sizes="100vw" className="object-cover" /></div>
          ))}
        </div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/60 to-ink/10" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-brand-wine/90 via-brand-wine/40 to-transparent" />
        <Circuit className="-right-40 top-10 -z-10 w-[1100px] text-white/10" />
        <div className="container pb-16 pt-28 sm:pb-24">
          <p className="eyebrow">{s.home.heroEyebrow}</p>
          <h1 className="mt-5 max-w-5xl text-display uppercase">{s.home.heroTitle}</h1>
          <p className="mt-6 max-w-3xl text-xl font-semibold text-white sm:text-2xl">{s.home.heroSubtitle}</p>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/75">{s.home.heroText}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href="/business-divisions" className="btn-primary">Explore Our Solutions</Link>
            <Link href="/contact#consultation" className="btn-ghost-light">Discuss Your Project</Link>
          </div>
          <ul className="mt-14 grid max-w-4xl grid-cols-2 gap-x-8 gap-y-3 border-t border-white/15 pt-6 text-sm font-semibold uppercase tracking-[0.14em] text-white/70 sm:grid-cols-4">
            {us.map((u) => (<li key={u.slug}><Link href={`/${u.slug}`} className="hover:text-brand-ember">{u.name.replace('Donmac ', '')}</Link></li>))}
          </ul>
        </div>
      </section>

      {/* 2. Corporate introduction */}
      <section className="py-20 sm:py-28">
        <div className="container grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <SectionHead eyebrow="Who we are" title="One Group. Four specialised business divisions. Integrated solutions." />
            <div className="reveal mt-6 space-y-4 text-lg leading-relaxed text-ink-soft">
              <p>Donmac Group is a Zambian-owned technology and infrastructure company delivering engineering, procurement, technology and infrastructure solutions. We design, engineer, supply and maintain systems at the intersection of energy, digital transformation, electric mobility and global procurement.</p>
              <p>Each division brings dedicated technical expertise, and all four share one backbone of engineering discipline, procurement strength and project governance. That lets us deliver a single-discipline contract or a complex, multi-technology programme with equal confidence.</p>
            </div>
            <div className="reveal mt-8 flex flex-wrap gap-6"><ArrowLink href="/about">About Donmac</ArrowLink><ArrowLink href="/leadership">Our leadership</ArrowLink></div>
          </div>
          <div className="reveal relative lg:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl">
              <Image src="/images/site/team-site-safety.jpg" alt="Donmac engineers and technicians in safety equipment on a project site" fill sizes="(min-width:1024px) 40vw, 100vw" className="object-cover" />
            </div>
            <figure className="absolute -bottom-8 left-6 right-6 rounded-2xl bg-brand-red p-6 text-white shadow-lift sm:left-auto sm:right-[-1rem] sm:max-w-xs">
              <blockquote className="text-[0.95rem] font-semibold leading-relaxed">&ldquo;{c.positioning}&rdquo;</blockquote>
            </figure>
          </div>
        </div>
        <div className="container mt-24"><StatBand stats={s.home.stats} /></div>
      </section>

      {/* 3. Business divisions */}
      <section className="bg-mist py-20 sm:py-28" aria-labelledby="units-h">
        <div className="container">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <SectionHead eyebrow="Business divisions" title={<span id="units-h">Deep expertise in four fields, one accountable partner.</span>} />
            <ArrowLink href="/business-divisions" className="reveal shrink-0">Compare all divisions</ArrowLink>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">{us.map((u) => <UnitCard key={u.slug} u={u} />)}</div>
          <p className="reveal mt-8 text-ink-soft">Additional capabilities: <Link href="/construction" className="font-semibold text-brand-red hover:underline">General Construction</Link> and <Link href="/telecommunications" className="font-semibold text-brand-red hover:underline">Telecommunications</Link>.</p>
        </div>
      </section>

      {/* 4. Why Donmac */}
      <section className="dark-surface relative overflow-hidden py-20 text-white sm:py-28">
        <Circuit className="-left-40 bottom-0 w-[1000px] text-white/[0.07]" />
        <div className="container relative">
          <SectionHead dark eyebrow="Why Donmac" title="The agility of a local company, the discipline of an international contractor." />
          <div className="mt-14 grid gap-px overflow-hidden rounded-3xl bg-white/10 md:grid-cols-2 lg:grid-cols-3">
            {c.whyDonmac.map((w: any) => (
              <div key={w.title} className="reveal bg-ink/50 p-8 backdrop-blur-sm">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-orange/15 text-brand-ember"><Icon name={w.icon} /></span>
                <h3 className="mt-5 text-xl font-bold">{w.title}</h3>
                <p className="mt-2 leading-relaxed text-white/65">{w.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Featured projects */}
      <section className="py-20 sm:py-28" aria-labelledby="proj-h">
        <div className="container">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <SectionHead eyebrow="Track record" title={<span id="proj-h">Commissioned work for mines, universities and councils.</span>} text="Selected projects delivered by Donmac. Full references are available on request." />
            <ArrowLink href="/projects" className="reveal shrink-0">View the full portfolio</ArrowLink>
          </div>
          <div className="mt-12"><ProjectExplorer projects={featured} units={unitOpts} industries={indOpts} types={types} showSearch={false} /></div>
        </div>
      </section>

      {/* 6. Industries */}
      <section className="bg-mist py-20 sm:py-28">
        <div className="container">
          <SectionHead eyebrow="Industries served" title="Tailored to the sectors that drive Zambia's economy." />
          <ul className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {ind.filter((i) => i.slug !== 'transport').map((i) => (
              <li key={i.slug} className="reveal">
                <Link href={`/industries#${i.slug}`} className="group flex h-full flex-col rounded-2xl border border-mist-line bg-white p-6 transition hover:-translate-y-0.5 hover:border-brand-red/30 hover:shadow-card">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-red/[0.07] text-brand-red"><Icon name={i.icon} /></span>
                  <span className="mt-4 font-bold text-ink group-hover:text-brand-red">{i.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 7. Partners */}
      <section className="py-20 sm:py-28">
        <div className="container">
          <SectionHead eyebrow="Technology and strategic partners" title="Proven global technology, locally delivered and supported." />
          <div className="mt-12"><PartnerWall /></div>
        </div>
      </section>

      {/* 8. Sustainability */}
      <section className="relative overflow-hidden bg-ink text-white">
        <div className="grid lg:grid-cols-2">
          <div className="relative min-h-[320px] lg:min-h-[560px]">
            <Image src="/images/projects/lmmu-street-light-1.jpg" alt="Solar street light installed by Donmac" fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />
          </div>
          <div className="dark-surface flex items-center px-6 py-16 sm:px-12 lg:px-16">
            <div>
              <p className="eyebrow">Sustainability</p>
              <h2 className="mt-4 text-h2">Sustainability is not a programme bolted onto our business. It is our business.</h2>
              <ul className="mt-8 grid gap-4 sm:grid-cols-2">
                {[['sun', 'Energy access'], ['car', 'Cleaner transportation'], ['network', 'Digital inclusion'], ['people', 'Skills development'], ['leaf', 'Environmental responsibility']].map(([ic, l]) => (
                  <li key={l} className="flex items-center gap-3 font-semibold"><span className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-brand-ember"><Icon name={ic} className="h-5 w-5" /></span>{l}</li>
                ))}
              </ul>
              <Link href="/sustainability" className="btn-ghost-light mt-10">Our ESG commitments</Link>
            </div>
          </div>
        </div>
      </section>

      {/* 9. CTA */}
      <CorporateCTA />
    </>
  );
}
