import type { Metadata } from 'next';

import { Container } from '@/components/container';
import { CreateBudgetPlanButton } from '@/components/modal/create-edit-budget-plan/button';
import { Separator } from '@/components/ui/separator';
import { createMetadata } from '@/lib/seo/metadata';
import { BudgetPlanCards } from '../_components/budget-plan-cards';

export const metadata: Metadata = createMetadata({
  title: 'Budgets',
  description:
    'Zoincas is a personal financial management app powered with AI.',
});

export default function BudgetsPage() {
  return (
    <Container>
      <div className="flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl uppercase">Budget Plans</h1>
          <p className=" text-muted-foreground sm:text-sm/6">
            Budgeting your incomes and expenses for tracking your transactions
          </p>
        </div>

        <CreateBudgetPlanButton />
      </div>

      <Separator />

      <div className="grid gap-4 py-6">
        <BudgetPlanCards />
      </div>
    </Container>
  );
}
