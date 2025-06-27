'use client';

import * as React from 'react';

import { CalendarDate } from '@internationalized/date';
import type { DateSegment as IDateSegment } from '@react-stately/datepicker';
import type {
  AriaDatePickerProps,
  AriaTimeFieldProps,
  CalendarProps,
  DateValue,
  TimeValue,
} from 'react-aria';
import type {
  CalendarState,
  DateFieldState,
  DatePickerState,
  DatePickerStateOptions,
  TimeFieldStateOptions,
} from 'react-stately';

import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utilities';
import {
  isToday as _isToday,
  createCalendar,
  fromDate,
  getLocalTimeZone,
  getWeeksInMonth,
  parseDateTime,
  toCalendarDate,
  toCalendarDateTime,
} from '@internationalized/date';
import { format, setMonth } from 'date-fns';
import {
  CalendarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  XIcon,
} from 'lucide-react';
import {
  useButton,
  useCalendar,
  useCalendarCell,
  useCalendarGrid,
  useDateField,
  useDatePicker,
  useDateSegment,
  useLocale,
  useTimeField,
} from 'react-aria';
import {
  useCalendarState,
  useDateFieldState,
  useDatePickerState,
  useTimeFieldState,
} from 'react-stately';

interface SelectMonthProps {
  focusedDate: CalendarDate;
  onChangeMonth: (month: number) => void;
  className?: string;
}

function SelectMonth({
  focusedDate,
  onChangeMonth,
  className,
}: SelectMonthProps) {
  const months = React.useMemo(
    () => [
      { value: 1, label: 'January' },
      { value: 2, label: 'February' },
      { value: 3, label: 'March' },
      { value: 4, label: 'April' },
      { value: 5, label: 'May' },
      { value: 6, label: 'June' },
      { value: 7, label: 'July' },
      { value: 8, label: 'August' },
      { value: 9, label: 'September' },
      { value: 10, label: 'October' },
      { value: 11, label: 'November' },
      { value: 12, label: 'December' },
    ],
    []
  );

  const [month, setMonth] = React.useState(focusedDate.month);

  const onSelect = (month: number) => {
    setMonth(month);
    onChangeMonth(month);
  };

  return (
    <>
      <Select
        value={month.toString()}
        onValueChange={(value) => onSelect(Number(value))}
      >
        <SelectTrigger className={cn('data-[size=default]:h-7', className)}>
          <SelectValue aria-label={months[month - 1].label}>
            <p className="text-xs">{months[month - 1].label}</p>
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {months.map((month) => (
            <SelectItem
              key={month.value}
              value={month.value.toString()}
              className="text-xs"
            >
              {month.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
}

interface SelectYearProps {
  focusedDate: CalendarDate;
  onChangeYear: (year: number) => void;
  className?: string;
}

function SelectYear({ focusedDate, onChangeYear, className }: SelectYearProps) {
  const years = React.useMemo(
    () => Array.from({ length: 10 }, (_, i) => i + focusedDate.year - 5),
    [focusedDate.year]
  );

  const [year, setYear] = React.useState(focusedDate.year);

  const onSelect = (year: number) => {
    setYear(year);
    onChangeYear(year);
  };

  return (
    <>
      <Select
        value={year.toString()}
        onValueChange={(value) => onSelect(Number(value))}
      >
        <SelectTrigger className={cn('data-[size=default]:h-7', className)}>
          <SelectValue aria-label={year.toString()}>
            <p className="text-xs">{year}</p>
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {years.map((year) => (
            <SelectItem key={year} value={year.toString()} className="text-xs">
              {year}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  );
}

function Calendar(props: CalendarProps<DateValue>) {
  const prevButtonRef = React.useRef<HTMLButtonElement | null>(null);
  const nextButtonRef = React.useRef<HTMLButtonElement | null>(null);

  const { year, month } = React.useMemo(() => {
    const date = new Date();
    return { year: date.getFullYear(), month: date.getMonth() + 1 };
  }, []);
  const calendarDate = new CalendarDate(year, month, 1);
  const [focusedDate, setFocusedDate] = React.useState(calendarDate);

  const onChangeMonth = (month: number) => {
    setFocusedDate(focusedDate.set({ month }));
  };

  const onChangeYear = (year: number) => {
    setFocusedDate(focusedDate.set({ year }));
  };

  const { locale } = useLocale();
  const state = useCalendarState({
    ...props,
    focusedValue: focusedDate,
    onFocusChange: setFocusedDate,
    locale,
    createCalendar,
  });
  const {
    calendarProps,
    prevButtonProps: _prevButtonProps,
    nextButtonProps: _nextButtonProps,
  } = useCalendar(props, state);
  const { buttonProps: prevButtonProps } = useButton(
    _prevButtonProps,
    prevButtonRef
  );
  const { buttonProps: nextButtonProps } = useButton(
    _nextButtonProps,
    nextButtonRef
  );

  return (
    <div {...calendarProps} className="space-y-4">
      <div className="flex items-center justify-between gap-2 pt-1">
        <Button
          {...prevButtonProps}
          ref={prevButtonRef}
          variant="outline"
          className={cn(
            'size-7 bg-transparent p-0 opacity-50 hover:opacity-100'
          )}
        >
          <ChevronLeftIcon className="size-4" />
        </Button>
        <SelectMonth
          focusedDate={focusedDate}
          onChangeMonth={onChangeMonth}
          className="grow ps-2.5 pe-1.5"
        />
        <SelectYear
          focusedDate={focusedDate}
          onChangeYear={onChangeYear}
          className="w-20 ps-2.5 pe-1.5"
        />
        <Button
          {...nextButtonProps}
          ref={nextButtonRef}
          variant="outline"
          className={cn(
            'size-7 bg-transparent p-0 opacity-50 hover:opacity-100'
          )}
        >
          <ChevronRightIcon className="size-4" />
        </Button>
      </div>
      <CalendarGrid state={state} />
    </div>
  );
}

interface CalendarGridProps {
  state: CalendarState;
}

function CalendarGrid({ state, ...props }: CalendarGridProps) {
  const { locale } = useLocale();
  const { gridProps, headerProps, weekDays } = useCalendarGrid(props, state);

  // Get the number of weeks in the month so we can render the proper number of rows.
  const weeksInMonth = getWeeksInMonth(state.visibleRange.start, locale);

  return (
    <table
      {...gridProps}
      className={cn(gridProps.className, 'w-full border-collapse space-y-1')}
    >
      <thead {...headerProps}>
        <tr className="flex">
          {weekDays.map((day, index) => (
            <th
              className="w-9 rounded-md font-normal text-[0.8rem] text-muted-foreground"
              key={index}
            >
              {day}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {[...new Array(weeksInMonth).keys()].map((weekIndex) => (
          <tr className="mt-2 flex w-full" key={weekIndex}>
            {state
              .getDatesInWeek(weekIndex)
              .map((date, i) =>
                date ? (
                  <CalendarCell key={i} state={state} date={date} />
                ) : (
                  <td key={i} />
                )
              )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

interface CalendarCellProps {
  state: CalendarState;
  date: CalendarDate;
}

function CalendarCell({ state, date }: CalendarCellProps) {
  const ref = React.useRef<HTMLButtonElement | null>(null);
  const {
    cellProps,
    buttonProps,
    isSelected,
    isOutsideVisibleRange,
    isDisabled,
    formattedDate,
  } = useCalendarCell({ date }, state, ref);

  const isToday = React.useMemo(() => {
    const timezone = getLocalTimeZone();
    return _isToday(date, timezone);
  }, [date]);

  return (
    <td
      {...cellProps}
      className={cn(
        cellProps.className,
        'relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md'
      )}
    >
      <Button
        {...buttonProps}
        type="button"
        variant="ghost"
        ref={ref}
        className={cn(
          buttonProps.className,
          'size-9',
          isToday && 'bg-accent text-accent-foreground',
          isSelected &&
            'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground dark:hover:bg-primary dark:hover:text-primary-foreground',
          isOutsideVisibleRange && 'text-muted-foreground opacity-50',
          isDisabled && 'text-muted-foreground opacity-50'
        )}
      >
        {formattedDate}
      </Button>
    </td>
  );
}

function changeSeparatorSegment(segment: IDateSegment, text?: string) {
  return {
    ...segment,
    text: text || segment.text,
  };
}

function formatDateSegments(segments: IDateSegment[]): IDateSegment[] {
  const daySegment = segments.find((segment) => segment.type === 'day');
  const monthSegment = segments.find((segment) => segment.type === 'month');
  const yearSegment = segments.find((segment) => segment.type === 'year');

  const hourSegment = segments.find((segment) => segment.type === 'hour');
  const minuteSegment = segments.find((segment) => segment.type === 'minute');
  const dayPeriodSegment = segments.find(
    (segment) => segment.type === 'dayPeriod'
  );

  const separatorSegment = segments.find(
    (segment) => segment.type === 'literal'
  );

  if (
    !daySegment ||
    !monthSegment ||
    !yearSegment ||
    !hourSegment ||
    !minuteSegment ||
    !dayPeriodSegment ||
    !separatorSegment
  ) {
    throw new Error('Invalid date field segments');
  }

  const formattedDaySegment = {
    ...daySegment,
    text: daySegment.text.padStart(2, '0'),
  };
  const formattedMonthSegment = {
    ...monthSegment,
    text: format(setMonth(new Date(), Number(monthSegment.text) - 1), 'MMM'),
  };
  const formattedHourSegment = {
    ...hourSegment,
    text: hourSegment.text.padStart(2, '0'),
  };

  return [
    formattedDaySegment,
    changeSeparatorSegment(separatorSegment, ' '),
    formattedMonthSegment,
    changeSeparatorSegment(separatorSegment, ','),
    yearSegment,
    formattedHourSegment,
    changeSeparatorSegment(separatorSegment, ':'),
    minuteSegment,
    changeSeparatorSegment(separatorSegment, ' '),
    dayPeriodSegment,
  ];
}

interface DateSegmentProps {
  segment: IDateSegment;
  state: DateFieldState;
}

function DateSegment({ segment, state }: DateSegmentProps) {
  const ref = React.useRef(null);

  const {
    segmentProps: { ...segmentProps },
  } = useDateSegment(segment, state, ref);

  return (
    <div
      {...segmentProps}
      ref={ref}
      className={cn(
        'focus:rounded-[2px] focus:bg-accent focus:text-accent-foreground focus:outline-none',
        segment.type !== 'literal' && 'px-0.5',
        segment.type === 'hour' && 'ml-1',
        segment.isPlaceholder && 'text-muted-foreground'
      )}
    >
      {segment.text}
    </div>
  );
}

function DateField(props: AriaDatePickerProps<DateValue>) {
  const ref = React.useRef<HTMLDivElement | null>(null);

  const { locale } = useLocale();
  const state = useDateFieldState({
    ...props,
    locale,
    createCalendar,
  });
  const { fieldProps } = useDateField(
    { ...props, 'aria-label': 'date-field' },
    state,
    ref
  );

  return (
    <div
      {...fieldProps}
      ref={ref}
      className={cn(
        'inline-flex h-9 flex-1 items-center rounded-l-md border-input bg-transparent px-3 py-2 text-sm ring-offset-background focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50',
        props.isDisabled && 'cursor-not-allowed opacity-50'
      )}
    >
      {formatDateSegments(state.segments).map((segment, i) => (
        <DateSegment key={i} segment={segment} state={state} />
      ))}
      {state.isInvalid && <span aria-hidden="true">🚫</span>}
    </div>
  );
}

function TimeField(props: AriaTimeFieldProps<TimeValue>) {
  const ref = React.useRef<HTMLDivElement | null>(null);

  const { locale } = useLocale();
  const state = useTimeFieldState({
    ...props,
    locale,
  });
  const {
    fieldProps: { ...fieldProps },
    labelProps: _labelProps,
  } = useTimeField({ ...props, 'aria-label': 'time-field' }, state, ref);

  return (
    <div
      {...fieldProps}
      ref={ref}
      className={cn(
        'inline-flex h-10 w-full flex-1 rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/50',
        props.isDisabled && 'cursor-not-allowed opacity-50'
      )}
    >
      {state.segments.map((segment, i) => (
        <DateSegment key={i} segment={segment} state={state} />
      ))}
    </div>
  );
}

const TimePicker = React.forwardRef<
  HTMLDivElement,
  Omit<TimeFieldStateOptions<TimeValue>, 'locale'>
>((props, _forwardedRef) => {
  return <TimeField {...props} />;
});

TimePicker.displayName = 'TimePicker';

export type DateTimePickerRef = {
  divRef: HTMLDivElement | null;
  buttonRef: HTMLButtonElement | null;
  contentRef: HTMLDivElement | null;
  jsDate: Date | null;
  state: DatePickerState;
};

const DateTimePicker = React.forwardRef<
  DateTimePickerRef,
  DatePickerStateOptions<DateValue> & {
    jsDate?: Date | null;
    onJsDateChange?: (date: Date) => void;
    showClearButton?: boolean;
  }
>(({ jsDate, onJsDateChange, showClearButton = true, ...props }, ref) => {
  const divRef = React.useRef<HTMLDivElement | null>(null);
  const buttonRef = React.useRef<HTMLButtonElement | null>(null);
  const contentRef = React.useRef<HTMLDivElement | null>(null);
  const [jsDatetime, setJsDatetime] = React.useState(jsDate || null);

  const state = useDatePickerState(props);

  React.useImperativeHandle(ref, () => ({
    divRef: divRef.current,
    buttonRef: buttonRef.current,
    contentRef: contentRef.current,
    jsDate: jsDatetime,
    state,
  }));
  const {
    groupProps,
    fieldProps,
    buttonProps: _buttonProps,
    dialogProps,
    calendarProps,
  } = useDatePicker({ ...props, 'aria-label': 'date-picker' }, state, divRef);
  const { buttonProps } = useButton(_buttonProps, buttonRef);

  const currentValue = React.useCallback(() => {
    if (!jsDatetime) {
      return null;
    }

    const parsed = fromDate(jsDatetime, getLocalTimeZone());

    if (state.hasTime) {
      return toCalendarDateTime(parsed);
    }

    return toCalendarDate(parsed);
  }, [jsDatetime, state.hasTime]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  React.useEffect(() => {
    /**
     * If user types datetime, it will be a null value until we get the correct datetime.
     * This is controlled by react-aria.
     **/
    if (state.value) {
      const date = parseDateTime(state.value.toString()).toDate(
        getLocalTimeZone()
      );
      setJsDatetime(date);
      onJsDateChange?.(date);
    } else if (jsDate) {
      state.setValue(currentValue());
    }
  }, [state.value, onJsDateChange]);

  const onChangeTimeField = (value: TimeValue | null) => {
    if (value) {
      state.setTimeValue(value);
    }
  };

  return (
    <div
      {...groupProps}
      ref={divRef}
      className={cn(
        groupProps.className,
        'flex items-center rounded-md border ring-offset-background focus-within:border-ring focus-within:ring-[3px] focus-within:ring-ring/50'
      )}
    >
      <DateField {...fieldProps} value={currentValue()} />
      <div className={cn('-ml-2 mr-2 size-4', !showClearButton && 'hidden')}>
        <XIcon
          className={cn(
            'size-4 cursor-pointer text-primary/30',
            !jsDatetime && 'hidden'
          )}
          onClick={() => {
            setJsDatetime(null);
            state.setValue(null);
          }}
        />
      </div>
      <Popover open={props.isOpen} onOpenChange={props.onOpenChange}>
        <PopoverTrigger asChild>
          <Button
            {...buttonProps}
            type="button"
            tabIndex={-1}
            variant="ghost"
            size="icon"
            className="group rounded-l-none border-l"
            disabled={props.isDisabled}
            onClick={() => {
              state.setOpen(true);
            }}
          >
            <CalendarIcon className="size-4 text-muted-foreground group-hover:text-primary" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          ref={contentRef}
          align="end"
          sideOffset={8}
          className="w-full"
        >
          <div {...dialogProps} className="space-y-3">
            <Calendar {...calendarProps} />
            {state.hasTime && (
              <TimeField value={state.timeValue} onChange={onChangeTimeField} />
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
});

DateTimePicker.displayName = 'DateTimePicker';

export { DateTimePicker, TimePicker };
