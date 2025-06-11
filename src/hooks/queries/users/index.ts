import type { ErrorResponseAPI } from '@/lib/api/types';
import type { SelectUsersType } from '@/validators/db/users';

import { useQuery } from '@tanstack/react-query';
import {
  parseAsArrayOf,
  parseAsInteger,
  parseAsString,
  useQueryStates,
} from 'nuqs';
import { z } from 'zod';

import { client } from '@/lib/api/rpc';
import { getSortingStateParser } from '@/lib/parsers';
import { getUsersResponse } from '@/validators/api/openapi/users/response';
import { usersKeys } from './keys';

export const useGetUsersQuery = () => {
  const [search] = useQueryStates({
    page: parseAsInteger.withDefault(1),
    perPage: parseAsInteger.withDefault(10),
    sort: getSortingStateParser<SelectUsersType>().withDefault([
      { id: 'createdAt', desc: true },
    ]),
    email: parseAsString.withDefault(''),
    emailVerified: parseAsArrayOf(
      z.enum(['verified', 'unverified'])
    ).withDefault([]),
    role: parseAsArrayOf(z.enum(['user', 'admin'])).withDefault([]),
    banned: parseAsArrayOf(z.enum(['banned', 'active'])).withDefault([]),
    createdAt: parseAsArrayOf(z.coerce.number()).withDefault([]),
  });

  const parsedQuery = {
    ...search,
    sort: JSON.stringify(search.sort),
    createdAt: search.createdAt.toString(),
  };

  const query = useQuery({
    queryKey: usersKeys.users(search),
    queryFn: async () => {
      const response = await client.api.users.$get({
        query: parsedQuery,
      });
      if (!response.ok) {
        const err = (await response.json()) as unknown as ErrorResponseAPI;
        throw new Error(err.error.message);
      }

      const data = await response.json();
      const parsedData = getUsersResponse.safeParse(data);
      if (!parsedData.success) {
        throw new Error('OUTPUT_VALIDATION_ERROR');
      }

      return parsedData.data;
    },
  });

  return query;
};
