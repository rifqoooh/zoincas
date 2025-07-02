'use client';

import { CreateEditTransactionForm } from '@/components/forms/create-edit-transaction';
import { ResponsiveSheet } from '@/components/responsive-sheet';
import { Skeleton } from '@/components/ui/skeleton';
import { useGetTransactionQuery } from '@/hooks/queries/transactions';
import { useCreateEditTransactionModal } from '@/hooks/store/create-edit-transaction';
import { useIsClient } from '@/hooks/use-is-client';

export function CreateTransactionModal() {
  const store = useCreateEditTransactionModal();
  const isCreating = store.id === undefined;

  const transactionQuery = useGetTransactionQuery(store.id);

  const isClient = useIsClient();
  if (!isClient) {
    return null;
  }

  const isPending = transactionQuery.isPending;

  const text = isCreating
    ? {
        title: 'Create a new transaction',
        description: 'Fill the form to create a new transaction',
      }
    : {
        title: 'Edit Transaction',
        description: 'Wanna make some changes to your transaction?',
      };

  return (
    <ResponsiveSheet {...text} isOpen={store.isOpen} onClose={store.onClose}>
      {isPending ? <SkeletonForm /> : <CreateEditTransactionForm />}
    </ResponsiveSheet>
  );
}

export function SkeletonForm() {
  return (
    <div className="grid gap-3">
      <div>
        <Skeleton className="h-9 w-28 bg-slate-200" />
        <Skeleton className="h-9 w-full bg-slate-200" />
      </div>
      <div>
        <Skeleton className="h-9 w-28 bg-slate-200" />
        <Skeleton className="h-9 w-full bg-slate-200" />
      </div>
    </div>
  );
}
