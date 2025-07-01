import type { ErrorResponseAPI } from '@/lib/api/types';

import { budgetPlans } from '@/lib/api/rpc';
import { listBudgetPlansSummaryResponse } from '@/validators/api/budget-plans/response';
import { useQuery } from '@tanstack/react-query';
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
