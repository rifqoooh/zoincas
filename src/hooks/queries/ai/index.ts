import type { ErrorResponseAPI } from '@/lib/api/types';
import type { ScanFileType, ScanImageType } from '@/validators/api/ai/request';

import { useMutation } from '@tanstack/react-query';
import { z } from 'zod';

import { ai } from '@/lib/api/rpc';
import { selectTransactionsSchema } from '@/validators/db/transactions';

export const useScanImageMutation = () => {
  const mutation = useMutation({
    mutationFn: async (input: ScanImageType) => {
      const response = await ai['scan-image'].$post({
        form: input,
      });
      if (!response.ok) {
        const err = (await response.json()) as unknown as ErrorResponseAPI;
        throw new Error(err.error.message);
      }

      const data = await response.json();
      const parsedData = selectTransactionsSchema
        .pick({
          datetime: true,
          amount: true,
          description: true,
        })
        .safeParse(data);
      if (!parsedData.success) {
        throw new Error('There is an error when parsing response data.');
      }

      return parsedData.data;
    },
  });

  return mutation;
};

export const useScanFileMutation = () => {
  const mutation = useMutation({
    mutationFn: async (input: ScanFileType) => {
      const response = await ai['scan-file'].$post({
        form: input,
      });
      if (!response.ok) {
        const err = (await response.json()) as unknown as ErrorResponseAPI;
        throw new Error(err.error.message);
      }

      const data = await response.json();
      const parsedData = z.object({ csv: z.string() }).safeParse(data);
      if (!parsedData.success) {
        throw new Error('There is an error when parsing response data.');
      }

      return parsedData.data;
    },
  });

  return mutation;
};
