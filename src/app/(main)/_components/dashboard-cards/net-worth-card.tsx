'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useGetSummariesQuery } from '@/hooks/queries/summaries';
import { formatCurrency } from '@/lib/utilities';
import { BarChart } from './bar-chart';

export function NetWorthCard() {
  const summariesQuery = useGetSummariesQuery();
  const summariesData = summariesQuery.data || [];

  const isLoading = summariesQuery.isLoading;

  if (isLoading) {
    return <Skeleton className="h-49 w-full" />;
  }

  if (summariesQuery.isError) {
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
    <Card>
      <CardHeader>
        <CardDescription>Net worth</CardDescription>
        <CardTitle>{formatCurrency(100000)}</CardTitle>
      </CardHeader>
      <CardContent>
        <BarChart summaries={summariesData} />
      </CardContent>
    </Card>
  );
}
