import * as StatusCode from '@/lib/api/http-status-code';
import * as transactions from '@/lib/db/services/transactions';

import type { z } from '@hono/zod-openapi';

import type { AppRouteHandler } from '@/lib/api/types';
import type { ListTransactions, userIdParamSchema } from './routes';

export type UserIdParam = z.infer<typeof userIdParamSchema>;

export const listTransactions: AppRouteHandler<ListTransactions> = async (
  c
) => {
  const query = c.req.valid('query');

  const data = await transactions.listTransactions(query);

  return c.json(data, StatusCode.OK);
};
