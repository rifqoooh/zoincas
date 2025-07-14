import { createSchemaFactory } from 'drizzle-zod';
import type { z } from 'zod';

import { categories } from '@/lib/db/schema';
import { requiredString } from '../utilities';

const { createSelectSchema, createInsertSchema, createUpdateSchema } =
  createSchemaFactory({
    coerce: {
      date: true,
    },
  });

export const selectCategoriesSchema = createSelectSchema(categories);

export type SelectCategoriesType = z.infer<typeof selectCategoriesSchema>;

export const insertCategoriesSchema = createInsertSchema(categories)
  .extend({
    name: requiredString,
  })
  .omit({
    id: true,
    userId: true,
    createdAt: true,
    updatedAt: true,
  });

export type InsertCategoriesType = z.infer<typeof insertCategoriesSchema>;

export const updateCategoriesSchema = createUpdateSchema(categories).omit({
  id: true,
  userId: true,
  createdAt: true,
  updatedAt: true,
});

export type UpdateCategoriesType = z.infer<typeof updateCategoriesSchema>;
