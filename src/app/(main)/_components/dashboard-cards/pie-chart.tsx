import * as React from 'react';
import * as remeda from 'remeda';

import type {
  ChartConfig,
  ChartTooltipContentProps,
} from '@/components/ui/charts';
import type { GetSummariesCategoryResponse } from '@/validators/api/summaries/response';

import { Label, Pie, PieChart as RechartsPieChart } from 'recharts';

import { CardTitle } from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/charts';
import { formatCurrency } from '@/lib/utilities';

interface PieChartProps {
  colors: string[];
  fallbackColor: string;
  categories: GetSummariesCategoryResponse;
}

export function PieChart({ colors, fallbackColor, categories }: PieChartProps) {
  // merge data with colors
  const mappedData = React.useMemo(
    () =>
      categories.map((category, index) => ({
        name: category.name.toLowerCase(),
        amount: category.amount,
        fill: colors.at(index) ?? fallbackColor,
      })),
    [colors, fallbackColor, categories]
  );

  const totalAmount = React.useMemo(() => {
    return categories.reduce((acc, category) => acc + category.amount, 0);
  }, [categories]);

  const chartConfig = React.useMemo(() => {
    return remeda.mapToObj(categories, (category) => [
      String(category.name.toLowerCase()),
      { label: category.name },
    ]) satisfies ChartConfig;
  }, [categories]);

  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto aspect-square h-[300px]"
    >
      <RechartsPieChart>
        <ChartTooltip
          cursor={false}
          content={(props: ChartTooltipContentProps) => (
            <ChartTooltipContent
              {...props}
              valueFormatter={(value) => formatCurrency(value)}
              hideLabel
            />
          )}
        />
        <Pie
          data={mappedData}
          nameKey="name"
          dataKey="amount"
          innerRadius={105}
          strokeWidth={5}
          startAngle={90}
          endAngle={-270}
          cornerRadius={5}
          paddingAngle={2}
        >
          <Label
            position="center"
            viewBox={{ cx: 150, cy: 145 }}
            content={({ viewBox }) => {
              if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                return (
                  <>
                    <foreignObject
                      x={0}
                      y={(viewBox.cy || 0) - 14}
                      className="w-full overflow-visible text-center"
                    >
                      <CardTitle className="line-clamp-1 break-all text-xl">
                        {formatCurrency(totalAmount)}
                      </CardTitle>
                    </foreignObject>

                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) + 24}
                        className="fill-muted-foreground text-sm"
                      >
                        Total amount
                      </tspan>
                    </text>
                  </>
                );
              }
            }}
          />
        </Pie>
      </RechartsPieChart>
    </ChartContainer>
  );
}
