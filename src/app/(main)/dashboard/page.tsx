import type { Metadata } from 'next';

import { Container } from '@/components/container';
import { Separator } from '@/components/ui/separator';
import { createMetadata } from '@/lib/seo/metadata';
import { InsightCard } from '../_components/dashboard-cards/insight-card';
import { NetWorthCard } from '../_components/dashboard-cards/net-worth-card';
import { TopCategoriesCard } from '../_components/dashboard-cards/top-categories-card';
import { FacetedFilter } from '../_components/dashboard-faceted-filter';
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
      <Header className="sm:flex-col sm:items-start sm:justify-start lg:flex-row lg:items-center lg:justify-between">
        <div>
          <HeaderTitle>Dashboard</HeaderTitle>
          <HeaderDescription>
            Useful dashboard for insights your finances
          </HeaderDescription>
        </div>

        <FacetedFilter />
      </Header>

      <Separator />

      <div className="grid grid-cols-1 gap-4 py-6 lg:grid-cols-6">
        <InsightCard type="income" className="lg:col-span-2" />
        <InsightCard type="expense" className="lg:col-span-2" />
        <InsightCard type="remaining" className="lg:col-span-2" />
        <NetWorthCard className="lg:col-span-6 xl:col-span-4" />
        <TopCategoriesCard className="lg:col-span-6 xl:col-span-2" />
      </div>
    </Container>
  );
}
