import { createSchemaFactory } from 'drizzle-zod';
import { z } from 'zod';

import { users } from '@/lib/db/schema';

const { createSelectSchema } = createSchemaFactory({
  coerce: {
    date: true,
  },
});

export const selectUsersSchema = createSelectSchema(users)
  .extend({
    role: z.string().nullable(),
    banned: z.boolean().nullable(),
  })
  .partial({
    image: true,
    role: true,
    banned: true,
    banReason: true,
    banExpires: true,
  });

export type SelectUsersType = z.infer<typeof selectUsersSchema>;
