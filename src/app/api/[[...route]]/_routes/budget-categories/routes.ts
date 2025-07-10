import * as StatusCode from '@/lib/api/http-status-code';

import { createRoute, z } from '@hono/zod-openapi';

import {
  ContentJSON,
  createErrorSchema,
  createNotFoundSchema,
} from '@/lib/api/openapi-utilities';
import { protectedMiddleware } from '@/middleware/api/protected-middleware';
import { selectBudgetCategoriesSchema } from '@/validators/db/budget-categories';

const tags = ['Budget Categories'];

export const budgetCategoryIdParamSchema = z.object({
  budgetCategoryId: z
    .string()
    .uuid()
    .openapi({
      param: {
        name: 'budgetCategoryId',
        in: 'path',
      },
    }),
});

export const deleteBudgetCategory = createRoute({
  method: 'delete',
  path: '/budget-categories/{budgetCategoryId}',
  tags,
  middleware: [protectedMiddleware()],
  request: {
    params: budgetCategoryIdParamSchema,
  },
  responses: {
    [StatusCode.OK]: ContentJSON(
      selectBudgetCategoriesSchema,
      'The deleted budget category.'
    ),
    [StatusCode.NOT_FOUND]: ContentJSON(
      createNotFoundSchema({
        path: '/budget-categories/{budgetCategoryId}',
      }),
      'The budget category with the requested ID does not exist in our resources.'
    ),
    [StatusCode.UNPROCESSABLE_ENTITY]: ContentJSON(
      createErrorSchema({
        schema: budgetCategoryIdParamSchema,
        message: 'The budget category id request params is required.',
        path: '/budget-categories/{budgetCategoryId}',
        potentioalInput: {},
      }),
      'The validation delete budget category request error(s).'
    ),
  },
});

export type DeleteBudgetCategory = typeof deleteBudgetCategory;
