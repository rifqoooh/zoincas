'use client';

import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { formatDate } from '@/lib/format';
import type { Column } from '@tanstack/react-table';
import { format } from 'date-fns';
import { CalendarIcon, XCircleIcon } from 'lucide-react';
import type { DateRange } from 'react-day-picker';

type DateSelection = Date[] | DateRange;

function getIsDateRange(value: DateSelection): value is DateRange {
  return value && typeof value === 'object' && !Array.isArray(value);
}

function parseAsDate(value: string | undefined): Date | undefined {
  if (!value) {
    return undefined;
  }

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date;
}

function parseColumnFilterValue(value: unknown) {
  if (value === null || value === undefined) {
    return [];
  }

  // if value is an array that means it's multiple date range
  if (Array.isArray(value)) {
    return value.map((item) => {
      if (typeof item === 'string') {
        return item;
      }
      return undefined;
    });
  }

  if (typeof value === 'string') {
    return [value];
  }

  return [];
}

interface DataTableDateFilterProps<TData> {
  column: Column<TData, unknown>;
  title?: string;
  multiple?: boolean;
}

export function DataTableDateFilter<TData>({
  column,
  title,
  multiple,
}: DataTableDateFilterProps<TData>) {
  const columnFilterValue = column.getFilterValue();

  const selectedDates = React.useMemo<DateSelection>(() => {
    if (!columnFilterValue) {
      return multiple ? { from: undefined, to: undefined } : [];
    }

    if (multiple) {
      const dates = parseColumnFilterValue(columnFilterValue);
      return {
        from: parseAsDate(dates[0]),
        to: parseAsDate(dates[1]),
      };
    }

    const dates = parseColumnFilterValue(columnFilterValue);
    const date = parseAsDate(dates[0]);

    return date ? [date] : [];
  }, [columnFilterValue, multiple]);

  const onSelect = React.useCallback(
    // biome-ignore lint/complexity/noExcessiveCognitiveComplexity: <explanation>
    (date: Date | DateRange | undefined) => {
      if (!date) {
        column.setFilterValue(undefined);
        return;
      }

      if (multiple && 'from' in date && 'to' in date) {
        const from = date.from ? format(date.from, 'yyyy-MM-dd') : undefined;
        const to = date.to ? format(date.to, 'yyyy-MM-dd') : undefined;
        column.setFilterValue(from || to ? [from, to] : undefined);
      } else if (!multiple && date instanceof Date) {
        column.setFilterValue(date);
      }
    },
    [column, multiple]
  );

  const onReset = React.useCallback(
    (event: React.MouseEvent) => {
      event.stopPropagation();
      column.setFilterValue(undefined);
    },
    [column]
  );

  const hasValue = React.useMemo(() => {
    if (multiple) {
      if (!getIsDateRange(selectedDates)) {
        return false;
      }
      return selectedDates.from || selectedDates.to;
    }

    if (!Array.isArray(selectedDates)) {
      return false;
    }

    return selectedDates.length > 0;
  }, [multiple, selectedDates]);

  const formatDateRange = React.useCallback((range: DateRange) => {
    if (!range.from && !range.to) {
      return '';
    }
    if (range.from && range.to) {
      if (range.from.toDateString() === range.to.toDateString()) {
        return formatDate(range.from);
      }
      return `${formatDate(range.from)} - ${formatDate(range.to)}`;
    }
    return formatDate(range.from ?? range.to);
  }, []);

  const label = React.useMemo(() => {
    if (multiple) {
      if (!getIsDateRange(selectedDates)) {
        return null;
      }

      const hasSelectedDates = selectedDates.from || selectedDates.to;
      const dateText = hasSelectedDates
        ? formatDateRange(selectedDates)
        : 'Select date range';

      return (
        <span className="flex items-center gap-2">
          <span>{title}</span>
          {hasSelectedDates && (
            <>
              <Separator
                orientation="vertical"
                className="mx-0.5 data-[orientation=vertical]:h-4"
              />
              <span>{dateText}</span>
            </>
          )}
        </span>
      );
    }

    if (getIsDateRange(selectedDates)) {
      return null;
    }

    const hasSelectedDate = selectedDates.length > 0;
    const dateText = hasSelectedDate
      ? formatDate(selectedDates[0])
      : 'Select date';

    return (
      <span className="flex items-center gap-2">
        <span>{title}</span>
        {hasSelectedDate && (
          <>
            <Separator
              orientation="vertical"
              className="mx-0.5 data-[orientation=vertical]:h-4"
            />
            <span>{dateText}</span>
          </>
        )}
      </span>
    );
  }, [selectedDates, multiple, formatDateRange, title]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="border-dashed">
          {hasValue ? (
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
          ) : (
            <CalendarIcon />
          )}
          {label}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        {multiple ? (
          <Calendar
            mode="range"
            selected={
              getIsDateRange(selectedDates)
                ? selectedDates
                : { from: undefined, to: undefined }
            }
            onSelect={onSelect}
            autoFocus
          />
        ) : (
          <Calendar
            mode="single"
            selected={
              getIsDateRange(selectedDates) ? undefined : selectedDates[0]
            }
            onSelect={onSelect}
            autoFocus
          />
        )}
      </PopoverContent>
    </Popover>
  );
}
