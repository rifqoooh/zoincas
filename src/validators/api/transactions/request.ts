import { z } from 'zod';

import { selectTransactionsSchema } from '@/validators/db/transactions';
import { zodEnumFromZodObject } from '@/validators/utilities';

const sortSchema = z
  .object({
    id: zodEnumFromZodObject(selectTransactionsSchema),
    desc: z.boolean(),
  })
  .array()
  .default([{ id: 'datetime', desc: true }]);

const balanceSchema = z.string().array().default([]);
const categorySchema = z.string().array().default([]);
const budgetSchema = z.string().array().default([]);
const datetimeSchema = z.coerce.date().array().max(2).default([]);

export const listTransactionsQuery = z.object({
  page: z.coerce.number().int().positive().default(1),
  perPage: z.coerce.number().int().positive().default(10),
  sort: z.preprocess((value) => {
    if (Array.isArray(value)) {
      const parsed = JSON.parse(String(value));
      if (Array.isArray(parsed)) {
        return parsed;
      }
      return value;
    }
    if (typeof value === 'string') {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) {
        return parsed;
      }
      return value;
    }
    return value;
  }, sortSchema),
  description: z.string().default(''),
  balance: z.preprocess((value) => {
    if (typeof value === 'string') {
      const parsed = [value];
      if (Array.isArray(parsed)) {
        return parsed;
      }
      return value;
    }
    return value;
  }, balanceSchema),
  category: z.preprocess((value) => {
    if (typeof value === 'string') {
      const parsed = [value];
      if (Array.isArray(parsed)) {
        return parsed;
      }
      return value;
    }
    return value;
  }, categorySchema),
  budget: z.preprocess((value) => {
    if (typeof value === 'string') {
      const parsed = [value];
      if (Array.isArray(parsed)) {
        return parsed;
      }
      return value;
    }
    return value;
  }, budgetSchema),
  datetime: z.preprocess((value) => {
    if (Array.isArray(value)) {
      // biome-ignore lint/nursery/useCollapsedIf: <explanation>
      if (value[1] === 'undefined') {
        value[1] = value[0];
      }
    }
    return value;
  }, datetimeSchema),
});

export type ListTransactionsQuery = z.infer<typeof listTransactionsQuery>;
