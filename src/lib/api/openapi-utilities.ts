import type { FormattedError } from './format-zod-issues';
import type { ZodSchema } from './types';

import { z } from '@hono/zod-openapi';

import {
  ErrorIssuesMapSchema,
  combineIssues,
  formatZodIssues,
} from './format-zod-issues';

export const ContentJSON = <T extends ZodSchema>(
  schema: T,
  description: string
) => {
  return {
    content: {
      'application/json': {
        schema,
      },
    },
    description,
  };
};

interface createErrorSchemaProps<T extends ZodSchema> {
  schema: T;
  path: string;
  message: string;
  potentioalInput?: Record<string, unknown> | Record<string, unknown>[] | null;
}

export const createErrorSchema = <T extends ZodSchema>({
  schema,
  path,
  message,
  potentioalInput,
}: createErrorSchemaProps<T>) => {
  let details: FormattedError;
  if (potentioalInput !== undefined) {
    if (Array.isArray(potentioalInput)) {
      const errors = potentioalInput.map((input) => {
        const result = schema.safeParse(input);
        return formatZodIssues(result.error.issues);
      });
      details = combineIssues(errors);
    } else {
      const result = schema.safeParse(potentioalInput);
      details = formatZodIssues(result.error.issues);
    }
  } else {
    const result = schema.safeParse(
      schema._def.typeName === z.ZodFirstPartyTypeKind.ZodArray ? [] : {}
    );
    details = formatZodIssues(result.error.issues);
  }

  const formattedError = {
    error: {
      code: 'UNPROCESSABLE_ENTITY',
      message,
      path,
      details,
    },
  };

  return z.object({
    error: z
      .object({
        code: z.string(),
        message: z.string(),
        path: z.string(),
        details: z.union([z.string(), ErrorIssuesMapSchema]).optional(),
      })
      .openapi({
        example: formattedError.error,
      }),
  });
};
