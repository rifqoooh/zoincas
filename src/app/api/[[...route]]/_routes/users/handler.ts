import * as StatusCode from '@/lib/api/http-status-code';
import * as users from '@/lib/db/services/users';

import type { z } from '@hono/zod-openapi';

import { createNotFoundResponse } from '@/lib/api/openapi-utilities';
import type { AppRouteHandler } from '@/lib/api/types';
import { auth } from '@/lib/auth/server';
import type { SelectUsersType } from '@/validators/db/users';
import type {
  BanUser,
  CreateUser,
  DeleteUser,
  ListUsers,
  ResetPassword,
  RevokeSession,
  UnbanUser,
  userIdParamSchema,
} from './routes';

export type UserIdParam = z.infer<typeof userIdParamSchema>;

export const listUsers: AppRouteHandler<ListUsers> = async (c) => {
  const query = c.req.valid('query');

  const data = await users.getUsers(query);

  return c.json(data, StatusCode.OK);
};

export const createUser: AppRouteHandler<CreateUser> = async (c) => {
  const input = c.req.valid('json');

  const { name, email, password, role, ...rest } = input;

  const data = await auth.api.createUser({
    headers: c.req.raw.headers,
    body: {
      name,
      email,
      password,
      role,
      data: rest,
    },
  });

  return c.json(data.user, StatusCode.CREATED);
};

export const deleteUser: AppRouteHandler<DeleteUser> = async (c) => {
  const { userId } = c.req.valid('param');

  const data = await users.getUser(userId);
  if (!data) {
    return c.json(
      createNotFoundResponse({ path: c.req.path }),
      StatusCode.NOT_FOUND
    );
  }

  const { success: isSuccess } = await auth.api.removeUser({
    headers: c.req.raw.headers,
    body: { userId },
  });
  if (!isSuccess) {
    return c.json(
      createNotFoundResponse({ path: c.req.path }),
      StatusCode.NOT_FOUND
    );
  }

  return c.json(data, StatusCode.OK);
};

export const resetPassword: AppRouteHandler<ResetPassword> = async (c) => {
  const { userId } = c.req.valid('param');
  const input = c.req.valid('json');

  const data = await users.getUser(userId);
  if (!data) {
    return c.json(
      createNotFoundResponse({ path: c.req.path }),
      StatusCode.NOT_FOUND
    );
  }

  const ctx = await auth.$context;
  const hashedPassword = await ctx.password.hash(input.password);

  await ctx.internalAdapter.deleteSessions(userId);

  const { isSuccess } = await users.resetPassword(userId, { hashedPassword });
  if (!isSuccess) {
    return c.json(
      createNotFoundResponse({ path: c.req.path }),
      StatusCode.NOT_FOUND
    );
  }

  return c.json(data, StatusCode.OK);
};

export const revokeSession: AppRouteHandler<RevokeSession> = async (c) => {
  const { userId } = c.req.valid('param');

  const data = await users.getUser(userId);
  if (!data) {
    return c.json(
      createNotFoundResponse({ path: c.req.path }),
      StatusCode.NOT_FOUND
    );
  }

  const { success: isSuccess } = await auth.api.revokeUserSessions({
    headers: c.req.raw.headers,
    body: { userId },
  });
  if (!isSuccess) {
    return c.json(
      createNotFoundResponse({ path: c.req.path }),
      StatusCode.NOT_FOUND
    );
  }

  return c.json(data, StatusCode.OK);
};

export const banUser: AppRouteHandler<BanUser> = async (c) => {
  const { userId } = c.req.valid('param');
  const input = c.req.valid('json');

  const banReason = input.banReason || '';
  const banExpiresIn =
    input.banExpiresInDays !== undefined
      ? input.banExpiresInDays * 24 * 60 * 60
      : undefined;

  const data = (await auth.api.banUser({
    headers: c.req.raw.headers,
    body: {
      userId,
      banReason,
      banExpiresIn,
    },
  })) as unknown as { user: SelectUsersType };
  if (!data.user) {
    return c.json(
      createNotFoundResponse({ path: c.req.path }),
      StatusCode.NOT_FOUND
    );
  }

  return c.json(data.user, StatusCode.OK);
};

export const unbanUser: AppRouteHandler<UnbanUser> = async (c) => {
  const { userId } = c.req.valid('param');

  const data = (await auth.api.unbanUser({
    headers: c.req.raw.headers,
    body: { userId },
  })) as unknown as { user: SelectUsersType };
  if (!data.user) {
    return c.json(
      createNotFoundResponse({ path: c.req.path }),
      StatusCode.NOT_FOUND
    );
  }

  return c.json(data.user, StatusCode.OK);
};
