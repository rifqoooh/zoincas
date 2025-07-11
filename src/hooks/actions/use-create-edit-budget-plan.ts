'use client';

import type {
  InsertBudgetPlansFormType,
  InsertBudgetPlansType,
} from '@/validators/db/budget-plans';
import type { SubmitHandler } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import {
  useCreateBudgetPlanMutation,
  useGetBudgetPlanQuery,
} from '@/hooks/queries/budget-plans';
import { useCreateEditBudgetModal } from '@/hooks/store/create-edit-budget';
import { useDeleteBudgetCategoryModal } from '@/hooks/store/delete-budget-category';
import {
  insertBudgetPlansFormSchema,
  insertBudgetPlansSchema,
} from '@/validators/db/budget-plans';

export const useCreateEditBudgetPlan = () => {
  const createEditStore = useCreateEditBudgetModal();
  const isCreating = createEditStore.id === undefined;

  const deleteStore = useDeleteBudgetCategoryModal();

  const createMutation = useCreateBudgetPlanMutation();
  //   const updateMutation = useUpdateBudgetPlanMutation(createEditStore.id);

  const budgetPlanQuery = useGetBudgetPlanQuery(createEditStore.id);

  // fallback to default values budget plan data is undefined
  const defaultValues: InsertBudgetPlansFormType = budgetPlanQuery.data
    ? {
        title: budgetPlanQuery.data.title || '',
        categories: budgetPlanQuery.data.categories.map((category) => ({
          categoryId: category.id,
          name: category.name,
          amount: category.amount,
        })),
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

  const form = useForm<InsertBudgetPlansFormType>({
    resolver: zodResolver(insertBudgetPlansFormSchema),
    defaultValues,
  });

  const fieldArray = useFieldArray({
    name: 'categories',
    control: form.control,
  });

  const onCreateSubmit = (values: InsertBudgetPlansType) => {
    return toast.promise(
      createMutation.mutateAsync(values, {
        onSuccess: () => {
          createEditStore.onClose();
        },
      }),
      {
        loading: 'Creating budget plan...',
        success: 'Budget plan created successfully',
        error: (error: unknown) => {
          if (error instanceof Error) {
            return error.message;
          }

          return 'There is an error in the internal server.';
        },
      }
    );
  };

  const onSubmit: SubmitHandler<InsertBudgetPlansFormType> = (values) => {
    // mapped categories
    values.categories = values.categories.map((category) => ({
      id: category.categoryId,
      name: category.name,
      amount: category.amount,
    }));

    const parsedData = insertBudgetPlansSchema.parse(values);

    if (isCreating) {
      onCreateSubmit(parsedData);
    } else {
      console.log(parsedData);
    }
  };

  return {
    form,
    fieldArray,
    onSubmit,
    isCreating,
    deleteStore,
  };
};
