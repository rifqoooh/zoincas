'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { useListBudgetPlansQuery } from '@/hooks/queries/budget-plans';
import { BudgetPlanCard } from './budget-plan-card';

export function BudgetPlanCards() {
  const budgetPlansQuery = useListBudgetPlansQuery();
  const budgetPlansData = budgetPlansQuery.data || [];

  const isLoading = budgetPlansQuery.isLoading;

  if (isLoading) {
    return <Skeleton className="h-49 w-full" />;
  }

  if (budgetPlansData.length === 0 && !budgetPlansQuery.isError) {
    return (
      <div className="flex h-49 w-full items-center justify-center rounded-md bg-card/30 p-6">
        <p className="text-center text-muted-foreground">
          No budget plans found.
          <br />
          Let's create one!
        </p>
      </div>
    );
  }

  if (budgetPlansQuery.isError) {
    return (
      <div className="flex h-49 w-full items-center justify-center rounded-md bg-card/30 p-6">
        <p className="text-center text-muted-foreground">
          There is an error when we trying to get your data.
          <br />
          Try again later.
        </p>
      </div>
    );
  }

  return (
    <>
      {budgetPlansData.map((budget) => (
        <BudgetPlanCard key={budget.id} budget={budget} />
      ))}
    </>
  );
}
