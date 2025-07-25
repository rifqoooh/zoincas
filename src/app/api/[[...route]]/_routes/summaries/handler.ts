import * as StatusCode from '@/lib/api/http-status-code';
import * as summaries from '@/lib/db/services/summaries';

import type { AppRouteHandler } from '@/lib/api/types';
import type { SelectUsersType as User } from '@/validators/db/users';
import type {
  GetSummaries,
  GetSummariesCategory,
  GetSummariesIncomeExpense,
} from './routes';

import { subDays } from 'date-fns';

import { createNotFoundResponse } from '@/lib/api/openapi-utilities';

export const getSummaries: AppRouteHandler<GetSummaries> = async (c) => {
  const query = c.req.valid('query');

  const user = c.get('user') as User;

  const defaultEndDate = new Date();
  const defaultStartDate = subDays(defaultEndDate, 30);

  if (!query.startDate) {
    query.startDate = defaultStartDate.getTime();
  }

  if (!query.endDate) {
    query.endDate = defaultEndDate.getTime();
  }

  const data = await summaries.getSummaries(user.id, query);
  if (!data) {
    return c.json(
      createNotFoundResponse({ path: c.req.path }),
      StatusCode.NOT_FOUND
    );
  }

  return c.json(data, StatusCode.OK);
};

export const getSummariesIncomeExpense: AppRouteHandler<
  GetSummariesIncomeExpense
> = async (c) => {
  const query = c.req.valid('query');

  const user = c.get('user') as User;

  const defaultEndDate = new Date();
  const defaultStartDate = subDays(defaultEndDate, 30);

  if (!query.startDate) {
    query.startDate = defaultStartDate.getTime();
  }

  if (!query.endDate) {
    query.endDate = defaultEndDate.getTime();
  }

  const data = await summaries.getSummariesIncomeExpense(user.id, query);
  if (!data) {
    return c.json(
      createNotFoundResponse({ path: c.req.path }),
      StatusCode.NOT_FOUND
    );
  }

  return c.json(data, StatusCode.OK);
};

export const getSummariesCategory: AppRouteHandler<
  GetSummariesCategory
> = async (c) => {
  const query = c.req.valid('query');

  const user = c.get('user') as User;

  const defaultEndDate = new Date();
  const defaultStartDate = subDays(defaultEndDate, 30);

  if (!query.startDate) {
    query.startDate = defaultStartDate.getTime();
  }

  if (!query.endDate) {
    query.endDate = defaultEndDate.getTime();
  }

  const data = await summaries.getSummariesCategory(user.id, query);
  if (!data) {
    return c.json(
      createNotFoundResponse({ path: c.req.path }),
      StatusCode.NOT_FOUND
    );
  }

  const topCategories = data.slice(0, 3);

  const otherCategories = data.slice(3);
  const otherCategoriesAmount = otherCategories.reduce((acc, category) => {
    return acc + category.amount;
  }, 0);

  if (otherCategories.length > 0) {
    topCategories.push({
      name: 'Other',
      amount: otherCategoriesAmount,
    });
  }

  return c.json(topCategories, StatusCode.OK);
};
