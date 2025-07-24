import { z } from 'zod';

export const summariesDataSchema = z.object({
  date: z.coerce.string(),
  income: z.number(),
  expense: z.number(),
});

export type SummariesDataType = z.infer<typeof summariesDataSchema>;

export const getSummariesResponse = summariesDataSchema.array();

export type GetSummariesResponse = z.infer<typeof getSummariesResponse>;
