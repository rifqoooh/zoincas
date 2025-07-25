'use client';

import type * as React from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useGetSummariesCategoryQuery } from '@/hooks/queries/summaries';
import { cn } from '@/lib/utilities';
import { Barlist } from './bar-list';
import { PieChart } from './pie-chart';

const colors = ['#F23E94', '#22C6E1', '#2E90FA', '#7C3AED'];

export function TopCategoriesCard({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const categoryQuery = useGetSummariesCategoryQuery();
  const categoriesData = categoryQuery.data || [];

  const isLoading = categoryQuery.isLoading;

  if (isLoading) {
    return <Skeleton className={cn('h-49 w-full', className)} />;
  }

  if (categoryQuery.isError) {
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
        <CardDescription>Top expense categories</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <PieChart
          colors={colors}
          fallbackColor="#1E293B"
          categories={categoriesData}
        />
        <Barlist
          colors={colors}
          fallbackColor="#1E293B"
          categories={categoriesData}
        />
      </CardContent>
    </Card>
  );
}
