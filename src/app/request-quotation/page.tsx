import PageHero from '@/components/PageHero';
import EnquiryForm from '@/components/EnquiryForm';
import Icon from '@/components/Icon';
import { UNIT_OPTIONS } from '@/lib/forms';
import { unit } from '@/lib/content';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({ title: 'Request a Quotation', description: 'Request a quotation from Donmac Group for solar and storage, ICT equipment and services, electric vehicles and charging, equipment sourcing, construction or telecoms.', path: '/request-quotation' });

export default function Page({ searchParams }: { searchParams: { unit?: string; service?: string; vehicle?: string } }) {
  const u = searchParams.unit ? unit(searchParams.unit) : undefined;
  const svc = u?.services.find((s) => s.id === searchParams.service);
  const unitLabel = UNIT_OPTIONS.find((o) => o.value === searchParams.unit)?.label;
  const message = [svc ? `Service: ${svc.title}` : '', searchParams.vehicle ? `Vehicle: ${searchParams.vehicle}` : ''].filter(Boolean).join('\n');
  return (
    <>
      <PageHero eyebrow="Request a quotation" title="Tell us what you need. We will come back with a solution and a price." crumbs={[{ href: '/', label: 'Home' }, { label: 'Request a quotation' }]} size="sm" />
      <section className="py-16 sm:py-20">
        <div className="container grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8"><div className="card p-6 sm:p-10">
            {(svc || searchParams.vehicle) && <p className="mb-6 rounded-xl bg-brand-orange/10 p-4 text-sm font-semibold text-ink">You are requesting: {svc?.title || searchParams.vehicle}{u ? ` (${u.name})` : ''}</p>}
            <EnquiryForm variant="quotation" defaults={{ unit: unitLabel || '', message: message ? message + '\n\n' : '', service: svc?.id || '', vehicle: searchParams.vehicle || '' }} />
          </div></div>
          <aside className="space-y-4 lg:col-span-4">
            {[['doc', 'Attach what you have', 'Specifications, BOQs, drawings, equipment schedules or electricity bills help us quote accurately.'], ['people', 'Routed to the right team', 'Your request goes directly to the relevant business division.'], ['check', 'Clear, compliant quotations', 'Itemised pricing, lead times and warranty terms, with VAT treated correctly.']].map(([ic, t, x]) => (
              <div key={t} className="flex gap-4 rounded-2xl bg-mist p-5"><Icon name={ic} className="h-6 w-6 shrink-0 text-brand-red" /><div><p className="font-bold">{t}</p><p className="mt-1 text-sm text-ink-soft">{x}</p></div></div>
            ))}
          </aside>
        </div>
      </section>
    </>
  );
}
