'use client';

import * as React from 'react';

import { parseAsString, useQueryStates } from 'nuqs';

import { CalendarDatePicker } from '@/components/calendar-date-picker';
import { format, subDays } from 'date-fns';

export function DateRangeFilter() {
  const defaultDate = React.useMemo(() => {
    const now = new Date();
    return { from: subDays(now, 30), to: now };
  }, []);

  const [search, setSearch] = useQueryStates({
    start: parseAsString.withDefault(format(defaultDate.from, 'yyyy-MM-dd')),
    end: parseAsString.withDefault(format(defaultDate.to, 'yyyy-MM-dd')),
  });

  const [selectedDateRange, setSelectedDateRange] = React.useState({
    from: new Date(search.start),
    to: new Date(search.end),
  });

  const onDateSelect = React.useCallback(
    (range: { from: Date; to: Date }) => {
      setSelectedDateRange(range);
      setSearch({
        start: format(range.from, 'yyyy-MM-dd'),
        end: format(range.to, 'yyyy-MM-dd'),
      });
    },
    [setSearch]
  );

  return (
    <CalendarDatePicker
      variant="outline"
      size="sm"
      date={selectedDateRange}
      onDateSelect={onDateSelect}
    />
  );
}
