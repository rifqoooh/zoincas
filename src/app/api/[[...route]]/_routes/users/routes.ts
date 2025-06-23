import * as StatusCode from '@/lib/api/http-status-code';

import { createRoute, z } from '@hono/zod-openapi';

import {
  ContentJSON,
  ContentJSONRequired,
  createErrorSchema,
  createNotFoundSchema,
} from '@/lib/api/openapi-utilities';
import { adminMiddleware } from '@/middleware/api/admin-middleware';
import {
  banUserInput,
  listUsersQuery,
  resetPasswordInput,
} from '@/validators/api/users/request';
import { listUsersResponse } from '@/validators/api/users/response';
import { insertUsersSchema, selectUsersSchema } from '@/validators/db/users';
import {
  createUserInputErrors,
  listUsersQueryErrors,
  resetPasswordInputErrors,
} from './errors';

const tags = ['Users'];

export const userIdParamSchema = z.object({
  userId: z.string().openapi({
    param: {
      name: 'userId',
      in: 'path',
    },
  }),
});

export const listUsers = createRoute({
  method: 'get',
  path: '/users',
  tags,
  middleware: [adminMiddleware()],
  request: {
    query: listUsersQuery,
  },
  responses: {
    [StatusCode.OK]: ContentJSON(listUsersResponse, 'The list of users.'),
    [StatusCode.NOT_FOUND]: ContentJSON(
      createNotFoundSchema({
        path: '/users',
      }),
      'The list users does not exist in our resources.'
    ),
    [StatusCode.UNPROCESSABLE_ENTITY]: ContentJSON(
      createErrorSchema({
        schema: listUsersQuery,
        message: 'The user query request input is invalid.',
        path: '/users',
        potentioalInput: listUsersQueryErrors,
      }),
      'The validation users request error(s).'
    ),
  },
});

export const createUser = createRoute({
  method: 'post',
  path: '/users',
  tags,
  middleware: [adminMiddleware()],
  request: {
    body: ContentJSONRequired(insertUsersSchema, 'The user to create.'),
  },
  responses: {
    [StatusCode.CREATED]: ContentJSON(selectUsersSchema, 'The created user.'),
    [StatusCode.UNPROCESSABLE_ENTITY]: ContentJSON(
      createErrorSchema({
        schema: insertUsersSchema,
        message: 'The user creation request input is invalid.',
        path: '/users',
        potentioalInput: createUserInputErrors,
      }),
      'The validation user creation request error(s).'
    ),
  },
});

export const deleteUser = createRoute({
  method: 'delete',
  path: '/users/{userId}',
  tags,
  middleware: [adminMiddleware()],
  request: {
    params: userIdParamSchema,
  },
  responses: {
    [StatusCode.OK]: ContentJSON(selectUsersSchema, 'The deleted user.'),
    [StatusCode.NOT_FOUND]: ContentJSON(
      createNotFoundSchema({
        path: '/users/{userId}',
      }),
      'The user with the requested ID does not exist in our resources.'
    ),
    [StatusCode.UNPROCESSABLE_ENTITY]: ContentJSON(
      createErrorSchema({
        schema: userIdParamSchema,
        message: 'The user id request params is required.',
        path: '/users/{userId}',
        potentioalInput: {},
      }),
      'The validation delete user request error(s).'
    ),
  },
});

export const resetPassword = createRoute({
  method: 'patch',
  path: '/users/{userId}/reset-password',
  tags,
  middleware: [adminMiddleware()],
  request: {
    params: userIdParamSchema,
    body: ContentJSONRequired(resetPasswordInput, 'The new password.'),
  },
  responses: {
    [StatusCode.OK]: ContentJSON(selectUsersSchema, 'The reset password user.'),
    [StatusCode.NOT_FOUND]: ContentJSON(
      createNotFoundSchema({
        path: '/users/{userId}/reset-password',
      }),
      'The user with the requested ID does not exist in our resources.'
    ),
    [StatusCode.UNPROCESSABLE_ENTITY]: ContentJSON(
      createErrorSchema({
        schema: resetPasswordInput,
        message: 'The reset password request input is invalid.',
        path: '/users/{userId}/reset-password',
        potentioalInput: resetPasswordInputErrors,
      }).or(
        createErrorSchema({
          schema: userIdParamSchema,
          message: 'The user id request params is required.',
          path: '/users/{userId}/reset-password',
          potentioalInput: {},
        })
      ),
      'The validation reset password request error(s).'
    ),
  },
});

export const revokeSession = createRoute({
  method: 'delete',
  path: '/users/{userId}/revoke-sessions',
  tags,
  middleware: [adminMiddleware()],
  request: {
    params: userIdParamSchema,
  },
  responses: {
    [StatusCode.OK]: ContentJSON(selectUsersSchema, 'The revoked session.'),
    [StatusCode.NOT_FOUND]: ContentJSON(
      createNotFoundSchema({
        path: '/users/{userId}/revoke-sessions',
      }),
      'The user with the requested ID does not exist in our resources.'
    ),
    [StatusCode.UNPROCESSABLE_ENTITY]: ContentJSON(
      createErrorSchema({
        schema: userIdParamSchema,
        message: 'The user id request params is required.',
        path: '/users/{userId}/revoke-sessions',
        potentioalInput: {},
      }),
      'The validation revoke sessions request error(s).'
    ),
  },
});

export const banUser = createRoute({
  method: 'patch',
  path: '/users/{userId}/ban',
  tags,
  middleware: [adminMiddleware()],
  request: {
    params: userIdParamSchema,
    body: ContentJSONRequired(banUserInput, 'The user to ban.'),
  },
  responses: {
    [StatusCode.OK]: ContentJSON(selectUsersSchema, 'The banned user.'),
    [StatusCode.NOT_FOUND]: ContentJSON(
      createNotFoundSchema({
        path: '/users/{userId}/ban',
      }),
      'The user with the requested ID does not exist in our resources.'
    ),
    [StatusCode.UNPROCESSABLE_ENTITY]: ContentJSON(
      createErrorSchema({
        schema: userIdParamSchema,
        message: 'The user id request params is required.',
        path: '/users/{userId}/ban',
        potentioalInput: {},
      }),
      'The validation ban user request error(s).'
    ),
  },
});

export const unbanUser = createRoute({
  method: 'patch',
  path: '/users/{userId}/unban',
  tags,
  middleware: [adminMiddleware()],
  request: {
    params: userIdParamSchema,
  },
  responses: {
    [StatusCode.OK]: ContentJSON(selectUsersSchema, 'The unbanned user.'),
    [StatusCode.NOT_FOUND]: ContentJSON(
      createNotFoundSchema({
        path: '/users/{userId}/unban',
      }),
      'The user with the requested ID does not exist in our resources.'
    ),
    [StatusCode.UNPROCESSABLE_ENTITY]: ContentJSON(
      createErrorSchema({
        schema: userIdParamSchema,
        message: 'The user id request params is required.',
        path: '/users/{userId}/unban',
        potentioalInput: {},
      }),
      'The validation unban user request error(s).'
    ),
  },
});

export type ListUsers = typeof listUsers;
export type CreateUser = typeof createUser;
export type ResetPassword = typeof resetPassword;
export type RevokeSession = typeof revokeSession;
export type DeleteUser = typeof deleteUser;
export type BanUser = typeof banUser;
export type UnbanUser = typeof unbanUser;
