import { createSchemaFactory } from 'drizzle-zod';
import { z } from 'zod';

import { transactions } from '@/lib/db/schema';

const { createSelectSchema, createInsertSchema } = createSchemaFactory({
  coerce: {
    date: true,
  },
});

export const selectTransactionsSchema = createSelectSchema(transactions);

export type SelectTransactionsType = z.infer<typeof selectTransactionsSchema>;

export const insertTransactionsSchema = createInsertSchema(transactions)
  .extend({
    amount: z.coerce.number(),
    balanceId: z.string().uuid({ message: 'Balance is required' }),
    categoryId: z
      .string()
      .min(1, { message: 'Category is required' })
      .nullable()
      .optional(),
    budgetCategoryId: z
      .string()
      .min(1, { message: 'Budget category is required' })
      .nullable()
      .optional(),
  })
  .omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  });

export type InsertTransactionsType = z.infer<typeof insertTransactionsSchema>;
