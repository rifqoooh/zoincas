import { BalanceFilter } from './balance-filter';
import { DateRangeFilter } from './date-range-filter';

export function FacetedFilter() {
  return (
    <div className="flex w-full gap-2 lg:w-auto">
      <DateRangeFilter />
      <BalanceFilter />
    </div>
  );
}
