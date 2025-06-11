import * as StatusCode from '@/lib/api/http-status-code';

import type { AppRouteHandler } from '@/lib/api/types';
import type { GetSessions } from './routes';

export const getSessions: AppRouteHandler<GetSessions> = (c) => {
  const user = c.get('user');
  const session = c.get('session');

  return c.json(
    {
      user,
      session,
    },

    StatusCode.OK
  );
};
