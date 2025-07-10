import * as StatusCode from '@/lib/api/http-status-code';
import * as budgetCategories from '@/lib/db/services/budget-categories';

import type { AppRouteHandler } from '@/lib/api/types';
import type { SelectUsersType as User } from '@/validators/db/users';
import type { DeleteBudgetCategory } from './routes';

import { createNotFoundResponse } from '@/lib/api/openapi-utilities';

export const deleteBudgetCategory: AppRouteHandler<
  DeleteBudgetCategory
> = async (c) => {
  const { budgetCategoryId } = c.req.valid('param');

  const user = c.get('user') as User;

  const data = await budgetCategories.deleteBudgetCategory(
    user.id,
    budgetCategoryId
  );
  if (!data) {
    return c.json(
      createNotFoundResponse({ path: c.req.path }),
      StatusCode.NOT_FOUND
    );
  }

  return c.json(data, StatusCode.OK);
};
