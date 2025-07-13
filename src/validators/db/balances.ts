import { createSchemaFactory } from 'drizzle-zod';

import { z } from 'zod';

import { balances } from '@/lib/db/schema';

const { createSelectSchema, createInsertSchema, createUpdateSchema } =
  createSchemaFactory({
    coerce: {
      date: true,
    },
  });

export const selectBalancesSchema = createSelectSchema(balances);

export type SelectBalancesType = z.infer<typeof selectBalancesSchema>;

export const insertBalancesSchema = createInsertSchema(balances)
  .extend({
    initialAmount: z.coerce.number(),
  })
  .omit({
    id: true,
    userId: true,
    createdAt: true,
    updatedAt: true,
  });

export type InsertBalancesType = z.infer<typeof insertBalancesSchema>;

export const updateBalancesSchema = createUpdateSchema(balances)
  .extend({
    initialAmount: z.coerce.number().optional(),
  })
  .omit({
    id: true,
    userId: true,
    createdAt: true,
    updatedAt: true,
  });

export type UpdateBalancesType = z.infer<typeof updateBalancesSchema>;
