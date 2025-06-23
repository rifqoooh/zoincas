import * as StatusCode from '@/lib/api/http-status-code';
import * as transactions from '@/lib/db/services/transactions';

import type { AppRouteHandler } from '@/lib/api/types';
import type { SelectUsersType as User } from '@/validators/db/users';
import type {
  CreateTransaction,
  DeleteTransaction,
  GetTransaction,
  ListTransactions,
  transactionIdParamSchema,
} from './routes';

import type { z } from '@hono/zod-openapi';

import { createNotFoundResponse } from '@/lib/api/openapi-utilities';

export type TransactionIdParam = z.infer<typeof transactionIdParamSchema>;

export const listTransactions: AppRouteHandler<ListTransactions> = async (
  c
) => {
  const query = c.req.valid('query');

  const user = c.get('user') as User;

  const data = await transactions.listTransactions(user.id, query);
  if (!data) {
    return c.json(
      createNotFoundResponse({ path: c.req.path }),
      StatusCode.NOT_FOUND
    );
  }

  return c.json(data, StatusCode.OK);
};

export const createTransaction: AppRouteHandler<CreateTransaction> = async (
  c
) => {
  const input = c.req.valid('json');

  const data = await transactions.createTransaction(input);

  return c.json(data, StatusCode.CREATED);
};

export const getTransaction: AppRouteHandler<GetTransaction> = async (c) => {
  const { transactionId } = c.req.valid('param');

  const user = c.get('user') as User;

  const data = await transactions.getTransaction(user.id, transactionId);
  if (!data) {
    return c.json(
      createNotFoundResponse({ path: c.req.path }),
      StatusCode.NOT_FOUND
    );
  }

  return c.json(data, StatusCode.OK);
};

export const deleteTransaction: AppRouteHandler<DeleteTransaction> = async (
  c
) => {
  const { transactionId } = c.req.valid('param');

  const user = c.get('user') as User;

  const data = await transactions.deleteTransaction(user.id, transactionId);
  if (!data) {
    return c.json(
      createNotFoundResponse({ path: c.req.path }),
      StatusCode.NOT_FOUND
    );
  }

  return c.json(data, StatusCode.OK);
};
