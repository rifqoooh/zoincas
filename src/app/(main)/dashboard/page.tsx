import type { Metadata } from 'next';

import { Container } from '@/components/container';
import { createMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = createMetadata({
  title: 'Dashboard',
  description:
    'Zoincas is a personal financial management app powered with AI.',
});

export default function DashboardPage() {
  return (
    <Container>
      <div>Dashboard Page</div>
    </Container>
  );
}
