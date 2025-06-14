import * as StatusCode from "@/lib/api/http-status-code";

import type { AppRouteHandler } from "@/lib/api/types";
import type { DeleteUser, GetUsers, PostUser } from "./routes";

import { createNotFoundResponse } from "@/lib/api/openapi-utilities";
import { auth } from "@/lib/auth/server";
import * as users from "@/lib/db/services/users";

export const getUsers: AppRouteHandler<GetUsers> = async (c) => {
  const query = c.req.valid("query");

  const data = await users.getUsers(query);

  return c.json(data, StatusCode.OK);
};

export const postUser: AppRouteHandler<PostUser> = async (c) => {
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
