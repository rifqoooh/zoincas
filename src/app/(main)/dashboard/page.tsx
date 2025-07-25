import type { Metadata } from 'next';

import { Container } from '@/components/container';
import { Separator } from '@/components/ui/separator';
import { createMetadata } from '@/lib/seo/metadata';
import { FilterButton } from '../_components/dashboard-cards/filter-button';
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

        <FilterButton />
      </Header>

      <Separator />

      <div className="grid gap-4 py-6 lg:grid-cols-6">
        <InsightCard type="income" className="lg:col-span-2" />
        <InsightCard type="expense" className="lg:col-span-2" />
        <InsightCard type="remaining" className="lg:col-span-2" />
        <NetWorthCard className="lg:col-span-6 xl:col-span-4" />
        <TopCategoriesCard className="lg:col-span-6 xl:col-span-2" />
      </div>
    </Container>
  );
}
