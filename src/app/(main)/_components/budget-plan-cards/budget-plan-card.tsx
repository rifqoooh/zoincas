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
  budget: BudgetPlansDataType;
}

export function BudgetPlanCard({ budget }: BudgetPlanCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between ">
        <div className="grid gap-2">
          <CardTitle className="truncate tracking-wide">
            {budget.title}
          </CardTitle>
          <CardDescription className="flex flex-wrap gap-1">
            <span className="text-nowrap">Total amount:</span>
            <span>{formatCurrency(budget.total)}</span>
          </CardDescription>
        </div>
        <CardActions budget={budget} />
      </CardHeader>
      <CardContent className="grid gap-2 px-6">
        <BudgetBarList budget={budget} />
      </CardContent>
    </Card>
  );
}
