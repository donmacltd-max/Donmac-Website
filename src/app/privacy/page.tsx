import PageHero from '@/components/PageHero';
import { pageMeta } from '@/lib/seo';

export const metadata = pageMeta({ title: 'Privacy Notice', description: 'How Donmac Limited collects, uses and protects personal data submitted through this website.', path: '/privacy' });

export default function Page() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Privacy notice" size="sm" crumbs={[{ href: '/', label: 'Home' }, { label: 'Privacy notice' }]} />
      <section className="container max-w-3xl py-16">
        <div className="article-body">
          <p>Donmac Limited (&quot;Donmac&quot;, &quot;we&quot;) respects your privacy. This notice explains how we handle personal data submitted through this website, in line with the Data Protection Act No. 3 of 2021 of Zambia.</p>
          <h2>What we collect</h2>
          <p>When you submit an enquiry we collect the details you provide: your name, organisation, email address, phone number, the content of your message and any documents you attach. Our servers also record basic technical information such as IP address for security and spam prevention.</p>
          <h2>How we use it</h2>
          <ul><li>To respond to your enquiry and prepare quotations.</li><li>To route your enquiry to the relevant business division.</li><li>To keep a record of enquiries and our responses.</li><li>To protect the website from spam and abuse.</li></ul>
          <p>We do not sell your personal data and we do not use it for unrelated marketing without your consent.</p>
          <h2>Analytics</h2>
          <p>Where analytics are enabled we use privacy-focused, cookie-free measurement that does not identify individual visitors.</p>
          <h2>Retention and security</h2>
          <p>We keep enquiry records only as long as needed for the purposes above and for our legal obligations, and we protect them with appropriate technical and organisational measures.</p>
          <h2>Your rights</h2>
          <p>You may ask to access, correct or delete your personal data, or object to its use, by emailing <a href="mailto:info@donmacltd.com">info@donmacltd.com</a>.</p>
          <h2>Contact</h2>
          <p>Donmac Limited, Plot 27, Nchenja Road, Off Paseli Road, Northmead, Lusaka, Zambia. Telephone +260 966 810170.</p>
        </div>
      </section>
    </>
  );
}
