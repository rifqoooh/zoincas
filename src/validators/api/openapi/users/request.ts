import { z } from 'zod';

import { usersSchema } from '@/validators/db/schema';
import { zodEnumFromZodObject } from '@/validators/utilities';

const sortSchema = z
  .object({
    id: zodEnumFromZodObject(usersSchema),
    desc: z.boolean(),
  })
  .array()
  .default([{ id: 'createdAt', desc: true }]);

export const getUsersQuery = z.object({
  page: z.coerce.number().int().positive().default(1),
  perPage: z.coerce.number().int().positive().default(10),
  sort: z.preprocess((value) => {
    if (Array.isArray(value)) {
      const parsedJSON = JSON.parse(String(value));
      if (Array.isArray(parsedJSON)) {
        return parsedJSON;
      }
      return value;
    }
    return value;
  }, sortSchema),
  email: z.string().default(''),
  emailVerified: z.enum(['verified', 'unverified']).array().default([]),
  role: z.enum(['user', 'admin']).array().default([]),
  banned: z.enum(['active', 'banned']).array().default([]),
  createdAt: z.coerce.number().array().default([]),
});

export type GetUsersQuery = z.infer<typeof getUsersQuery>;
