import * as StatusCode from '@/lib/api/http-status-code';

import { createRoute, z } from '@hono/zod-openapi';

import { ContentJSON, createErrorSchema } from '@/lib/api/openapi-utilities';
import { protectedMiddleware } from '@/middleware/api/protected-middleware';
import { listTransactionsQuery } from '@/validators/api/transactions/request';
import { listTransactionsResponse } from '@/validators/api/transactions/response';
import { listTransactionsQueryErrors } from './errors';

const tags = ['Transactions'];

export const userIdParamSchema = z.object({
  userId: z.string().openapi({
    param: {
      name: 'userId',
      in: 'path',
    },
  }),
});

export const listTransactions = createRoute({
  method: 'get',
  path: '/transactions',
  tags,
  middleware: [protectedMiddleware()],
  request: {
    query: listTransactionsQuery,
  },
  responses: {
    [StatusCode.OK]: ContentJSON(
      listTransactionsResponse,
      'The list of transactions.'
    ),
    [StatusCode.UNPROCESSABLE_ENTITY]: ContentJSON(
      createErrorSchema({
        schema: listTransactionsQuery,
        message: 'The transaction query request input is invalid.',
        path: '/transactions',
        potentioalInput: listTransactionsQueryErrors,
      }),
      'The validation transactions request error(s).'
    ),
  },
});

export type ListTransactions = typeof listTransactions;
