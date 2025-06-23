import { createSchemaFactory } from 'drizzle-zod';
import type { z } from 'zod';

import { transactions } from '@/lib/db/schema';

const { createSelectSchema, createInsertSchema } = createSchemaFactory({
  coerce: {
    date: true,
  },
});

export const selectTransactionsSchema = createSelectSchema(transactions);

export type SelectTransactionsType = z.infer<typeof selectTransactionsSchema>;

export const insertTransactionsSchema = createInsertSchema(transactions).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertTransactionsType = z.infer<typeof insertTransactionsSchema>;
