import type { ErrorResponseAPI } from '@/lib/api/types';

import { api } from '@/lib/api/rpc';
import { listCategoriesSummaryResponse } from '@/validators/api/categories/response';
import { useQuery } from '@tanstack/react-query';
import { categoriesKeys } from './keys';

export const useListCategoriesQuery = () => {
  const query = useQuery({
    queryKey: categoriesKeys.all(),
    queryFn: async () => {
      const response = await api.categories.$get();
      if (!response.ok) {
        const err = (await response.json()) as unknown as ErrorResponseAPI;
        throw new Error(err.error.message);
      }

      const data = await response.json();
      const parsedData = listCategoriesSummaryResponse.safeParse(data);
      if (!parsedData.success) {
        throw new Error('There is an error when parsing response data.');
      }

      return parsedData.data;
    },
  });

  return query;
};
