import type { Metadata } from 'next';

import { Container } from '@/components/container';
import { Separator } from '@/components/ui/separator';
import { createMetadata } from '@/lib/seo/metadata';
import { InsightCard } from '../_components/dashboard-cards/insight-card';
import { NetWorthCard } from '../_components/dashboard-cards/net-worth-card';
import { TopCategoriesCard } from '../_components/dashboard-cards/top-categories-card';
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

      <div className="grid gap-4 py-6 xl:grid-cols-6">
        <InsightCard type="income" className="xl:col-span-2" />
        <InsightCard type="expense" className="xl:col-span-2" />
        <InsightCard type="remaining" className="xl:col-span-2" />
        <NetWorthCard className="xl:col-span-4" />
        <TopCategoriesCard className="xl:col-span-2" />
      </div>
    </Container>
  );
}
