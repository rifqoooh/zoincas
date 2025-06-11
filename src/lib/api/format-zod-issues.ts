import { z } from 'zod';

export interface ZodIssue {
  code: string;
  message: string;
  path: (string | number)[];
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  [key: string]: any;
}

export interface FormattedError {
  [field: string]: {
    code: string;
    message: string;
  }[];
}

export const formatZodIssues = (issues: ZodIssue[]): FormattedError => {
  return issues.reduce<FormattedError>((acc, issue) => {
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

    // // Apply the issue to each field in the path
    // for (const segment of issue.path) {
    //   // Ensure it's a string key
    //   const field = String(segment);

    //   // If the field doesn't exist in the accumulator, initialize it as an empty array
    //   if (!acc[field]) {
    //     acc[field] = [];
    //   }

    //   acc[field].push(formatted);
    // }

    return acc;
  }, {});
};

// type ErrorDetail = {
//   code: string;
//   message: string;
// };

// type ErrorMap = Record<string, ErrorDetail[]>;

export const ErrorIssuesMapSchema = z.record(
  z
    .object({
      code: z.string(),
      message: z.string(),
    })
    .array()
);

type ErrorIssuesMap = z.infer<typeof ErrorIssuesMapSchema>;

export const combineIssues = (objects: ErrorIssuesMap[]): ErrorIssuesMap => {
  const combined: ErrorIssuesMap = {};

  for (const obj of objects) {
    for (const [key, value] of Object.entries(obj)) {
      if (!combined[key]) {
        combined[key] = [];
      }
      combined[key].push(...value);
    }
  }

  return combined;
};
