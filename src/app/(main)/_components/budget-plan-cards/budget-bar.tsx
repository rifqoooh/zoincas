import * as React from 'react';

import type { BudgetPlansDataType } from '@/validators/api/budget-plans/response';

import { SquarePenIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn, formatCurrency } from '@/lib/utilities';

type CategoryType = BudgetPlansDataType['categories'][0];

interface BudgetBarProps {
  data: CategoryType;
}

export function BudgetBar({ data }: BudgetBarProps) {
  const remaining = React.useMemo(() => data.amount + data.spend, [data]);

  const width = React.useMemo(
    () =>
      data.amount === 0
        ? 0
        : 100 - Math.max((remaining / data.amount) * 100, 0),
    [data, remaining]
  );

  return (
    <div className="grid gap-2">
      <div className="flex items-center">
        <div className="flex grow items-center gap-2">
          <Button className="size-8 gap-2" variant="outline" size="icon">
            <SquarePenIcon className="size-4" />
          </Button>
          <h1 className="truncate font-medium text-lg">{data.name}</h1>
        </div>

        <p className="font-medium">{formatCurrency(data.amount)}</p>
      </div>
      <div className="group flex w-full items-center rounded-md bg-secondary">
        <div
          className={cn(
            'flex h-5 items-center rounded-sm bg-orange-400 group-hover:bg-opacity-80',
            width <= 35 && 'bg-emerald-400',
            width >= 75 && 'bg-rose-400',
            remaining < 0 && 'bg-red-500'
          )}
          style={{
            width: `${width}%`,
          }}
        />
      </div>
      <div className="flex w-full items-center justify-between">
        <div className="flex flex-col items-start">
          <p className="hidden whitespace-nowrap text-muted-foreground/70 text-xs sm:block">
            Usage
          </p>
          <p className="hidden whitespace-nowrap text-muted-foreground text-sm sm:block">
            {formatCurrency(Math.abs(data.spend))}
          </p>
        </div>

        <div className="flex flex-col items-end">
          <p
            className={cn(
              'hidden whitespace-nowrap text-muted-foreground/70 text-xs sm:block',
              remaining < 0 && 'text-red-500/70'
            )}
          >
            {remaining >= 0 ? 'Remaining' : 'Over budget'}
          </p>
          <p
            className={cn(
              'whitespace-nowrap text-muted-foreground text-sm',
              remaining < 0 && 'text-red-500'
            )}
          >
            {formatCurrency(remaining)}
          </p>
        </div>
      </div>
    </div>
  );
}
