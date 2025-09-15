import * as StatusCode from '@/lib/api/http-status-code';

import type { AppRouteHandler } from '@/lib/api/types';
import type { ScanFile, ScanImage } from './routes';

import { z } from '@hono/zod-openapi';
import { generateObject, generateText } from 'ai';

import { selectTransactionsSchema } from '@/validators/db/transactions';
import {
  ACCEPTED_IMAGE_MIME_TYPES,
  ACCEPTED_PDF_MIME_TYPES,
} from '@/validators/utilities';
import { gemini } from './gemini';
import { scanFilePrompt, scanImagePrompt } from './prompt';

export const scanImage: AppRouteHandler<ScanImage> = async (c) => {
  const input = c.req.valid('form');

  // Convert file to base64
  const bytes = await input.image.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const base64 = buffer.toString('base64');
  const mimeType = input.image.type;

  const { object } = await generateObject({
    model: gemini('gemini-2.0-flash'),
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text: scanImagePrompt,
          },
          {
            type: 'image',
            image: `data:${mimeType};base64,${base64}`,
            mimeType,
          },
        ],
      },
    ],
    temperature: 0,
    topP: 1,
    schema: selectTransactionsSchema
      .pick({
        datetime: true,
        amount: true,
        description: true,
      })
      .extend({
        datetime: z.coerce.date(),
      }),
  });

  return c.json(object, StatusCode.CREATED);
};

export const scanFile: AppRouteHandler<ScanFile> = async (c) => {
  const input = c.req.valid('form');

  // Convert file to base64
  const bytes = await input.file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const base64 = buffer.toString('base64');
  const mimeType = input.file.type;

  const { text } = await generateText({
    model: gemini('gemini-2.0-flash'),
    messages: [
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text: scanFilePrompt,
          },
          {
            type: ACCEPTED_IMAGE_MIME_TYPES.includes(mimeType)
              ? 'image'
              : 'file',
            image: ACCEPTED_IMAGE_MIME_TYPES.includes(mimeType)
              ? `data:${mimeType};base64,${base64}`
              : '',
            data: ACCEPTED_PDF_MIME_TYPES.includes(mimeType)
              ? `data:${mimeType};base64,${base64}`
              : '',
            mimeType,
          },
        ],
      },
    ],
    temperature: 0,
    topP: 1,
  });

  return c.json({ csv: text }, StatusCode.CREATED);
};
