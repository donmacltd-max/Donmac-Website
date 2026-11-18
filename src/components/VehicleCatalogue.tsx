'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import type { Vehicle } from '@/lib/types';
import { ArtTile } from './Cards';

const bands = { battery: [['', 'Any battery size'], ['lt60', 'Under 60 kWh'], ['60-90', '60 to 90 kWh'], ['gt90', 'Over 90 kWh']], range: [['', 'Any range'], ['lt300', 'Under 300 km'], ['300-450', '300 to 450 km'], ['gt450', 'Over 450 km']] } as const;
const inBand = (v: number | null, b: string) => {
  if (!b) return true; if (v == null) return false;
  if (b.startsWith('lt')) return v < Number(b.slice(2));
  if (b.startsWith('gt')) return v > Number(b.slice(2));
  const [lo, hi] = b.split('-').map(Number); return v >= lo && v <= hi;
};

export default function VehicleCatalogue({ vehicles }: { vehicles: Vehicle[] }) {
  const [cat, setCat] = useState(''); const [drive, setDrive] = useState(''); const [bat, setBat] = useState(''); const [rng, setRng] = useState('');
  const cats = Array.from(new Set(vehicles.map((v) => v.category)));
  const drives = Array.from(new Set(vehicles.map((v) => v.drivetrain).filter(Boolean)));
  const list = useMemo(() => vehicles.filter((v) => (!cat || v.category === cat) && (!drive || v.drivetrain === drive) && inBand(v.batteryKwh, bat) && inBand(v.rangeKm, rng)), [vehicles, cat, drive, bat, rng]);
  const sel = 'field h-12 py-0 pr-10 text-sm font-semibold';
  return (
    <div>
      <div className="grid gap-3 rounded-3xl border border-white/10 bg-white/5 p-4 sm:grid-cols-2 lg:grid-cols-4" role="search" aria-label="Filter vehicles">
        <label><span className="sr-only">Vehicle type</span><select className={sel} value={cat} onChange={(e) => setCat(e.target.value)}><option value="">All vehicle types</option>{cats.map((c) => <option key={c}>{c}</option>)}</select></label>
        <label><span className="sr-only">Drivetrain</span><select className={sel} value={drive} onChange={(e) => setDrive(e.target.value)}><option value="">Any drivetrain</option>{drives.map((c) => <option key={c}>{c}</option>)}</select></label>
        <label><span className="sr-only">Battery size</span><select className={sel} value={bat} onChange={(e) => setBat(e.target.value)}>{bands.battery.map(([v, l]) => <option key={v} value={v}>{l}</option>)}</select></label>
        <label><span className="sr-only">Range</span><select className={sel} value={rng} onChange={(e) => setRng(e.target.value)}>{bands.range.map(([v, l]) => <option key={v} value={v}>{l}</option>)}</select></label>
      </div>
      <p className="mt-5 text-sm text-white/55" aria-live="polite">{list.length} {list.length === 1 ? 'vehicle' : 'vehicles'} shown</p>
      <ul className="mt-4 grid gap-6 lg:grid-cols-2">
        {list.map((v) => {
          const specs = [
            ['Category', v.category], ['Drivetrain', v.drivetrain], ['Battery', v.batteryKwh ? `${v.batteryKwh} kWh` : ''],
            ['Range', v.rangeKm ? `${v.rangeKm} km${v.testCycle ? ` (${v.testCycle})` : ''}` : ''], ['Motor power', v.motorPower], ['Torque', v.torque],
            ['Charging', v.charging], ['Payload', v.payload], ['Towing', v.towing],
          ].filter(([, val]) => val) as [string, string][];
          return (
            <li key={v.slug} className="overflow-hidden rounded-3xl border border-white/10 bg-white text-ink">
              <div className="relative aspect-[16/9] bg-mist" style={v.imageBg ? { background: v.imageBg } : undefined}>
                {v.images[0] ? <Image src={v.images[0].src} alt={v.images[0].alt} fill sizes="(min-width:1024px) 45vw, 100vw" className="object-contain p-2" /> : <ArtTile icon="car" />}
              </div>
              {v.images.length > 1 && (
                <ul className="flex gap-2 border-t border-mist-line p-3">
                  {v.images.slice(1).map((im) => (<li key={im.src} className="relative h-16 w-24 overflow-hidden rounded-lg bg-mist"><Image src={im.src} alt={im.alt} fill sizes="96px" className="object-cover" /></li>))}
                </ul>
              )}
              <div className="p-6">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-brand-red">{v.make}{v.group ? ` · ${v.group}` : ''}</p>
                <h3 className="mt-1 text-2xl font-extrabold tracking-tight">{v.model}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{v.summary}</p>
                <dl className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 border-t border-mist-line pt-5 text-sm sm:grid-cols-3">
                  {specs.map(([k, val]) => (<div key={k}><dt className="text-xs text-ink-mute">{k}</dt><dd className="font-bold">{val}</dd></div>))}
                </dl>
                <p className="mt-4 text-xs text-ink-mute">Further specifications, pricing and stock availability are confirmed on request.</p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Link href={`/request-quotation?unit=e-mobility&vehicle=${encodeURIComponent(v.make + ' ' + v.model)}`} className="btn-primary min-h-[44px] text-sm">Request quotation</Link>
                  {v.brochure && <a href={v.brochure} className="btn-ghost min-h-[44px] text-sm" download>Download brochure</a>}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
