'use client';

import type { InsertTransactionsType } from '@/validators/db/transactions';
import type { SubmitHandler } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { useCreateTransactionMutation } from '@/hooks/queries/transactions';
import { useCreateTransactionModal } from '@/hooks/store/create-transaction';
import { insertTransactionsSchema } from '@/validators/db/transactions';

export const useCreateTransaction = () => {
  const store = useCreateTransactionModal();
  const mutation = useCreateTransactionMutation();

  const form = useForm<InsertTransactionsType>({
    resolver: zodResolver(insertTransactionsSchema),
    defaultValues: {
      datetime: new Date(),
      description: '',
      amount: 0,
      balanceId: '',
      categoryId: null,
      budgetCategoryId: null,
    },
  });

  const onSubmit: SubmitHandler<InsertTransactionsType> = (values) => {
    const parsedData = insertTransactionsSchema.parse(values);

    toast.promise(
      mutation.mutateAsync(parsedData, {
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

  return {
    form,
    onSubmit,
    mutation,
  };
};
