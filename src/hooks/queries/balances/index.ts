import type { ErrorResponseAPI } from '@/lib/api/types';
import type {
  InsertBalancesType,
  UpdateBalancesType,
} from '@/validators/db/balances';

import { balances } from '@/lib/api/rpc';
import {
  getBalanceResponse,
  listBalancesSummaryResponse,
} from '@/validators/api/balances/response';
import { selectBalancesSchema } from '@/validators/db/balances';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { balancesKeys } from './keys';

export const useListBalancesQuery = () => {
  const query = useQuery({
    queryKey: balancesKeys.all(),
    queryFn: async () => {
      const response = await balances.$get();
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

export const useGetBalanceQuery = (balanceId?: string) => {
  const query = useQuery({
    enabled: !!balanceId,
    queryKey: balancesKeys.balanceId({ balanceId }),
    queryFn: async () => {
      if (!balanceId) {
        throw new Error('The balance ID is required.');
      }

      const response = await balances[':balanceId'].$get({
        param: { balanceId },
      });
      if (!response.ok) {
        const err = (await response.json()) as unknown as ErrorResponseAPI;
        throw new Error(err.error.message);
      }

      const data = await response.json();
      const parsedData = getBalanceResponse.safeParse(data);
      if (!parsedData.success) {
        throw new Error('There is an error when parsing response data.');
      }

      return parsedData.data;
    },
  });

  return query;
};

export const useCreateBalanceMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (input: InsertBalancesType) => {
      const response = await balances.$post({
        json: input,
      });
      if (!response.ok) {
        const err = (await response.json()) as unknown as ErrorResponseAPI;
        throw new Error(err.error.message);
      }

      const data = await response.json();
      const parsedData = selectBalancesSchema.safeParse(data);
      if (!parsedData.success) {
        throw new Error('There is an error when parsing response data.');
      }

      return parsedData.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: balancesKeys.all(),
      });
    },
  });

  return mutation;
};

export const useUpdateBalanceMutation = (balanceId?: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (input: UpdateBalancesType) => {
      if (!balanceId) {
        throw new Error('The balance ID is required.');
      }

      const response = await balances[':balanceId'].$patch({
        param: { balanceId },
        json: input,
      });
      if (!response.ok) {
        const err = (await response.json()) as unknown as ErrorResponseAPI;
        throw new Error(err.error.message);
      }

      const data = await response.json();
      const parsedData = selectBalancesSchema.safeParse(data);
      if (!parsedData.success) {
        throw new Error('There is an error when parsing response data.');
      }

      return parsedData.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: balancesKeys.all(),
      });
      queryClient.removeQueries({
        queryKey: balancesKeys.balanceId({ balanceId }),
      });
    },
  });

  return mutation;
};

export const useDeleteBalanceMutation = (balanceId?: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => {
      if (!balanceId) {
        throw new Error('The balance ID is required.');
      }

      const response = await balances[':balanceId'].$delete({
        param: { balanceId },
      });
      if (!response.ok) {
        const err = (await response.json()) as unknown as ErrorResponseAPI;
        throw new Error(err.error.message);
      }

      const data = await response.json();
      const parsedData = selectBalancesSchema.safeParse(data);
      if (!parsedData.success) {
        throw new Error('There is an error when parsing response data.');
      }

      return parsedData.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: balancesKeys.all(),
      });
    },
  });

  return mutation;
};
