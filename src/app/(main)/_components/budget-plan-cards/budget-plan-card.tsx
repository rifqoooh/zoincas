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
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="grid gap-2">
          <CardDescription>{data.title}</CardDescription>
          <CardTitle>{formatCurrency(data.total)}</CardTitle>
        </div>
        <CardActions id={data.id} />
      </CardHeader>
      <CardContent className="grid gap-2 px-6">
        <BudgetBarList data={data.categories} />
      </CardContent>
    </Card>
  );
}
