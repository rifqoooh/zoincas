import { createSchemaFactory } from 'drizzle-zod';
import z from 'zod';

import { budgetCategories } from '@/lib/db/schema';

const { createInsertSchema, createUpdateSchema } = createSchemaFactory({
  coerce: {
    date: true,
  },
});

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
