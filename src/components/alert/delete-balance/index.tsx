'use client';

import { toast } from 'sonner';

import { VerifyConfirmationDialog } from '@/components/verify-confirmation-dialog';
import { useDeleteBalanceMutation } from '@/hooks/queries/balances';
import { useDeleteBalanceModal } from '@/hooks/store/delete-balance';
import { useIsClient } from '@/hooks/use-is-client';

export function DeleteBalanceModal() {
  const store = useDeleteBalanceModal();
  const mutation = useDeleteBalanceMutation(store.id);

  const isClient = useIsClient();
  if (!isClient) {
    return null;
  }

  const text = {
    title: 'Delete Balance',
    description:
      'Just checking - are you sure you want to delete this balance? All the transactions under this balance will be deleted.',
    action: 'Delete',
    verification: 'YES, DELETE',
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
        loading: 'Deleting balance...',
        success: 'Balance deleted successfully',
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
    <VerifyConfirmationDialog
      {...text}
      isOpen={store.isOpen}
      onChange={onChange}
      onCancel={onCancel}
      onConfirm={onConfirm}
    />
  );
}
