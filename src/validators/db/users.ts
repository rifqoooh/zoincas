import { createSchemaFactory } from "drizzle-zod";
import { z } from "zod";

import { users } from "@/lib/db/schema";
import { requiredString } from "@/validators/utilities";

const { createSelectSchema, createInsertSchema } = createSchemaFactory({
  coerce: {
    date: true,
  },
});

export const selectUsersSchema = createSelectSchema(users)
  .extend({
    role: z.string().nullable(),
    banned: z.boolean().nullable(),
  })
  .partial({
    image: true,
    role: true,
    banned: true,
    banReason: true,
    banExpires: true,
  });

export type SelectUsersType = z.infer<typeof selectUsersSchema>;

export const insertUsersSchema = createInsertSchema(users)
  .extend({
    role: z
      .union([
        z.literal("user"),
        z.literal("admin"),
        z.union([z.literal("user"), z.literal("admin")]).array(),
      ])
      .default("user"),
    emailVerified: z.boolean().default(false),
    password: requiredString.min(8).max(64),
  })
  .omit({
    id: true,
    image: true,
    banned: true,
    banReason: true,
    banExpires: true,
    createdAt: true,
    updatedAt: true,
  });

export type insertUsersType = z.infer<typeof insertUsersSchema>;
