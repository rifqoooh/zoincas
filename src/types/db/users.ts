import type { usersSchema } from '@/validators/db/users';
import type { z } from 'zod/v4';

export type UsersType = z.infer<typeof usersSchema>;
