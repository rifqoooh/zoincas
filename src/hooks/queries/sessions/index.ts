import type { ErrorResponseAPI } from '@/lib/api/types';

import { useQuery } from '@tanstack/react-query';

import { client } from '@/lib/api/rpc';
import { getSessionsResponse } from '@/validators/api/openapi/sessions/response';
import { sessionsKeys } from './keys';

export const useGetSessionsQuery = () => {
  const query = useQuery({
    queryKey: sessionsKeys.all(),
    queryFn: async () => {
      const response = await client.api.sessions.$get();
      if (!response.ok) {
        const err = (await response.json()) as unknown as ErrorResponseAPI;
        throw new Error(err.error.message);
      }

      const data = await response.json();
      const parsedData = getSessionsResponse.safeParse(data);
      if (!parsedData.success) {
        throw new Error('OUTPUT_VALIDATION_ERROR');
      }

      return parsedData.data;
    },
  });

  return query;
};
