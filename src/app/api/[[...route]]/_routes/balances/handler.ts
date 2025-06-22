import * as StatusCode from '@/lib/api/http-status-code';
import * as balances from '@/lib/db/services/balances';

import type { AppRouteHandler } from '@/lib/api/types';
import type { SelectUsersType as User } from '@/validators/db/users';
import type { ListBalancesSummary } from './routes';

export const listBalancesSummary: AppRouteHandler<ListBalancesSummary> = async (
  c
) => {
  const user = c.get('user') as User;

  const data = await balances.listBalancesSummary(user.id);

  return c.json(data, StatusCode.OK);
};
