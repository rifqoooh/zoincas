import * as StatusCode from '@/lib/api/http-status-code';
import * as balances from '@/lib/db/services/balances';

import type { AppRouteHandler } from '@/lib/api/types';
import type { SelectUsersType as User } from '@/validators/db/users';
import type {
  CreateBalance,
  DeleteBalance,
  GetBalance,
  ListBalancesSummary,
  UpdateBalance,
} from './routes';

import { createNotFoundResponse } from '@/lib/api/openapi-utilities';

export const listBalancesSummary: AppRouteHandler<ListBalancesSummary> = async (
  c
) => {
  const user = c.get('user') as User;

  const data = await balances.listBalancesSummary(user.id);
  if (!data) {
    return c.json(
      createNotFoundResponse({ path: c.req.path }),
      StatusCode.NOT_FOUND
    );
  }

  return c.json(data, StatusCode.OK);
};

export const createBalance: AppRouteHandler<CreateBalance> = async (c) => {
  const input = c.req.valid('json');

  const user = c.get('user') as User;

  const data = await balances.createBalance(user.id, input);
  if (!data) {
    return c.json(
      createNotFoundResponse({ path: c.req.path }),
      StatusCode.NOT_FOUND
    );
  }

  return c.json(data, StatusCode.OK);
};

export const getBalance: AppRouteHandler<GetBalance> = async (c) => {
  const { balanceId } = c.req.valid('param');

  const user = c.get('user') as User;

  const data = await balances.getBalance(user.id, balanceId);
  if (!data) {
    return c.json(
      createNotFoundResponse({ path: c.req.path }),
      StatusCode.NOT_FOUND
    );
  }

  return c.json(data, StatusCode.OK);
};

export const updateBalance: AppRouteHandler<UpdateBalance> = async (c) => {
  const { balanceId } = c.req.valid('param');
  const input = c.req.valid('json');

  const user = c.get('user') as User;

  const data = await balances.updateBalance(user.id, balanceId, input);
  if (!data) {
    return c.json(
      createNotFoundResponse({ path: c.req.path }),
      StatusCode.NOT_FOUND
    );
  }

  return c.json(data, StatusCode.OK);
};

export const deleteBalance: AppRouteHandler<DeleteBalance> = async (c) => {
  const { balanceId } = c.req.valid('param');

  const user = c.get('user') as User;

  const data = await balances.deleteBalance(user.id, balanceId);
  if (!data) {
    return c.json(
      createNotFoundResponse({ path: c.req.path }),
      StatusCode.NOT_FOUND
    );
  }

  return c.json(data, StatusCode.OK);
};
