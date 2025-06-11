import { UNPROCESSABLE_ENTITY } from '@/lib/api/http-status-code';
import type { AppBindings } from '@/lib/api/types';
import { OpenAPIHono } from '@hono/zod-openapi';
import { formatZodIssues } from './format-zod-issues';

export function createRouter() {
  return new OpenAPIHono<AppBindings>({
    strict: false,
    defaultHook: (result, c) => {
      // Default response if zod validation errors
      if (!result.success) {
        return c.json(
          {
            error: {
              code: 'UNPROCESSABLE_ENTITY',
              message: 'The user request input is invalid.',
              path: c.req.path,
              details: formatZodIssues(result.error.issues),
            },
          },
          UNPROCESSABLE_ENTITY
        );
      }
    },
  });
}
