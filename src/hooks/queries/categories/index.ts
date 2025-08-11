import type { ErrorResponseAPI } from '@/lib/api/types';
import type {
  InsertCategoriesType,
  UpdateCategoriesType,
} from '@/validators/db/categories';

import { categories } from '@/lib/api/rpc';
import {
  getCategoryResponse,
  listCategoriesSummaryResponse,
} from '@/validators/api/categories/response';
import { selectCategoriesSchema } from '@/validators/db/categories';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { transactionsKeys } from '../transactions/keys';
import { categoriesKeys } from './keys';

export const useListCategoriesQuery = () => {
  const query = useQuery({
    queryKey: categoriesKeys.all(),
    queryFn: async () => {
      const response = await categories.$get();
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

export const useGetCategoryQuery = (categoryId?: string) => {
  const query = useQuery({
    enabled: !!categoryId,
    queryKey: categoriesKeys.categoryId({ categoryId }),
    queryFn: async () => {
      if (!categoryId) {
        throw new Error('The category ID is required.');
      }

      const response = await categories[':categoryId'].$get({
        param: { categoryId },
      });
      if (!response.ok) {
        const err = (await response.json()) as unknown as ErrorResponseAPI;
        throw new Error(err.error.message);
      }

      const data = await response.json();
      const parsedData = getCategoryResponse.safeParse(data);
      if (!parsedData.success) {
        throw new Error('There is an error when parsing response data.');
      }

      return parsedData.data;
    },
  });

  return query;
};

export const useCreateCategoryMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (input: InsertCategoriesType) => {
      const response = await categories.$post({
        json: input,
      });
      if (!response.ok) {
        const err = (await response.json()) as unknown as ErrorResponseAPI;
        throw new Error(err.error.message);
      }

      const data = await response.json();
      const parsedData = selectCategoriesSchema.safeParse(data);
      if (!parsedData.success) {
        throw new Error('There is an error when parsing response data.');
      }

      return parsedData.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: categoriesKeys.all(),
      });
    },
  });

  return mutation;
};

export const useUpdateCategoryMutation = (categoryId?: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (input: UpdateCategoriesType) => {
      if (!categoryId) {
        throw new Error('The category ID is required.');
      }

      const response = await categories[':categoryId'].$patch({
        param: { categoryId },
        json: input,
      });
      if (!response.ok) {
        const err = (await response.json()) as unknown as ErrorResponseAPI;
        throw new Error(err.error.message);
      }

      const data = await response.json();
      const parsedData = selectCategoriesSchema.safeParse(data);
      if (!parsedData.success) {
        throw new Error('There is an error when parsing response data.');
      }

      return parsedData.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: categoriesKeys.all(),
      });
      queryClient.removeQueries({
        queryKey: categoriesKeys.categoryId({ categoryId }),
      });
    },
  });

  return mutation;
};

export const useDeleteCategoryMutation = (categoryId?: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => {
      if (!categoryId) {
        throw new Error('The category ID is required.');
      }

      const response = await categories[':categoryId'].$delete({
        param: { categoryId },
      });
      if (!response.ok) {
        const err = (await response.json()) as unknown as ErrorResponseAPI;
        throw new Error(err.error.message);
      }

      const data = await response.json();
      const parsedData = selectCategoriesSchema.safeParse(data);
      if (!parsedData.success) {
        throw new Error('There is an error when parsing response data.');
      }

      return parsedData.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: categoriesKeys.all(),
      });
      queryClient.invalidateQueries({
        queryKey: transactionsKeys.all(),
      });
    },
  });

  return mutation;
};
