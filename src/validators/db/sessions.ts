import { createSchemaFactory } from 'drizzle-zod';
import type { z } from 'zod';

import { sessions } from '@/lib/db/schema';

const { createSelectSchema } = createSchemaFactory({
  coerce: {
    date: true,
  },
});

export const selectSessionsSchema = createSelectSchema(sessions).partial({
  ipAddress: true,
  userAgent: true,
  impersonatedBy: true,
});

export type SelectSessionsType = z.infer<typeof selectSessionsSchema>;
