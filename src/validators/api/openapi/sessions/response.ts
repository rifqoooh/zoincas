import { z } from 'zod';

import { selectSessionsSchema } from '@/validators/db/sessions';
import { selectUsersSchema } from '@/validators/db/users';

export const getSessionsResponse = z.object({
  user: selectUsersSchema.nullable(),
  session: selectSessionsSchema.nullable(),
});

export type GetSessionsResponse = z.infer<typeof getSessionsResponse>;
