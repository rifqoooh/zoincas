import type { AppOpenAPI } from './types';

import { Scalar } from '@scalar/hono-api-reference';

import { env } from '@/env';
import betterAuthOpenAPI from '@/lib/auth/better-auth.json';
import packageJSON from '../../../package.json' with { type: 'json' };

export default function configureOpenAPI(app: AppOpenAPI) {
  if (env().NODE_ENV !== 'production') {
    app.doc('/doc', {
      openapi: '3.0.0',
      info: {
        version: packageJSON.version,
        title: 'Zoincas API',
      },
    });

    app.get(
      '/reference',
      Scalar({
        sources: [
          {
            title: 'Zoincas API',
            url: '/api/doc',
            default: true,
          },
          {
            title: 'Auth API',
            content: betterAuthOpenAPI,
          },
        ],
        theme: 'kepler',
        layout: 'modern',
        hideDownloadButton: env().NODE_ENV === 'production',
        hideTestRequestButton: env().NODE_ENV === 'production',
        defaultHttpClient: {
          targetKey: 'js',
          clientKey: 'fetch',
        },
      })
    );
  }
}
