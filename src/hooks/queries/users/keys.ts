import type { listUsersQuery } from "@/validators/api/openapi/users/request";

export const usersKeys = {
  all: () => ["users"],
  users: (search: listUsersQuery) => ["users", search],
  count: () => ["users", "count"],
  countEmailVerified: () => ["users", "count", "email-verified"],
  countRole: () => ["users", "count", "role"],
  countBanned: () => ["users", "count", "banned"],
};
