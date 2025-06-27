import { desc, eq, sum } from 'drizzle-orm';

import { db } from '@/lib/db';
import { budgetCategories, budgetPlans, transactions } from '@/lib/db/schema';
import { coalesce, jsonAggBuildObject } from '@/lib/db/utilities';

export const listBudgetPlansSummary = async (userId: string) => {
  const summary = db.$with('budget_plan_categories_summary').as(
    db
      .select({
        id: budgetPlans.id,
        categoryId: budgetCategories.id,
        name: budgetCategories.name,
        amount: budgetCategories.amount,
        spend: coalesce(sum(transactions.amount), 0)
          .mapWith(Number)
          .as('spend'),
      })
      .from(budgetCategories)
      .innerJoin(budgetPlans, eq(budgetCategories.budgetPlanId, budgetPlans.id))
      .leftJoin(
        transactions,
        eq(budgetCategories.id, transactions.budgetCategoryId)
      )
      .where(eq(budgetPlans.userId, userId))
      .groupBy(budgetCategories.id)
  );

  const data = await db
    .with(summary)
    .select({
      id: budgetPlans.id,
      title: budgetPlans.title,
      total: coalesce(sum(summary.amount), 0).mapWith(Number).as('total'),
      categories: jsonAggBuildObject(
        {
          id: summary.categoryId,
          name: summary.name,
          amount: summary.amount,
          spend: summary.spend,
        },
        {
          orderBy: { colName: summary.name, direction: 'ASC' },
          notNullColumn: 'id',
        }
      ),
    })
    .from(budgetPlans)
    .leftJoin(summary, eq(budgetPlans.id, summary.id))
    .where(eq(budgetPlans.userId, userId))
    .groupBy(budgetPlans.id)
    .orderBy(desc(budgetPlans.createdAt));

  return data;
};
