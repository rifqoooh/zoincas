'use client';

import { MinusIcon, PlusIcon } from 'lucide-react';
import * as React from 'react';
import CurrencyInputPrimitive from 'react-currency-input-field';

import { Button } from '@/components/ui/button';
import { cn, mergeRefs } from '@/lib/utilities';

interface CurrencyInputProps {
  placeholder?: string;
  value: string | number;
  onChange?: (value: string | undefined) => void;
  disabled?: boolean;
  ref: React.Ref<HTMLInputElement>;
}

export function CurrencyInput({
  placeholder,
  value,
  onChange,
  disabled,
  ref,
}: CurrencyInputProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const isPositiveNum = Number.parseFloat(value.toString()) >= 0;

  const [isArrowDownPressed, setIsArrowDownPressed] = React.useState(false);
  const [isArrowUpPressed, setIsArrowUpPressed] = React.useState(false);

  const onArrowDownPress = React.useCallback(() => {
    setIsArrowDownPressed(true);
  }, []);

  const onArrowDownRelease = React.useCallback(() => {
    setIsArrowDownPressed(false);
  }, []);

  const onArrowUpPress = React.useCallback(() => {
    setIsArrowUpPressed(true);
  }, []);

  const onArrowUpRelease = React.useCallback(() => {
    setIsArrowUpPressed(false);
  }, []);

  const onKeyPlusPress = React.useCallback(() => {
    if (!value) {
      return;
    }

    if (!isPositiveNum) {
      const reversedValue = Number.parseFloat(value.toString()) * -1;
      onChange?.(reversedValue.toString());
    }
  }, [value, isPositiveNum, onChange]);

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowDown') {
      onArrowDownPress();
    }
    if (event.key === 'ArrowUp') {
      onArrowUpPress();
    }
    if (event.key === '=') {
      onKeyPlusPress();
    }
  };

  const onKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowDown') {
      onArrowDownRelease();
    }
    if (event.key === 'ArrowUp') {
      onArrowUpRelease();
    }
  };

  const onClickStepDown = React.useCallback(() => {
    if (disabled) {
      return;
    }

    if (!value) {
      const reversedValue = 0 - 1000;
      onChange?.(reversedValue.toString());
      return;
    }

    const reversedValue = Number.parseFloat(value.toString()) - 1000;
    onChange?.(reversedValue.toString());

    inputRef.current?.dispatchEvent(new Event('input', { bubbles: true }));
  }, [disabled, value, onChange]);

  const onClickStepUp = React.useCallback(() => {
    if (disabled) {
      return;
    }

    if (!value) {
      const reversedValue = 0 + 1000;
      onChange?.(reversedValue.toString());
      return;
    }

    const reversedValue = Number.parseFloat(value.toString()) + 1000;
    onChange?.(reversedValue.toString());

    inputRef.current?.dispatchEvent(new Event('input', { bubbles: true }));
  }, [disabled, value, onChange]);

  return (
    <div className="relative w-full">
      <CurrencyInputPrimitive
        className={cn(
          'flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 pr-9 text-sm caret-primary ring-offset-background file:border-0 file:bg-transparent placeholder:text-muted-foreground focus-visible:border-ring focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50',
          { 'text-green-500': isPositiveNum },
          { 'text-red-500': !isPositiveNum }
        )}
        placeholder={placeholder}
        value={value}
        decimalsLimit={0}
        decimalScale={0}
        disabled={disabled}
        step={1000}
        onValueChange={onChange}
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
        ref={mergeRefs([inputRef, ref])}
      />

      <div className="absolute top-0 right-0 flex items-center">
        <Button
          type="button"
          tabIndex={-1}
          variant="outline"
          size="icon"
          className="group/minus rounded-none border-0 border-input border-l"
          disabled={disabled}
          onClick={(e) => {
            e.preventDefault();
            inputRef.current?.focus();
          }}
          onMouseDown={(e) => e.preventDefault()}
          onTouchStart={(e) => {
            if (e.cancelable) {
              e.preventDefault();
            }
          }}
          onMouseUp={onClickStepDown}
        >
          <MinusIcon
            className={cn(
              'size-4 text-muted-foreground transition-all duration-75 group-hover/minus:text-primary group-active/minus:scale-75 group-active/minus:text-primary/80',
              {
                'scale-75 text-black': isArrowDownPressed,
              }
            )}
          />
        </Button>

        <Button
          type="button"
          tabIndex={-1}
          variant="outline"
          size="icon"
          className="group/plus rounded-none rounded-r-md border-0 border-input border-l"
          disabled={disabled}
          onClick={(e) => {
            e.preventDefault();
            inputRef.current?.focus();
          }}
          onMouseDown={(e) => e.preventDefault()}
          onTouchStart={(e) => {
            if (e.cancelable) {
              e.preventDefault();
            }
          }}
          onMouseUp={onClickStepUp}
        >
          <PlusIcon
            className={cn(
              'size-4 text-muted-foreground transition-all duration-75 group-hover/plus:text-primary group-active/plus:scale-75 group-active/plus:text-primary/80',
              {
                'scale-75 text-black': isArrowUpPressed,
              }
            )}
          />
        </Button>
      </div>
    </div>
  );
}
