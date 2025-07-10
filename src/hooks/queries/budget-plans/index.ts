import type { ErrorResponseAPI } from '@/lib/api/types';
import type { InsertBudgetPlansType } from '@/validators/db/budget-plans';

import { budgetPlans } from '@/lib/api/rpc';
import {
  getBudgetPlanResponse,
  listBudgetPlansSummaryResponse,
} from '@/validators/api/budget-plans/response';
import { selectBudgetPlansSchema } from '@/validators/db/budget-plans';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { budgetPlansKeys } from './keys';

export const useListBudgetPlansQuery = () => {
  const query = useQuery({
    queryKey: budgetPlansKeys.all(),
    queryFn: async () => {
      const response = await budgetPlans.$get();
      if (!response.ok) {
        const err = (await response.json()) as unknown as ErrorResponseAPI;
        throw new Error(err.error.message);
      }

      const data = await response.json();
      const parsedData = listBudgetPlansSummaryResponse.safeParse(data);
      if (!parsedData.success) {
        throw new Error('There is an error when parsing response data.');
      }

      return parsedData.data;
    },
  });

  return query;
};

export const useGetBudgetPlanQuery = (budgetPlanId?: string) => {
  const query = useQuery({
    enabled: !!budgetPlanId,
    queryKey: budgetPlansKeys.budgetPlan({ budgetPlanId }),
    queryFn: async () => {
      if (!budgetPlanId) {
        throw new Error('The budget plan ID is required.');
      }

      const response = await budgetPlans[':budgetPlanId'].$get({
        param: { budgetPlanId },
      });
      if (!response.ok) {
        const err = (await response.json()) as unknown as ErrorResponseAPI;
        throw new Error(err.error.message);
      }

      const data = await response.json();
      const parsedData = getBudgetPlanResponse.safeParse(data);
      if (!parsedData.success) {
        throw new Error('There is an error when parsing response data.');
      }

      return parsedData.data;
    },
  });

  return query;
};

export const useCreateBudgetPlanMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (input: InsertBudgetPlansType) => {
      const response = await budgetPlans.$post({
        json: input,
      });
      if (!response.ok) {
        const err = (await response.json()) as unknown as ErrorResponseAPI;
        throw new Error(err.error.message);
      }

      const data = await response.json();
      const parsedData = selectBudgetPlansSchema.safeParse(data);
      if (!parsedData.success) {
        throw new Error('There is an error when parsing response data.');
      }

      return parsedData.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: budgetPlansKeys.all(),
      });
    },
  });

  return mutation;
};
