import * as StatusCode from '@/lib/api/http-status-code';

import { createRoute, z } from '@hono/zod-openapi';

import {
  ContentJSON,
  createErrorSchema,
  createNotFoundSchema,
} from '@/lib/api/openapi-utilities';
import { protectedMiddleware } from '@/middleware/api/protected-middleware';
import { listTransactionsQuery } from '@/validators/api/transactions/request';
import {
  getTransactionResponse,
  listTransactionsResponse,
} from '@/validators/api/transactions/response';
import { listTransactionsQueryErrors } from './errors';

const tags = ['Transactions'];

export const transactionIdParamSchema = z.object({
  transactionId: z
    .string()
    .uuid()
    .openapi({
      param: {
        name: 'transactionId',
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
    [StatusCode.NOT_FOUND]: ContentJSON(
      createNotFoundSchema({
        path: '/transactions',
      }),
      'The list transactions does not exist in our resources.'
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

export const getTransaction = createRoute({
  method: 'get',
  path: '/transactions/{transactionId}',
  tags,
  middleware: [protectedMiddleware()],
  request: {
    params: transactionIdParamSchema,
  },
  responses: {
    [StatusCode.OK]: ContentJSON(getTransactionResponse, 'The transaction.'),
    [StatusCode.NOT_FOUND]: ContentJSON(
      createNotFoundSchema({
        path: '/transactions/{transactionId}',
      }),
      'The transaction with the requested ID does not exist in our resources.'
    ),
    [StatusCode.UNPROCESSABLE_ENTITY]: ContentJSON(
      createErrorSchema({
        schema: transactionIdParamSchema,
        message: 'The transaction id request params is required.',
        path: '/transactions/{transactionId}',
        potentioalInput: {},
      }),
      'The validation get transaction request error(s).'
    ),
  },
});

export type ListTransactions = typeof listTransactions;
export type GetTransaction = typeof getTransaction;
