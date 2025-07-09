import { createSchemaFactory } from 'drizzle-zod';
import type { z } from 'zod';

import { budgetPlans } from '@/lib/db/schema';
import { insertBudgetCategoriesSchema } from './budget-categories';

const { createSelectSchema, createInsertSchema, createUpdateSchema } =
  createSchemaFactory({
    coerce: {
      date: true,
    },
  });

export const selectBudgetPlansSchema = createSelectSchema(budgetPlans);

export type SelectBudgetPlansType = z.infer<typeof selectBudgetPlansSchema>;

export const insertBudgetPlansSchema = createInsertSchema(budgetPlans)
  .extend({
    categories: insertBudgetCategoriesSchema.array(),
  })
  .omit({
    id: true,
    userId: true,
    createdAt: true,
    updatedAt: true,
  });

export type InsertBudgetPlansType = z.infer<typeof insertBudgetPlansSchema>;

export const updateBudgetPlansSchema = createUpdateSchema(budgetPlans)
  .extend({
    categories: insertBudgetCategoriesSchema.array(),
  })
  .omit({
    id: true,
    userId: true,
    createdAt: true,
    updatedAt: true,
  });

export type UpdateBudgetPlansType = z.infer<typeof updateBudgetPlansSchema>;
