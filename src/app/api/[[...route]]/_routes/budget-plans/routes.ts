import * as StatusCode from '@/lib/api/http-status-code';

import { createRoute } from '@hono/zod-openapi';

import { ContentJSON, createNotFoundSchema } from '@/lib/api/openapi-utilities';

import { protectedMiddleware } from '@/middleware/api/protected-middleware';
import { listBudgetPlansSummaryResponse } from '@/validators/api/budget-plans/response';

const tags = ['Budget Plans'];

export const listBudgetPlansSummary = createRoute({
  method: 'get',
  path: '/budget-plans',
  tags,
  middleware: [protectedMiddleware()],
  responses: {
    [StatusCode.OK]: ContentJSON(
      listBudgetPlansSummaryResponse,
      'The list of budget plans summary.'
    ),
    [StatusCode.NOT_FOUND]: ContentJSON(
      createNotFoundSchema({
        path: '/budget-plans',
      }),
      'The list budget plans does not exist in our resources.'
    ),
  },
});

export type ListBudgetPlansSummary = typeof listBudgetPlansSummary;
