import { CreateTransactionButton } from '@/components/modal/create-edit-transaction/button';
import { CreateTransactionsMenu } from './create-transactions-menu';

export function CreateTransactions() {
  return (
    <div className="flex flex-row gap-2">
      <CreateTransactionButton className="grow" />
      <CreateTransactionsMenu />
    </div>
  );
}
