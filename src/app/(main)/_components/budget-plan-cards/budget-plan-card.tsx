import type { BudgetPlansDataType } from '@/validators/api/budget-plans/response';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { formatCurrency } from '@/lib/utilities';
import { BudgetBarList } from './budget-bar-list';
import { CardActions } from './card-actions';

interface BudgetPlanCardProps {
  data: BudgetPlansDataType;
}

export function BudgetPlanCard({ data }: BudgetPlanCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between ">
        <div className="grid gap-2">
          <CardTitle className="truncate tracking-wide">{data.title}</CardTitle>
          <CardDescription className="flex flex-wrap gap-1">
            <span className="text-nowrap">Total amount:</span>
            <span>{formatCurrency(data.total)}</span>
          </CardDescription>
        </div>
        <CardActions data={data} />
      </CardHeader>
      <CardContent className="grid gap-2 px-6">
        <BudgetBarList data={data} />
      </CardContent>
    </Card>
  );
}
