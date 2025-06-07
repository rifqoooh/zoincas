import { auth } from '@/lib/auth/server';
import type { SessionVariables } from '@/lib/auth/types';
import { Hono } from 'hono';
import { handle } from 'hono/vercel';

import session from './_routes/sessions';

const app = new Hono<{
  Variables: SessionVariables;
}>();

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

app.on(['GET', 'POST'], '/auth/*', async (c) => {
  return await auth.handler(c.req.raw);
});

const routes = app.route('/session', session);

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;
