import Image from 'next/image';
import PageHero from '@/components/PageHero';
import { CorporateCTA } from '@/components/Sections';
import { leaders } from '@/lib/content';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({ title: 'Leadership', description: 'Meet the leadership of Donmac Group: Group Managing Director Kabayo Muhau, Group Lead Consultant Eng. Dr. Lusungu Ndovi and Group Director, Technology and Digitalization Tumelo Muhau.', path: '/leadership' });

export default function Page() {
  return (
    <>
      <PageHero eyebrow="Leadership" title="Experienced leadership, built to deliver accountability." text="A clear governance structure and dedicated division teams, from boardroom to site." crumbs={[{ href: '/', label: 'Home' }, { href: '/about', label: 'About us' }, { label: 'Leadership' }]} size="sm" />
      <section className="py-20 sm:py-24">
        <div className="container space-y-20">
          {leaders().map((l, i) => (
            <article key={l.slug} id={l.slug} className="reveal grid items-start gap-10 lg:grid-cols-12">
              <div className={`relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-3xl bg-mist lg:col-span-4 ${i % 2 ? 'lg:order-2' : ''}`}>
                <Image src={l.photo} alt={`Portrait of ${l.name}`} fill sizes="(min-width:1024px) 30vw, 90vw" className="object-cover object-top" />
              </div>
              <div className="lg:col-span-8">
                <p className="eyebrow">{l.role}</p>
                <h2 className="mt-3 text-h2">{l.name}</h2>
                <p className="mt-4 text-lg leading-relaxed text-ink-soft">{l.bio}</p>
                {l.message && (
                  <blockquote className="mt-8 border-l-4 border-brand-orange pl-6">
                    <p className="text-xl font-bold text-ink">{l.messageTitle}</p>
                    {l.message.map((m) => (<p key={m.slice(0, 20)} className="mt-4 leading-relaxed text-ink-soft">{m}</p>))}
                  </blockquote>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>
      <CorporateCTA />
    </>
  );
}
