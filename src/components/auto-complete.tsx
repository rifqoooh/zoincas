'use client';

import * as React from 'react';

import { Command as CommandPrimitive } from 'cmdk';
import { Check, ChevronDownIcon } from 'lucide-react';

import { cn, mergeRefs } from '@/lib/utilities';
import {
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from './ui/command';
import { Skeleton } from './ui/skeleton';

export type Option = Record<'value' | 'label', string> & Record<string, string>;

interface AutoCompleteProps {
  options: Option[];
  placeholder?: string;
  emptyMessage?: string;
  value: string | string[] | null | undefined;
  onChange: (value?: string) => void;
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
        setIsOpen(false);
        setInputValue(selected?.label);
        // Don't prevent default, let Tab work normally
        return;
      }

      // This is not a default behaviour of the <input /> field
      if (event.key === 'Enter' && input.value !== '') {
        const optionToSelect = options.find(
          (option) => option.label === input.value
        );
        if (optionToSelect) {
          setSelected(optionToSelect);
          // onValueChange?.(optionToSelect);
          onChange(optionToSelect.value);
        }
      }

      if (event.key === 'Escape') {
        event.preventDefault();
        event.stopPropagation();
        input.blur();
      }
    },
    [isOpen, options, onChange, isDisabled, selected]
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
    (selectedOption: Option) => {
      setSelected(selectedOption);
      setInputValue(selectedOption.label);
      onChange(selectedOption.value);
      // onValueChange?.(selectedOption);

      // This is a hack to prevent the input from being focused after the user selects an option
      setTimeout(() => {
        inputRef?.current?.blur();
      }, 0);
    },
    [onChange]
  );

  return (
    <CommandPrimitive
      onKeyDown={onKeyDown}
      // className="overflow-visible bg-transparent"
    >
      <div className="group rounded-md border border-input px-1 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
        <div className="flex items-center gap-1">
          <CommandPrimitive.Input
            ref={mergeRefs([inputRef, ref])}
            value={inputValue}
            onValueChange={isLoading ? undefined : setInputValue}
            onBlur={onBlur}
            onFocus={onFocus}
            placeholder={placeholder}
            disabled={isDisabled}
            className="ml-2 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
          <ChevronDownIcon className="size-4 text-muted-foreground" />
        </div>
      </div>
      <div className="relative mt-2">
        <div
          className={cn(
            'fade-in-0 zoom-in-95 absolute top-0 z-10 w-full animate-in rounded-xl pb-4 outline-none',
            isOpen ? 'block' : 'hidden'
          )}
        >
          <div className="bg-popover">
            <CommandList className="rounded-md border border-gray-200">
              {isLoading ? (
                <CommandPrimitive.Loading>
                  <div className="p-1">
                    <Skeleton className="h-8 w-full" />
                  </div>
                </CommandPrimitive.Loading>
              ) : null}
              {options.length > 0 && !isLoading ? (
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
                        {isSelected ? <Check className="size-4" /> : null}
                        {option.label}
                      </CommandItem>
                    );
                  })}
                </CommandGroup>
              ) : null}
              {isLoading ? null : (
                <CommandEmpty className="p-1">
                  <p className="cursor-default select-none rounded-sm bg-accent px-2 py-1.5 text-center text-muted-foreground text-sm">
                    {emptyMessage}
                  </p>
                </CommandEmpty>
              )}
            </CommandList>
          </div>
        </div>
      </div>
    </CommandPrimitive>
  );
}
