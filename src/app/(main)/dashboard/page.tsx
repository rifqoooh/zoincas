import type { Metadata } from 'next';

import { Container } from '@/components/container';
import { Separator } from '@/components/ui/separator';
import { createMetadata } from '@/lib/seo/metadata';
import { Header } from '../_components/header';
import { HeaderDescription } from '../_components/header/header-description';
import { HeaderTitle } from '../_components/header/header-title';

export const metadata: Metadata = createMetadata({
  title: 'Dashboard',
  description:
    'Zoincas is a personal financial management app powered with AI.',
});

export default function DashboardPage() {
  return (
    <Container>
      <Header>
        <div>
          <HeaderTitle>Dashboard</HeaderTitle>
          <HeaderDescription>
            Useful dashboard for insights your finances
          </HeaderDescription>
        </div>
      </Header>

      <Separator />

      <div className="grid gap-4 py-6">
        <div>Content</div>
      </div>
    </Container>
  );
}
