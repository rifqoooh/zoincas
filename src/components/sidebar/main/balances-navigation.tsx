'use client';

import * as React from 'react';

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { Skeleton } from '@/components/ui/skeleton';
import { useListBalancesQuery } from '@/hooks/queries/balances';

export function BalancesNavigation() {
  const balancesQuery = useListBalancesQuery();
  const data = balancesQuery.data || [];

  const balances = React.useMemo(() => {
    return data.map((balance) => ({
      name: balance.name,
      url: `/balances/${balance.id}`,
    }));
  }, [data]);

  const isPending = balancesQuery.isPending;

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Balances</SidebarGroupLabel>
      <SidebarMenu>
        {isPending ? (
          <div className="flex flex-col gap-1">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
          </div>
        ) : (
          balances.map((item) => (
            <SidebarMenuItem key={item.name}>
              <SidebarMenuButton asChild>
                <a href={item.url}>
                  <span>{item.name}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))
        )}
      </SidebarMenu>
    </SidebarGroup>
  );
}
