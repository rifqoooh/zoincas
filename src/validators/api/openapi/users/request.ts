import { z } from 'zod';

import { selectUsersSchema } from '@/validators/db/users';
import { zodEnumFromZodObject } from '@/validators/utilities';

const sortSchema = z
  .object({
    id: zodEnumFromZodObject(selectUsersSchema),
    desc: z.boolean(),
  })
  .array()
  .default([{ id: 'createdAt', desc: true }]);

const createdAtSchema = z.coerce.number().array().default([]);

export const getUsersQuery = z.object({
  page: z.coerce.number().int().positive().default(1),
  perPage: z.coerce.number().int().positive().default(10),
  sort: z.preprocess((value) => {
    if (Array.isArray(value)) {
      const parsed = JSON.parse(String(value));
      if (Array.isArray(parsed)) {
        return parsed;
      }
      return value;
    }
    return value;
  }, sortSchema),
  email: z.string().default(''),
  emailVerified: z.enum(['verified', 'unverified']).array().default([]),
  role: z.enum(['user', 'admin']).array().default([]),
  banned: z.enum(['active', 'banned']).array().default([]),
  // createdAt: z.preprocess((value) => {
  //   if (Array.isArray(value)) {
  //     const parsed = JSON.parse(String(value));
  //     if (Array.isArray(parsed)) {
  //       return parsed;
  //     }
  //     return value;
  //   }
  //   return value;
  // }, createdAtSchema),
  createdAt: createdAtSchema,
});

export type GetUsersQuery = z.infer<typeof getUsersQuery>;
