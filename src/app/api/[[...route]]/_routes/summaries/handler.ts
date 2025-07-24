import * as StatusCode from '@/lib/api/http-status-code';
import * as summaries from '@/lib/db/services/summaries';

import type { AppRouteHandler } from '@/lib/api/types';
import type { SelectUsersType as User } from '@/validators/db/users';
import type { GetSummaries } from './routes';

import { differenceInDays, subDays } from 'date-fns';

import { createNotFoundResponse } from '@/lib/api/openapi-utilities';

export const getSummaries: AppRouteHandler<GetSummaries> = async (c) => {
  const query = c.req.valid('query');

  const user = c.get('user') as User;

  const defaultEndDate = new Date();
  const defaultStartDate = subDays(defaultEndDate, 30);

  if (!query.startDate) {
    query.startDate = defaultStartDate.getTime();
  }

  if (!query.endDate) {
    query.endDate = defaultEndDate.getTime();
  }

  const periodLength = differenceInDays(query.endDate, query.startDate);
  const offset = 1;

  const _periodStartDate = subDays(query.startDate, periodLength + offset);
  const _periodEndDate = subDays(query.endDate, periodLength + offset);

  const data = await summaries.getSummaries(user.id, query);
  if (!data) {
    return c.json(
      createNotFoundResponse({ path: c.req.path }),
      StatusCode.NOT_FOUND
    );
  }

  return c.json(data, StatusCode.OK);
};
