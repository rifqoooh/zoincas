import * as StatusCode from "@/lib/api/http-status-code";

import type { AppRouteHandler } from "@/lib/api/types";
import type { SelectUsersType } from "@/validators/db/users";
import type {
  BanUser,
  CreateUser,
  DeleteUser,
  ListUsers,
  UnbanUser,
} from "./routes";

import { createNotFoundResponse } from "@/lib/api/openapi-utilities";
import { auth } from "@/lib/auth/server";
import * as users from "@/lib/db/services/users";

export const listUsers: AppRouteHandler<ListUsers> = async (c) => {
  const query = c.req.valid("query");

  const data = await users.getUsers(query);

  return c.json(data, StatusCode.OK);
};

export const createUser: AppRouteHandler<CreateUser> = async (c) => {
  const json = c.req.valid("json");

  const { name, email, password, role, ...rest } = json;

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
  const { userId } = c.req.valid("param");

  const data = await users.getUser(userId!);
  if (!data) {
    return c.json(
      createNotFoundResponse({ path: "/users/{id}" }),
      StatusCode.NOT_FOUND,
    );
  }

  const { success: isSuccess } = await auth.api.removeUser({
    headers: c.req.raw.headers,
    body: { userId: userId! },
  });
  if (!isSuccess) {
    return c.json(
      createNotFoundResponse({ path: "/users/{id}" }),
      StatusCode.NOT_FOUND,
    );
  }

  return c.json(data, StatusCode.OK);
};

export const banUser: AppRouteHandler<BanUser> = async (c) => {
  const { userId } = c.req.valid("param");
  const input = c.req.valid("json");

  const banReason = input.banReason || "";
  const banExpiresIn =
    input.banExpiresInDays !== undefined
      ? input.banExpiresInDays * 24 * 60 * 60
      : undefined;

  const data = (await auth.api.banUser({
    headers: c.req.raw.headers,
    body: {
      userId: userId!,
      banReason,
      banExpiresIn,
    },
  })) as unknown as { user: SelectUsersType };
  if (!data.user) {
    return c.json(
      createNotFoundResponse({ path: "/users/{id}/ban" }),
      StatusCode.NOT_FOUND,
    );
  }

  return c.json(data.user, StatusCode.OK);
};

export const unbanUser: AppRouteHandler<UnbanUser> = async (c) => {
  const { userId } = c.req.valid("param");

  const data = (await auth.api.unbanUser({
    headers: c.req.raw.headers,
    body: { userId: userId! },
  })) as unknown as { user: SelectUsersType };
  if (!data.user) {
    return c.json(
      createNotFoundResponse({ path: "/users/{id}/unban" }),
      StatusCode.NOT_FOUND,
    );
  }

  return c.json(data.user, StatusCode.OK);
};
