import { z } from 'zod/v4';

export const usersDataSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  emailVerified: z.boolean(),
  image: z.string().nullable(),
  role: z.string(),
  banned: z.boolean(),
  createdAt: z.coerce.date(),
});

export const getUsersOutputSchema = z.object({
  data: usersDataSchema.array(),
  pagination: z.object({
    size: z.number(),
    count: z.number(),
    page: z.number(),
    pageCount: z.number(),
  }),
});
