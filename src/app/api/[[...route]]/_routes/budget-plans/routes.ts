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
  getBudgetPlanResponse,
  listBudgetPlansSummaryResponse,
} from '@/validators/api/budget-plans/response';
import {
  insertBudgetPlansSchema,
  selectBudgetPlansSchema,
  updateBudgetPlansSchema,
} from '@/validators/db/budget-plans';

const tags = ['Budget Plans'];

export const budgetPlanIdParamSchema = z.object({
  budgetPlanId: z
    .string()
    .uuid()
    .openapi({
      param: {
        name: 'budgetPlanId',
        in: 'path',
      },
    }),
});

export const listBudgetPlansSummary = createRoute({
  method: 'get',
  path: '/budget-plans',
  tags,
  middleware: [protectedMiddleware()],
  responses: {
    [StatusCode.OK]: ContentJSON(
      listBudgetPlansSummaryResponse,
      'The list of budget plans summary.'
    ),
    [StatusCode.NOT_FOUND]: ContentJSON(
      createNotFoundSchema({
        path: '/budget-plans',
      }),
      'The list budget plans does not exist in our resources.'
    ),
  },
});

export const createBudgetPlan = createRoute({
  method: 'post',
  path: '/budget-plans',
  tags,
  middleware: [protectedMiddleware()],
  request: {
    body: ContentJSONRequired(
      insertBudgetPlansSchema,
      'The budget plan and its categories to create.'
    ),
  },
  responses: {
    [StatusCode.OK]: ContentJSON(selectBudgetPlansSchema, 'The budget plan.'),
    [StatusCode.NOT_FOUND]: ContentJSON(
      createNotFoundSchema({
        path: '/budget-plans',
      }),
      'The budget plan with the requested ID does not exist in our resources.'
    ),
  },
});

export const getBudgetPlan = createRoute({
  method: 'get',
  path: '/budget-plans/{budgetPlanId}',
  tags,
  middleware: [protectedMiddleware()],
  request: {
    params: budgetPlanIdParamSchema,
  },
  responses: {
    [StatusCode.OK]: ContentJSON(getBudgetPlanResponse, 'The budget plan.'),
    [StatusCode.NOT_FOUND]: ContentJSON(
      createNotFoundSchema({
        path: '/budget-plans/{budgetPlanId}',
      }),
      'The budget plan with the requested ID does not exist in our resources.'
    ),
    [StatusCode.UNPROCESSABLE_ENTITY]: ContentJSON(
      createErrorSchema({
        schema: budgetPlanIdParamSchema,
        message: 'The budget plan id request params is required.',
        path: '/budget-plans/{budgetPlanId}',
        potentialInput: {},
      }),
      'The validation get budget plan request error(s).'
    ),
  },
});

export const updateBudgetPlan = createRoute({
  method: 'put',
  path: '/budget-plans/{budgetPlanId}',
  tags,
  middleware: [protectedMiddleware()],
  request: {
    params: budgetPlanIdParamSchema,
    body: ContentJSONRequired(
      updateBudgetPlansSchema,
      'The budget plan and its categories to update.'
    ),
  },
  responses: {
    [StatusCode.OK]: ContentJSON(selectBudgetPlansSchema, 'The budget plan.'),
    [StatusCode.NOT_FOUND]: ContentJSON(
      createNotFoundSchema({
        path: '/budget-plans/{budgetPlanId}',
      }),
      'The budget plan with the requested ID does not exist in our resources.'
    ),
    [StatusCode.UNPROCESSABLE_ENTITY]: ContentJSON(
      createErrorSchema({
        schema: budgetPlanIdParamSchema,
        message: 'The budget plan id request params is required.',
        path: '/budget-plans/{budgetPlanId}',
        potentialInput: {},
      }),
      'The validation update budget plan request error(s).'
    ),
  },
});

export const deleteBudgetPlan = createRoute({
  method: 'delete',
  path: '/budget-plans/{budgetPlanId}',
  tags,
  middleware: [protectedMiddleware()],
  request: {
    params: budgetPlanIdParamSchema,
  },
  responses: {
    [StatusCode.OK]: ContentJSON(selectBudgetPlansSchema, 'The budget plan.'),
    [StatusCode.NOT_FOUND]: ContentJSON(
      createNotFoundSchema({
        path: '/budget-plans/{budgetPlanId}',
      }),
      'The budget plan with the requested ID does not exist in our resources.'
    ),
    [StatusCode.UNPROCESSABLE_ENTITY]: ContentJSON(
      createErrorSchema({
        schema: budgetPlanIdParamSchema,
        message: 'The budget plan id request params is required.',
        path: '/budget-plans/{budgetPlanId}',
        potentialInput: {},
      }),
      'The validation delete budget plan request error(s).'
    ),
  },
});

export type ListBudgetPlansSummary = typeof listBudgetPlansSummary;
export type CreateBudgetPlan = typeof createBudgetPlan;
export type GetBudgetPlan = typeof getBudgetPlan;
export type UpdateBudgetPlan = typeof updateBudgetPlan;
export type DeleteBudgetPlan = typeof deleteBudgetPlan;
