import * as StatusCode from '@/lib/api/http-status-code';

import { createRoute } from '@hono/zod-openapi';

import {
  ContentJSON,
  ContentJSONRequired,
  createNotFoundSchema,
} from '@/lib/api/openapi-utilities';

import { protectedMiddleware } from '@/middleware/api/protected-middleware';
import { listCategoriesSummaryResponse } from '@/validators/api/categories/response';
import {
  insertCategoriesSchema,
  selectCategoriesSchema,
} from '@/validators/db/categories';

const tags = ['Categories'];

export const listCategoriesSummary = createRoute({
  method: 'get',
  path: '/categories',
  tags,
  middleware: [protectedMiddleware()],
  responses: {
    [StatusCode.OK]: ContentJSON(
      listCategoriesSummaryResponse,
      'The list of categories summary.'
    ),
    [StatusCode.NOT_FOUND]: ContentJSON(
      createNotFoundSchema({
        path: '/categories',
      }),
      'The list categories does not exist in our resources.'
    ),
  },
});

export const createCategory = createRoute({
  method: 'post',
  path: '/categories',
  tags,
  middleware: [protectedMiddleware()],
  request: {
    body: ContentJSONRequired(
      insertCategoriesSchema,
      'The category to create.'
    ),
  },
  responses: {
    [StatusCode.CREATED]: ContentJSON(
      selectCategoriesSchema,
      'The created category.'
    ),
    // TODO : fix this potentialInput to proper failed input
    // [StatusCode.UNPROCESSABLE_ENTITY]: ContentJSON(
    //   createErrorSchema({
    //     schema: insertCategoriesSchema,
    //     message: 'The category creation request input is invalid.',
    //     path: '/categories',
    //     potentioalInput: {},
    //   }),
    //   'The validation category creation request error(s).'
    // ),
  },
});

export type ListCategoriesSummary = typeof listCategoriesSummary;
export type CreateCategory = typeof createCategory;
