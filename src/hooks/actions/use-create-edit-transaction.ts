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
  useUpdateTransactionMutation,
} from '@/hooks/queries/transactions';
import { useCreateEditTransactionModal } from '@/hooks/store/create-edit-transaction';
import { insertTransactionsSchema } from '@/validators/db/transactions';
import { useListBudgetPlansQuery } from '../queries/budget-plans';

export const useCreateEditTransaction = () => {
  const store = useCreateEditTransactionModal();
  const isCreating = store.id === undefined;

  const createMutation = useCreateTransactionMutation();
  const updateMutation = useUpdateTransactionMutation(store.id);

  const transactionQuery = useGetTransactionQuery(store.id);

  const balancesQuery = useListBalancesQuery();
  const categoriesQuery = useListCategoriesQuery();
  const budgetCategoriesQuery = useListBudgetPlansQuery();

  // fallback to default values transactions data is undefined
  const transactionData = transactionQuery.data
    ? {
        ...transactionQuery.data,
        balanceId: transactionQuery.data.balance.id,
        categoryId: transactionQuery.data.category.id,
        budgetCategoryId: transactionQuery.data.budget.category.id,
      }
    : {
        datetime: new Date(),
        description: '',
        amount: 0,
        balanceId: '',
        categoryId: null,
        budgetCategoryId: null,
      };

  const form = useForm<InsertTransactionsType>({
    resolver: zodResolver(insertTransactionsSchema),
    defaultValues: transactionData,
  });

  const onCreateSubmit = (values: InsertTransactionsType) => {
    return toast.promise(
      createMutation.mutateAsync(values, {
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

  const onUpdateSubmit = (values: InsertTransactionsType) => {
    return toast.promise(
      updateMutation.mutateAsync(values, {
        onSuccess: () => {
          store.onClose();
        },
      }),
      {
        loading: 'Updating transaction...',
        success: 'Transaction updated successfully',
        error: (error: unknown) => {
          if (error instanceof Error) {
            return error.message;
          }

          return 'There is an error in the internal server.';
        },
      }
    );
  };

  const onSubmit: SubmitHandler<InsertTransactionsType> = (values) => {
    const parsedData = insertTransactionsSchema.parse(values);

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
    transactionQuery,
    balancesQuery,
    categoriesQuery,
    budgetCategoriesQuery,
  };
};
