import type { StatusCode } from 'hono/utils/http-status';

import { env } from '@/env';
import { createRouter } from '@/lib/api/create-router';
import {
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
  OK,
} from '@/lib/api/http-status-code';
import { auth } from '@/lib/auth/server';

export function createApp() {
  const app = createRouter().basePath('/api');

  app.use('*', async (c, next) => {
    const session = await auth.api.getSession({
      headers: c.req.raw.headers,
    });
    if (!session) {
      c.set('user', null);
      c.set('session', null);
      return next();
    }

    c.set('user', session.user);
    c.set('session', session.session);

    return next();
  });

  app.notFound((c) => {
    return c.json(
      {
        error: {
          code: 'RESOURCE_NOT_FOUND',
          message: 'The requested resource was not found.',
          path: c.req.path,
        },
      },
      NOT_FOUND
    );
  });

  app.onError((err, c) => {
    const currentStatus =
      'status' in err ? err.status : c.newResponse(null).status;

    const statusCode =
      currentStatus !== OK
        ? (currentStatus as StatusCode)
        : INTERNAL_SERVER_ERROR;

    const code = 'code' in err ? err.code : 'INTERNAL_SERVER_ERROR';
    const detail = 'detail' in err ? err.detail : undefined;

    return c.json(
      {
        error: {
          code: code,
          message: err.message,
          path: c.req.path,
          details: detail,
          stack: env().NODE_ENV === 'development' ? err.stack : undefined,
        },
      },
      // @ts-expect-error
      statusCode
    );
  });

  app.on(['GET', 'POST'], '/auth/*', async (c) => {
    return await auth.handler(c.req.raw);
  });

  return app;
}
