import { and, desc, eq, sum } from 'drizzle-orm';
import { z } from 'zod';

import { db } from '@/lib/db';
import { budgetCategories, budgetPlans, transactions } from '@/lib/db/schema';
import { coalesce, jsonAggBuildObject } from '@/lib/db/utilities';
import type {
  InsertBudgetPlansType,
  UpdateBudgetPlansType,
} from '@/validators/db/budget-plans';

export const listBudgetPlansSummary = async (userId: string) => {
  const summary = db.$with('budget_plan_categories_summary').as(
    db
      .select({
        id: budgetCategories.budgetPlanId,
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
      .orderBy(desc(budgetCategories.createdAt))
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
      ).as('categories'),
    })
    .from(budgetPlans)
    .leftJoin(summary, eq(budgetPlans.id, summary.id))
    .where(eq(budgetPlans.userId, userId))
    .groupBy(budgetPlans.id)
    .orderBy(desc(budgetPlans.createdAt));

  return data;
};

export const createBudgetPlan = async (
  userId: string,
  budgetPlan: InsertBudgetPlansType
) => {
  const data = await db.transaction(async (tx) => {
    // create budget plan
    const [plan] = await tx
      .insert(budgetPlans)
      .values({
        title: budgetPlan.title,
        userId,
      })
      .returning();

    // create budget categories
    if (budgetPlan.categories.length) {
      for (const category of budgetPlan.categories) {
        await tx.insert(budgetCategories).values({
          budgetPlanId: plan.id,
          name: category.name,
          amount: category.amount,
        });
      }
    }

    return plan;
  });

  return data;
};

export const getBudgetPlan = async (userId: string, budgetPlanId: string) => {
  const summary = db.$with('budget_plan_categories_summary').as(
    db
      .select({
        id: budgetCategories.budgetPlanId,
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
      .where(
        and(eq(budgetPlans.userId, userId), eq(budgetPlans.id, budgetPlanId))
      )
      .groupBy(budgetCategories.id)
      .orderBy(desc(budgetCategories.createdAt))
  );

  const [data] = await db
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
    .where(
      and(eq(budgetPlans.userId, userId), eq(budgetPlans.id, budgetPlanId))
    )
    .groupBy(budgetPlans.id)
    .orderBy(desc(budgetPlans.createdAt))
    .limit(1);

  return data;
};

export const updateBudgetPlan = async (
  userId: string,
  budgetPlanId: string,
  input: UpdateBudgetPlansType
) => {
  const data = await db.transaction(async (tx) => {
    const [plan] = await tx
      .update(budgetPlans)
      .set({
        title: input.title,
      })
      .where(
        and(eq(budgetPlans.userId, userId), eq(budgetPlans.id, budgetPlanId))
      )
      .returning();

    // update budget categories
    if (input.categories.length) {
      for (const category of input.categories) {
        // if category id is UUID
        const parsedCategoryId = z.string().uuid().safeParse(category.id);
        // If it is UUID we know it is an existing category to update
        if (parsedCategoryId.success) {
          await tx
            .update(budgetCategories)
            .set({
              name: category.name,
              amount: category.amount,
            })
            .where(eq(budgetCategories.id, parsedCategoryId.data));
        } else {
          // If it is not UUID we know it is a new category to create
          await tx.insert(budgetCategories).values({
            name: category.name,
            amount: category.amount,
            budgetPlanId: plan.id,
          });
        }
      }
    }

    return plan;
  });

  return data;
};

export const deleteBudgetPlan = async (
  userId: string,
  budgetPlanId: string
) => {
  const [data] = await db
    .delete(budgetPlans)
    .where(
      and(eq(budgetPlans.userId, userId), eq(budgetPlans.id, budgetPlanId))
    )
    .returning();

  return data;
};
