'use client';

import type { InsertBudgetPlansType } from '@/validators/db/budget-plans';
import type { SubmitHandler } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm } from 'react-hook-form';

import { useGetBudgetPlanQuery } from '@/hooks/queries/budget-plans';
import { useCreateEditBudgetModal } from '@/hooks/store/create-edit-budget';
import { insertBudgetPlansSchema } from '@/validators/db/budget-plans';

export const useCreateEditBudgetPlan = () => {
  const store = useCreateEditBudgetModal();
  const isCreating = store.id === undefined;

  //   const createMutation = useCreateBudgetPlanMutation();
  //   const updateMutation = useUpdateBudgetPlanMutation(store.id);

  const budgetPlanQuery = useGetBudgetPlanQuery(store.id);

  // fallback to default values budget plan data is undefined
  const defaultValues: InsertBudgetPlansType = budgetPlanQuery.data
    ? {
        title: budgetPlanQuery.data.title || '',
        categories: budgetPlanQuery.data.categories,
      }
    : {
        title: '',
        categories: [
          {
            name: '',
            amount: 0,
          },
        ],
      };

  const form = useForm<InsertBudgetPlansType>({
    resolver: zodResolver(insertBudgetPlansSchema),
    defaultValues,
  });

  const fieldArray = useFieldArray({
    name: 'categories',
    control: form.control,
  });

  const onSubmit: SubmitHandler<InsertBudgetPlansType> = (values) => {
    console.log(values);

    const parsedData = insertBudgetPlansSchema.parse(values);
  };

  return {
    form,
    fieldArray,
    onSubmit,
    isCreating,
  };
};
