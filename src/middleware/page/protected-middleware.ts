import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { auth } from '@/lib/auth/server';
import { Routes } from '@/lib/safe-routes';

export const protectedMiddleware = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect(Routes.signIn({}, { search: { callbackURL: 'dashboard' } }));
  }

  return;
};
