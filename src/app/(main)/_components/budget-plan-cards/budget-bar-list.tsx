import * as React from 'react';

import type { BudgetPlansDataType } from '@/validators/api/budget-plans/response';

import { Button } from '@/components/ui/button';
import { BudgetBar } from './budget-bar';

interface BarListProps {
  data: BudgetPlansDataType;
}

export function BudgetBarList({ data }: BarListProps) {
  const [isExpanded, setIsExpanded] = React.useState(false);

  if (data.categories.length === 0) {
    return (
      <div className="flex h-20 items-center justify-center rounded-md bg-muted p-4">
        <p className="text-center text-muted-foreground">No categories</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="grid w-full gap-6 xl:grid-cols-2">
        {data.categories.map((category, index) => {
          if (index >= 4 && !isExpanded) {
            return null;
          }

          return <BudgetBar key={category.id} id={data.id} data={category} />;
        })}
      </div>

      {data.categories.length > 4 && (
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <p>{isExpanded ? 'Show less' : 'Show more'}</p>
        </Button>
      )}
    </div>
  );
}
