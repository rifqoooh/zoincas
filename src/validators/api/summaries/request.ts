import { z } from 'zod';

export const getSummariesQuery = z.object({
  startDate: z.coerce.date().optional(),
  endDate: z.coerce.date().optional(),
  balance: z.string().optional(),
});

export type GetSummariesQuery = z.infer<typeof getSummariesQuery>;
