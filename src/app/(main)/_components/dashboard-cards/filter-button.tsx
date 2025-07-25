'use client';

import * as React from 'react';

import { parseAsInteger, useQueryStates } from 'nuqs';

import { CalendarDatePicker } from '@/components/calendar-date-picker';
import { subDays } from 'date-fns';

export function FilterButton() {
  const defaultDate = React.useMemo(() => {
    const now = new Date();
    return { from: subDays(now, 30), to: now };
  }, []);

  const [search, setSearch] = useQueryStates({
    startDate: parseAsInteger.withDefault(defaultDate.from.getTime()),
    endDate: parseAsInteger.withDefault(defaultDate.to.getTime()),
  });

  const [selectedDateRange, setSelectedDateRange] = React.useState({
    from: new Date(search.startDate),
    to: new Date(search.endDate),
  });

  const onDateSelect = React.useCallback(
    (range: { from: Date; to: Date }) => {
      setSelectedDateRange(range);
      setSearch({
        startDate: range.from.getTime(),
        endDate: range.to.getTime(),
      });
    },
    [setSearch]
  );

  return (
    <CalendarDatePicker
      size="sm"
      variant="outline"
      date={selectedDateRange}
      onDateSelect={onDateSelect}
    />
  );
}
