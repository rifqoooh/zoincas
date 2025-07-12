'use client';

import { toast } from 'sonner';

import { ConfirmationDialog } from '@/components/confirmation-dialog';
import { useDeleteBudgetPlanMutation } from '@/hooks/queries/budget-plans';
import { useDeleteBudgetPlanModal } from '@/hooks/store/delete-budget-plan';
import { useIsClient } from '@/hooks/use-is-client';

export function DeleteBudgetPlanModal() {
  const store = useDeleteBudgetPlanModal();
  const mutation = useDeleteBudgetPlanMutation(store.id);

  const isClient = useIsClient();
  if (!isClient) {
    return null;
  }

  const text = {
    title: 'Delete Budget Plan',
    description:
      'Just checking - are you sure you want to delete this budget plan? All the categories under this plan will be deleted.',
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
        loading: 'Deleting budget plan...',
        success: 'Budget plan deleted successfully',
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
