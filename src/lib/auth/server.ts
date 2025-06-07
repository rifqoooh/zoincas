import 'server-only';

import { env } from '@/env';
import { db } from '@/lib/db';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { nextCookies } from 'better-auth/next-js';
import { admin } from 'better-auth/plugins';

export const auth = betterAuth({
  baseURL: env().NEXT_PUBLIC_APP_URL,
  database: drizzleAdapter(db, {
    provider: 'pg',
    usePlural: true,
  }),
  user: {
    additionalFields: {
      role: {
        type: 'string',
        required: false,
        input: false,
      },
      banned: {
        type: 'boolean',
        required: false,
        input: false,
      },
      banReason: {
        type: 'string',
        input: false,
      },
      banExpires: {
        type: 'date',
        input: false,
      },
    },
  },
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    maxPasswordLength: 64,
  },
  socialProviders: {
    google: {
      clientId: env().GOOGLE_CLIENT_ID,
      clientSecret: env().GOOGLE_CLIENT_SECRET,
    },
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 2 * 60,
    },
  },
  plugins: [admin(), nextCookies()],
});
