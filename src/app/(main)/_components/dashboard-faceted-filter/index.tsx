import { BalanceFilter } from './balance-filter';
import { DateRangeFilter } from './date-range-filter';

export function FacetedFilter() {
  return (
    <div className="flex w-full flex-col gap-2 sm:flex-row lg:w-auto">
      <DateRangeFilter />
      <BalanceFilter />
    </div>
  );
}
