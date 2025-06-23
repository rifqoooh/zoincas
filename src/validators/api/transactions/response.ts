import { z } from 'zod';

import { selectTransactionsSchema } from '@/validators/db/transactions';

export const transactionsDataSchema = selectTransactionsSchema
  .extend({
    balance: z.object({
      id: z.string().uuid(),
      name: z.string(),
    }),
    category: z.object({
      id: z.string().uuid().nullable(),
      name: z.string().nullable(),
    }),
    budgetCategory: z.object({
      id: z.string().uuid().nullable(),
      name: z.string().nullable(),
    }),
  })
  .omit({
    balanceId: true,
    categoryId: true,
    budgetCategoryId: true,
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

export const getTransactionResponse = transactionsDataSchema;

export type GetTransactionResponse = z.infer<typeof getTransactionResponse>;
