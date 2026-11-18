import PageHero from '@/components/PageHero';
import ProjectExplorer from '@/components/ProjectExplorer';
import { CorporateCTA } from '@/components/Sections';
import { industries, projects, units } from '@/lib/content';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({ title: 'Projects', description: 'Donmac project portfolio: hybrid solar for Maamba Energy, the Kabanga Lithium Project, Maamba Private School and Roma Guest House, rural electrification for Chipili Town Council, solar lighting for LMMU and institutional ICT supply.', path: '/projects' });

export default function Page() {
  const ps = projects();
  return (
    <>
      <PageHero eyebrow="Project portfolio" title="Proof in the field." text="A selection of completed and commissioned contracts across mining, public health, education, hospitality and institutional ICT. Full references are available on request." image="/images/energy/rooftop-array-panorama.jpg" alt="Rooftop solar array" crumbs={[{ href: '/', label: 'Home' }, { label: 'Projects' }]} />
      <section className="py-16 sm:py-20">
        <div className="container">
          <ProjectExplorer projects={ps} units={units().map((u) => ({ value: u.slug, label: u.name }))} industries={industries().map((i) => ({ value: i.slug, label: i.short }))} types={Array.from(new Set(ps.map((p) => p.type)))} />
          <p className="mt-10 rounded-2xl bg-mist p-6 text-ink-soft">And more: commercial and residential solar back-up, standby power systems, institutional ICT supply and equipment sourcing for clients across Zambia.</p>
        </div>
      </section>
      <CorporateCTA />
    </>
  );
}
