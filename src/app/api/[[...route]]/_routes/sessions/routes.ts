import * as StatusCode from '@/lib/api/http-status-code';

import { createRoute } from '@hono/zod-openapi';

import { ContentJSON } from '@/lib/api/openapi-utilities';
import { getSessionsResponse } from '@/validators/api/openapi/sessions/response';

const tags = ['Sessions'];

export const getSessions = createRoute({
  method: 'get',
  path: '/sessions',
  tags,
  responses: {
    [StatusCode.OK]: ContentJSON(
      getSessionsResponse,
      'Get the signed in user session.'
    ),
  },
});

export type GetSessions = typeof getSessions;
