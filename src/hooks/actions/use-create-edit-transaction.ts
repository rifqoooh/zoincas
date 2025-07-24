'use client';

import * as React from 'react';

import type { InsertTransactionsType } from '@/validators/db/transactions';
import type { SubmitHandler } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import type { FileUploadProps } from '@/components/file-upload';
import { useScanImageMutation } from '@/hooks/queries/ai';
import { useListBalancesQuery } from '@/hooks/queries/balances';
import { useListBudgetPlansQuery } from '@/hooks/queries/budget-plans';
import { useListCategoriesQuery } from '@/hooks/queries/categories';
import {
  useCreateTransactionMutation,
  useGetTransactionQuery,
  useUpdateTransactionMutation,
} from '@/hooks/queries/transactions';
import { useCreateEditTransactionModal } from '@/hooks/store/create-edit-transaction';
import { insertTransactionsSchema } from '@/validators/db/transactions';

export const useCreateEditTransaction = () => {
  const [files, setFiles] = React.useState<File[]>([]);

  const store = useCreateEditTransactionModal();
  const isCreating = store.id === undefined;

  const scanImageMutation = useScanImageMutation();
  const createMutation = useCreateTransactionMutation();
  const updateMutation = useUpdateTransactionMutation(store.id);

  const transactionQuery = useGetTransactionQuery(store.id);

  const balancesQuery = useListBalancesQuery();
  const categoriesQuery = useListCategoriesQuery();
  const budgetCategoriesQuery = useListBudgetPlansQuery();

  const onFileReject = React.useCallback((_file: File, message: string) => {
    toast.error(message);
  }, []);

  const onFileUpload: NonNullable<FileUploadProps['onUpload']> =
    React.useCallback(
      async (files, { onProgress, onSuccess, onError }) => {
        try {
          // Process each file individually
          const uploadPromises = files.map(async (file) => {
            try {
              onProgress(file, 50);

              await scanImageMutation.mutateAsync(
                { image: file },
                {
                  onSuccess: (response) => {
                    onProgress(file, 100);

                    form.reset({
                      ...form.getValues(),
                      datetime: response.datetime,
                      description: response.description,
                      amount: response.amount,
                    });
                  },
                }
              );

              onSuccess(file);
            } catch (error) {
              onError(
                file,
                error instanceof Error ? error : new Error('Upload failed')
              );
            }
          });

          // wait for all uploads to complete
          await Promise.all(uploadPromises);
        } catch (_error) {
          // this handles any error that might occur outside the individual upload processes
          toast.error('There is an error in the internal server.');
        }
      },
      [scanImageMutation]
    );

  // fallback to default values transactions data is undefined
  const defaultValues: InsertTransactionsType = transactionQuery.data
    ? {
        ...transactionQuery.data,
        balanceId: transactionQuery.data.balance.id,
        categoryId: transactionQuery.data.category.id,
        budgetCategoryId: transactionQuery.data.budget.category.id,
      }
    : {
        datetime: new Date(),
        description: '',
        amount: 0,
        balanceId: '',
        categoryId: null,
        budgetCategoryId: null,
      };

  const form = useForm<InsertTransactionsType>({
    resolver: zodResolver(insertTransactionsSchema),
    defaultValues,
  });

  const onCreateSubmit = (values: InsertTransactionsType) => {
    return toast.promise(
      createMutation.mutateAsync(values, {
        onSuccess: () => {
          store.onClose();
        },
      }),
      {
        loading: 'Creating transaction...',
        success: 'Transaction created successfully',
        error: (error: unknown) => {
          if (error instanceof Error) {
            return error.message;
          }

          return 'There is an error in the internal server.';
        },
      }
    );
  };

  const onUpdateSubmit = (values: InsertTransactionsType) => {
    return toast.promise(
      updateMutation.mutateAsync(values, {
        onSuccess: () => {
          store.onClose();
        },
      }),
      {
        loading: 'Updating transaction...',
        success: 'Transaction updated successfully',
        error: (error: unknown) => {
          if (error instanceof Error) {
            return error.message;
          }

          return 'There is an error in the internal server.';
        },
      }
    );
  };

  const onSubmit: SubmitHandler<InsertTransactionsType> = (values) => {
    const parsedData = insertTransactionsSchema.parse(values);

    if (isCreating) {
      onCreateSubmit(parsedData);
    } else {
      onUpdateSubmit(parsedData);
    }
  };

  return {
    files,
    setFiles,
    onFileUpload,
    onFileReject,
    form,
    onSubmit,
    isCreating,
    scanImageMutation,
    createMutation,
    updateMutation,
    balancesQuery,
    categoriesQuery,
    budgetCategoriesQuery,
  };
};
