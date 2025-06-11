import { z } from 'zod';

import { usersSchema } from '@/validators/db/schema';
import { zodLiteralsFromZodObject } from '@/validators/utilities';

export const getUsersQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  perPage: z.coerce.number().int().positive().default(10),
  sort: z
    .object({
      id: zodLiteralsFromZodObject(usersSchema),
      desc: z.boolean(),
    })
    .array()
    .default([{ id: 'createdAt', desc: true }]),
  email: z.string().default(''),
  emailVerified: z.enum(['verified', 'unverified']).array().default([]),
  role: z.enum(['user', 'admin']).array().default([]),
  banned: z.enum(['active', 'banned']).array().default([]),
  createdAt: z.coerce.number().array().default([]),
});

export type GetUsersQueryType = z.infer<typeof getUsersQuerySchema>;
