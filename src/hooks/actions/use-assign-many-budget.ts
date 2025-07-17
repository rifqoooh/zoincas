'use client';

import type { AssignManyBudgetTransactionsType } from '@/validators/db/transactions';
import type { SubmitHandler } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { useListBudgetPlansQuery } from '@/hooks/queries/budget-plans';
import { useAssignManyBudgetTransactionMutation } from '@/hooks/queries/transactions';
import { useAssignManyBudgetModal } from '@/hooks/store/assign-many-budget';
import { assignManyBudgetTransactionsSchema } from '@/validators/db/transactions';

export const useAssignManyBudget = () => {
  const store = useAssignManyBudgetModal();

  const mutation = useAssignManyBudgetTransactionMutation(store.ids);

  const budgetCategoriesQuery = useListBudgetPlansQuery();

  const form = useForm<Pick<AssignManyBudgetTransactionsType, 'budgetId'>>({
    resolver: zodResolver(
      assignManyBudgetTransactionsSchema.pick({ budgetId: true })
    ),
    defaultValues: {
      budgetId: '',
    },
  });

  const onSubmit: SubmitHandler<
    Pick<AssignManyBudgetTransactionsType, 'budgetId'>
  > = (values) => {
    const parsedData = assignManyBudgetTransactionsSchema
      .pick({
        budgetId: true,
      })
      .parse(values);

    return toast.promise(
      mutation.mutateAsync(parsedData.budgetId, {
        onSuccess: () => {
          store.onClose();
        },
      }),
      {
        loading: 'Assigning budget...',
        success: 'Budget assigned successfully',
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
    budgetCategoriesQuery,
  };
};
