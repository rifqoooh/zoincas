import { createMetadata } from '@/lib/seo/metadata';
import type { Metadata } from 'next';

export const metadata: Metadata = createMetadata({
  title: 'Zoincas',
  description: 'Zoincas is a personal financial tracker app powered with AI.',
});

export default function RootPage() {
  return <div>Landing Page</div>;
}
