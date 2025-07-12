import * as StatusCode from '@/lib/api/http-status-code';
import * as budgetPlans from '@/lib/db/services/budget-plans';

import type { AppRouteHandler } from '@/lib/api/types';
import type { SelectUsersType as User } from '@/validators/db/users';
import type {
  CreateBudgetPlan,
  DeleteBudgetPlan,
  GetBudgetPlan,
  ListBudgetPlansSummary,
  UpdateBudgetPlan,
} from './routes';

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

export const createBudgetPlan: AppRouteHandler<CreateBudgetPlan> = async (
  c
) => {
  const input = c.req.valid('json');

  const user = c.get('user') as User;

  const data = await budgetPlans.createBudgetPlan(user.id, input);
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

export const updateBudgetPlan: AppRouteHandler<UpdateBudgetPlan> = async (
  c
) => {
  const { budgetPlanId } = c.req.valid('param');
  const input = c.req.valid('json');

  const user = c.get('user') as User;

  const data = await budgetPlans.updateBudgetPlan(user.id, budgetPlanId, input);
  if (!data) {
    return c.json(
      createNotFoundResponse({ path: c.req.path }),
      StatusCode.NOT_FOUND
    );
  }

  return c.json(data, StatusCode.OK);
};

export const deleteBudgetPlan: AppRouteHandler<DeleteBudgetPlan> = async (
  c
) => {
  const { budgetPlanId } = c.req.valid('param');

  const user = c.get('user') as User;

  const data = await budgetPlans.deleteBudgetPlan(user.id, budgetPlanId);
  if (!data) {
    return c.json(
      createNotFoundResponse({ path: c.req.path }),
      StatusCode.NOT_FOUND
    );
  }

  return c.json(data, StatusCode.OK);
};
