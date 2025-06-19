'use client';

import { CheckIcon, ChevronsUpDownIcon, LogOutIcon } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { Skeleton } from '@/components/ui/skeleton';
import { useSignOut } from '@/hooks/actions/use-sign-out';
import { useGetSessionsQuery } from '@/hooks/queries/sessions';
import { cn } from '@/lib/utilities';

export function UserNavigation() {
  const { isMobile } = useSidebar();
  const { theme, setTheme } = useTheme();
  const { onSignOut, isPending } = useSignOut();

  const sessionsQuery = useGetSessionsQuery();
  const { user } = sessionsQuery.data || {};

  if (sessionsQuery.isPending) {
    return <Skeleton className="h-10" />;
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="size-8 rounded-lg">
                <AvatarImage
                  src={user?.image ?? undefined}
                  alt={user?.name ?? undefined}
                />
                <AvatarFallback className="bg-foreground text-background">
                  {user?.name?.[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user?.name}</span>
                <span className="truncate text-muted-foreground text-xs">
                  {user?.email}
                </span>
              </div>

              <ChevronsUpDownIcon className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? 'bottom' : 'right'}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5">
                <div className="grid flex-1 text-left leading-tight">
                  <span className="truncate font-medium text-sm">
                    {user?.name}
                  </span>
                  <span className="truncate text-muted-foreground text-xs">
                    {user?.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => setTheme('light')}>
                <CheckIcon
                  className={cn(
                    'opacity-0 transition-opacity',
                    theme === 'light' && 'opacity-100'
                  )}
                />
                Light theme
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('dark')}>
                <CheckIcon
                  className={cn(
                    'opacity-0 transition-opacity',
                    theme === 'dark' && 'opacity-100'
                  )}
                />
                Dark theme
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('system')}>
                <CheckIcon
                  className={cn(
                    'opacity-0 transition-opacity',
                    theme === 'system' && 'opacity-100'
                  )}
                />
                System theme
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onSignOut} disabled={isPending}>
              <LogOutIcon />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
