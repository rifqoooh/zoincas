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

  const isLoading = transactionQuery.isLoading;

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
      {isLoading ? <SkeletonForm /> : <CreateEditTransactionForm />}
    </ResponsiveSheet>
  );
}

export function SkeletonForm() {
  return (
    <div className="grid gap-10">
      <div className="flex flex-col gap-2">
        <Skeleton className="h-3.5 w-28 " />
        <Skeleton className="h-9 w-full " />
      </div>
      <div className="flex flex-col gap-2">
        <Skeleton className="h-3.5 w-28 " />
        <Skeleton className="h-9 w-full " />
      </div>
    </div>
  );
}
