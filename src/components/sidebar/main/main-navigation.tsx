'use client';

import {
  BookOpenIcon,
  BotIcon,
  ChevronRightIcon,
  Settings2Icon,
  SquareTerminalIcon,
} from 'lucide-react';

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar';

const menus = [
  {
    title: 'Dashboard',
    url: '#',
    icon: SquareTerminalIcon,
    isActive: true,
    items: [
      {
        title: 'History',
        url: '#',
      },
      {
        title: 'Starred',
        url: '#',
      },
      {
        title: 'Settings',
        url: '#',
      },
    ],
  },
  {
    title: 'Balances',
    url: '#',
    icon: BotIcon,
    items: [
      {
        title: 'Genesis',
        url: '#',
      },
      {
        title: 'Explorer',
        url: '#',
      },
      {
        title: 'Quantum',
        url: '#',
      },
    ],
  },
  {
    title: 'Categories',
    url: '#',
    icon: BookOpenIcon,
    items: [
      {
        title: 'Introduction',
        url: '#',
      },
      {
        title: 'Get Started',
        url: '#',
      },
      {
        title: 'Tutorials',
        url: '#',
      },
      {
        title: 'Changelog',
        url: '#',
      },
    ],
  },
  {
    title: 'Transactions',
    url: '#',
    icon: Settings2Icon,
    items: [
      {
        title: 'General',
        url: '#',
      },
      {
        title: 'Team',
        url: '#',
      },
      {
        title: 'Billing',
        url: '#',
      },
      {
        title: 'Limits',
        url: '#',
      },
    ],
  },
  {
    title: 'Budget Plans',
    url: '#',
    icon: Settings2Icon,
    items: [
      {
        title: 'General',
        url: '#',
      },
      {
        title: 'Team',
        url: '#',
      },
      {
        title: 'Billing',
        url: '#',
      },
      {
        title: 'Limits',
        url: '#',
      },
    ],
  },
];

export function MainNavigation() {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Menu</SidebarGroupLabel>
      <SidebarMenu>
        {menus.map((menu) => (
          <Collapsible key={menu.title} asChild defaultOpen={menu.isActive}>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip={menu.title}>
                <a href={menu.url}>
                  <menu.icon />
                  <span>{menu.title}</span>
                </a>
              </SidebarMenuButton>
              {menu.items?.length ? (
                <>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuAction className="data-[state=open]:rotate-90">
                      <ChevronRightIcon />
                      <span className="sr-only">Toggle</span>
                    </SidebarMenuAction>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {menu.items?.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton asChild>
                            <a href={subItem.url}>
                              <span>{subItem.title}</span>
                            </a>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </>
              ) : null}
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
