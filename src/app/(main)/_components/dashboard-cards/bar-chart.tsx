import type {
  ChartConfig,
  ChartTooltipContentProps,
} from '@/components/ui/charts';
import type { GetSummariesResponse } from '@/validators/api/summaries/response';

import {
  Bar,
  CartesianGrid,
  BarChart as RechartsBarChart,
  ReferenceLine,
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

interface BarChartProps {
  summaries: GetSummariesResponse;
}

const chartConfig = {
  income: {
    label: 'Income',
  },
  expense: {
    label: 'Expense',
  },
} satisfies ChartConfig;

export function BarChart({ summaries }: BarChartProps) {
  return (
    <ChartContainer config={chartConfig}>
      <RechartsBarChart data={summaries} stackOffset="sign" accessibilityLayer>
        <CartesianGrid horizontal={false} vertical={false} />
        <XAxis
          dataKey="date"
          tickLine={false}
          axisLine={false}
          tickMargin={10}
          ticks={[summaries.at(0)?.date ?? '', summaries.at(-1)?.date ?? '']}
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
        <ReferenceLine y={0} stroke="var(--muted-foreground)" opacity={0.2} />
        <Bar
          dataKey="income"
          stackId="a"
          fill="#22c55e"
          radius={[4, 4, 0, 0]}
        />
        <Bar
          dataKey="expense"
          stackId="a"
          fill="#ef4444"
          radius={[4, 4, 0, 0]}
        />
      </RechartsBarChart>
    </ChartContainer>
  );
}
