import { and, eq } from 'drizzle-orm';

import { db } from '@/lib/db';
import { budgetCategories, budgetPlans } from '@/lib/db/schema';

export const deleteBudgetCategory = async (
  userId: string,
  budgetCategoryId: string
) => {
  const category = db.$with('budget_category_id').as(
    db
      .select({
        id: budgetCategories.id,
      })
      .from(budgetCategories)
      .innerJoin(budgetPlans, eq(budgetCategories.budgetPlanId, budgetPlans.id))
      .where(
        and(
          eq(budgetPlans.userId, userId),
          eq(budgetCategories.id, budgetCategoryId)
        )
      )
      .limit(1)
  );

  const [data] = await db
    .with(category)
    .delete(budgetCategories)
    .where(eq(budgetCategories.id, db.select().from(category)))
    .returning();

  return data;
};
