import type { NextConfig } from 'next';

import { withSentryConfig } from '@sentry/nextjs';

import { env } from '@/env';

const coreConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL(
        'https://res.cloudinary.com/dq3ztcghr/image/upload/v1753508303/single-fake-gold-dollar-coin-crop_xuzcwx.webp'
      ),
      new URL(
        'https://res.cloudinary.com/dq3ztcghr/image/upload/v1753601980/light-zoincas-transactions_ackkv2.png'
      ),
      new URL(
        'https://res.cloudinary.com/dq3ztcghr/image/upload/v1753601963/dark-zoincas-transactions_jtiuud.png'
      ),
    ],
  },
};

const config = withSentryConfig(coreConfig, {
  // For all available options, see:
  // https://www.npmjs.com/package/@sentry/webpack-plugin#options

  org: env().SENTRY_ORG,
  project: env().SENTRY_ORG,

  // Only print logs for uploading source maps in CI
  silent: !process.env.CI,

  // For all available options, see:
  // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,

  // Route browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers.
  // This can increase your server load as well as your hosting bill.
  // Note: Check that the configured route will not match with your Next.js middleware, otherwise reporting of client-
  // side errors will fail.
  tunnelRoute: '/monitoring',

  // Automatically tree-shake Sentry logger statements to reduce bundle size
  disableLogger: true,

  // Enables automatic instrumentation of Vercel Cron Monitors. (Does not yet work with App Router route handlers.)
  // See the following for more information:
  // https://docs.sentry.io/product/crons/
  // https://vercel.com/docs/cron-jobs
  automaticVercelMonitors: true,
});

export default config;
