import { createSchemaFactory } from 'drizzle-zod';
import type { z } from 'zod';

import { budgetPlans } from '@/lib/db/schema';

const { createSelectSchema } = createSchemaFactory({
  coerce: {
    date: true,
  },
});

export const selectBudgetPlansSchema = createSelectSchema(budgetPlans);

export type SelectBudgetPlansType = z.infer<typeof selectBudgetPlansSchema>;
