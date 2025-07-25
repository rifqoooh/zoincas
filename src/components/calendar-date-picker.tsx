'use client';

import * as React from 'react';

import type { buttonVariants } from '@/components/ui/button';
import type { VariantProps } from 'class-variance-authority';
import type { DateRange } from 'react-day-picker';

import {
  endOfDay,
  endOfMonth,
  endOfWeek,
  endOfYear,
  startOfDay,
  startOfMonth,
  startOfWeek,
  startOfYear,
  subDays,
} from 'date-fns';
import { formatInTimeZone, toDate } from 'date-fns-tz';
import { ChevronDownIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utilities';

interface CalendarDatePickerProps
  extends React.HTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  id?: string;
  className?: string;
  date: DateRange;
  onDateSelect: (range: { from: Date; to: Date }) => void;
  numberOfMonths?: 1 | 2;
  yearsRange?: number;
}

export const CalendarDatePicker = React.forwardRef<
  HTMLButtonElement,
  CalendarDatePickerProps
>(
  (
    {
      id = 'calendar-date-picker',
      className,
      date,
      onDateSelect,
      numberOfMonths = 2,
      yearsRange = 10,
      variant,
      size,
      ...props
    },
    ref
  ) => {
    const [selectedRange, setSelectedRange] = React.useState<string | null>(
      numberOfMonths === 2 ? 'This Year' : 'Today'
    );
    const [monthFrom, setMonthFrom] = React.useState<Date | undefined>(
      date?.from
    );

    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    const selectDateRange = (from: Date, to: Date, range: string) => {
      const startDate = startOfDay(toDate(from, { timeZone }));
      const endDate =
        numberOfMonths === 2 ? endOfDay(toDate(to, { timeZone })) : startDate;
      onDateSelect({ from: startDate, to: endDate });
      setSelectedRange(range);
      setMonthFrom(from);
    };

    const handleDateSelect = (range: DateRange | undefined) => {
      if (range) {
        let from = startOfDay(toDate(range.from as Date, { timeZone }));
        let to = range.to ? endOfDay(toDate(range.to, { timeZone })) : from;
        if (numberOfMonths === 1) {
          if (range.from !== date.from) {
            to = from;
          } else {
            from = startOfDay(toDate(range.to as Date, { timeZone }));
          }
        }
        onDateSelect({ from, to });
        setMonthFrom(from);
      }
      setSelectedRange(null);
    };

    const today = new Date();

    const dateRanges = [
      { label: 'Today', start: today, end: today },
      { label: 'Yesterday', start: subDays(today, 1), end: subDays(today, 1) },
      {
        label: 'This Week',
        start: startOfWeek(today, { weekStartsOn: 1 }),
        end: endOfWeek(today, { weekStartsOn: 1 }),
      },
      {
        label: 'Last Week',
        start: subDays(startOfWeek(today, { weekStartsOn: 1 }), 7),
        end: subDays(endOfWeek(today, { weekStartsOn: 1 }), 7),
      },
      { label: 'Last 7 Days', start: subDays(today, 6), end: today },
      {
        label: 'This Month',
        start: startOfMonth(today),
        end: endOfMonth(today),
      },
      {
        label: 'Last Month',
        start: startOfMonth(subDays(today, today.getDate())),
        end: endOfMonth(subDays(today, today.getDate())),
      },
      { label: 'This Year', start: startOfYear(today), end: endOfYear(today) },
      {
        label: 'Last Year',
        start: startOfYear(subDays(today, 365)),
        end: endOfYear(subDays(today, 365)),
      },
    ];

    const formatWithTz = (date: Date, fmt: string) =>
      formatInTimeZone(date, timeZone, fmt);

    return (
      <>
        <Popover modal={false}>
          <PopoverTrigger asChild>
            <Button
              {...props}
              id="calendar-picker"
              ref={ref}
              variant={variant}
              size={size}
              className={cn('gap-6', className)}
              suppressHydrationWarning
            >
              <span>
                {date?.from ? (
                  date.to ? (
                    <>
                      <span>{formatWithTz(date.from, 'dd')}</span>{' '}
                      <span>{formatWithTz(date.from, 'MMM')}</span>{' '}
                      <span>{formatWithTz(date.from, 'yyyy')}</span>
                      {numberOfMonths === 2 && (
                        <>
                          {' - '}
                          <span>{formatWithTz(date.to, 'dd')}</span>{' '}
                          <span>{formatWithTz(date.to, 'MMM')}</span>{' '}
                          <span>{formatWithTz(date.to, 'yyyy')}</span>
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      <span>{formatWithTz(date.from, 'dd')}</span>{' '}
                      <span>{formatWithTz(date.from, 'MMM')}</span>{' '}
                      <span>{formatWithTz(date.from, 'yyyy')}</span>
                    </>
                  )
                ) : (
                  <span>Pick a date</span>
                )}
              </span>
              <ChevronDownIcon className="ml-auto size-4 text-muted-foreground" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto" align="end" sideOffset={8}>
            <div className="flex">
              {numberOfMonths === 2 && (
                <div className="hidden w-36 flex-col gap-1 border-foreground/10 pr-4 text-left md:flex">
                  {dateRanges.map(({ label, start, end }) => (
                    <Button
                      key={label}
                      variant="ghost"
                      size="sm"
                      className={cn(
                        'justify-start',
                        selectedRange === label &&
                          'bg-primary text-primary-foreground'
                      )}
                      onClick={() => {
                        selectDateRange(start, end, label);
                        setMonthFrom(start);
                      }}
                    >
                      {label}
                    </Button>
                  ))}
                </div>
              )}
              <div className="flex flex-col">
                <Calendar
                  mode="range"
                  defaultMonth={monthFrom}
                  month={monthFrom}
                  onMonthChange={setMonthFrom}
                  selected={date}
                  onSelect={handleDateSelect}
                  numberOfMonths={numberOfMonths}
                />
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </>
    );
  }
);

CalendarDatePicker.displayName = 'CalendarDatePicker';
