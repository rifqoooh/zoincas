import type { GetUsersQueryType } from '@/types/api/users/request';

export const usersKeys = {
  all: () => ['users'],
  users: (search: GetUsersQueryType) => ['users', search],
  count: () => ['users', 'count'],
  countEmailVerified: () => ['users', 'count', 'email-verified'],
  countRole: () => ['users', 'count', 'role'],
  countBanned: () => ['users', 'count', 'banned'],
};
