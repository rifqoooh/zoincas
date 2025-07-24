import * as StatusCode from '@/lib/api/http-status-code';

import { createRoute } from '@hono/zod-openapi';

import { ContentJSON, createNotFoundSchema } from '@/lib/api/openapi-utilities';
import { protectedMiddleware } from '@/middleware/api/protected-middleware';
import { getSummariesQuery } from '@/validators/api/summaries/request';
import { getSummariesResponse } from '@/validators/api/summaries/response';

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

export type GetSummaries = typeof getSummaries;
