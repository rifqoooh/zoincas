import { z } from "zod";

import { selectUsersSchema } from "@/validators/db/users";
import { zodEnumFromZodObject } from "@/validators/utilities";

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

export type GetUsersQuery = z.infer<typeof getUsersQuery>;

export const patchUserBanInputSchema = z.object({
  banReason: z.string().optional(),
  banExpiresInDays: z.coerce.number().optional(),
});

export type PatchUserBanInputType = z.infer<typeof patchUserBanInputSchema>;
