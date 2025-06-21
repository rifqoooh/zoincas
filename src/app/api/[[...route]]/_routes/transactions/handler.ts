import * as StatusCode from '@/lib/api/http-status-code';
import * as transactions from '@/lib/db/services/transactions';

import type { AppRouteHandler } from '@/lib/api/types';
import type { SelectUsersType as User } from '@/validators/db/users';
import type { z } from '@hono/zod-openapi';
import type { ListTransactions, userIdParamSchema } from './routes';

export type UserIdParam = z.infer<typeof userIdParamSchema>;

export const listTransactions: AppRouteHandler<ListTransactions> = async (
  c
) => {
  const query = c.req.valid('query');

  const user = c.get('user') as User;

  const data = await transactions.listTransactions(user.id, query);

  return c.json(data, StatusCode.OK);
};
