import type { Metadata } from 'next';

import { Container } from '@/components/container';
import { Separator } from '@/components/ui/separator';
import { createMetadata } from '@/lib/seo/metadata';
import { Header } from '../_components/header';
import { HeaderDescription } from '../_components/header/header-description';
import { HeaderTitle } from '../_components/header/header-title';

export const metadata: Metadata = createMetadata({
  title: 'Balances',
  description:
    'Zoincas is a personal financial management app powered with AI.',
});

export default function BalancesPage() {
  return (
    <Container>
      <Header>
        <div>
          <HeaderTitle>Balances</HeaderTitle>
          <HeaderDescription>
            Managing your balances for tracking your transactions
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
