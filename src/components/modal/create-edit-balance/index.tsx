'use client';

import { CreateEditBalanceForm } from '@/components/forms/create-edit-balance';
import { ResponsiveSheet } from '@/components/responsive-sheet';
import { Skeleton } from '@/components/ui/skeleton';
import { useGetBalanceQuery } from '@/hooks/queries/balances';
import { useCreateEditBalanceModal } from '@/hooks/store/create-edit-balance';
import { useIsClient } from '@/hooks/use-is-client';

export function CreateEditBalanceModal() {
  const store = useCreateEditBalanceModal();
  const isCreating = store.id === undefined;

  const balanceQuery = useGetBalanceQuery(store.id);

  const isClient = useIsClient();
  if (!isClient) {
    return null;
  }

  const isLoading = balanceQuery.isLoading;

  const text = isCreating
    ? {
        title: 'Create a new balance',
        description: 'Fill the form to create a new balance',
      }
    : {
        title: 'Edit Balance',
        description: 'Wanna make some changes to your balance?',
      };

  return (
    <ResponsiveSheet {...text} isOpen={store.isOpen} onClose={store.onClose}>
      {isLoading ? <SkeletonForm /> : <CreateEditBalanceForm />}
    </ResponsiveSheet>
  );
}

function SkeletonForm() {
  return (
    <div className="grid gap-10">
      <div className="flex flex-col gap-2">
        <Skeleton className="h-3.5 w-28 " />
        <Skeleton className="h-9 w-full " />
      </div>
      <div className="flex flex-col gap-2">
        <Skeleton className="h-3.5 w-28 " />
        <Skeleton className="h-9 w-full " />
      </div>
    </div>
  );
}
