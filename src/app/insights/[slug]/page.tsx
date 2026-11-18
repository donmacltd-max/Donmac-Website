import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Breadcrumbs, JsonLd } from '@/components/ui';
import { CorporateCTA } from '@/components/Sections';
import { article, articles } from '@/lib/content';
import { formatDate, pageMeta, SITE_URL } from '@/lib/seo';

export function generateStaticParams() { return articles().map((a) => ({ slug: a.slug })); }
export function generateMetadata({ params }: { params: { slug: string } }) {
  const a = article(params.slug); if (!a) return {};
  const m = pageMeta({ title: a.title, description: a.excerpt, path: `/insights/${a.slug}`, image: a.image });
  return { ...m, openGraph: { ...m.openGraph, type: 'article', publishedTime: a.date, authors: [a.author] } };
}

export default function Page({ params }: { params: { slug: string } }) {
  const a = article(params.slug); if (!a) notFound();
  const url = `${SITE_URL}/insights/${a.slug}`;
  const enc = encodeURIComponent;
  const shares = [
    ['LinkedIn', `https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}`],
    ['Facebook', `https://www.facebook.com/sharer/sharer.php?u=${enc(url)}`],
    ['X', `https://twitter.com/intent/tweet?url=${enc(url)}&text=${enc(a.title)}`],
    ['WhatsApp', `https://wa.me/?text=${enc(a.title + ' ' + url)}`],
    ['Email', `mailto:?subject=${enc(a.title)}&body=${enc(url)}`],
  ];
  return (
    <>
      <article>
        <header className="dark-surface text-white">
          <div className="container max-w-4xl pb-14 pt-20">
            <Breadcrumbs items={[{ href: '/', label: 'Home' }, { href: '/insights', label: 'Insights' }, { label: a.category }]} />
            <p className="eyebrow mt-8">{a.category}</p>
            <h1 className="mt-4 text-h1">{a.title}</h1>
            <p className="mt-6 text-white/70"><time dateTime={a.date}>{formatDate(a.date)}</time> · By {a.author}</p>
          </div>
        </header>
        <div className="container max-w-4xl">
          <div className="relative -mt-2 aspect-[16/8] overflow-hidden rounded-b-3xl"><Image src={a.image} alt={a.imageAlt} fill priority sizes="(min-width:1024px) 900px, 100vw" className="object-cover" /></div>
          <div className="mx-auto max-w-prose py-14">
            <p className="text-xl font-semibold leading-relaxed text-ink">{a.excerpt}</p>
            <div className="article-body mt-8" dangerouslySetInnerHTML={{ __html: a.html }} />
            <div className="mt-12 border-t border-mist-line pt-6">
              <p className="text-sm font-bold text-ink">Share this article</p>
              <ul className="mt-3 flex flex-wrap gap-2">{shares.map(([n, h]) => (<li key={n}><a href={h} target="_blank" rel="noopener noreferrer" className="chip hover:border-brand-red hover:text-brand-red">{n}</a></li>))}</ul>
            </div>
            <Link href="/insights" className="link-arrow mt-10">Back to all insights</Link>
          </div>
        </div>
      </article>
      <CorporateCTA />
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'Article', headline: a.title, datePublished: a.date, author: { '@type': 'Organization', name: a.author }, publisher: { '@type': 'Organization', name: 'Donmac Group', logo: { '@type': 'ImageObject', url: `${SITE_URL}/images/brand/donmac-logo-full.png` } }, image: `${SITE_URL}${a.image}`, mainEntityOfPage: url }} />
    </>
  );
}
