'use client';

import { CreateTransactionForm } from '@/components/forms/create-transaction';
import { ResponsiveSheet } from '@/components/responsive-sheet';
import { useCreateTransactionModal } from '@/hooks/store/create-transaction';
import { useIsClient } from '@/hooks/use-is-client';

export function CreateTransactionModal() {
  const store = useCreateTransactionModal();

  const isClient = useIsClient();
  if (!isClient) {
    return null;
  }

  const text = {
    title: 'Create a new transaction',
    description: 'Fill the form to create a new transaction',
  };

  return (
    <ResponsiveSheet {...text} isOpen={store.isOpen} onClose={store.onClose}>
      <CreateTransactionForm />
    </ResponsiveSheet>
  );
}
