import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import Script from 'next/script';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { JsonLd } from '@/components/ui';
import { SITE_URL } from '@/lib/seo';
import { site } from '@/lib/content';

const jakarta = localFont({ src: '../fonts/plus-jakarta-sans-latin-wght-normal.woff2', weight: '200 800', variable: '--font-jakarta', display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: 'Donmac Group | Clean Energy, ICT, e-Mobility and Sourcing in Zambia', template: '%s | Donmac Group' },
  description: 'Zambian-owned technology and infrastructure group delivering solar EPC, battery storage, enterprise ICT, electric vehicles and charging, and global equipment sourcing since 2011.',
  keywords: ['solar EPC Zambia', 'battery storage Zambia', 'hybrid solar Lusaka', 'ICT supplier Zambia', 'HP partner Zambia', 'electric vehicles Zambia', 'EV charging Zambia', 'procurement Zambia', 'Donmac'],
  openGraph: { siteName: 'Donmac Group', locale: 'en_ZM', type: 'website' },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = { themeColor: '#990000', width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const s = site();
  const org = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Donmac Group',
    legalName: 'Donmac Limited',
    url: SITE_URL,
    logo: `${SITE_URL}/images/brand/donmac-logo-full.png`,
    foundingDate: '2011-05-23',
    email: s.emailInfo,
    telephone: s.phone,
    address: { '@type': 'PostalAddress', streetAddress: 'Plot 27, Nchenja Road, Off Paseli Road, Northmead', addressLocality: 'Lusaka', addressCountry: 'ZM' },
    areaServed: 'Zambia',
  };
  const plausible = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  return (
    <html lang="en-GB" className={jakarta.variable}>
      <body className="font-sans">
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-brand-orange focus:px-5 focus:py-3 focus:font-semibold focus:text-white">Skip to content</a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <JsonLd data={org} />
        {plausible && <Script defer data-domain={plausible} src="https://plausible.io/js/script.js" strategy="afterInteractive" />}
      </body>
    </html>
  );
}
