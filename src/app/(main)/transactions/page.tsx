import type { Metadata } from 'next';

import { Container } from '@/components/container';
import { CreateTransactionButton } from '@/components/modal/create-edit-transaction/button';
import { TransactionsTable } from '@/components/tables/transactions';
import { Separator } from '@/components/ui/separator';
import { createMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = createMetadata({
  title: 'Transactions',
  description:
    'Zoincas is a personal financial management app powered with AI.',
});

export default function TransactionsPage() {
  return (
    <main>
      <Container>
        <div className="flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-semibold text-2xl">Transactions</h1>
            <p className=" text-muted-foreground sm:text-sm/6">
              Powerful transactions table for tracking your transactions
            </p>
          </div>

          <CreateTransactionButton />
        </div>

        <Separator />

        <div className="py-6">
          <TransactionsTable />
        </div>
      </Container>
    </main>
  );
}
