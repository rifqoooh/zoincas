import * as StatusCode from '@/lib/api/http-status-code';

import type { AppRouteHandler } from '@/lib/api/types';
import type { GetUsers } from './routes';

import * as users from '@/lib/db/services/users';

export const getUsers: AppRouteHandler<GetUsers> = async (c) => {
  const query = c.req.valid('query');

  const data = await users.getUsers(query);

  return c.json(data, StatusCode.OK);
};
