import { z } from "zod";

import { selectUsersSchema } from "@/validators/db/users";
import { requiredString, zodEnumFromZodObject } from "@/validators/utilities";

const sortSchema = z
  .object({
    id: zodEnumFromZodObject(selectUsersSchema),
    desc: z.boolean(),
  })
  .array()
  .default([{ id: "createdAt", desc: true }]);

const emailVerifiedSchema = z
  .enum(["verified", "unverified"])
  .array()
  .default([]);
const roleSchema = z.enum(["user", "admin"]).array().default([]);
const bannedSchema = z.enum(["active", "banned"]).array().default([]);
const createdAtSchema = z.coerce.number().array().max(2).default([]);

export const listUsersQuery = z.object({
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
    if (typeof value === "string") {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) {
        return parsed;
      }
      return value;
    }
    return value;
  }, sortSchema),
  email: z.string().default(""),
  emailVerified: z.preprocess((value) => {
    if (typeof value === "string") {
      const parsed = [value];
      if (Array.isArray(parsed)) {
        return parsed;
      }
      return value;
    }
    return value;
  }, emailVerifiedSchema),
  role: z.preprocess((value) => {
    if (typeof value === "string") {
      const parsed = [value];
      if (Array.isArray(parsed)) {
        return parsed;
      }
      return value;
    }
    return value;
  }, roleSchema),
  banned: z.preprocess((value) => {
    if (typeof value === "string") {
      const parsed = [value];
      if (Array.isArray(parsed)) {
        return parsed;
      }
      return value;
    }
    return value;
  }, bannedSchema),
  createdAt: z.preprocess((value) => {
    if (Array.isArray(value)) {
      // biome-ignore lint/nursery/useCollapsedIf: <explanation>
      if (value[1] === "undefined") {
        value[1] = value[0];
      }
    }
    return value;
  }, createdAtSchema),
});

export type listUsersQuery = z.infer<typeof listUsersQuery>;

export const banUserInput = z.object({
  banReason: z.string().optional(),
  banExpiresInDays: z.coerce.number().optional(),
});

export type BanUserInput = z.infer<typeof banUserInput>;

export const resetPasswordInput = z.object({
  password: requiredString.min(8).max(64),
});

export type ResetPasswordInput = z.infer<typeof resetPasswordInput>;
