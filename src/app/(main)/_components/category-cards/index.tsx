'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { useListCategoriesQuery } from '@/hooks/queries/categories';
import { CategoryCard } from './category-card';

export function CategoryCards() {
  const categoriesQuery = useListCategoriesQuery();
  const categoriesData = categoriesQuery.data || [];

  const isLoading = categoriesQuery.isLoading;

  if (isLoading) {
    return <Skeleton className="col-span-3 h-49 w-full" />;
  }

  if (categoriesData.length === 0 && !categoriesQuery.isError) {
    return (
      <div className="col-span-3 flex h-49 w-full items-center justify-center rounded-md bg-card/30 p-6">
        <p className="text-center text-muted-foreground">
          No categories found.
          <br />
          Let's create one!
        </p>
      </div>
    );
  }

  if (categoriesQuery.isError) {
    return (
      <div className="col-span-3 not-first-of-type:flex h-49 w-full items-center justify-center rounded-md bg-card/30 p-6">
        <p className="text-center text-muted-foreground">
          There is an error when we trying to get your data.
          <br />
          Try again later.
        </p>
      </div>
    );
  }

  return categoriesData.map((category) => (
    <CategoryCard key={category.id} category={category} />
  ));
}
