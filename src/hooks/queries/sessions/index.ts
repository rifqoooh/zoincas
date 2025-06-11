import { useQuery } from '@tanstack/react-query';

import { client } from '@/lib/api/rpc';
import { getSessionsOutputSchema } from '@/validators/api/sessions/response';
import { sessionsKeys } from './keys';

export const useGetSessionsQuery = () => {
  const query = useQuery({
    queryKey: sessionsKeys.all(),
    queryFn: async () => {
      const response = await client.api.sessions.$get();
      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error);
      }

      const data = await response.json();
      const parsedData = getSessionsOutputSchema.safeParse(data);
      if (!parsedData.success) {
        throw new Error('OUTPUT_VALIDATION_ERROR');
      }

      return parsedData.data;
    },
  });

  return query;
};
