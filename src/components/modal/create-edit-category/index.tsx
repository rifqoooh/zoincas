'use client';

import { CreateEditCategoryForm } from '@/components/forms/create-edit-category';
import { ResponsiveSheet } from '@/components/responsive-sheet';
import { Skeleton } from '@/components/ui/skeleton';
import { useGetCategoryQuery } from '@/hooks/queries/categories';
import { useCreateEditCategoryModal } from '@/hooks/store/create-edit-category';
import { useIsClient } from '@/hooks/use-is-client';

export function CreateEditCategoryModal() {
  const store = useCreateEditCategoryModal();
  const isCreating = store.id === undefined;

  const categoryQuery = useGetCategoryQuery(store.id);

  const isClient = useIsClient();
  if (!isClient) {
    return null;
  }

  const isLoading = categoryQuery.isLoading;

  const text = isCreating
    ? {
        title: 'Create a new category',
        description: 'Fill the form to create a new category',
      }
    : {
        title: 'Edit Category',
        description: 'Wanna make some changes to your category?',
      };

  return (
    <ResponsiveSheet {...text} isOpen={store.isOpen} onClose={store.onClose}>
      {isLoading ? <SkeletonForm /> : <CreateEditCategoryForm />}
    </ResponsiveSheet>
  );
}

function SkeletonForm() {
  return (
    <div className="grid gap-10">
      <div className="flex flex-col gap-2">
        <Skeleton className="h-3.5 w-28 " />
        <Skeleton className="h-9 w-full " />
      </div>
    </div>
  );
}
