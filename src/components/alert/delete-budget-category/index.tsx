'use client';

import { toast } from 'sonner';

import { ConfirmationDialog } from '@/components/confirmation-dialog';
import { useDeleteBudgetCategoryMutation } from '@/hooks/queries/budget-categories';
import { useDeleteBudgetCategoryModal } from '@/hooks/store/delete-budget-category';
import { useIsClient } from '@/hooks/use-is-client';

export function DeleteBudgetCategoryModal() {
  const store = useDeleteBudgetCategoryModal();
  const mutation = useDeleteBudgetCategoryMutation(store.id);

  const isClient = useIsClient();
  if (!isClient) {
    return null;
  }

  const text = {
    title: 'Delete Budget Category',
    description:
      'Just checking - are you sure you want to delete this budget category? All transactions under this category will be unassigned.',
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
          if (store.onSuccessCallback) {
            store.onSuccessCallback();
          }

          store.onClose({ reset: true });
        },
      }),
      {
        loading: 'Deleting budget category...',
        success: 'Budget category deleted successfully',
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
