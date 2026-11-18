import Image from 'next/image';
import Link from 'next/link';
import Icon from './Icon';
import { site } from '@/lib/content';
import { unitNav, capabilityNav } from './nav';

export default function Footer() {
  const s = site();
  const year = new Date().getFullYear();
  return (
    <footer className="dark-surface relative overflow-hidden border-t border-white/10 text-white/75">
      <div className="container grid gap-12 py-16 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <div className="inline-block rounded-2xl bg-white p-4">
            <Image src="/images/brand/donmac-logo-full.png" alt="Donmac Limited: Solar, ICT, E-Mobility. Serving You All The Way!" width={1000} height={667} className="h-auto w-56" />
          </div>
          <p className="mt-6 max-w-sm text-sm leading-relaxed">A Zambian-owned technology and infrastructure group delivering clean energy, ICT, electric mobility and global sourcing since 2011.</p>
          {Object.entries(s.social as Record<string, string>).some(([, v]) => v) && (
            <ul className="mt-6 flex flex-wrap gap-2" aria-label="Social media">
              {Object.entries(s.social as Record<string, string>).filter(([, v]) => v).map(([k, v]) => (
                <li key={k}><a href={v} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-[40px] items-center rounded-full border border-white/20 px-4 text-sm font-semibold capitalize text-white hover:border-brand-ember hover:text-brand-ember">{k === 'x' ? 'X' : k === 'linkedin' ? 'LinkedIn' : k === 'youtube' ? 'YouTube' : k}</a></li>
              ))}
            </ul>
          )}
          <p className="mt-4 text-xs text-white/50">Donmac Limited · Company Reg. No. {s.registrationNumber} · TPIN {s.tpin}</p>
        </div>
        <div className="grid gap-10 sm:grid-cols-3 lg:col-span-8">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-[0.18em] text-white">Business divisions</h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {[...unitNav, ...capabilityNav].map((u) => (<li key={u.href}><Link className="hover:text-brand-ember" href={u.href}>{u.label}</Link></li>))}
            </ul>
          </div>
          <div>
            <h2 className="text-sm font-bold uppercase tracking-[0.18em] text-white">Company</h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {[['/about', 'About us'], ['/leadership', 'Leadership'], ['/projects', 'Projects'], ['/industries', 'Industries'], ['/sustainability', 'Sustainability'], ['/insights', 'Insights'], ['/contact', 'Contact'], ['/request-quotation', 'Request a quotation']].map(([h, l]) => (
                <li key={h}><Link className="hover:text-brand-ember" href={h}>{l}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-sm font-bold uppercase tracking-[0.18em] text-white">Head office</h2>
            <address className="mt-4 space-y-1 text-sm not-italic">
              {s.address.map((l: string) => (<p key={l}>{l}</p>))}
              <p className="text-white/50">{s.postal}</p>
            </address>
            <ul className="mt-4 space-y-2 text-sm">
              <li><a className="inline-flex items-center gap-2 hover:text-brand-ember" href={`tel:${s.phoneHref}`}><Icon name="phone" className="h-4 w-4" />{s.phone}</a></li>
              <li><a className="inline-flex items-center gap-2 hover:text-brand-ember" href={`mailto:${s.emailSales}`}><Icon name="mail" className="h-4 w-4" />{s.emailSales}</a></li>
              <li><a className="inline-flex items-center gap-2 hover:text-brand-ember" href={`mailto:${s.emailInfo}`}><Icon name="mail" className="h-4 w-4" />{s.emailInfo}</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container flex flex-col gap-3 py-6 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Donmac Limited. All rights reserved.</p>
          <ul className="flex gap-5">
            <li><Link href="/privacy" className="hover:text-white">Privacy notice</Link></li>
            <li><Link href="/sitemap.xml" className="hover:text-white">Sitemap</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
