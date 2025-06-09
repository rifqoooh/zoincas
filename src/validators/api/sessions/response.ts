import { sessionsSchema } from '@/validators/db/schema';
import { usersSchema } from '@/validators/db/schema';
import { z } from 'zod/v4';

export const getSessionsOutputSchema = z.object({
  session: sessionsSchema,
  user: usersSchema,
});

export type GetSessionsOutputType = z.infer<typeof getSessionsOutputSchema>;
