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
      GOOGLE_CLIENT_SECRET: z.string().min(1).startsWith('GOCSPX-'),
      GOOGLE_GENERATIVE_AI_API_KEY: z.string().min(1),
      UPSTASH_REDIS_REST_URL: z.url().min(1),
      UPSTASH_REDIS_REST_TOKEN: z.string().min(1),
      SENTRY_AUTH_TOKEN: z.string().min(1),
      // Added by Sentry Integration, Vercel Marketplace
      SENTRY_ORG: z.string().optional(),
      SENTRY_PROJECT: z.string().optional(),
    },
    client: {
      NEXT_PUBLIC_APP_URL: z.url().min(1),
      // Added by Sentry Integration, Vercel Marketplace
      NEXT_PUBLIC_SENTRY_DSN: z.url().optional(),
    },
    runtimeEnv: {
      NODE_ENV: process.env.NODE_ENV,
      DATABASE_URL: process.env.DATABASE_URL,
      BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
      GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
      GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
      GOOGLE_GENERATIVE_AI_API_KEY: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
      UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL,
      UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN,
      SENTRY_AUTH_TOKEN: process.env.SENTRY_AUTH_TOKEN,
      SENTRY_ORG: process.env.SENTRY_ORG,
      SENTRY_PROJECT: process.env.SENTRY_PROJECT,
      NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
      NEXT_PUBLIC_SENTRY_DSN: process.env.NEXT_PUBLIC_SENTRY_DSN,
    },
    emptyStringAsUndefined: true,
  });
