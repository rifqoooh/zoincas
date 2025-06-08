import type {
  getUsersOutputSchema,
  usersDataSchema,
} from '@/validators/api/users/response';
import type { z } from 'zod/v4';

export type UsersDataType = z.infer<typeof usersDataSchema>;
export type GetUsersOutputType = z.infer<typeof getUsersOutputSchema>;
