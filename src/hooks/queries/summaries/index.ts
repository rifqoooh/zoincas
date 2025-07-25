import type { ErrorResponseAPI } from '@/lib/api/types';

import { useQuery } from '@tanstack/react-query';
import { parseAsInteger, parseAsString, useQueryStates } from 'nuqs';

import { summaries } from '@/lib/api/rpc';
import {
  getSummariesCategoryResponse,
  getSummariesResponse,
} from '@/validators/api/summaries/response';
import { summariesKeys } from './keys';

export const useGetSummariesQuery = () => {
  const [search] = useQueryStates({
    startDate: parseAsInteger,
    endDate: parseAsInteger,
    balance: parseAsString,
  });

  const parsedSearch = {
    startDate: search.startDate ?? undefined,
    endDate: search.endDate ?? undefined,
    balance: search.balance ?? undefined,
  };

  const query = useQuery({
    queryKey: summariesKeys.summaries(parsedSearch),
    queryFn: async () => {
      const response = await summaries.$get({
        query: parsedSearch,
      });
      if (!response.ok) {
        const err = (await response.json()) as unknown as ErrorResponseAPI;
        throw new Error(err.error.message);
      }

      const data = await response.json();
      const parsedData = getSummariesResponse.safeParse(data);
      if (!parsedData.success) {
        throw new Error('There is an error when parsing response data.');
      }

      return parsedData.data;
    },
  });

  return query;
};

export const useGetSummariesCategoryQuery = () => {
  const [search] = useQueryStates({
    startDate: parseAsInteger,
    endDate: parseAsInteger,
    balance: parseAsString,
  });

  const parsedSearch = {
    startDate: search.startDate ?? undefined,
    endDate: search.endDate ?? undefined,
    balance: search.balance ?? undefined,
  };

  const query = useQuery({
    queryKey: summariesKeys.summariesCategory(parsedSearch),
    queryFn: async () => {
      const response = await summaries.category.$get({
        query: parsedSearch,
      });
      if (!response.ok) {
        const err = (await response.json()) as unknown as ErrorResponseAPI;
        throw new Error(err.error.message);
      }

      const data = await response.json();
      const parsedData = getSummariesCategoryResponse.safeParse(data);
      if (!parsedData.success) {
        throw new Error('There is an error when parsing response data.');
      }

      return parsedData.data;
    },
  });

  return query;
};
