import UnitPage from '@/components/UnitPage';
import { unit } from '@/lib/content';
import { pageMeta } from '@/lib/seo';

const u = unit('telecommunications')!;
export const metadata = { ...pageMeta({ title: u.metaTitle, description: u.metaDescription, path: '/telecommunications', image: u.cardImage }), title: { absolute: u.metaTitle } };

export default function Page() {
  return <UnitPage slug="telecommunications" />;
}
