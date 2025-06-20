import { z } from 'zod';

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

export type UsersDataType = z.infer<typeof usersDataSchema>;

export const listUsersResponse = z.object({
  data: usersDataSchema.array(),
  pagination: z.object({
    size: z.number(),
    count: z.number(),
    page: z.number(),
    pageCount: z.number(),
  }),
});

export type ListUsersResponse = z.infer<typeof listUsersResponse>;
