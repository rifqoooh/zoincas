import type { ErrorResponseAPI } from '@/lib/api/types';

import { api } from '@/lib/api/rpc';
import { listBalancesSummaryResponse } from '@/validators/api/balances/response';
import { useQuery } from '@tanstack/react-query';
import { balancesKeys } from './keys';

export const useListBalancesQuery = () => {
  const query = useQuery({
    queryKey: balancesKeys.all(),
    queryFn: async () => {
      const response = await api.balances.$get();
      if (!response.ok) {
        const err = (await response.json()) as unknown as ErrorResponseAPI;
        throw new Error(err.error.message);
      }

      const data = await response.json();
      const parsedData = listBalancesSummaryResponse.safeParse(data);
      if (!parsedData.success) {
        throw new Error('There is an error when parsing response data.');
      }

      return parsedData.data;
    },
  });

  return query;
};
