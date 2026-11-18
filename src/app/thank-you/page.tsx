import Link from 'next/link';
import PageHero from '@/components/PageHero';

export const metadata = { title: 'Thank you', robots: { index: false } };

export default function Page({ searchParams }: { searchParams: { ref?: string } }) {
  return (
    <>
      <PageHero eyebrow="Enquiry received" title="Thank you. Your enquiry is with our team." text={searchParams.ref ? `Your reference number is ${searchParams.ref}. We aim to respond within one working day.` : 'We aim to respond within one working day.'} size="sm" />
      <div className="container py-16"><Link href="/" className="btn-red">Back to home</Link></div>
    </>
  );
}
