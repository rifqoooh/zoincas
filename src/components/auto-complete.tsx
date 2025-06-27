'use client';

import * as React from 'react';

import { Command as CommandPrimitive, defaultFilter } from 'cmdk';
import { CheckIcon, ChevronDownIcon, PlusCircleIcon } from 'lucide-react';

import {
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Skeleton } from '@/components/ui/skeleton';
import { cn, mergeRefs } from '@/lib/utilities';

type Option = Record<'value' | 'label', string> & Record<string, string>;

interface AutoCompleteProps {
  options: Option[];
  placeholder?: string;
  emptyMessage?: string;
  value?: string | string[] | null;
  onChange: (value?: string) => void;
  creatable?: boolean;
  isLoading?: boolean;
  isDisabled?: boolean;
  ref: React.Ref<HTMLInputElement>;
}

export function AutoComplete({
  options,
  placeholder,
  emptyMessage = 'No results found.',
  value,
  onChange,
  creatable = false,
  isLoading = false,
  isDisabled,
  ref,
}: AutoCompleteProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const formattedValue = React.useMemo(
    () => options.find((option) => option.value === value),
    [options, value]
  );

  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const [selected, setSelected] = React.useState<Option>(
    formattedValue as Option
  );
  const [inputValue, setInputValue] = React.useState<string>(
    formattedValue?.label || ''
  );

  const onKeyDown = React.useCallback(
    // biome-ignore lint/complexity/noExcessiveCognitiveComplexity: <explanation>
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

      // This is not a default behaviour of the <input /> field
      if (event.key === 'Enter' && input.value !== '' && creatable) {
        // Only run this if the user has enabled the creatable props
        // filtered options using cmdk default filter function
        const filtered = options.filter((option) => {
          const score = defaultFilter(option.label, input.value, []);
          return score !== 0;
        });

        // guard clause if the filtered options is not empty
        if (filtered.length > 0) {
          return;
        }

        // If the input value is not found on the options, create a new option
        const option = { label: input.value, value: input.value } as Option;
        options.push(option);

        setSelected(() => option);
        setInputValue(option.label);
        onChange(option.value);

        // This is a hack to prevent the input from being focused after the user selects an option
        setTimeout(() => {
          inputRef?.current?.blur();
        }, 0);
      }

      if (event.key === 'Escape') {
        event.preventDefault();
        event.stopPropagation();
        input.blur();
      }
    },
    [options, creatable, isOpen, selected, isDisabled, onChange]
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

  const onCreateOption = React.useCallback(
    (value: string | undefined) => {
      if (!value) {
        return;
      }

      const option = { label: value, value } as Option;

      options.push(option);

      onSelectOption(option);
    },
    [options, onSelectOption]
  );

  return (
    <CommandPrimitive onKeyDown={onKeyDown}>
      <div className="group rounded-md border border-input px-1 py-2 text-sm ring-offset-background focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/50">
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
                {options.length > 0 && !isLoading && (
                  <CommandGroup>
                    {options.map((option) => {
                      const isSelected = selected?.value === option.value;
                      return (
                        <CommandItem
                          key={option.value}
                          value={option.label}
                          onMouseDown={(event) => {
                            event.preventDefault();
                            event.stopPropagation();
                          }}
                          onSelect={() => onSelectOption(option)}
                          className={cn(
                            'flex w-full items-center gap-2',
                            isSelected ? null : 'pl-8'
                          )}
                        >
                          {isSelected ? <CheckIcon className="size-4" /> : null}
                          {option.label}
                        </CommandItem>
                      );
                    })}
                  </CommandGroup>
                )}
                {!isLoading && !creatable && (
                  <CommandEmpty className="p-1">
                    <p className="cursor-default select-none rounded-sm bg-accent px-2 py-1.5 text-center text-muted-foreground text-sm">
                      {emptyMessage}
                    </p>
                  </CommandEmpty>
                )}
                {!isLoading && creatable && (
                  <CommandEmpty className="p-1">
                    {/* biome-ignore lint/a11y/useFocusableInteractive: <explanation> */}
                    <div
                      role="button"
                      onMouseDown={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                        onCreateOption(inputRef.current?.value);
                      }}
                      className="flex w-full cursor-pointer select-none items-center gap-2 rounded-sm bg-accent px-2 py-1.5 text-sm"
                    >
                      <PlusCircleIcon className="size-4 shrink-0" />
                      <p className="truncate">{`Create "${inputRef.current?.value}"`}</p>
                    </div>
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
