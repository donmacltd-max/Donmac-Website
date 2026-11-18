import UnitPage from '@/components/UnitPage';
import Image from 'next/image';
import { SectionHead } from '@/components/ui';
import { unit } from '@/lib/content';
import { pageMeta } from '@/lib/seo';

const u = unit('sourcing')!;
export const metadata = { ...pageMeta({ title: u.metaTitle, description: u.metaDescription, path: '/sourcing', image: u.cardImage }), title: { absolute: u.metaTitle } };

export default function Page() {
  const catalogue = (
    <section className="py-20 sm:py-24">
      <div className="container grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <SectionHead eyebrow="Product categories" title="What we source" text="A guide to the categories we source most often. If it is not listed, ask us: customer-specific sourcing is what this division exists for." />
          <div className="reveal relative mt-8 aspect-[4/3] overflow-hidden rounded-3xl bg-mist">
            <Image src="/images/sourcing/sany-truck.jpg" alt="Heavy tipper truck sourced for mining and construction clients" fill sizes="(min-width:1024px) 30vw, 100vw" className="object-contain p-4" />
          </div>
        </div>
        <div className="space-y-3 lg:col-span-8">
          {u.catalogue!.map((c, i) => (
            <details key={c.title} className="reveal group rounded-2xl border border-mist-line bg-white open:shadow-card" open={i === 0}>
              <summary className="flex cursor-pointer items-center justify-between gap-4 p-6">
                <span className="flex items-center gap-4"><span className="text-sm font-bold text-brand-orange">{String(i + 1).padStart(2, '0')}</span><span className="text-lg font-bold text-ink">{c.title}</span></span>
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-mist-line text-ink transition group-open:rotate-45" aria-hidden="true">+</span>
              </summary>
              <ul className="grid gap-2 px-6 pb-6 sm:grid-cols-2">
                {c.items.map((it) => (<li key={it} className="rounded-xl bg-mist px-4 py-3 text-sm font-semibold text-ink-soft">{it}</li>))}
              </ul>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
  return <UnitPage slug="sourcing" afterServices={catalogue} />;
}
