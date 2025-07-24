import { z } from 'zod';

export const getSummariesQuery = z.object({
  startDate: z.coerce.number().optional(), // date timestamp
  endDate: z.coerce.number().optional(), // date timestamp
  balance: z.string().optional(),
});

export type GetSummariesQuery = z.infer<typeof getSummariesQuery>;
