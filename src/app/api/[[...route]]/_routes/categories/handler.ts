import * as StatusCode from '@/lib/api/http-status-code';
import * as categories from '@/lib/db/services/categories';

import type { AppRouteHandler } from '@/lib/api/types';
import type { SelectUsersType as User } from '@/validators/db/users';
import type {
  CreateCategory,
  DeleteCategory,
  GetCategory,
  ListCategoriesSummary,
  UpdateCategory,
} from './routes';

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

export const createCategory: AppRouteHandler<CreateCategory> = async (c) => {
  const input = c.req.valid('json');
  const user = c.get('user') as User;

  const data = await categories.createCategory(user.id, input);

  return c.json(data, StatusCode.CREATED);
};

export const getCategory: AppRouteHandler<GetCategory> = async (c) => {
  const { categoryId } = c.req.valid('param');

  const user = c.get('user') as User;

  const data = await categories.getCategory(user.id, categoryId);
  if (!data) {
    return c.json(
      createNotFoundResponse({ path: c.req.path }),
      StatusCode.NOT_FOUND
    );
  }

  return c.json(data, StatusCode.OK);
};

export const updateCategory: AppRouteHandler<UpdateCategory> = async (c) => {
  const { categoryId } = c.req.valid('param');
  const input = c.req.valid('json');

  const user = c.get('user') as User;

  const data = await categories.updateCategory(user.id, categoryId, input);
  if (!data) {
    return c.json(
      createNotFoundResponse({ path: c.req.path }),
      StatusCode.NOT_FOUND
    );
  }

  return c.json(data, StatusCode.OK);
};

export const deleteCategory: AppRouteHandler<DeleteCategory> = async (c) => {
  const { categoryId } = c.req.valid('param');

  const user = c.get('user') as User;

  const data = await categories.deleteCategory(user.id, categoryId);
  if (!data) {
    return c.json(
      createNotFoundResponse({ path: c.req.path }),
      StatusCode.NOT_FOUND
    );
  }

  return c.json(data, StatusCode.OK);
};
