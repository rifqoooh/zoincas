'use client';

import * as React from 'react';

import { Command as CommandPrimitive } from 'cmdk';
import { CheckIcon, ChevronDownIcon } from 'lucide-react';

import {
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Skeleton } from '@/components/ui/skeleton';
import { cn, mergeRefs } from '@/lib/utilities';

interface Option {
  value: string;
  label: string;
  description?: string;
}

interface GroupOption {
  group: string;
  options: Option[];
}

interface AutoCompleteGroupProps {
  value?: string | string[] | null;
  placeholder?: string;
  options: GroupOption[];
  emptyMessage?: string;
  preDescription?: string;
  onChange: (value?: string) => void;
  isLoading?: boolean;
  isDisabled?: boolean;
  ref: React.Ref<HTMLInputElement>;
}

export function AutoCompleteGroup({
  value,
  placeholder,
  options,
  emptyMessage = 'No results found.',
  preDescription,
  onChange,
  isLoading = false,
  isDisabled,
  ref,
}: AutoCompleteGroupProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const formattedValue = React.useMemo(() => {
    for (const group of options) {
      const option = group.options.find((option) => option.value === value);
      if (option) {
        return option;
      }
    }
    return undefined;
  }, [options, value]);

  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [selected, setSelected] = React.useState<Option>(
    formattedValue as Option
  );
  const [inputValue, setInputValue] = React.useState<string>(
    formattedValue?.label || ''
  );

  const onKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current;
      if (!input) {
        return;
      }

      if (isDisabled) {
        return;
      }

      // Keep the options displayed when the user is typing
      if (!isOpen) {
        setIsOpen(true);
      }

      // Handle Tab key - allow default behavior and close dropdown
      if (event.key === 'Tab') {
        if (selected) {
          setIsOpen(false);
          setInputValue(selected?.label);
          return;
        }

        setIsOpen(false);
        setInputValue('');
        return;
      }

      if (event.key === 'Escape') {
        event.preventDefault();
        event.stopPropagation();
        input.blur();
      }
    },
    [isOpen, selected, isDisabled]
  );

  const onBlur = React.useCallback(() => {
    setIsOpen(false);
    setInputValue(selected?.label);
  }, [selected]);

  const onFocus = React.useCallback(() => {
    setIsOpen(true);
    setInputValue('');
  }, []);

  const onSelectOption = React.useCallback(
    (option: Option) => {
      setSelected(() => option);
      setInputValue(option.label);
      onChange(option.value);

      // This is a hack to prevent the input from being focused after the user selects an option
      setTimeout(() => {
        inputRef?.current?.blur();
      }, 0);
    },
    [onChange]
  );

  return (
    <CommandPrimitive onKeyDown={onKeyDown}>
      <div className="group rounded-md border border-input px-1 py-2 text-sm ring-offset-background transition-[color,box-shadow] focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/50 dark:bg-input/30">
        <div className="flex items-center gap-1">
          <CommandPrimitive.Input
            ref={mergeRefs([inputRef, ref])}
            value={inputValue}
            onValueChange={isLoading ? undefined : setInputValue}
            onBlur={onBlur}
            onFocus={onFocus}
            placeholder={placeholder}
            disabled={isDisabled || isLoading}
            className="ml-2 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
          />
          <ChevronDownIcon className="size-4 text-muted-foreground" />
        </div>
      </div>
      <div className="relative">
        <div
          className={cn(
            'fade-in-0 zoom-in-95 absolute top-2 z-10 w-full animate-in rounded-xl pb-4 outline-none',
            isOpen ? 'block' : 'hidden'
          )}
        >
          <div className="rounded-md bg-popover">
            <CommandList className="rounded-md border">
              <div className=" max-h-56 overflow-y-auto">
                {isLoading ? (
                  <CommandPrimitive.Loading>
                    <div className="p-1">
                      <Skeleton className="h-8 w-full" />
                    </div>
                  </CommandPrimitive.Loading>
                ) : null}
                {options.length > 0 &&
                  !isLoading &&
                  options.map((group) => {
                    return (
                      <CommandGroup heading={group.group} key={group.group}>
                        {group.options.map((option) => {
                          const isSelected = selected?.value === option.value;
                          return (
                            <CommandItem
                              key={option.value}
                              keywords={[group.group, option.label]}
                              value={`${option.label}-${option.value}`}
                              onMouseDown={(event) => {
                                event.preventDefault();
                                event.stopPropagation();
                              }}
                              onSelect={() => onSelectOption(option)}
                              className={cn(
                                'flex flex-col gap-1',
                                !isSelected && 'pl-8'
                              )}
                            >
                              <div className="flex w-full items-center gap-2">
                                {isSelected ? (
                                  <CheckIcon className="size-4" />
                                ) : null}
                                {option.label}
                              </div>

                              <div
                                className={cn(
                                  'flex w-full items-center text-muted-foreground text-xs',
                                  isSelected && 'pl-6'
                                )}
                              >
                                {preDescription}
                                {option.description}
                              </div>
                            </CommandItem>
                          );
                        })}
                      </CommandGroup>
                    );
                  })}
                {!isLoading && (
                  <CommandEmpty className="p-1">
                    <p className="cursor-default select-none rounded-sm bg-accent px-2 py-1.5 text-center text-muted-foreground text-sm">
                      {emptyMessage}
                    </p>
                  </CommandEmpty>
                )}
              </div>
            </CommandList>
          </div>
        </div>
      </div>
    </CommandPrimitive>
  );
}
