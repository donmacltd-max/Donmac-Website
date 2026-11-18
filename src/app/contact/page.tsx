import PageHero from '@/components/PageHero';
import EnquiryForm from '@/components/EnquiryForm';
import Icon from '@/components/Icon';
import { site } from '@/lib/content';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({ title: 'Contact Us', description: 'Contact Donmac Group in Northmead, Lusaka. Call +260 966 810170 or email sales@donmacltd.com for energy, ICT, e-mobility and sourcing enquiries.', path: '/contact' });

const tabs = [
  ['general', 'General enquiry'], ['consultation', 'Project consultation'], ['quotation', 'Request for quotation'], ['partnership', 'Suppliers and partners'], ['careers', 'Careers'],
];

export default function Page({ searchParams }: { searchParams: { error?: string } }) {
  const s = site();
  return (
    <>
      <PageHero eyebrow="Contact" title="Talk to us about your next project." text="Energy, ICT, e-mobility, sourcing, construction or telecoms: every enquiry is routed to the right team." crumbs={[{ href: '/', label: 'Home' }, { label: 'Contact' }]} size="sm" />
      {searchParams?.error && <div role="alert" className="container mt-8"><p className="rounded-2xl bg-red-50 p-4 font-semibold text-red-700">We could not process your enquiry. Please check the required fields and try again, or email {s.emailSales}.</p></div>}
      <section className="py-16 sm:py-20">
        <div className="container grid gap-10 lg:grid-cols-12">
          <aside className="space-y-4 lg:col-span-4">
            {[
              ['phone', 'Telephone', <a key="p" href={`tel:${s.phoneHref}`} className="hover:text-brand-red">{s.phone}</a>],
              ['mail', 'Email', <span key="e" className="grid"><a href={`mailto:${s.emailSales}`} className="hover:text-brand-red">{s.emailSales}</a><a href={`mailto:${s.emailInfo}`} className="hover:text-brand-red">{s.emailInfo}</a></span>],
              ['pin', 'Head office', <span key="a" className="grid">{s.address.map((l: string) => <span key={l}>{l}</span>)}<span className="text-ink-mute">{s.postal}</span></span>],
              ['gauge', 'Office hours', <span key="h">{s.hours}</span>],
            ].map(([ic, t, v]) => (
              <div key={t as string} className="flex gap-4 rounded-2xl border border-mist-line p-5">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-red text-white"><Icon name={ic as string} className="h-5 w-5" /></span>
                <div><p className="text-sm font-bold text-ink-mute">{t}</p><div className="mt-1 font-semibold">{v}</div></div>
              </div>
            ))}
            <a href={`https://wa.me/${s.whatsapp}`} target="_blank" rel="noopener noreferrer" className="btn-ghost w-full">Message us on WhatsApp</a>
            <div className="overflow-hidden rounded-2xl border border-mist-line">
              <iframe title="Map showing Donmac head office, Northmead, Lusaka" src={`https://maps.google.com/maps?q=${encodeURIComponent(s.mapQuery)}&z=15&output=embed`} className="h-72 w-full" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            </div>
          </aside>
          <div className="space-y-6 lg:col-span-8">
            <nav aria-label="Enquiry types" className="flex flex-wrap gap-2">{tabs.map(([id, l]) => (<a key={id} href={`#${id}`} className="chip hover:border-brand-red hover:text-brand-red">{l}</a>))}</nav>
            {tabs.map(([id, l], i) => (
              <details key={id} id={id} className="group card overflow-hidden" open={i === 0}>
                <summary className="flex cursor-pointer items-center justify-between gap-4 p-6 sm:px-10">
                  <span className="text-xl font-extrabold">{l}</span>
                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-mist-line transition group-open:rotate-45" aria-hidden="true">+</span>
                </summary>
                <div className="border-t border-mist-line p-6 sm:p-10"><EnquiryForm variant={id} /></div>
              </details>
            ))}
            <p className="text-sm text-ink-mute">Business-division enquiries: <a className="font-semibold text-brand-red" href="/energy#enquire">Energy</a> · <a className="font-semibold text-brand-red" href="/ict#enquire">ICT</a> · <a className="font-semibold text-brand-red" href="/e-mobility#enquire">e-Mobility</a> · <a className="font-semibold text-brand-red" href="/sourcing#enquire">Specialized Sourcing</a></p>
          </div>
        </div>
      </section>
    </>
  );
}
