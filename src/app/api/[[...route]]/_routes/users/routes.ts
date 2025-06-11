import * as StatusCode from '@/lib/api/http-status-code';

import { createRoute } from '@hono/zod-openapi';

import { ContentJSON, createErrorSchema } from '@/lib/api/openapi-utilities';
import { adminMiddleware } from '@/middleware/api/admin-middleware';
import { getUsersQuery } from '@/validators/api/openapi/users/request';
import { getUsersResponse } from '@/validators/api/openapi/users/response';
import { usersQueryError } from './errors';

const tags = ['Users'];

export const getUsers = createRoute({
  method: 'get',
  path: '/users',
  tags,
  middleware: [adminMiddleware()],
  request: {
    query: getUsersQuery,
  },
  responses: {
    [StatusCode.OK]: ContentJSON(
      getUsersResponse,
      'Get the list of all users.'
    ),
    [StatusCode.UNPROCESSABLE_ENTITY]: ContentJSON(
      createErrorSchema({
        schema: getUsersQuery,
        message: 'The user query request input is invalid.',
        path: '/users',
        potentioalInput: usersQueryError,
      }),
      'The validation query parameters error(s).'
    ),
  },
});

export type GetUsers = typeof getUsers;
