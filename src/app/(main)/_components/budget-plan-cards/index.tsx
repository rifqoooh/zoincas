'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { useListBudgetPlansQuery } from '@/hooks/queries/budget-plans';
import { BudgetPlanCard } from './budget-plan-card';

export function BudgetPlanCards() {
  const budgetPlansQuery = useListBudgetPlansQuery();
  const budgetPlansData = budgetPlansQuery.data || [];

  const isLoading = budgetPlansQuery.isLoading;

  if (isLoading) {
    return <Skeleton className="h-32 w-full" />;
  }

  return (
    <>
      {budgetPlansData.map((data) => (
        <BudgetPlanCard key={data.id} data={data} />
      ))}
    </>
  );
}
