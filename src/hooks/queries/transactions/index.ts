import type { ErrorResponseAPI } from '@/lib/api/types';
import type {
  InsertTransactionsType,
  SelectTransactionsType,
  UpdateTransactionsType,
} from '@/validators/db/transactions';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  parseAsArrayOf,
  parseAsInteger,
  parseAsString,
  useQueryStates,
} from 'nuqs';
import { z } from 'zod';

import { transactions } from '@/lib/api/rpc';
import { getSortingStateParser } from '@/lib/parsers';
import {
  listTransactionsResponse,
  transactionsDataSchema,
} from '@/validators/api/transactions/response';
import { selectTransactionsSchema } from '@/validators/db/transactions';
import { transactionsKeys } from './keys';

export const useListTransactionsQuery = () => {
  const [search] = useQueryStates({
    page: parseAsInteger.withDefault(1),
    perPage: parseAsInteger.withDefault(10),
    sort: getSortingStateParser<SelectTransactionsType>().withDefault([
      { id: 'datetime', desc: true },
    ]),
    description: parseAsString.withDefault(''),
    balance: parseAsArrayOf(z.string().uuid()).withDefault([]),
    category: parseAsArrayOf(z.string().uuid()).withDefault([]),
    budget: parseAsArrayOf(z.string().uuid()).withDefault([]),
    datetime: parseAsArrayOf(z.coerce.number()).withDefault([]),
  });

  const parsedQuery = {
    ...search,
    sort: JSON.stringify(search.sort),
  };

  const query = useQuery({
    queryKey: transactionsKeys.transactions(search),
    queryFn: async () => {
      const response = await transactions.$get({
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

export const useCommandTransactionsQuery = (search?: string) => {
  const query = useQuery({
    enabled: !!search,
    queryKey: transactionsKeys.commandSearch(search),
    queryFn: async () => {
      const response = await transactions.$get({
        query: { description: search },
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

export const useGetTransactionQuery = (transactionId?: string) => {
  const query = useQuery({
    enabled: !!transactionId,
    queryKey: transactionsKeys.transaction({ transactionId }),
    queryFn: async () => {
      if (!transactionId) {
        throw new Error('The transaction ID is required.');
      }

      const response = await transactions[':transactionId'].$get({
        param: { transactionId },
      });
      if (!response.ok) {
        const err = (await response.json()) as unknown as ErrorResponseAPI;
        throw new Error(err.error.message);
      }

      const data = await response.json();
      const parsedData = transactionsDataSchema.safeParse(data);
      if (!parsedData.success) {
        throw new Error('There is an error when parsing response data.');
      }

      return parsedData.data;
    },
  });

  return query;
};

export const useCreateTransactionMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (input: InsertTransactionsType) => {
      const response = await transactions.$post({
        json: input,
      });
      if (!response.ok) {
        const err = (await response.json()) as unknown as ErrorResponseAPI;
        throw new Error(err.error.message);
      }

      const data = await response.json();
      // TODO : investigate if selectTransactionsSchema can be replaced to transactionsDataSchema
      const parsedData = selectTransactionsSchema.safeParse(data);
      if (!parsedData.success) {
        throw new Error('There is an error when parsing response data.');
      }

      return parsedData.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: transactionsKeys.all(),
      });
    },
  });

  return mutation;
};

export const useCreateManyTransactionMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (input: InsertTransactionsType[]) => {
      const response = await transactions['create-many'].$post({
        json: input,
      });
      if (!response.ok) {
        const err = (await response.json()) as unknown as ErrorResponseAPI;
        throw new Error(err.error.message);
      }

      const data = await response.json();
      // TODO : investigate if selectTransactionsSchema can be replaced to transactionsDataSchema
      const parsedData = selectTransactionsSchema.array().safeParse(data);
      if (!parsedData.success) {
        throw new Error('There is an error when parsing response data.');
      }

      return parsedData.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: transactionsKeys.all(),
      });
    },
  });

  return mutation;
};

export const useUpdateTransactionMutation = (transactionId?: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (input: UpdateTransactionsType) => {
      if (!transactionId) {
        throw new Error('The transaction ID is required.');
      }

      const response = await transactions[':transactionId'].$patch({
        param: { transactionId },
        json: input,
      });
      if (!response.ok) {
        const err = (await response.json()) as unknown as ErrorResponseAPI;
        throw new Error(err.error.message);
      }

      const data = await response.json();
      // TODO : investigate if selectTransactionsSchema can be replaced to transactionsDataSchema
      const parsedData = selectTransactionsSchema.safeParse(data);
      if (!parsedData.success) {
        throw new Error('There is an error when parsing response data.');
      }

      return parsedData.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: transactionsKeys.all(),
      });
    },
  });

  return mutation;
};

export const useDeleteTransactionMutation = (transactionId?: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => {
      if (!transactionId) {
        throw new Error('The transaction ID is required.');
      }

      const response = await transactions[':transactionId'].$delete({
        param: { transactionId },
      });
      if (!response.ok) {
        const err = (await response.json()) as unknown as ErrorResponseAPI;
        throw new Error(err.error.message);
      }

      const data = await response.json();
      // TODO : investigate if selectTransactionsSchema can be replaced to transactionsDataSchema
      const parsedData = selectTransactionsSchema.safeParse(data);
      if (!parsedData.success) {
        throw new Error('There is an error when parsing response data.');
      }

      return parsedData.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: transactionsKeys.all(),
      });
    },
  });

  return mutation;
};

export const useDeleteManyTransactionMutation = (transactionIds?: string[]) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => {
      if (!transactionIds) {
        throw new Error('The transaction IDs are required.');
      }

      const response = await transactions['delete-many'].$post({
        json: { transactionIds },
      });
      if (!response.ok) {
        const err = (await response.json()) as unknown as ErrorResponseAPI;
        throw new Error(err.error.message);
      }

      const data = await response.json();
      // TODO : investigate if selectTransactionsSchema can be replaced to transactionsDataSchema
      const parsedData = selectTransactionsSchema.array().safeParse(data);
      if (!parsedData.success) {
        throw new Error('There is an error when parsing response data.');
      }

      return parsedData.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: transactionsKeys.all(),
      });
    },
  });

  return mutation;
};

export const useAssignManyCategoryTransactionMutation = (
  transactionIds?: string[]
) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (categoryId: string) => {
      if (!transactionIds) {
        throw new Error('The transaction IDs are required.');
      }

      const response = await transactions['assign-many-category'].$post({
        json: { transactionIds, categoryId },
      });
      if (!response.ok) {
        const err = (await response.json()) as unknown as ErrorResponseAPI;
        throw new Error(err.error.message);
      }

      const data = await response.json();
      // TODO : investigate if selectTransactionsSchema can be replaced to transactionsDataSchema
      const parsedData = selectTransactionsSchema.array().safeParse(data);
      if (!parsedData.success) {
        throw new Error('There is an error when parsing response data.');
      }

      return parsedData.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: transactionsKeys.all(),
      });
    },
  });

  return mutation;
};

export const useAssignManyBudgetTransactionMutation = (
  transactionIds?: string[]
) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (budgetId: string) => {
      if (!transactionIds) {
        throw new Error('The transaction IDs are required.');
      }

      const response = await transactions['assign-many-budget'].$post({
        json: { transactionIds, budgetId },
      });
      if (!response.ok) {
        const err = (await response.json()) as unknown as ErrorResponseAPI;
        throw new Error(err.error.message);
      }

      const data = await response.json();
      // TODO : investigate if selectTransactionsSchema can be replaced to transactionsDataSchema
      const parsedData = selectTransactionsSchema.array().safeParse(data);
      if (!parsedData.success) {
        throw new Error('There is an error when parsing response data.');
      }

      return parsedData.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: transactionsKeys.all(),
      });
    },
  });

  return mutation;
};
