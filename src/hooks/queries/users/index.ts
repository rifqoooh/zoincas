import type { ErrorResponseAPI } from '@/lib/api/types';
import type { CreateUserType } from '@/validators/actions/create-user';
import type {
  BanUserInput,
  ResetPasswordInput,
} from '@/validators/api/openapi/users/request';
import type { SelectUsersType } from '@/validators/db/users';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
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
import { selectUsersSchema } from '@/validators/db/users';
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
        throw new Error('There is an error when parsing response data.');
      }

      return parsedData.data;
    },
  });

  return query;
};

export const useCreateUserMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (input: CreateUserType) => {
      const response = await client.api.users.$post({
        json: input,
      });
      if (!response.ok) {
        const err = (await response.json()) as unknown as ErrorResponseAPI;
        throw new Error(err.error.message);
      }

      const data = await response.json();
      const parsedData = selectUsersSchema.safeParse(data);
      if (!parsedData.success) {
        throw new Error('There is an error when parsing response data.');
      }

      return parsedData.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: usersKeys.all(),
      });
    },
  });

  return mutation;
};

export const useDeleteUserMutation = (userId?: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => {
      if (!userId) {
        throw new Error('The user ID is required.');
      }

      const response = await client.api.users[':userId'].$delete({
        param: { userId },
      });
      if (!response.ok) {
        const err = (await response.json()) as unknown as ErrorResponseAPI;
        throw new Error(err.error.message);
      }

      const data = await response.json();
      const parsedData = selectUsersSchema.safeParse(data);
      if (!parsedData.success) {
        throw new Error('There is an error when parsing response data.');
      }

      return parsedData.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: usersKeys.all(),
      });
    },
  });

  return mutation;
};

export const useResetPasswordMutation = (userId?: string) => {
  const mutation = useMutation({
    mutationFn: async (input: ResetPasswordInput) => {
      if (!userId) {
        throw new Error('The user ID is required.');
      }

      const response = await client.api.users[':userId'][
        'reset-password'
      ].$patch({
        param: { userId },
        json: input,
      });
      if (!response.ok) {
        const err = (await response.json()) as unknown as ErrorResponseAPI;
        throw new Error(err.error.message);
      }

      const data = await response.json();
      const parsedData = selectUsersSchema.safeParse(data);
      if (!parsedData.success) {
        throw new Error('There is an error when parsing response data.');
      }

      return parsedData.data;
    },
  });

  return mutation;
};

export const useRevokeSessionsMutation = (userId?: string) => {
  const mutation = useMutation({
    mutationFn: async () => {
      if (!userId) {
        throw new Error('The user ID is required.');
      }

      const response = await client.api.users[':userId'][
        'revoke-sessions'
      ].$delete({
        param: { userId },
      });
      if (!response.ok) {
        const err = (await response.json()) as unknown as ErrorResponseAPI;
        throw new Error(err.error.message);
      }

      const data = await response.json();
      const parsedData = selectUsersSchema.safeParse(data);
      if (!parsedData.success) {
        throw new Error('There is an error when parsing response data.');
      }

      return parsedData.data;
    },
  });

  return mutation;
};

export const useBanUserMutation = (userId?: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (input: BanUserInput) => {
      if (!userId) {
        throw new Error('The user ID is required.');
      }

      const response = await client.api.users[':userId'].ban.$patch({
        param: { userId },
        json: input,
      });
      if (!response.ok) {
        const err = (await response.json()) as unknown as ErrorResponseAPI;
        throw new Error(err.error.message);
      }

      const data = await response.json();
      const parsedData = selectUsersSchema.safeParse(data);
      if (!parsedData.success) {
        throw new Error('There is an error when parsing response data.');
      }

      return parsedData.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: usersKeys.all(),
      });
    },
  });

  return mutation;
};

export const useUnbanUserMutation = (userId?: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => {
      if (!userId) {
        throw new Error('The user ID is required.');
      }

      const response = await client.api.users[':userId'].unban.$patch({
        param: { userId },
      });
      if (!response.ok) {
        const err = (await response.json()) as unknown as ErrorResponseAPI;
        throw new Error(err.error.message);
      }

      const data = await response.json();
      const parsedData = selectUsersSchema.safeParse(data);
      if (!parsedData.success) {
        throw new Error('There is an error when parsing response data.');
      }

      return parsedData.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: usersKeys.all(),
      });
    },
  });

  return mutation;
};
