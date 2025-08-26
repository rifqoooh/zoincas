'use client';

import * as React from 'react';

import { parseAsIsoDate, useQueryStates } from 'nuqs';

import { CalendarDatePicker } from '@/components/calendar-date-picker';
import { subDays } from 'date-fns';

export function DateRangeFilter() {
  const defaultDate = React.useMemo(() => {
    const now = new Date();
    return { from: subDays(now, 30), to: now };
  }, []);

  const [search, setSearch] = useQueryStates({
    start: parseAsIsoDate.withDefault(defaultDate.from),
    end: parseAsIsoDate.withDefault(defaultDate.to),
  });

  const [selectedDateRange, setSelectedDateRange] = React.useState({
    from: new Date(search.start),
    to: new Date(search.end),
  });

  const onDateSelect = React.useCallback(
    (range: { from: Date; to: Date }) => {
      setSelectedDateRange(range);
      setSearch({
        start: range.from,
        end: range.to,
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
