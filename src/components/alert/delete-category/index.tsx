'use client';

import { toast } from 'sonner';

import { ConfirmationDialog } from '@/components/confirmation-dialog';
import { useDeleteCategoryMutation } from '@/hooks/queries/categories';
import { useDeleteCategoryModal } from '@/hooks/store/delete-category';
import { useIsClient } from '@/hooks/use-is-client';

export function DeleteCategoryModal() {
  const store = useDeleteCategoryModal();
  const mutation = useDeleteCategoryMutation(store.id);

  const isClient = useIsClient();
  if (!isClient) {
    return null;
  }

  const text = {
    title: 'Delete Category',
    description:
      'Just checking - are you sure you want to delete this category? This action can not be undone.',
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
        loading: 'Deleting category...',
        success: 'Category deleted successfully',
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
