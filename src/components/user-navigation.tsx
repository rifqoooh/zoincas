'use client';

import { CheckIcon, ChevronsUpDownIcon, LogOutIcon } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Skeleton } from '@/components/ui/skeleton';
import { useGetSessionsQuery } from '@/hooks/queries/sessions';
import { useSignOut } from '@/hooks/use-sign-out';
import { cn } from '@/lib/utilities';

export function UserNavigation() {
  const { theme, setTheme } = useTheme();
  const { onSignOut, isPending } = useSignOut();

  const sessionsQuery = useGetSessionsQuery();
  const { user } = sessionsQuery.data || {};

  if (sessionsQuery.isPending) {
    return <Skeleton className="h-10 w-3xs" />;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="lg"
          className="w-10 transition-none sm:h-14 sm:w-3xs"
        >
          <Avatar className="hidden size-8 rounded-lg sm:flex">
            <AvatarImage
              src={user?.image ?? undefined}
              alt={user?.name ?? undefined}
            />
            <AvatarFallback className="bg-foreground text-background">
              {user?.name?.[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div className="hidden flex-1 text-left text-sm leading-tight sm:grid">
            <span className="truncate font-medium">{user?.name}</span>
            <span className="truncate text-muted-foreground text-xs">
              {user?.email}
            </span>
          </div>

          <ChevronsUpDownIcon className="ml-auto size-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="min-w-56 rounded-lg sm:w-3xs"
        side="bottom"
        align="end"
        sideOffset={4}
      >
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5">
            <div className="grid flex-1 text-left leading-tight">
              <span className="truncate font-medium text-sm">{user?.name}</span>
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
  );
}
