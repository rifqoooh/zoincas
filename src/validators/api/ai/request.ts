import { imageSchema } from '@/validators/utilities';
import { z } from 'zod';

export const scanImageSchema = z.object({
  image: imageSchema,
});

export type ScanImageSchema = z.infer<typeof scanImageSchema>;
