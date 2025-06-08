import type { SessionVariables } from '@/lib/auth/types';
import type { GetUsersQueryType } from '@/types/api/users/request';

import { zValidator as validator } from '@hono/zod-validator';
import { Hono } from 'hono';
import qs from 'qs';
import { z } from 'zod/v4';

import { getUsers } from '@/lib/db/services/users';
import { adminAPIMiddleware } from '@/middleware/admin-api-middleware';
import { getUsersQuerySchema } from '@/validators/api/users/request';

const app = new Hono<{
  Variables: SessionVariables;
}>();

app.get(
  '/',
  adminAPIMiddleware(),
  validator('query', getUsersQuerySchema, undefined, {
    validationFunction: async (schema, query) => {
      const search = qs.stringify(query);
      const parse = qs.parse(search, { allowDots: true });

      // biome-ignore lint/suspicious/noExplicitAny: <explanation>
      const queryParsed = parse as any as GetUsersQueryType;
      if (queryParsed.sort === undefined) {
        queryParsed.sort = [];
      }

      queryParsed.sort = queryParsed.sort.map((item) => {
        // convert string boolean to actual boolean type
        const desc = z.stringbool().parse(item.desc);
        return {
          ...item,
          desc,
        };
      });

      return await schema.safeParseAsync(queryParsed);
    },
  }),
  async (c) => {
    const query = c.req.valid('query');

    try {
      const data = await getUsers(query);
      return c.json(data, 200);
    } catch (error) {
      if (error instanceof Error) {
        return c.json({ error: 'INTERNAL_SERVER_ERROR' }, 500);
      }
    }
  }
);

export default app;
