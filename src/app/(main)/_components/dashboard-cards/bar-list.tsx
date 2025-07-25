import * as React from 'react';

import { formatCompactNumber } from '@/lib/utilities';
import type { GetSummariesCategoryResponse } from '@/validators/api/summaries/response';

interface BarListProps {
  colors: string[];
  fallbackColor: string;
  categories: GetSummariesCategoryResponse;
}

export function Barlist({ colors, fallbackColor, categories }: BarListProps) {
  // merge data with colors
  const mappedData = React.useMemo(
    () =>
      categories.map((category, index) => ({
        name: category.name,
        amount: category.amount,
        fill: colors.at(index) ?? fallbackColor,
      })),
    [colors, fallbackColor, categories]
  );

  const widths = React.useMemo(() => {
    const maxValue = Math.max(...mappedData.map((item) => item.amount), 0);

    return mappedData.map((item) =>
      item.amount === 0 ? 0 : Math.max((item.amount / maxValue) * 100, 0)
    );
  }, [mappedData]);

  return (
    <div className="flex justify-between space-x-4">
      <div className="relative w-full space-y-1.5">
        {mappedData.map((category, index) => (
          <div
            key={index}
            className="group flex w-full items-center rounded-md bg-secondary/60 hover:bg-secondary"
          >
            <div
              className={
                'flex h-8 items-center rounded group-hover:bg-opacity-80'
              }
              style={{
                width: `${widths[index]}%`,
                backgroundColor: category.fill,
              }}
            >
              <div className="absolute left-0 flex w-full items-center justify-between px-4">
                <p className="truncate whitespace-nowrap text-sm">
                  {category.name}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="relative space-y-1.5">
        {mappedData.map((category, index) => (
          <div key={index} className={'flex h-8 items-center justify-end'}>
            <p className="truncate whitespace-nowrap text-muted-foreground text-sm tabular-nums leading-none">
              {formatCompactNumber(Math.abs(category.amount))}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
