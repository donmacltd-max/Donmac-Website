import Link from 'next/link';
import PageHero from '@/components/PageHero';

export default function NotFound() {
  return (
    <>
      <PageHero eyebrow="404" title="We could not find that page." text="It may have moved. Try one of our business divisions or get in touch." size="sm" />
      <div className="container flex flex-wrap gap-3 py-16"><Link href="/" className="btn-red">Home</Link><Link href="/business-divisions" className="btn-ghost">Business divisions</Link><Link href="/contact" className="btn-ghost">Contact</Link></div>
    </>
  );
}
