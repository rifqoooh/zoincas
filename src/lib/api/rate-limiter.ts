import * as StatusCode from './http-status-code';

import type { SelectUsersType as User } from '@/validators/db/users';
import type { AppBindings, AppContext, AppOpenAPI } from './types';

import { RedisStore } from '@hono-rate-limiter/redis';
import { rateLimiter as limiter } from 'hono-rate-limiter';

import { redis } from '@/lib/redis';

export const rateLimiter = (app: AppOpenAPI) => {
  // Apply the rate limiting middleware to all requests.
  app.use(
    '*',
    limiter({
      windowMs: 60 * 1000, // 1 minutes
      limit: 200, // Limit each IP to 200 requests per `window` (here, per 1 minutes).
      standardHeaders: 'draft-6', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
      keyGenerator: (c: AppContext) => {
        const user = c.get('user') as User;
        return (
          user.id ??
          c.req.header('x-forwarded-for') ??
          c.req.header('cf-connecting-ip') ??
          ''
        );
      }, // Method to generate custom identifiers for clients.
      store: new RedisStore<AppBindings>({
        client: redis,
      }),
      handler: (c, next) => {
        const rateLimit = c.get('rateLimit');
        const isLimitExceeded = rateLimit.remaining === 0;

        if (isLimitExceeded) {
          return c.json(
            {
              error: {
                code: 'TOO_MANY_REQUESTS',
                message: 'Too many requests.',
                path: c.req.path,
                details:
                  'You have exceeded our rate limit. Try again later in a few minutes.',
              },
            },
            StatusCode.TOO_MANY_REQUESTS
          );
        }

        return next();
      },
    })
  );
};
