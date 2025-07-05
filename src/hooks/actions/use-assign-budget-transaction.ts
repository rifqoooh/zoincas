import type { UpdateBudgetTransactionsType } from '@/validators/db/transactions';
import type { SubmitHandler } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { useListBudgetPlansQuery } from '@/hooks/queries/budget-plans';
import {
  useGetTransactionQuery,
  useUpdateTransactionMutation,
} from '@/hooks/queries/transactions';
import { useAssignBudgetTransactionModal } from '@/hooks/store/assign-budget-transaction';
import { updateBudgetTransactionsSchema } from '@/validators/db/transactions';

export const useAssignBudgetTransaction = () => {
  const store = useAssignBudgetTransactionModal();
  const isAssigning = store.id === undefined;

  const updateMutation = useUpdateTransactionMutation(store.id);

  const transactionQuery = useGetTransactionQuery(store.id);

  const budgetCategoriesQuery = useListBudgetPlansQuery();

  // fallback to default values transactions data is undefined
  const transactionData: UpdateBudgetTransactionsType = transactionQuery.data
    ? {
        planId: transactionQuery.data.budget.plan.id ?? '',
        categoryId: transactionQuery.data.budget.category.id ?? '',
      }
    : {
        planId: '',
        categoryId: '',
      };

  const form = useForm<UpdateBudgetTransactionsType>({
    resolver: zodResolver(updateBudgetTransactionsSchema),
    defaultValues: transactionData,
  });

  const onSubmit: SubmitHandler<UpdateBudgetTransactionsType> = (values) => {
    const parsedData = updateBudgetTransactionsSchema.parse(values);

    toast.promise(
      updateMutation.mutateAsync(
        {
          budgetCategoryId: parsedData.categoryId,
        },
        {
          onSuccess: () => {
            store.onClose();
          },
        }
      ),
      {
        loading: isAssigning
          ? 'Assigning transaction to budget...'
          : 'Updating transaction from budget...',
        success: isAssigning
          ? 'Transaction assigned to budget successfully'
          : 'Transaction updated from budget successfully',
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
    isAssigning,
    updateMutation,
    transactionQuery,
    budgetCategoriesQuery,
  };
};
