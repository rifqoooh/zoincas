import * as StatusCode from '@/lib/api/http-status-code';
import * as budgetPlans from '@/lib/db/services/budget-plans';

import type { AppRouteHandler } from '@/lib/api/types';
import type { SelectUsersType as User } from '@/validators/db/users';
import type { GetBudgetPlan, ListBudgetPlansSummary } from './routes';

import { createNotFoundResponse } from '@/lib/api/openapi-utilities';

export const listBudgetPlansSummary: AppRouteHandler<
  ListBudgetPlansSummary
> = async (c) => {
  const user = c.get('user') as User;

  const data = await budgetPlans.listBudgetPlansSummary(user.id);
  if (!data) {
    return c.json(
      createNotFoundResponse({ path: c.req.path }),
      StatusCode.NOT_FOUND
    );
  }

  return c.json(data, StatusCode.OK);
};

export const getBudgetPlan: AppRouteHandler<GetBudgetPlan> = async (c) => {
  const { budgetPlanId } = c.req.valid('param');

  const user = c.get('user') as User;

  const data = await budgetPlans.getBudgetPlan(user.id, budgetPlanId);
  if (!data) {
    return c.json(
      createNotFoundResponse({ path: c.req.path }),
      StatusCode.NOT_FOUND
    );
  }

  return c.json(data, StatusCode.OK);
};
