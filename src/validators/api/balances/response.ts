import { selectBalancesSchema } from '@/validators/db/balances';
import { z } from 'zod';

export const balancesDataSchema = selectBalancesSchema
  .extend({
    transactions: z.object({
      count: z.number(),
      sum: z.number(),
    }),
  })
  .omit({
    userId: true,
    createdAt: true,
    updatedAt: true,
  });

export type BalancesDataType = z.infer<typeof balancesDataSchema>;

export const listBalancesSummaryResponse = balancesDataSchema.array();

export type ListBalancesSummaryResponse = z.infer<
  typeof listBalancesSummaryResponse
>;

export const getBalanceResponse = balancesDataSchema;

export type GetBalanceResponse = z.infer<typeof getBalanceResponse>;
