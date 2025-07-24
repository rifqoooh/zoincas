'use client';

import * as React from 'react';

import { ArrowLeftRightIcon, CreditCardIcon, Layers2Icon } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { menus } from '@/components/sidebar/main/constants';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useListBalancesQuery } from '@/hooks/queries/balances';
import { useListCategoriesQuery } from '@/hooks/queries/categories';
import { useCommandTransactionsQuery } from '@/hooks/queries/transactions';
import { useDebouncedCallback } from '@/hooks/use-debounced-callback';
import { useIsMac } from '@/hooks/use-is-mac';
import { cn } from '@/lib/utilities';
import { format } from 'date-fns';

const debounceMs = 600;
const paginationDefault = {
  size: 0,
  count: 0,
  page: 1,
  pageCount: 1,
};

export function CommandMenu() {
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState('');
  const [debouncedInputValue, setDebouncedInputValue] = React.useState('');

  const router = useRouter();

  const isMac = useIsMac();

  const transactionsQuery = useCommandTransactionsQuery(debouncedInputValue);
  const balancesQuery = useListBalancesQuery();
  const categoriesQuery = useListCategoriesQuery();

  const { data: transactionsData } = transactionsQuery.data || {
    data: [],
    pagination: paginationDefault,
  };
  const balancesData = balancesQuery.data || [];
  const categoriesData = categoriesQuery.data || [];

  const transactions = React.useMemo(
    () =>
      transactionsData.map((transaction) => ({
        id: transaction.id,
        title: `${transaction.description} - ${format(transaction.datetime, 'dd MMM yyyy')}`,
        url: `/transactions?description=${transaction.description}`,
      })),
    [transactionsData]
  );

  const balances = React.useMemo(
    () =>
      balancesData.map((balance) => ({
        id: balance.id,
        title: balance.name,
        url: `/transactions?balance=${balance.id}`,
      })),
    [balancesData]
  );

  const categories = React.useMemo(
    () =>
      categoriesData.map((category) => ({
        id: category.id,
        title: category.name,
        url: `/transactions?category=${category.id}`,
      })),
    [categoriesData]
  );

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        if (
          (e.target instanceof HTMLElement && e.target.isContentEditable) ||
          e.target instanceof HTMLInputElement ||
          e.target instanceof HTMLTextAreaElement ||
          e.target instanceof HTMLSelectElement
        ) {
          return;
        }

        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const debouncedSetInputValue = useDebouncedCallback((values: string) => {
    setDebouncedInputValue(values);
  }, debounceMs);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  React.useEffect(() => {
    debouncedSetInputValue(inputValue);
  }, [inputValue]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="secondary"
          className={cn(
            'relative h-8 w-40 cursor-text justify-start bg-surface pl-2.5 font-normal text-surface-foreground/60 shadow-none sm:pr-12 lg:w-56 xl:w-64 dark:bg-card'
          )}
          onClick={() => setOpen(true)}
        >
          <span className="inline-flex text-muted-foreground">Search...</span>
          <div className="absolute top-1.5 right-1.5 hidden gap-1 sm:flex">
            <CommandMenuKbd>{isMac ? '⌘' : 'Ctrl'}</CommandMenuKbd>
            <CommandMenuKbd className="aspect-square">K</CommandMenuKbd>
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent
        showCloseButton={false}
        className="rounded-xl border-none bg-clip-padding p-2 pb-11 shadow-2xl ring-4 ring-neutral-200/80 dark:bg-neutral-900 dark:ring-neutral-800"
      >
        <DialogHeader className="sr-only">
          <DialogTitle>Search...</DialogTitle>
          <DialogDescription>Search for a command to run...</DialogDescription>
        </DialogHeader>
        <Command className="**:data-[slot=command-input]:!h-9 **:data-[slot=command-input-wrapper]:!h-9 rounded-none bg-transparent **:data-[slot=command-input-wrapper]:mb-0 **:data-[slot=command-input-wrapper]:rounded-md **:data-[slot=command-input-wrapper]:border **:data-[slot=command-input-wrapper]:border-input **:data-[slot=command-input-wrapper]:bg-input/50 **:data-[slot=command-input]:py-0">
          <CommandInput
            placeholder="Search..."
            value={inputValue}
            onValueChange={setInputValue}
          />
          <CommandList className="no-scrollbar min-h-80 scroll-pt-2 scroll-pb-1.5">
            <CommandEmpty className="py-12 text-center text-muted-foreground text-sm">
              No results found.
            </CommandEmpty>
            {menus && menus.length > 0 && (
              <CommandGroup
                heading="Pages"
                className="!p-0 [&_[cmdk-group-heading]]:!p-3 [&_[cmdk-group-heading]]:!pb-1 [&_[cmdk-group-heading]]:scroll-mt-16"
              >
                {menus.map((menu) => (
                  <CommandItem
                    key={menu.url}
                    value={`Navigation ${menu.title}`}
                    keywords={['nav', 'navigation', menu.title.toLowerCase()]}
                    onSelect={() => {
                      router.push(menu.url);
                      setOpen(false);
                    }}
                  >
                    <menu.icon />
                    {menu.title}
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
            {balances && balances.length > 0 && (
              <CommandGroup
                heading="Balances"
                className="!p-0 [&_[cmdk-group-heading]]:!p-3 [&_[cmdk-group-heading]]:!pb-1 [&_[cmdk-group-heading]]:scroll-mt-16"
              >
                {balances.map((balance) => (
                  <CommandItem
                    key={balance.id}
                    value={`Navigation ${balance.title} - ${balance.id}`}
                    keywords={[
                      'nav',
                      'navigation',
                      balance.title.toLowerCase(),
                    ]}
                    onSelect={() => {
                      router.push(balance.url);
                      setOpen(false);
                    }}
                  >
                    <CreditCardIcon />
                    {balance.title}
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
            {categories && categories.length > 0 && (
              <CommandGroup
                heading="Categories"
                className="!p-0 [&_[cmdk-group-heading]]:!p-3 [&_[cmdk-group-heading]]:!pb-1 [&_[cmdk-group-heading]]:scroll-mt-16"
              >
                {categories.map((category) => (
                  <CommandItem
                    key={category.id}
                    value={`Navigation ${category.title} - ${category.id}`}
                    keywords={[
                      'nav',
                      'navigation',
                      category.title.toLowerCase(),
                    ]}
                    onSelect={() => {
                      router.push(category.url);
                      setOpen(false);
                    }}
                  >
                    <Layers2Icon />
                    {category.title}
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
            {transactions && transactions.length > 0 && (
              <CommandGroup
                heading="Transactions"
                className="!p-0 [&_[cmdk-group-heading]]:!p-3 [&_[cmdk-group-heading]]:!pb-1 [&_[cmdk-group-heading]]:scroll-mt-16"
              >
                {transactions.map((transaction) => (
                  <CommandItem
                    key={transaction.id}
                    value={`Navigation ${transaction.title} - ${transaction.id}`}
                    keywords={[
                      'nav',
                      'navigation',
                      transaction.title.toLowerCase(),
                    ]}
                    onSelect={() => {
                      router.push(transaction.url);
                      setOpen(false);
                    }}
                  >
                    <ArrowLeftRightIcon />
                    {transaction.title}
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
}

function CommandMenuKbd({ className, ...props }: React.ComponentProps<'kbd'>) {
  return (
    <kbd
      className={cn(
        "pointer-events-none flex h-5 select-none items-center justify-center gap-1 rounded border bg-background px-1 font-medium font-sans text-[0.7rem] text-muted-foreground [&_svg:not([class*='size-'])]:size-3",
        className
      )}
      {...props}
    />
  );
}
