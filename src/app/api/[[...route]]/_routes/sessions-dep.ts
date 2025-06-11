import { createRouter } from '@/lib/api/create-router';

const app = createRouter().get('/', (c) => {
  const session = c.get('session');
  const user = c.get('user');
  if (!session || !user) {
    return c.json({ error: 'UNAUTHENTICATED' }, 401);
  }

  return c.json(
    {
      session,
      user,
    },
    200
  );
});

export default app;
