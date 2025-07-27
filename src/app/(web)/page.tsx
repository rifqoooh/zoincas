import type { Metadata } from 'next';

import { createMetadata } from '@/lib/seo/metadata';
import { Features } from './_components/features';
import { Footer } from './_components/footer';
import { Header } from './_components/header';
import { Hero } from './_components/hero';
import { Pricing } from './_components/pricing';

export const metadata: Metadata = createMetadata({
  description: 'Zoincas is a personal financial tracker app powered with AI.',
});

export default function RootPage() {
  return (
    <main>
      <Header />
      <Hero />
      <Features />
      <Pricing />
      <Footer />
    </main>
  );
}
