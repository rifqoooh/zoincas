import { env } from '@/env';
import { adminClient } from 'better-auth/client/plugins';
import { createAuthClient } from 'better-auth/react';

export const auth = createAuthClient({
  baseURL: env().NEXT_PUBLIC_APP_URL,
  plugins: [adminClient()],
});
