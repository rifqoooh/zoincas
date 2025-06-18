import * as r from 'remeda';

import { z } from 'zod';

export const ErrorIssuesMapSchema = z.record(
  z
    .object({
      code: z.string(),
      message: z.string(),
    })
    .array()
);

export type ErrorIssuesMap = z.infer<typeof ErrorIssuesMapSchema>;

export interface ZodIssue {
  code: string;
  message: string;
  path: (string | number)[];
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  [key: string]: any;
}

export const formatZodIssues = (issues: ZodIssue[]): ErrorIssuesMap => {
  return issues.reduce<ErrorIssuesMap>((acc, issue) => {
    const formatted = {
      code: issue.code.toUpperCase(),
      message: issue.message,
    };

    const field = issue.path.join('.');

    // If the field doesn't exist in the accumulator, initialize it as an empty array
    if (!acc[field]) {
      acc[field] = [];
    }

    acc[field].push(formatted);

    return acc;
  }, {});
};

export const combineIssues = (objects: ErrorIssuesMap[]): ErrorIssuesMap => {
  const combined: ErrorIssuesMap = {};

  for (const obj of objects) {
    for (const [key, value] of Object.entries(obj)) {
      if (!combined[key]) {
        combined[key] = [];
      }
      combined[key].push(...value);
      combined[key] = r.uniqueWith(combined[key], r.isDeepEqual);
    }
  }

  return combined;
};
