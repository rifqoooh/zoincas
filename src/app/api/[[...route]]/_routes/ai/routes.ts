import * as StatusCode from '@/lib/api/http-status-code';

import { createRoute } from '@hono/zod-openapi';

import {
  ContentFormDataRequired,
  ContentJSON,
} from '@/lib/api/openapi-utilities';
import { protectedMiddleware } from '@/middleware/api/protected-middleware';
import { scanImageSchema } from '@/validators/api/ai/request';
import { selectTransactionsSchema } from '@/validators/db/transactions';

const tags = ['AI'];

export const scanImage = createRoute({
  method: 'post',
  path: '/ai/scan-image',
  tags,
  middleware: [protectedMiddleware()],
  request: {
    body: ContentFormDataRequired(scanImageSchema, 'The image to scan.'),
  },
  responses: {
    [StatusCode.CREATED]: ContentJSON(
      selectTransactionsSchema.pick({
        datetime: true,
        amount: true,
        description: true,
      }),
      'The created transaction.'
    ),
  },
});

export type ScanImage = typeof scanImage;
