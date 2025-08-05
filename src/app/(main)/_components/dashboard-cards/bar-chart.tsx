import * as React from 'react';

import type {
  ChartConfig,
  ChartTooltipContentProps,
} from '@/components/ui/charts';
import type { GetSummariesResponse } from '@/validators/api/summaries/response';

import {
  Bar,
  CartesianGrid,
  BarChart as RechartsBarChart,
  Rectangle,
  XAxis,
} from 'recharts';

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/charts';
import { formatCurrency } from '@/lib/utilities';
import { format } from 'date-fns';

interface BarChartProps {
  summaries: GetSummariesResponse;
}

export function BarChart({ summaries }: BarChartProps) {
  const mappedData = React.useMemo(() => {
    return summaries.map((summary) => ({
      date: format(summary.date, 'dd MMM yyyy'),
      income: summary.income,
      expense: summary.expense,
    }));
  }, [summaries]);

  const chartConfig = React.useMemo(() => {
    return {
      income: {
        label: 'Income',
      },
      expense: {
        label: 'Expense',
      },
    } satisfies ChartConfig;
  }, []);

  const ticks = React.useMemo(() => {
    const data = [mappedData.at(0)?.date ?? ''];
    if (mappedData.length > 1) {
      data.push(mappedData.at(-1)?.date ?? '');
    }

    return data;
  }, [mappedData]);

  return (
    <ChartContainer config={chartConfig} className="size-full">
      <RechartsBarChart data={mappedData} stackOffset="sign" accessibilityLayer>
        <CartesianGrid horizontal={false} vertical={false} />
        <XAxis
          dataKey="date"
          tickLine={false}
          axisLine={false}
          tickMargin={10}
          ticks={ticks}
          interval={'preserveStartEnd'}
        />
        <ChartTooltip
          content={(props: ChartTooltipContentProps) => (
            <ChartTooltipContent
              {...props}
              valueFormatter={(value) => formatCurrency(value)}
            />
          )}
        />
        <ChartLegend
          content={<ChartLegendContent />}
          verticalAlign="top"
          className="justify-end"
        />
        <Bar
          dataKey="income"
          stackId="a"
          fill="#22c55e"
          radius={6}
          shape={<BarGap />}
        />
        <Bar
          dataKey="expense"
          stackId="a"
          fill="#ef4444"
          radius={6}
          shape={<BarGap />}
        />
      </RechartsBarChart>
    </ChartContainer>
  );
}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
function BarGap(props: any) {
  const gap = 4;
  const adjustedY =
    props.dataKey === 'income' ? props.y - gap / 2 : props.y + gap / 2;

  return <Rectangle {...props} y={adjustedY} />;
}
