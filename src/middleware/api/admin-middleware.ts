import type { SessionVariables } from '@/lib/auth/types';

import { createMiddleware } from 'hono/factory';

export const adminMiddleware = () =>
  createMiddleware<{ Variables: SessionVariables }>(async (c, next) => {
    const session = c.get('session');
    const user = c.get('user');

    if (!session || !user) {
      return c.json(
        {
          error: 'UNAUTHENTICATED',
        },
        401
      );
    }

    if (user.role !== 'admin') {
      return c.json({ error: 'UNAUTHORIZED' }, 401);
    }

    return await next();
  });
