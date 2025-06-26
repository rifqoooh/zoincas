import { createSchemaFactory } from 'drizzle-zod';
import type { z } from 'zod';

import { categories } from '@/lib/db/schema';

const { createSelectSchema, createInsertSchema } = createSchemaFactory({
  coerce: {
    date: true,
  },
});

export const selectCategoriesSchema = createSelectSchema(categories);

export type SelectCategoriesType = z.infer<typeof selectCategoriesSchema>;

export const insertCategoriesSchema = createInsertSchema(categories).omit({
  id: true,
  userId: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertCategoriesType = z.infer<typeof insertCategoriesSchema>;
