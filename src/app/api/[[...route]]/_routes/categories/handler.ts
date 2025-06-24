import * as StatusCode from '@/lib/api/http-status-code';
import * as categories from '@/lib/db/services/categories';

import type { AppRouteHandler } from '@/lib/api/types';
import type { SelectUsersType as User } from '@/validators/db/users';
import type { ListCategoriesSummary } from './routes';

import { createNotFoundResponse } from '@/lib/api/openapi-utilities';

export const listCategoriesSummary: AppRouteHandler<
  ListCategoriesSummary
> = async (c) => {
  const user = c.get('user') as User;

  const data = await categories.listCategoriesSummary(user.id);
  if (!data) {
    return c.json(
      createNotFoundResponse({ path: c.req.path }),
      StatusCode.NOT_FOUND
    );
  }

  return c.json(data, StatusCode.OK);
};
