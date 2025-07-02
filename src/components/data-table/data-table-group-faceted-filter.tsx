'use client';

import * as React from 'react';

import type { GroupOption, Option } from '@/types/data-table';
import type { Column } from '@tanstack/react-table';
import type { LucideIcon } from 'lucide-react';

import { CheckIcon, PlusCircleIcon, XCircleIcon } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
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
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utilities';

interface DataTableGroupFacetedFilterProps<TData, TValue> {
  column?: Column<TData, TValue>;
  title?: string;
  groupOptions: GroupOption[];
  icon?: LucideIcon;
  multiple?: boolean;
}

export function DataTableGroupFacetedFilter<TData, TValue>({
  column,
  title,
  groupOptions,
  icon: Icon,
  multiple,
}: DataTableGroupFacetedFilterProps<TData, TValue>) {
  const [open, setOpen] = React.useState(false);

  const flattenOptions = React.useMemo(() => {
    return groupOptions.flatMap(({ group, options }) =>
      options.map((option) => ({
        ...option,
        group,
      }))
    );
  }, [groupOptions]);

  const columnFilterValue = column?.getFilterValue();
  const selectedValues = new Set(
    Array.isArray(columnFilterValue) ? columnFilterValue : []
  );

  const onItemSelect = React.useCallback(
    (option: Option, isSelected: boolean) => {
      if (!column) {
        return;
      }

      if (multiple) {
        const newSelectedValues = new Set(selectedValues);
        if (isSelected) {
          newSelectedValues.delete(option.value);
        } else {
          newSelectedValues.add(option.value);
        }
        const filterValues = Array.from(newSelectedValues);
        column.setFilterValue(filterValues.length ? filterValues : undefined);
      } else {
        column.setFilterValue(isSelected ? undefined : [option.value]);
        setOpen(false);
      }
    },
    [column, multiple, selectedValues]
  );

  const onReset = React.useCallback(
    (event?: React.MouseEvent) => {
      event?.stopPropagation();
      column?.setFilterValue(undefined);
    },
    [column]
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="border-dashed">
          {selectedValues?.size > 0 ? (
            // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
            <div
              role="button"
              aria-label={`Clear ${title} filter`}
              tabIndex={0}
              onClick={onReset}
              className="rounded-sm opacity-70 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              <XCircleIcon />
            </div>
            // biome-ignore lint/nursery/noNestedTernary: <explanation>
          ) : Icon ? (
            <Icon />
          ) : (
            <PlusCircleIcon />
          )}
          {title}
          {selectedValues?.size > 0 && (
            <>
              <Separator
                orientation="vertical"
                className="mx-0.5 data-[orientation=vertical]:h-4"
              />
              <Badge
                variant="secondary"
                className="rounded-sm px-1 font-normal lg:hidden"
              >
                {selectedValues.size}
              </Badge>

              <div className="hidden items-center gap-1 lg:flex">
                {selectedValues.size > 2 ? (
                  <Badge
                    variant="secondary"
                    className="rounded-sm px-1 font-normal"
                  >
                    {selectedValues.size} selected
                  </Badge>
                ) : (
                  flattenOptions
                    .filter((option) => selectedValues.has(option.value))
                    .map((option) => (
                      <Badge
                        variant="secondary"
                        key={option.value}
                        className="rounded-sm px-1 font-normal"
                      >
                        {option.label}
                      </Badge>
                    ))
                )}
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[14.5rem] p-0" align="start">
        <Command>
          <CommandInput placeholder={title} />
          <CommandList className="max-h-[18.75rem] overflow-y-auto overflow-x-hidden">
            <CommandEmpty>No results found.</CommandEmpty>
            {groupOptions.length > 0 &&
              groupOptions.map((group) => {
                return (
                  <CommandGroup heading={group.group} key={group.group}>
                    {group.options.map((option) => {
                      const isSelected = selectedValues.has(option.value);

                      return (
                        <CommandItem
                          keywords={[group.group, option.label]}
                          key={option.value}
                          value={`${option.label}-${option.value}`}
                          onSelect={() => onItemSelect(option, isSelected)}
                        >
                          <div
                            className={cn(
                              'flex size-4 items-center justify-center rounded-[0.25rem] border border-primary',
                              isSelected
                                ? 'bg-primary'
                                : 'opacity-50 [&_svg]:invisible'
                            )}
                          >
                            <CheckIcon className="text-primary-foreground" />
                          </div>
                          {option.icon && <option.icon />}
                          <span className="truncate">{option.label}</span>
                          {option.count && (
                            <span className="ml-auto font-mono text-xs">
                              {option.count}
                            </span>
                          )}
                        </CommandItem>
                      );
                    })}
                  </CommandGroup>
                );
              })}

            {selectedValues.size > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={() => onReset()}
                    className="justify-center text-center"
                  >
                    Clear filters
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
