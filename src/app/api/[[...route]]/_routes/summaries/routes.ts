import * as StatusCode from '@/lib/api/http-status-code';

import { createRoute } from '@hono/zod-openapi';

import { ContentJSON, createNotFoundSchema } from '@/lib/api/openapi-utilities';
import { protectedMiddleware } from '@/middleware/api/protected-middleware';
import { getSummariesQuery } from '@/validators/api/summaries/request';
import {
  getSummariesCategoryResponse,
  getSummariesIncomeExpenseResponse,
  getSummariesResponse,
} from '@/validators/api/summaries/response';

const tags = ['Summaries'];

export const getSummaries = createRoute({
  method: 'get',
  path: '/summaries',
  tags,
  middleware: [protectedMiddleware()],
  request: {
    query: getSummariesQuery,
  },
  responses: {
    [StatusCode.OK]: ContentJSON(getSummariesResponse, 'The summaries.'),
    [StatusCode.NOT_FOUND]: ContentJSON(
      createNotFoundSchema({
        path: '/summaries',
      }),
      'The summaries does not exist in our resources.'
    ),
  },
});

export const getSummariesIncomeExpense = createRoute({
  method: 'get',
  path: '/summaries/income-expense',
  tags,
  middleware: [protectedMiddleware()],
  request: {
    query: getSummariesQuery,
  },
  responses: {
    [StatusCode.OK]: ContentJSON(
      getSummariesIncomeExpenseResponse,
      'The income and expense summaries.'
    ),
    [StatusCode.NOT_FOUND]: ContentJSON(
      createNotFoundSchema({
        path: '/summaries/income-expense',
      }),
      'The income and expense summaries does not exist in our resources.'
    ),
  },
});

export const getSummariesCategory = createRoute({
  method: 'get',
  path: '/summaries/category',
  tags,
  middleware: [protectedMiddleware()],
  request: {
    query: getSummariesQuery,
  },
  responses: {
    [StatusCode.OK]: ContentJSON(
      getSummariesCategoryResponse,
      'The category summaries.'
    ),
    [StatusCode.NOT_FOUND]: ContentJSON(
      createNotFoundSchema({
        path: '/summaries/category',
      }),
      'The category summaries does not exist in our resources.'
    ),
  },
});

export type GetSummaries = typeof getSummaries;
export type GetSummariesIncomeExpense = typeof getSummariesIncomeExpense;
export type GetSummariesCategory = typeof getSummariesCategory;
