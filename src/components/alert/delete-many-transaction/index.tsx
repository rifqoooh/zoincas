'use client';

import { toast } from 'sonner';

import { ConfirmationDialog } from '@/components/confirmation-dialog';
import { useDeleteManyTransactionMutation } from '@/hooks/queries/transactions';
import { useDeleteManyTransactionModal } from '@/hooks/store/delete-many-transaction';
import { useIsClient } from '@/hooks/use-is-client';

export function DeleteManyTransactionModal() {
  const store = useDeleteManyTransactionModal();
  const mutation = useDeleteManyTransactionMutation(store.ids);

  const isClient = useIsClient();
  if (!isClient) {
    return null;
  }

  const text = {
    title: 'Delete Transaction(s)',
    description:
      'Just checking - are you sure you want to delete selected transaction(s)? This action can not be undone.',
    action: 'Delete',
  };

  const onChange = () => {
    store.onClose();
  };

  const onCancel = () => {
    store.onClose({ reset: true });
  };

  const onConfirm = () => {
    toast.promise(
      mutation.mutateAsync(undefined, {
        onSuccess: () => {
          store.onClose({ reset: true });
        },
      }),
      {
        loading: 'Deleting transaction(s)...',
        success: 'Transaction(s) deleted successfully',
        error: (error: unknown) => {
          if (error instanceof Error) {
            return error.message;
          }

          return 'There is some internal error. Try again or contact support.';
        },
      }
    );
  };

  return (
    <ConfirmationDialog
      {...text}
      isOpen={store.isOpen}
      onChange={onChange}
      onCancel={onCancel}
      onConfirm={onConfirm}
    />
  );
}
