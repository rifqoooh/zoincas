import type { ListUsersQuery } from '@/validators/api/openapi/users/request';

export const usersKeys = {
  all: () => ['users'],
  users: (search: ListUsersQuery) => ['users', search],
  count: () => ['users', 'count'],
  countEmailVerified: () => ['users', 'count', 'email-verified'],
  countRole: () => ['users', 'count', 'role'],
  countBanned: () => ['users', 'count', 'banned'],
};
