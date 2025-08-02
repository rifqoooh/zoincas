'use client';

import type * as React from 'react';

import { CommandIcon } from 'lucide-react';
import Link from 'next/link';

import { BalancesNavigation } from '@/components/sidebar/main/balances-navigation';
import { MainNavigation } from '@/components/sidebar/main/main-navigation';
import { UserNavigation } from '@/components/sidebar/main/user-navigation';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { Routes } from '@/lib/safe-routes';

export function MainSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader className="px-0">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link href={Routes.dashboard()}>
                <CommandIcon className="!size-5" />
                <span className="font-medium text-base">zoincas</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <MainNavigation />
        <BalancesNavigation />
      </SidebarContent>
      <SidebarFooter className="px-0">
        <UserNavigation />
      </SidebarFooter>
    </Sidebar>
  );
}
