import type { AppOpenAPI } from './types';

import { Scalar } from '@scalar/hono-api-reference';

import { env } from '@/env';
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
        url: '/api/doc',
        theme: 'kepler',
        layout: 'classic',
        defaultHttpClient: {
          targetKey: 'js',
          clientKey: 'fetch',
        },
      })
    );
  }
}
