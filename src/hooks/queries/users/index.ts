import type { UsersType } from '@/validators/db/schema';

import { useQuery } from '@tanstack/react-query';
import {
  parseAsArrayOf,
  parseAsInteger,
  parseAsString,
  useQueryStates,
} from 'nuqs';
import qs from 'qs';
import { z } from 'zod/v4';

import { client } from '@/lib/hono-rpc';
import { getSortingStateParser } from '@/lib/parsers';
import { getUsersOutputSchema } from '@/validators/api/users/response';
import { usersKeys } from './keys';

export const useGetUsersQuery = () => {
  const [search] = useQueryStates({
    page: parseAsInteger.withDefault(1),
    perPage: parseAsInteger.withDefault(10),
    sort: getSortingStateParser<UsersType>().withDefault([
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

  const queryString = qs.stringify(search, { allowDots: true });

  const query = useQuery({
    queryKey: usersKeys.users(search),
    queryFn: async () => {
      const response = await client.api.users.$get({
        query: qs.parse(queryString),
      });
      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error);
      }

      const data = await response.json();
      const parsedData = getUsersOutputSchema.safeParse(data);
      if (!parsedData.success) {
        throw new Error('OUTPUT_VALIDATION_ERROR');
      }

      return parsedData.data;
    },
  });

  return query;
};
