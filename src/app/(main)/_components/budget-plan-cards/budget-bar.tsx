import * as React from 'react';

import type { BudgetPlansDataType } from '@/validators/api/budget-plans/response';

import { Button } from '@/components/ui/button';
import { useCreateEditBudgetModal } from '@/hooks/store/create-edit-budget';
import { cn, formatCurrency } from '@/lib/utilities';

type CategoryType = BudgetPlansDataType['categories'][0];

interface BudgetBarProps {
  id: string;
  category: CategoryType;
}

export function BudgetBar({ id, category }: BudgetBarProps) {
  const store = useCreateEditBudgetModal();

  const onClick = () => {
    store.onOpen({ id });
  };

  const remaining = React.useMemo(
    () => category.amount + category.spend,
    [category]
  );

  const width = React.useMemo(
    () =>
      category.amount === 0
        ? 0
        : Math.max((remaining / category.amount) * 100, 0),
    [category, remaining]
  );

  return (
    <div className="grid gap-2">
      <div className="flex items-center">
        <div className="flex grow items-center gap-2">
          <Button variant="link" className="h-auto p-0" onClick={onClick}>
            <p className="truncate font-medium text-lg">{category.name}</p>
          </Button>
        </div>

        <p className="font-medium">{formatCurrency(category.amount)}</p>
      </div>
      <div className="group flex w-full items-center rounded-md bg-secondary">
        <div
          className={cn(
            'flex h-5 animate-shine items-center rounded-sm group-hover:bg-opacity-80',
            'bg-gradient-to-r from-40% from-orange-400 via-50% via-orange-300 to-60% to-orange-400 dark:from-orange-500 dark:via-orange-400 dark:to-orange-500',
            width >= 75 &&
              'bg-gradient-to-r from-40% from-emerald-400 via-50% via-emerald-300 to-60% to-emerald-400 dark:from-emerald-500 dark:via-emerald-400 dark:to-emerald-500',
            width <= 25 &&
              'bg-gradient-to-r from-40% from-red-400 via-50% via-red-300 to-60% to-red-400 dark:from-red-500 dark:via-red-400 dark:to-red-500'
          )}
          style={{
            backgroundSize: '200% 100%',
            width: `${width}%`,
          }}
        />
      </div>
      <div className="flex w-full items-center justify-between">
        <div className="flex flex-col items-start">
          <p
            className={cn(
              'hidden whitespace-nowrap text-muted-foreground/70 text-xs sm:block',
              remaining < 0 && 'text-red-500/70'
            )}
          >
            Usage
          </p>
          <p
            className={cn(
              'hidden whitespace-nowrap text-muted-foreground text-sm sm:block',
              remaining < 0 && 'text-red-500'
            )}
          >
            {formatCurrency(Math.abs(category.spend))}
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
