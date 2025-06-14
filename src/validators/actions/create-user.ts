import { requiredString } from "@/validators/utilities";
import { z } from "zod";

export const createUserSchema = z.object({
  name: requiredString
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name must be at most 50 characters"),
  email: requiredString.email("Invalid email address"),
  password: requiredString
    .min(8, "Password must be at least 8 characters")
    .max(64, "Password must be at most 64 characters"),
  role: z
    .union([
      z.literal("user"),
      z.literal("admin"),
      z.union([z.literal("user"), z.literal("admin")]).array(),
    ])
    .default("user")
    .optional(),
  emailVerified: z.boolean().default(false).optional(),
});

export type CreateUserType = z.infer<typeof createUserSchema>;
