import { z } from 'zod/v4';

export const usersSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  emailVerified: z.boolean(),
  image: z.string().nullable(),
  role: z.string(),
  banned: z.boolean(),
  banReason: z.string().nullable(),
  banExpires: z.coerce.date().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});
