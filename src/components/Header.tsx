import Link from 'next/link';
import Logo from './Logo';
import Icon from './Icon';
import NavBehaviour from './NavBehaviour';
import { mainNav, unitNav, capabilityNav } from './nav';
import { site } from '@/lib/content';

export default function Header() {
  const s = site();
  return (
    <header className="sticky top-0 z-50">
      <NavBehaviour />
      <div className="hidden bg-ink text-[0.8rem] text-white/75 md:block">
        <div className="container flex h-9 items-center justify-between">
          <p>Zambian-owned engineering and technology group · Est. 2011</p>
          <div className="flex items-center gap-6">
            <a href={`tel:${s.phoneHref}`} className="inline-flex items-center gap-1.5 hover:text-white"><Icon name="phone" className="h-3.5 w-3.5" />{s.phone}</a>
            <a href={`mailto:${s.emailSales}`} className="inline-flex items-center gap-1.5 hover:text-white"><Icon name="mail" className="h-3.5 w-3.5" />{s.emailSales}</a>
          </div>
        </div>
      </div>
      <div className="border-b border-mist-line bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/85">
        <div className="container flex h-[76px] sm:h-[88px] items-center justify-between gap-6">
          <Logo priority className="h-[60px] w-auto sm:h-[72px]" />

          <nav aria-label="Main" className="hidden xl:block">
            <ul className="flex items-center gap-1">
              {mainNav.map((item) =>
                item.units || item.children ? (
                  <li key={item.href} className="group relative" data-dropdown>
                    <Link href={item.href} className="flex items-center gap-1 rounded-full px-3 py-2 text-[0.84rem] font-semibold uppercase tracking-wide text-ink hover:text-brand-red" aria-haspopup="true">
                      {item.label}
                      <svg viewBox="0 0 20 20" className="h-4 w-4 transition group-hover:rotate-180 group-focus-within:rotate-180" fill="currentColor" aria-hidden="true"><path d="M5.2 7.6 10 12.4l4.8-4.8" stroke="currentColor" strokeWidth="1.6" fill="none" /></svg>
                    </Link>
                    <div className="invisible absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3 opacity-0 transition duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                      {item.units ? (
                        <div className="w-[640px] overflow-hidden rounded-2xl border border-mist-line bg-white shadow-lift">
                          <div className="grid grid-cols-2 gap-1 p-3">
                            {unitNav.map((u, i) => (
                              <Link key={u.href} href={u.href} className="group/item rounded-xl p-4 hover:bg-mist">
                                <span className="text-xs font-bold text-brand-orange">0{i + 1}</span>
                                <span className="mt-1 block font-bold text-ink group-hover/item:text-brand-red">{u.label}</span>
                                <span className="mt-1 block text-sm text-ink-mute">{u.desc}</span>
                              </Link>
                            ))}
                          </div>
                          <div className="flex items-center justify-between gap-4 border-t border-mist-line bg-mist px-6 py-3 text-sm">
                            <span className="font-semibold text-ink-soft">Also: {capabilityNav.map((c, i) => (<span key={c.href}>{i > 0 && ' · '}<Link className="text-brand-red hover:underline" href={c.href}>{c.label}</Link></span>))}</span>
                            <Link href="/business-divisions" className="link-arrow">All divisions <Icon name="arrow" className="h-4 w-4" /></Link>
                          </div>
                        </div>
                      ) : (
                        <ul className="w-60 rounded-2xl border border-mist-line bg-white p-2 shadow-lift">
                          {item.children!.map((c) => (
                            <li key={c.href}><Link href={c.href} className="block rounded-lg px-4 py-2.5 text-sm font-semibold text-ink hover:bg-mist hover:text-brand-red">{c.label}</Link></li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </li>
                ) : (
                  <li key={item.href}>
                    <Link href={item.href} className="rounded-full px-3 py-2 text-[0.84rem] font-semibold uppercase tracking-wide text-ink hover:text-brand-red">{item.label}</Link>
                  </li>
                ),
              )}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <Link href="/request-quotation" className="btn-primary min-h-[44px] px-4 text-[0.78rem] uppercase tracking-wide sm:px-5"><span className="sm:hidden">Get a quote</span><span className="hidden sm:inline">Request a Quotation</span></Link>
            <details data-nav className="group xl:hidden">
              <summary className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-ink/15 text-ink" aria-label="Open menu">
                <svg viewBox="0 0 24 24" className="h-5 w-5 group-open:hidden" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
                <svg viewBox="0 0 24 24" className="hidden h-5 w-5 group-open:block" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg>
              </summary>
              <div className="absolute inset-x-0 top-full max-h-[calc(100dvh-88px)] overflow-y-auto border-b border-mist-line bg-white shadow-lift">
                <nav aria-label="Mobile" className="container py-4">
                  <ul className="divide-y divide-mist-line">
                    {mainNav.map((item) => (
                      <li key={item.href} className="py-1">
                        <Link href={item.href} className="block py-3 text-lg font-bold text-ink">{item.label}</Link>
                        {item.units && (
                          <ul className="mb-3 grid gap-1 pl-3">
                            {[...unitNav, ...capabilityNav].map((u) => (
                              <li key={u.href}><Link href={u.href} className="block rounded-lg px-3 py-2.5 font-semibold text-ink-soft hover:bg-mist">{u.label}</Link></li>
                            ))}
                          </ul>
                        )}
                        {item.children && (
                          <ul className="mb-3 grid gap-1 pl-3">
                            {item.children.map((c) => (<li key={c.href}><Link href={c.href} className="block rounded-lg px-3 py-2.5 font-semibold text-ink-soft hover:bg-mist">{c.label}</Link></li>))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 grid gap-3 pb-4">
                    <Link href="/request-quotation" className="btn-primary w-full">Request a Quotation</Link>
                    <a href={`tel:${s.phoneHref}`} className="btn-ghost w-full"><Icon name="phone" className="h-4 w-4" />{s.phone}</a>
                  </div>
                </nav>
              </div>
            </details>
          </div>
        </div>
      </div>
    </header>
  );
}
