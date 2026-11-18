import type { MetadataRoute } from 'next';
import { articles, projects, units } from '@/lib/content';
import { SITE_URL } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const fixed = ['', '/about', '/leadership', '/business-divisions', '/projects', '/industries', '/sustainability', '/insights', '/contact', '/request-quotation', '/privacy'];
  return [
    ...fixed.map((p) => ({ url: `${SITE_URL}${p}`, lastModified: now, changeFrequency: 'monthly' as const, priority: p === '' ? 1 : 0.7 })),
    ...units().map((u) => ({ url: `${SITE_URL}/${u.slug}`, lastModified: now, changeFrequency: 'monthly' as const, priority: u.capability ? 0.7 : 0.9 })),
    ...projects().map((p) => ({ url: `${SITE_URL}/projects/${p.slug}`, lastModified: now, changeFrequency: 'yearly' as const, priority: 0.6 })),
    ...articles().map((a) => ({ url: `${SITE_URL}/insights/${a.slug}`, lastModified: new Date(a.date), changeFrequency: 'yearly' as const, priority: 0.5 })),
  ];
}
