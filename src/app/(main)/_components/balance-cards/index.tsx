'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { useListBalancesQuery } from '@/hooks/queries/balances';
import { BalanceCard } from './balance-card';

export function BalanceCards() {
  const balancesQuery = useListBalancesQuery();
  const balancesData = balancesQuery.data || [];

  const isLoading = balancesQuery.isLoading;

  if (isLoading) {
    return <Skeleton className="col-span-3 h-49 w-full" />;
  }

  if (balancesData.length === 0 && !balancesQuery.isError) {
    return (
      <div className="col-span-3 flex h-49 w-full items-center justify-center rounded-md bg-card/30 p-6">
        <p className="text-center text-muted-foreground">
          No balances found.
          <br />
          Let's create one!
        </p>
      </div>
    );
  }

  if (balancesQuery.isError) {
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

  return balancesData.map((balance) => (
    <BalanceCard key={balance.id} balance={balance} />
  ));
}
