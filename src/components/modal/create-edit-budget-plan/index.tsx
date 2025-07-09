'use client';

import { CreateEditBudgetPlanForm } from '@/components/forms/create-edit-budget-plan';
import { ResponsiveSheet } from '@/components/responsive-sheet';
import { Skeleton } from '@/components/ui/skeleton';
import { useGetBudgetPlanQuery } from '@/hooks/queries/budget-plans';
import { useCreateEditBudgetModal } from '@/hooks/store/create-edit-budget';
import { useIsClient } from '@/hooks/use-is-client';

export function CreateEditBudgetModal() {
  const store = useCreateEditBudgetModal();
  const isCreating = store.id === undefined;

  const budgetPlanQuery = useGetBudgetPlanQuery(store.id);

  const isClient = useIsClient();
  if (!isClient) {
    return null;
  }

  const isLoading = budgetPlanQuery.isLoading;

  const text = isCreating
    ? {
        title: 'Create a new budget plan',
        description: 'Fill the form to create a new budget plan',
      }
    : {
        title: 'Edit Budget Plan',
        description: 'Wanna make some changes to your budget plan?',
      };

  return (
    <ResponsiveSheet {...text} isOpen={store.isOpen} onClose={store.onClose}>
      {isLoading ? <SkeletonForm /> : <CreateEditBudgetPlanForm />}
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
