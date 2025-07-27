import { createMetadata } from '@/lib/seo/metadata';
import type { Metadata } from 'next';
import { Header } from './_components/header';
import { Hero } from './_components/hero';

export const metadata: Metadata = createMetadata({
  description: 'Zoincas is a personal financial tracker app powered with AI.',
});

export default function RootPage() {
  return (
    <main>
      <Header />
      <Hero />
    </main>
  );
}
