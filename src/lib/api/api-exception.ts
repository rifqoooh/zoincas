import type { ErrorIssuesMap } from './format-zod-issues';

type APIErrorOptions = {
  code?: string;
  message?: string;
  detail?: ErrorIssuesMap;
  stack?: string;
};

export class APIError extends Error {
  readonly status: number;
  readonly code?: string;
  readonly detail?: ErrorIssuesMap;

  constructor(status = 500, options?: APIErrorOptions) {
    super(options?.message);
    this.status = status;
    this.code = options?.code;
    this.detail = options?.detail;
    this.stack = options?.stack;
  }
}
