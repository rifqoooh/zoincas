import * as StatusCode from '@/lib/api/http-status-code';

import { createRoute, z } from '@hono/zod-openapi';

import {
  ContentJSON,
  ContentJSONRequired,
  createErrorSchema,
  createNotFoundSchema,
} from '@/lib/api/openapi-utilities';
import { protectedMiddleware } from '@/middleware/api/protected-middleware';
import { listTransactionsQuery } from '@/validators/api/transactions/request';
import {
  getTransactionResponse,
  listTransactionsResponse,
} from '@/validators/api/transactions/response';
import {
  insertTransactionsSchema,
  selectTransactionsSchema,
  updateTransactionsSchema,
} from '@/validators/db/transactions';
import {
  createTransactionInputErrors,
  listTransactionsQueryErrors,
} from './errors';

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

export const createTransaction = createRoute({
  method: 'post',
  path: '/transactions',
  tags,
  middleware: [protectedMiddleware()],
  request: {
    body: ContentJSONRequired(
      insertTransactionsSchema,
      'The transaction to create.'
    ),
  },
  responses: {
    [StatusCode.CREATED]: ContentJSON(
      selectTransactionsSchema,
      'The created transaction.'
    ),
    [StatusCode.UNPROCESSABLE_ENTITY]: ContentJSON(
      createErrorSchema({
        schema: insertTransactionsSchema,
        message: 'The transaction creation request input is invalid.',
        path: '/transactions',
        potentioalInput: createTransactionInputErrors,
      }),
      'The validation transaction creation request error(s).'
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
export const updateTransaction = createRoute({
  method: 'patch',
  path: '/transactions/{transactionId}',
  tags,
  middleware: [protectedMiddleware()],
  request: {
    params: transactionIdParamSchema,
    body: ContentJSONRequired(
      updateTransactionsSchema,
      'The transaction to update.'
    ),
  },
  responses: {
    [StatusCode.OK]: ContentJSON(
      selectTransactionsSchema,
      'The updated transaction.'
    ),
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
      'The validation update transaction request error(s).'
    ),
  },
});

export const deleteTransaction = createRoute({
  method: 'delete',
  path: '/transactions/{transactionId}',
  tags,
  middleware: [protectedMiddleware()],
  request: {
    params: transactionIdParamSchema,
  },
  responses: {
    [StatusCode.OK]: ContentJSON(
      selectTransactionsSchema,
      'The deleted transaction.'
    ),
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
      'The validation delete transaction request error(s).'
    ),
  },
});

export type ListTransactions = typeof listTransactions;
export type CreateTransaction = typeof createTransaction;
export type GetTransaction = typeof getTransaction;
export type UpdateTransaction = typeof updateTransaction;
export type DeleteTransaction = typeof deleteTransaction;
