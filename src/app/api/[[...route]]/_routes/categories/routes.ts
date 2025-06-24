import * as StatusCode from '@/lib/api/http-status-code';

import { createRoute } from '@hono/zod-openapi';

import { ContentJSON, createNotFoundSchema } from '@/lib/api/openapi-utilities';

import { protectedMiddleware } from '@/middleware/api/protected-middleware';
import { listCategoriesSummaryResponse } from '@/validators/api/categories/response';

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

export type ListCategoriesSummary = typeof listCategoriesSummary;
