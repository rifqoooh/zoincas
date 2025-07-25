'use client';

import * as React from 'react';

import { CheckIcon, ChevronDownIcon } from 'lucide-react';
import { useQueryState } from 'nuqs';

import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useListBalancesQuery } from '@/hooks/queries/balances';
import { cn } from '@/lib/utilities';

export function BalanceFilter() {
  const [open, setOpen] = React.useState(false);

  const [search, setSearch] = useQueryState('balance', { defaultValue: '' });

  const balancesQuery = useListBalancesQuery();
  const data = balancesQuery.data || [];
  const balances = data.map((balance) => ({
    label: balance.name,
    value: balance.id,
  }));

  const onReset = React.useCallback(
    (event?: React.MouseEvent) => {
      event?.stopPropagation();
      setSearch(null);
    },
    [setSearch]
  );

  return (
    <Popover open={open} onOpenChange={setOpen} modal={false}>
      <PopoverTrigger asChild>
        <Button role="combobox" variant="outline" size="sm" className="gap-6">
          {search
            ? balances.find((balance) => balance.value === search)?.label
            : 'All balances'}
          <ChevronDownIcon className="ml-auto size-4 text-muted-foreground" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="end" sideOffset={8}>
        <Command>
          <CommandInput placeholder="Search balance..." />
          <CommandList className="max-h-full">
            <CommandEmpty>No balance found.</CommandEmpty>
            <CommandGroup className="overflow-y-auto overflow-x-hidden">
              {balances.map((balance) => (
                <CommandItem
                  key={balance.value}
                  value={balance.value}
                  onSelect={(currentValue) => {
                    setSearch(currentValue === search ? '' : currentValue);
                    setOpen(false);
                  }}
                >
                  <span className="truncate">{balance.label}</span>
                  <CheckIcon
                    className={cn(
                      'ml-auto',
                      search === balance.value ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
            {search && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={() => onReset()}
                    className="justify-center py-1 text-center text-sm"
                  >
                    Clear filter
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
