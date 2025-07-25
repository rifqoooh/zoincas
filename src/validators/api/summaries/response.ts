import { z } from 'zod';

export const getSummariesResponse = z
  .object({
    date: z.coerce.string(),
    income: z.number(),
    expense: z.number(),
  })
  .array();

export type GetSummariesResponse = z.infer<typeof getSummariesResponse>;

export const getSummariesIncomeExpenseResponse = z.object({
  income: z.number(),
  expense: z.number(),
  remaining: z.number(),
});

export type GetSummariesIncomeExpenseResponse = z.infer<
  typeof getSummariesIncomeExpenseResponse
>;

export const getSummariesCategoryResponse = z
  .object({
    name: z.string(),
    amount: z.number(),
  })
  .array();

export type GetSummariesCategoryResponse = z.infer<
  typeof getSummariesCategoryResponse
>;
