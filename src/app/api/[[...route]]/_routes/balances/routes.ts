import * as StatusCode from '@/lib/api/http-status-code';

import { createRoute, z } from '@hono/zod-openapi';

import {
  ContentJSON,
  ContentJSONRequired,
  createErrorSchema,
  createNotFoundSchema,
} from '@/lib/api/openapi-utilities';
import { protectedMiddleware } from '@/middleware/api/protected-middleware';
import {
  getBalanceResponse,
  listBalancesSummaryResponse,
} from '@/validators/api/balances/response';
import {
  insertBalancesSchema,
  selectBalancesSchema,
  updateBalancesSchema,
} from '@/validators/db/balances';

const tags = ['Balances'];

export const balanceIdParamSchema = z.object({
  balanceId: z
    .string()
    .uuid()
    .openapi({
      param: {
        name: 'balanceId',
        in: 'path',
      },
    }),
});

export const listBalancesSummary = createRoute({
  method: 'get',
  path: '/balances',
  tags,
  middleware: [protectedMiddleware()],
  responses: {
    [StatusCode.OK]: ContentJSON(
      listBalancesSummaryResponse,
      'The list of balances summary.'
    ),
    [StatusCode.NOT_FOUND]: ContentJSON(
      createNotFoundSchema({
        path: '/balances',
      }),
      'The list balances does not exist in our resources.'
    ),
  },
});

export const createBalance = createRoute({
  method: 'post',
  path: '/balances',
  tags,
  middleware: [protectedMiddleware()],
  request: {
    body: ContentJSONRequired(insertBalancesSchema, 'The balance to create.'),
  },
  responses: {
    [StatusCode.OK]: ContentJSON(selectBalancesSchema, 'The balance.'),
    [StatusCode.NOT_FOUND]: ContentJSON(
      createNotFoundSchema({
        path: '/balances',
      }),
      'The balance with the requested ID does not exist in our resources.'
    ),
  },
});

export const getBalance = createRoute({
  method: 'get',
  path: '/balances/{balanceId}',
  tags,
  middleware: [protectedMiddleware()],
  request: {
    params: balanceIdParamSchema,
  },
  responses: {
    [StatusCode.OK]: ContentJSON(getBalanceResponse, 'The balance.'),
    [StatusCode.NOT_FOUND]: ContentJSON(
      createNotFoundSchema({
        path: '/balances/{balanceId}',
      }),
      'The balance with the requested ID does not exist in our resources.'
    ),
    [StatusCode.UNPROCESSABLE_ENTITY]: ContentJSON(
      createErrorSchema({
        schema: balanceIdParamSchema,
        message: 'The balance id request params is required.',
        path: '/balances/{balanceId}',
        potentialInput: {},
      }),
      'The validation get balance request error(s).'
    ),
  },
});

export const updateBalance = createRoute({
  method: 'patch',
  path: '/balances/{balanceId}',
  tags,
  middleware: [protectedMiddleware()],
  request: {
    params: balanceIdParamSchema,
    body: ContentJSONRequired(updateBalancesSchema, 'The balance to update.'),
  },
  responses: {
    [StatusCode.OK]: ContentJSON(selectBalancesSchema, 'The balance.'),
    [StatusCode.NOT_FOUND]: ContentJSON(
      createNotFoundSchema({
        path: '/balances/{balanceId}',
      }),
      'The balance with the requested ID does not exist in our resources.'
    ),
    [StatusCode.UNPROCESSABLE_ENTITY]: ContentJSON(
      createErrorSchema({
        schema: balanceIdParamSchema,
        message: 'The balance id request params is required.',
        path: '/balances/{balanceId}',
        potentialInput: {},
      }),
      'The validation update balance request error(s).'
    ),
  },
});

export const deleteBalance = createRoute({
  method: 'delete',
  path: '/balances/{balanceId}',
  tags,
  middleware: [protectedMiddleware()],
  request: {
    params: balanceIdParamSchema,
  },
  responses: {
    [StatusCode.OK]: ContentJSON(selectBalancesSchema, 'The balance.'),
    [StatusCode.NOT_FOUND]: ContentJSON(
      createNotFoundSchema({
        path: '/balances/{balanceId}',
      }),
      'The balance with the requested ID does not exist in our resources.'
    ),
    [StatusCode.UNPROCESSABLE_ENTITY]: ContentJSON(
      createErrorSchema({
        schema: balanceIdParamSchema,
        message: 'The balance id request params is required.',
        path: '/balances/{balanceId}',
        potentialInput: {},
      }),
      'The validation delete balance request error(s).'
    ),
  },
});

export type ListBalancesSummary = typeof listBalancesSummary;
export type CreateBalance = typeof createBalance;
export type GetBalance = typeof getBalance;
export type UpdateBalance = typeof updateBalance;
export type DeleteBalance = typeof deleteBalance;
