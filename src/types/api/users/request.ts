import type { z } from 'zod/v4';

import type { getUsersQuerySchema } from '@/validators/api/users/request';

export type GetUsersQueryType = z.infer<typeof getUsersQuerySchema>;
