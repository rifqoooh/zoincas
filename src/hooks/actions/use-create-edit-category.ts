'use client';

import type { InsertCategoriesType } from '@/validators/db/categories';
import type { SubmitHandler } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import {
  useCreateCategoryMutation,
  useGetCategoryQuery,
  useUpdateCategoryMutation,
} from '@/hooks/queries/categories';
import { useCreateEditCategoryModal } from '@/hooks/store/create-edit-category';
import { insertCategoriesSchema } from '@/validators/db/categories';

export const useCreateEditCategory = () => {
  const store = useCreateEditCategoryModal();
  const isCreating = store.id === undefined;

  const createMutation = useCreateCategoryMutation();
  const updateMutation = useUpdateCategoryMutation(store.id);

  const categoryQuery = useGetCategoryQuery(store.id);

  // fallback to default values category data is undefined
  const defaultValues: InsertCategoriesType = categoryQuery.data
    ? {
        name: categoryQuery.data.name,
      }
    : {
        name: '',
      };

  const form = useForm<InsertCategoriesType>({
    resolver: zodResolver(insertCategoriesSchema),
    defaultValues,
  });

  const onCreateSubmit = (values: InsertCategoriesType) => {
    return toast.promise(
      createMutation.mutateAsync(values, {
        onSuccess: () => {
          store.onClose();
        },
      }),
      {
        loading: 'Creating category...',
        success: 'Category created successfully',
        error: (error: unknown) => {
          if (error instanceof Error) {
            return error.message;
          }

          return 'There is an error in the internal server.';
        },
      }
    );
  };

  const onUpdateSubmit = (values: InsertCategoriesType) => {
    return toast.promise(
      updateMutation.mutateAsync(values, {
        onSuccess: () => {
          store.onClose();
        },
      }),
      {
        loading: 'Updating category...',
        success: 'Category updated successfully',
        error: (error: unknown) => {
          if (error instanceof Error) {
            return error.message;
          }

          return 'There is an error in the internal server.';
        },
      }
    );
  };

  const onSubmit: SubmitHandler<InsertCategoriesType> = (values) => {
    const parsedData = insertCategoriesSchema.parse(values);

    if (isCreating) {
      onCreateSubmit(parsedData);
    } else {
      onUpdateSubmit(parsedData);
    }
  };

  return {
    form,
    onSubmit,
    isCreating,
    createMutation,
    updateMutation,
  };
};
