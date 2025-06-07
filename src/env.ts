import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod/v4';

export const env = () =>
  createEnv({
    server: {
      NODE_ENV: z
        .enum(['development', 'test', 'production'])
        .default('development'),
      DATABASE_URL: z.url().min(1),
      BETTER_AUTH_SECRET: z.string().min(1),
      GOOGLE_CLIENT_ID: z
        .string()
        .min(1)
        .endsWith('.apps.googleusercontent.com'),
      GOOGLE_CLIENT_SECRET: z.string().min(1),
    },
    client: {
      NEXT_PUBLIC_APP_URL: z.url().min(1),
    },
    runtimeEnv: {
      NODE_ENV: process.env.NODE_ENV,
      DATABASE_URL: process.env.DATABASE_URL,
      BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
      GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
      GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
      NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    },
    emptyStringAsUndefined: true,
  });
