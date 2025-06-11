import { z } from 'zod';

import { sessionsSchema } from '@/validators/db/schema';
import { usersSchema } from '@/validators/db/schema';

export const getSessionsResponse = z.object({
  session: sessionsSchema.nullable(),
  user: usersSchema.nullable(),
});

export type GetSessionsResponse = z.infer<typeof getSessionsResponse>;
