import * as StatusCode from "@/lib/api/http-status-code";

import { createRoute, z } from "@hono/zod-openapi";

import {
  ContentJSON,
  ContentJSONRequired,
  createErrorSchema,
  createNotFoundSchema,
} from "@/lib/api/openapi-utilities";
import { adminMiddleware } from "@/middleware/api/admin-middleware";
import {
  getUsersQuery,
  patchUserBanInputSchema,
} from "@/validators/api/openapi/users/request";
import { getUsersResponse } from "@/validators/api/openapi/users/response";
import { insertUsersSchema, selectUsersSchema } from "@/validators/db/users";
import { getUsersQueryErrors, postUsersBodyErrors } from "./errors";

const tags = ["Users"];

const userIdParamSchema = z.object({
  userId: z.string().openapi({
    param: {
      name: "userId",
      in: "path",
    },
  }),
});

export const getUsers = createRoute({
  method: "get",
  path: "/users",
  tags,
  middleware: [adminMiddleware()],
  request: {
    query: getUsersQuery,
  },
  responses: {
    [StatusCode.OK]: ContentJSON(getUsersResponse, "The list of users."),
    [StatusCode.UNPROCESSABLE_ENTITY]: ContentJSON(
      createErrorSchema({
        schema: getUsersQuery,
        message: "The user query request input is invalid.",
        path: "/users",
        potentioalInput: getUsersQueryErrors,
      }),
      "The validation query parameters error(s).",
    ),
  },
});

export const postUser = createRoute({
  method: "post",
  path: "/users",
  tags,
  middleware: [adminMiddleware()],
  request: {
    body: ContentJSONRequired(insertUsersSchema, "The user to create."),
  },
  responses: {
    [StatusCode.CREATED]: ContentJSON(selectUsersSchema, "The created user."),
    [StatusCode.UNPROCESSABLE_ENTITY]: ContentJSON(
      createErrorSchema({
        schema: insertUsersSchema,
        message: "The user creation request input is invalid.",
        path: "/users",
        potentioalInput: postUsersBodyErrors,
      }),
      "The validation user creation request input error(s).",
    ),
  },
});

export const deleteUser = createRoute({
  method: "delete",
  path: "/users/{userId}",
  tags,
  middleware: [adminMiddleware()],
  request: {
    params: userIdParamSchema.partial(),
  },
  responses: {
    [StatusCode.OK]: ContentJSON(selectUsersSchema, "The deleted user."),
    [StatusCode.NOT_FOUND]: ContentJSON(
      createNotFoundSchema({
        path: "/users/{userId}",
      }),
      "The user with the requested ID does not exist in our resources.",
    ),
  },
});

export const banUser = createRoute({
  method: "patch",
  path: "/users/{userId}/ban",
  tags,
  middleware: [adminMiddleware()],
  request: {
    params: userIdParamSchema.partial(),
    body: ContentJSONRequired(patchUserBanInputSchema, "The user to ban."),
  },
  responses: {
    [StatusCode.OK]: ContentJSON(selectUsersSchema, "The banned user."),
    [StatusCode.NOT_FOUND]: ContentJSON(
      createNotFoundSchema({
        path: "/users/{userId}/ban",
      }),
      "The user with the requested ID does not exist in our resources.",
    ),
  },
});

export type GetUsers = typeof getUsers;
export type PostUser = typeof postUser;
export type DeleteUser = typeof deleteUser;
export type BanUser = typeof banUser;
