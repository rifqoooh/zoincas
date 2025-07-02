'use client';

import type { InsertTransactionsType } from '@/validators/db/transactions';
import type { SubmitHandler } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { useListBalancesQuery } from '@/hooks/queries/balances';
import { useListCategoriesQuery } from '@/hooks/queries/categories';
import {
  useCreateTransactionMutation,
  useGetTransactionQuery,
} from '@/hooks/queries/transactions';
import { useCreateEditTransactionModal } from '@/hooks/store/create-edit-transaction';
import { insertTransactionsSchema } from '@/validators/db/transactions';
import { useListBudgetPlansQuery } from '../queries/budget-plans';

export const useCreateTransaction = () => {
  const store = useCreateEditTransactionModal();
  const mutation = useCreateTransactionMutation();

  const transactionQuery = useGetTransactionQuery(store.id);

  const balancesQuery = useListBalancesQuery();
  const categoriesQuery = useListCategoriesQuery();
  const budgetCategoriesQuery = useListBudgetPlansQuery();

  const form = useForm<InsertTransactionsType>({
    resolver: zodResolver(insertTransactionsSchema),
    defaultValues: {
      datetime: new Date(),
      description: '',
      amount: 0,
      balanceId: '',
      categoryId: null,
      budgetCategoryId: null,
    },
  });

  const onSubmit: SubmitHandler<InsertTransactionsType> = (values) => {
    const parsedData = insertTransactionsSchema.parse(values);

    toast.promise(
      mutation.mutateAsync(parsedData, {
        onSuccess: () => {
          store.onClose();
        },
      }),
      {
        loading: 'Creating transaction...',
        success: 'Transaction created successfully',
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
    transactionQuery,
    balancesQuery,
    categoriesQuery,
    budgetCategoriesQuery,
  };
};
