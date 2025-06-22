import { createSchemaFactory } from 'drizzle-zod';
import type { z } from 'zod';

import { balances } from '@/lib/db/schema';

const { createSelectSchema } = createSchemaFactory({
  coerce: {
    date: true,
  },
});

export const selectBalancesSchema = createSelectSchema(balances);

export type SelectBalancesType = z.infer<typeof selectBalancesSchema>;
