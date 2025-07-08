import { selectBudgetPlansSchema } from '@/validators/db/budget-plans';
import { z } from 'zod';

export const budgetPlansDataSchema = selectBudgetPlansSchema
  .extend({
    total: z.number(),
    categories: z
      .object({
        id: z.string().uuid(),
        name: z.string(),
        amount: z.number(),
        spend: z.number(),
      })
      .array(),
  })
  .omit({
    userId: true,
    createdAt: true,
    updatedAt: true,
  });

export type BudgetPlansDataType = z.infer<typeof budgetPlansDataSchema>;

export const listBudgetPlansSummaryResponse = budgetPlansDataSchema.array();

export type ListBudgetPlansSummaryResponse = z.infer<
  typeof listBudgetPlansSummaryResponse
>;
