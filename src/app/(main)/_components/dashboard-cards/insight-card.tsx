'use client';

import type * as React from 'react';

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useGetSummariesIncomeExpenseQuery } from '@/hooks/queries/summaries';
import { cn, formatCurrency } from '@/lib/utilities';

interface InsightCardProps extends React.ComponentProps<'div'> {
  type: 'income' | 'expense' | 'remaining';
}

export function InsightCard({ type, className, ...props }: InsightCardProps) {
  const summariesQuery = useGetSummariesIncomeExpenseQuery();
  const summariesData = summariesQuery.data || {
    income: 0,
    expense: 0,
    remaining: 0,
  };

  const isLoading = summariesQuery.isLoading;

  if (isLoading) {
    return <Skeleton className={cn('h-23 w-full', className)} />;
  }

  if (summariesQuery.isError) {
    return (
      <div
        className={cn(
          'flex h-23 w-full items-center justify-center rounded-md bg-card/30 p-6',
          className
        )}
      >
        <p className="text-center text-muted-foreground">
          There is an error when we trying to get your data.
          <br />
          Try again later.
        </p>
      </div>
    );
  }

  return (
    <Card className={className} {...props}>
      <CardHeader>
        <CardDescription className="capitalize">{type}</CardDescription>
        <CardTitle>{formatCurrency(summariesData[type])}</CardTitle>
      </CardHeader>
    </Card>
  );
}
