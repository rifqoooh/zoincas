import * as StatusCode from '@/lib/api/http-status-code';
import * as transactions from '@/lib/db/services/transactions';

import type { z } from '@hono/zod-openapi';

import { APIError } from '@/lib/api/api-exception';
import type { AppRouteHandler } from '@/lib/api/types';
import type { SelectUsersType as User } from '@/validators/db/users';
import type {
  GetTransaction,
  ListTransactions,
  transactionIdParamSchema,
} from './routes';

export type TransactionIdParam = z.infer<typeof transactionIdParamSchema>;

export const listTransactions: AppRouteHandler<ListTransactions> = async (
  c
) => {
  const query = c.req.valid('query');

  const user = c.get('user') as User;

  const data = await transactions.listTransactions(user.id, query);

  return c.json(data, StatusCode.OK);
};

export const getTransaction: AppRouteHandler<GetTransaction> = async (c) => {
  const { transactionId } = c.req.valid('param');

  const user = c.get('user') as User;

  const data = await transactions.getTransaction(user.id, transactionId);
  if (!data) {
    throw new APIError(StatusCode.NOT_FOUND, {
      code: 'NOT_FOUND',
      message: 'The requested resource was not found.',
    });
  }

  return c.json(data, StatusCode.OK);
};
