import type { Metadata } from 'next';

import { Container } from '@/components/container';
import { CreateTransactionButton } from '@/components/modal/create-edit-transaction/button';
import { TransactionsTable } from '@/components/tables/transactions';
import { Separator } from '@/components/ui/separator';
import { createMetadata } from '@/lib/seo/metadata';
import { Header } from '../_components/header';
import { HeaderDescription } from '../_components/header/header-description';
import { HeaderTitle } from '../_components/header/header-title';

export const metadata: Metadata = createMetadata({
  title: 'Transactions',
  description:
    'Zoincas is a personal financial management app powered with AI.',
});

export default function TransactionsPage() {
  return (
    <Container>
      <Header>
        <div>
          <HeaderTitle>Transactions</HeaderTitle>
          <HeaderDescription>
            Powerful transactions table for tracking your transactions
          </HeaderDescription>
        </div>

        <CreateTransactionButton />
      </Header>

      <Separator />

      <div className="py-6">
        <TransactionsTable />
      </div>
    </Container>
  );
}
