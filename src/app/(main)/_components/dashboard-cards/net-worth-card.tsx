'use client';

import * as React from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useGetSummariesQuery } from '@/hooks/queries/summaries';
import { cn, formatCurrency } from '@/lib/utilities';
import { BarChart } from './bar-chart';

export function NetWorthCard({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const summariesQuery = useGetSummariesQuery();
  const summariesData = summariesQuery.data || [];

  const isLoading = summariesQuery.isLoading;

  const totalAmount = React.useMemo(() => {
    return summariesData.reduce(
      (acc, summary) => acc + summary.income + summary.expense,
      0
    );
  }, [summariesData]);

  if (isLoading) {
    return <Skeleton className={cn('h-49 w-full', className)} />;
  }

  if (summariesQuery.isError) {
    return (
      <div
        className={cn(
          'flex h-49 w-full items-center justify-center rounded-md bg-card/30 p-6',
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
        <CardDescription>Net worth</CardDescription>
        <CardTitle>{formatCurrency(totalAmount)}</CardTitle>
      </CardHeader>
      <CardContent>
        <BarChart summaries={summariesData} />
      </CardContent>
    </Card>
  );
}
