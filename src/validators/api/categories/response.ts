import { selectCategoriesSchema } from '@/validators/db/categories';
import { z } from 'zod';

export const categoriesDataSchema = selectCategoriesSchema
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

export type CategoriesDataType = z.infer<typeof categoriesDataSchema>;

export const listCategoriesSummaryResponse = categoriesDataSchema.array();

export type ListCategoriesSummaryResponse = z.infer<
  typeof listCategoriesSummaryResponse
>;
