import type { Metadata } from 'next';

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://www.donmacltd.com').replace(/\/$/, '');

export function pageMeta({ title, description, path, image }: { title: string; description: string; path: string; image?: string }): Metadata {
  const url = `${SITE_URL}${path}`;
  const img = image || '/images/site/solar-array-hillside.jpg';
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, siteName: 'Donmac Group', locale: 'en_ZM', type: 'website', images: [{ url: img, width: 1200, height: 630, alt: title }] },
    twitter: { card: 'summary_large_image', title, description, images: [img] },
  };
}

export const formatDate = (d: string) =>
  new Date(d + 'T00:00:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
