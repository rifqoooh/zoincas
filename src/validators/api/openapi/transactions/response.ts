import { z } from 'zod';

import { selectTransactionsSchema } from '@/validators/db/transactions';

export const transactionsDataSchema = selectTransactionsSchema.omit({
  updatedAt: true,
});

export type TransactionsDataType = z.infer<typeof transactionsDataSchema>;

export const listTransactionsResponse = z.object({
  data: transactionsDataSchema.array(),
  pagination: z.object({
    size: z.number(),
    count: z.number(),
    page: z.number(),
    pageCount: z.number(),
  }),
});

export type ListTransactionsResponse = z.infer<typeof listTransactionsResponse>;
