import { z } from 'zod';

export const getSummariesResponse = z
  .object({
    date: z.coerce.string(),
    income: z.number(),
    expense: z.number(),
  })
  .array();

export type GetSummariesResponse = z.infer<typeof getSummariesResponse>;

export const getSummariesCategoryResponse = z
  .object({
    name: z.string(),
    amount: z.number(),
  })
  .array();

export type GetSummariesCategoryResponse = z.infer<
  typeof getSummariesCategoryResponse
>;
