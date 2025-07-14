import * as StatusCode from '@/lib/api/http-status-code';

import { createRoute, z } from '@hono/zod-openapi';

import {
  ContentJSON,
  ContentJSONRequired,
  createErrorSchema,
  createNotFoundSchema,
} from '@/lib/api/openapi-utilities';
import { protectedMiddleware } from '@/middleware/api/protected-middleware';
import {
  getCategoryResponse,
  listCategoriesSummaryResponse,
} from '@/validators/api/categories/response';
import {
  insertCategoriesSchema,
  selectCategoriesSchema,
  updateCategoriesSchema,
} from '@/validators/db/categories';

const tags = ['Categories'];

export const categoryIdParamSchema = z.object({
  categoryId: z
    .string()
    .uuid()
    .openapi({
      param: {
        name: 'categoryId',
        in: 'path',
      },
    }),
});

export const listCategoriesSummary = createRoute({
  method: 'get',
  path: '/categories',
  tags,
  middleware: [protectedMiddleware()],
  responses: {
    [StatusCode.OK]: ContentJSON(
      listCategoriesSummaryResponse,
      'The list of categories summary.'
    ),
    [StatusCode.NOT_FOUND]: ContentJSON(
      createNotFoundSchema({
        path: '/categories',
      }),
      'The list categories does not exist in our resources.'
    ),
  },
});

export const createCategory = createRoute({
  method: 'post',
  path: '/categories',
  tags,
  middleware: [protectedMiddleware()],
  request: {
    body: ContentJSONRequired(
      insertCategoriesSchema,
      'The category to create.'
    ),
  },
  responses: {
    [StatusCode.CREATED]: ContentJSON(
      selectCategoriesSchema,
      'The created category.'
    ),
    [StatusCode.NOT_FOUND]: ContentJSON(
      createNotFoundSchema({
        path: '/categories',
      }),
      'The category with the requested ID does not exist in our resources.'
    ),
  },
});

export const getCategory = createRoute({
  method: 'get',
  path: '/categories/{categoryId}',
  tags,
  middleware: [protectedMiddleware()],
  request: {
    params: categoryIdParamSchema,
  },
  responses: {
    [StatusCode.OK]: ContentJSON(getCategoryResponse, 'The category.'),
    [StatusCode.NOT_FOUND]: ContentJSON(
      createNotFoundSchema({
        path: '/categories/{categoryId}',
      }),
      'The category with the requested ID does not exist in our resources.'
    ),
    [StatusCode.UNPROCESSABLE_ENTITY]: ContentJSON(
      createErrorSchema({
        schema: categoryIdParamSchema,
        message: 'The category id request params is required.',
        path: '/categories/{categoryId}',
        potentialInput: {},
      }),
      'The validation category request error(s).'
    ),
  },
});

export const updateCategory = createRoute({
  method: 'patch',
  path: '/categories/{categoryId}',
  tags,
  middleware: [protectedMiddleware()],
  request: {
    params: categoryIdParamSchema,
    body: ContentJSONRequired(
      updateCategoriesSchema,
      'The category to update.'
    ),
  },
  responses: {
    [StatusCode.OK]: ContentJSON(selectCategoriesSchema, 'The category.'),
    [StatusCode.NOT_FOUND]: ContentJSON(
      createNotFoundSchema({
        path: '/categories/{categoryId}',
      }),
      'The category with the requested ID does not exist in our resources.'
    ),
    [StatusCode.UNPROCESSABLE_ENTITY]: ContentJSON(
      createErrorSchema({
        schema: categoryIdParamSchema,
        message: 'The category id request params is required.',
        path: '/categories/{categoryId}',
        potentialInput: {},
      }),
      'The validation category request error(s).'
    ),
  },
});

export const deleteCategory = createRoute({
  method: 'delete',
  path: '/categories/{categoryId}',
  tags,
  middleware: [protectedMiddleware()],
  request: {
    params: categoryIdParamSchema,
  },
  responses: {
    [StatusCode.OK]: ContentJSON(selectCategoriesSchema, 'The category.'),
    [StatusCode.NOT_FOUND]: ContentJSON(
      createNotFoundSchema({
        path: '/categories/{categoryId}',
      }),
      'The category with the requested ID does not exist in our resources.'
    ),
    [StatusCode.UNPROCESSABLE_ENTITY]: ContentJSON(
      createErrorSchema({
        schema: categoryIdParamSchema,
        message: 'The category id request params is required.',
        path: '/categories/{categoryId}',
        potentialInput: {},
      }),
      'The validation category request error(s).'
    ),
  },
});

export type ListCategoriesSummary = typeof listCategoriesSummary;
export type CreateCategory = typeof createCategory;
export type GetCategory = typeof getCategory;
export type UpdateCategory = typeof updateCategory;
export type DeleteCategory = typeof deleteCategory;
