import type { SessionVariables } from '@/lib/auth/types';
import { Hono } from 'hono';

const app = new Hono<{
  Variables: SessionVariables;
}>();

app.get('/', (c) => {
  const session = c.get('session');
  const user = c.get('user');

  return c.json({
    session,
    user,
  });
});

export default app;
