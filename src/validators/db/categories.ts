import { createSchemaFactory } from 'drizzle-zod';
import type { z } from 'zod';

import { categories } from '@/lib/db/schema';

const { createSelectSchema } = createSchemaFactory({
  coerce: {
    date: true,
  },
});

export const selectCategoriesSchema = createSelectSchema(categories);

export type SelectCategoriesType = z.infer<typeof selectCategoriesSchema>;
