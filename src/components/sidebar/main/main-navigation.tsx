'use client';

import * as React from 'react';

import { ChevronRightIcon } from 'lucide-react';
import Link from 'next/link';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import { useListCategoriesQuery } from '@/hooks/queries/categories';
import { Routes } from '@/lib/safe-routes';
import { menus } from './constants';

export function MainNavigation() {
  const categoriesQuery = useListCategoriesQuery();
  const data = categoriesQuery.data || [];

  const categories = React.useMemo(
    () =>
      data.map((category) => ({
        title: category.name,
        url: Routes.transactions({}, { search: { category: [category.id] } }),
      })),
    [data]
  );

  const indexCategories = menus.findIndex(
    (menu) => menu.title === 'Categories'
  );
  menus[indexCategories].items = categories;

  return (
    <SidebarGroup>
      <SidebarMenu>
        {menus.map((menu) => (
          <Collapsible key={menu.title} asChild>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip={menu.title}>
                <Link href={menu.url}>
                  <menu.icon />
                  <span>{menu.title}</span>
                </Link>
              </SidebarMenuButton>

              {menu.items !== undefined && menu.items?.length > 0 && (
                <>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuAction className="data-[state=open]:rotate-90">
                      <ChevronRightIcon />
                      <span className="sr-only">Toggle</span>
                    </SidebarMenuAction>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {menu.items?.map(
                        (subItem: { title: string; url: string }) => (
                          <SidebarMenuSubItem key={subItem.title}>
                            <SidebarMenuSubButton asChild>
                              <Link href={subItem.url}>
                                <span>{subItem.title}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        )
                      )}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </>
              )}
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
