'use client';

import { CreateEditTransactionForm } from '@/components/forms/create-edit-transaction';
import { ResponsiveSheet } from '@/components/responsive-sheet';
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
      <CreateEditTransactionForm />
    </ResponsiveSheet>
  );
}
