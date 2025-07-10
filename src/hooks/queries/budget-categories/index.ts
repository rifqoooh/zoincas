import type { ErrorResponseAPI } from '@/lib/api/types';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { budgetCategories } from '@/lib/api/rpc';
import { selectBudgetCategoriesSchema } from '@/validators/db/budget-categories';
import { budgetCategoriesKeys } from './keys';

export const useDeleteBudgetCategoryMutation = (budgetCategoryId?: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => {
      if (!budgetCategoryId) {
        throw new Error('The budget category ID is required.');
      }

      const response = await budgetCategories[':budgetCategoryId'].$delete({
        param: { budgetCategoryId },
      });
      if (!response.ok) {
        const err = (await response.json()) as unknown as ErrorResponseAPI;
        throw new Error(err.error.message);
      }

      const data = await response.json();
      // TODO : investigate if selectBudgetCategoriesSchema can be replaced to budgetCategoriesDataSchema
      const parsedData = selectBudgetCategoriesSchema.safeParse(data);
      if (!parsedData.success) {
        throw new Error('There is an error when parsing response data.');
      }

      return parsedData.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: budgetCategoriesKeys.all(),
      });
    },
  });

  return mutation;
};
