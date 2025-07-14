'use client';

import type { InsertBalancesType } from '@/validators/db/balances';
import type { SubmitHandler } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import {
  useCreateBalanceMutation,
  useGetBalanceQuery,
  useUpdateBalanceMutation,
} from '@/hooks/queries/balances';
import { useCreateEditBalanceModal } from '@/hooks/store/create-edit-balance';
import { insertBalancesSchema } from '@/validators/db/balances';

export const useCreateEditBalance = () => {
  const store = useCreateEditBalanceModal();
  const isCreating = store.id === undefined;

  const createMutation = useCreateBalanceMutation();
  const updateMutation = useUpdateBalanceMutation(store.id);

  const balancesQuery = useGetBalanceQuery(store.id);

  // fallback to default values balances data is undefined
  const defaultValues: InsertBalancesType = balancesQuery.data
    ? {
        name: balancesQuery.data.name,
        initialAmount: balancesQuery.data.initialAmount,
      }
    : {
        name: '',
        initialAmount: 0,
      };

  const form = useForm<InsertBalancesType>({
    resolver: zodResolver(insertBalancesSchema),
    defaultValues,
  });

  const onCreateSubmit = (values: InsertBalancesType) => {
    return toast.promise(
      createMutation.mutateAsync(values, {
        onSuccess: () => {
          store.onClose();
        },
      }),
      {
        loading: 'Creating balance...',
        success: 'Balance created successfully',
        error: (error: unknown) => {
          if (error instanceof Error) {
            return error.message;
          }

          return 'There is an error in the internal server.';
        },
      }
    );
  };

  const onUpdateSubmit = (values: InsertBalancesType) => {
    return toast.promise(
      updateMutation.mutateAsync(values, {
        onSuccess: () => {
          store.onClose();
        },
      }),
      {
        loading: 'Updating balance...',
        success: 'Balance updated successfully',
        error: (error: unknown) => {
          if (error instanceof Error) {
            return error.message;
          }

          return 'There is an error in the internal server.';
        },
      }
    );
  };

  const onSubmit: SubmitHandler<InsertBalancesType> = (values) => {
    if (isCreating) {
      onCreateSubmit(values);
    } else {
      onUpdateSubmit(values);
    }
  };

  return {
    form,
    onSubmit,
    isCreating,
    createMutation,
    updateMutation,
  };
};
