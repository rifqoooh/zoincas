import { createSchemaFactory } from 'drizzle-zod';
import z from 'zod';

import { budgetCategories } from '@/lib/db/schema';

const { createSelectSchema, createInsertSchema, createUpdateSchema } =
  createSchemaFactory({
    coerce: {
      date: true,
    },
  });

export const selectBudgetCategoriesSchema =
  createSelectSchema(budgetCategories);

export type SelectBudgetCategoriesType = z.infer<
  typeof selectBudgetCategoriesSchema
>;

export const insertBudgetCategoriesSchema = createInsertSchema(budgetCategories)
  .extend({
    amount: z.coerce.number(),
  })
  .omit({
    budgetPlanId: true,
    createdAt: true,
    updatedAt: true,
  });

export type InsertBudgetCategoriesType = z.infer<
  typeof insertBudgetCategoriesSchema
>;

export const updateBudgetCategoriesSchema = createUpdateSchema(budgetCategories)
  .extend({
    amount: z.coerce.number().optional(),
  })
  .omit({
    budgetPlanId: true,
    createdAt: true,
    updatedAt: true,
  });

export type UpdateBudgetCategoriesType = z.infer<
  typeof updateBudgetCategoriesSchema
>;
