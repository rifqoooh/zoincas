import * as StatusCode from '@/lib/api/http-status-code';

import { createRoute } from '@hono/zod-openapi';

import { ContentJSON } from '@/lib/api/openapi-utilities';

import { protectedMiddleware } from '@/middleware/api/protected-middleware';
import { listBalancesSummaryResponse } from '@/validators/api/balances/response';

const tags = ['Balances'];

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
  },
});

export type ListBalancesSummary = typeof listBalancesSummary;
