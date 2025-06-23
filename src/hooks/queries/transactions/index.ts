import type { ErrorResponseAPI } from '@/lib/api/types';
import type { SelectTransactionsType } from '@/validators/db/transactions';

import { useQuery } from '@tanstack/react-query';
import {
  parseAsArrayOf,
  parseAsInteger,
  parseAsString,
  useQueryStates,
} from 'nuqs';
import { z } from 'zod';

import { api } from '@/lib/api/rpc';
import { getSortingStateParser } from '@/lib/parsers';
import { listTransactionsResponse } from '@/validators/api/transactions/response';
import { transactionsKeys } from './keys';

export const useGetTransactionsQuery = () => {
  const [search] = useQueryStates({
    page: parseAsInteger.withDefault(1),
    perPage: parseAsInteger.withDefault(10),
    sort: getSortingStateParser<SelectTransactionsType>().withDefault([
      { id: 'createdAt', desc: true },
    ]),
    description: parseAsString.withDefault(''),
    balance: parseAsArrayOf(z.string().uuid()).withDefault([]),
    category: parseAsArrayOf(z.string().uuid()).withDefault([]),
    createdAt: parseAsArrayOf(z.coerce.number()).withDefault([]),
  });

  const parsedQuery = {
    ...search,
    sort: JSON.stringify(search.sort),
  };

  const query = useQuery({
    queryKey: transactionsKeys.transactions(search),
    queryFn: async () => {
      const response = await api.transactions.$get({
        query: parsedQuery,
      });
      if (!response.ok) {
        const err = (await response.json()) as unknown as ErrorResponseAPI;
        throw new Error(err.error.message);
      }

      const data = await response.json();
      const parsedData = listTransactionsResponse.safeParse(data);
      if (!parsedData.success) {
        throw new Error('There is an error when parsing response data.');
      }

      return parsedData.data;
    },
  });

  return query;
};
