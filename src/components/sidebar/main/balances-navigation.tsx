'use client';

import * as React from 'react';

import Link from 'next/link';

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { Skeleton } from '@/components/ui/skeleton';
import { useListBalancesQuery } from '@/hooks/queries/balances';
import { formatCurrency } from '@/lib/utilities';

export function BalancesNavigation() {
  const balancesQuery = useListBalancesQuery();
  const data = balancesQuery.data || [];

  const balances = React.useMemo(() => {
    return data.map((balance) => ({
      id: balance.id,
      name: balance.name,
      count: balance.transactions.count,
      description: formatCurrency(balance.transactions.sum),
      url: `/transactions?balance=${balance.id}`,
    }));
  }, [data]);

  const isPending = balancesQuery.isPending;

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Balances</SidebarGroupLabel>
      <SidebarMenu>
        {isPending ? (
          <div className="flex flex-col gap-1">
            <Skeleton className="h-13 w-full" />
            <Skeleton className="h-13 w-full" />
            <Skeleton className="h-13 w-full" />
          </div>
        ) : (
          balances.map((item) => (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton className="h-auto px-4" asChild>
                <Link href={item.url}>
                  <div className="flex w-full flex-row items-center justify-between">
                    <div className="flex flex-col">
                      <span>{item.name}</span>
                      <span className="text-muted-foreground text-xs">
                        {item.description}
                      </span>
                    </div>
                    <span className="font-mono text-xs">{item.count}</span>
                  </div>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))
        )}
      </SidebarMenu>
    </SidebarGroup>
  );
}
