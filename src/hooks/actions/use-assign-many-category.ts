'use client';

import type { AssignManyCategoryTransactionsType } from '@/validators/db/transactions';
import type { SubmitHandler } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { useListCategoriesQuery } from '@/hooks/queries/categories';
import { useAssignManyCategoryTransactionMutation } from '@/hooks/queries/transactions';
import { useAssignManyCategoryModal } from '@/hooks/store/assign-many-category';
import { assignManyCategoryTransactionsSchema } from '@/validators/db/transactions';

export const useAssignManyCategory = () => {
  const store = useAssignManyCategoryModal();

  const mutation = useAssignManyCategoryTransactionMutation(store.ids);

  const categoriesQuery = useListCategoriesQuery();

  const form = useForm<Pick<AssignManyCategoryTransactionsType, 'categoryId'>>({
    resolver: zodResolver(
      assignManyCategoryTransactionsSchema.pick({ categoryId: true })
    ),
    defaultValues: {
      categoryId: '',
    },
  });

  const onSubmit: SubmitHandler<
    Pick<AssignManyCategoryTransactionsType, 'categoryId'>
  > = (values) => {
    const parsedData = assignManyCategoryTransactionsSchema
      .pick({
        categoryId: true,
      })
      .parse(values);

    return toast.promise(
      mutation.mutateAsync(parsedData.categoryId, {
        onSuccess: () => {
          store.onClose();
        },
      }),
      {
        loading: 'Assigning category...',
        success: 'Category assigned successfully',
        error: (error: unknown) => {
          if (error instanceof Error) {
            return error.message;
          }

          return 'There is an error in the internal server.';
        },
      }
    );
  };

  return {
    form,
    onSubmit,
    mutation,
    categoriesQuery,
  };
};
