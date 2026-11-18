import Image from 'next/image';
import Link from 'next/link';
import UnitPage from '@/components/UnitPage';
import VehicleCatalogue from '@/components/VehicleCatalogue';
import Icon from '@/components/Icon';
import { Circuit, SectionHead } from '@/components/ui';
import { unit, vehicles } from '@/lib/content';
import { pageMeta } from '@/lib/seo';

const u = unit('e-mobility')!;
export const metadata = { ...pageMeta({ title: u.metaTitle, description: u.metaDescription, path: '/e-mobility', image: u.cardImage }), title: { absolute: u.metaTitle } };

export default function Page() {
  const extras = (
    <>
      {/* CTA strip */}
      <section className="border-y border-mist-line bg-white">
        <div className="container grid divide-y divide-mist-line sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x">
          {[['#catalogue', 'Explore Electric Vehicles', 'car'], ['/request-quotation?unit=e-mobility', 'Request an EV Quotation', 'doc'], ['#charging', 'Discuss a Charging Project', 'charger'], ['#fleet', 'Electrify Your Fleet', 'truck']].map(([h, l, ic]) => (
            <Link key={l} href={h} className="group flex items-center gap-4 px-2 py-6 font-bold text-ink hover:text-brand-red lg:px-6">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-orange/10 text-brand-orange"><Icon name={ic} /></span>{l}
              <Icon name="arrow" className="ml-auto h-4 w-4 transition group-hover:translate-x-1" />
            </Link>
          ))}
        </div>
      </section>

      {/* Catalogue */}
      <section id="catalogue" className="dark-surface relative overflow-hidden py-20 text-white sm:py-24">
        <Circuit className="-left-32 top-0 w-[1000px] text-white/[0.07]" />
        <div className="container relative">
          <SectionHead dark eyebrow="Electric vehicle catalogue" title="Vehicles we supply" text="Specifications shown are those confirmed by the manufacturer for vehicles we supply. Pricing and stock are confirmed on request." />
          <div className="mt-12"><VehicleCatalogue vehicles={vehicles()} /></div>
        </div>
      </section>

      {/* Charging */}
      <section id="charging" className="py-20 sm:py-24">
        <div className="container grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHead eyebrow="Charging infrastructure" title={u.charging!.title} text={u.charging!.text} />
            <div className="reveal mt-8 flex items-end gap-4 rounded-3xl bg-ink p-8 text-white">
              <span className="text-6xl font-extrabold tracking-tight text-brand-orange">320</span>
              <span className="pb-2 text-sm font-semibold uppercase tracking-[0.16em] text-white/70">kW DC fast-charge<br />capability</span>
            </div>
            <div className="reveal relative mt-4 aspect-[4/3] overflow-hidden rounded-3xl border border-mist-line bg-white">
              <Image src="/images/mobility/donmac-dc-charger.jpg" alt="Donmac e-Mobility DC fast-charging station" fill sizes="(min-width:1024px) 35vw, 100vw" className="object-contain p-6" />
            </div>
          </div>
          <ul className="grid content-start gap-4 sm:grid-cols-2 lg:col-span-7">
            {u.charging!.items.map((it, i) => (
              <li key={it.title} className="reveal rounded-2xl border border-mist-line bg-white p-6 shadow-card">
                <span className="text-sm font-bold text-brand-orange">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="mt-2 text-lg font-bold">{it.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-ink-soft">{it.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Network (planned) */}
      <section id="network" className="bg-mist py-20 sm:py-24">
        <div className="container grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="eyebrow">Charging network</p>
            <h2 className="reveal mt-4 text-h2">{u.network!.title}</h2>
            <p className="reveal mt-5 text-lg leading-relaxed text-ink-soft">{u.network!.text}</p>
            <p className="reveal mt-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-ink"><span className="h-2.5 w-2.5 rounded-full bg-brand-orange" aria-hidden="true" />Status: in planning. No stations are shown as operational.</p>
            <div className="reveal mt-8"><Link href="/request-quotation?unit=e-mobility&service=charging-networks" className="btn-red">Host a charging site</Link></div>
          </div>
          <div className="reveal relative aspect-[4/3] overflow-hidden rounded-3xl border border-mist-line bg-white" role="img" aria-label="Placeholder for the future interactive charging network map">
            <svg viewBox="0 0 400 300" className="absolute inset-0 h-full w-full text-mist-line" aria-hidden="true">
              <defs><pattern id="mapgrid" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M20 0H0v20" fill="none" stroke="currentColor" /></pattern></defs>
              <rect width="400" height="300" fill="url(#mapgrid)" />
              <path d="M60 220 140 170 200 160 260 110 330 80" stroke="#990000" strokeOpacity=".25" strokeWidth="3" fill="none" strokeDasharray="6 8" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-8 text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-red text-white"><Icon name="map" className="h-7 w-7" /></span>
              <p className="max-w-xs font-bold text-ink">Interactive station map</p>
              <p className="max-w-sm text-sm text-ink-soft">Will show commissioned stations, live status, connector types, power ratings and directions once sites are live.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Fleet */}
      <section id="fleet" className="py-20 sm:py-24">
        <div className="container grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHead eyebrow="Fleet electrification" title={u.fleet!.title} text={u.fleet!.text} />
            <div className="reveal relative mt-8 aspect-[4/3] overflow-hidden rounded-3xl">
              <Image src="/images/mobility/ev-test-drive.jpg" alt="Electric vehicle test drive" fill sizes="(min-width:1024px) 35vw, 100vw" className="object-cover" />
            </div>
          </div>
          <ol className="relative space-y-4 lg:col-span-7">
            {u.fleet!.steps.map((s, i) => (
              <li key={s} className="reveal flex items-center gap-5 rounded-2xl border border-mist-line bg-white p-5 shadow-card">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-red text-lg font-extrabold text-white">{i + 1}</span>
                <span className="text-lg font-bold">{s}</span>
              </li>
            ))}
            <li className="reveal pt-4"><Link href="/request-quotation?unit=e-mobility&service=fleet-consulting" className="btn-primary">Electrify Your Fleet</Link></li>
          </ol>
        </div>
      </section>
    </>
  );
  return <UnitPage slug="e-mobility" afterServices={extras} />;
}
