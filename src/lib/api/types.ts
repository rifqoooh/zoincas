import type { SelectSessionsType } from '@/validators/db/sessions';
import type { SelectUsersType } from '@/validators/db/users';
import type { OpenAPIHono, RouteConfig, RouteHandler } from '@hono/zod-openapi';
import type { z } from '@hono/zod-openapi';
import type { Context, Schema } from 'hono';
import type { Promisify, RateLimitInfo } from 'hono-rate-limiter';

export interface AppBindings {
  Variables: {
    user: SelectUsersType | null;
    session: SelectSessionsType | null;
    rateLimit: RateLimitInfo;
    rateLimitStore: {
      get?: (key: string) => Promisify<RateLimitInfo | undefined>;
      resetKey: (key: string) => Promisify<void>;
    };
  };
}

// biome-ignore lint/complexity/noBannedTypes: <explanation>
export type AppOpenAPI<S extends Schema = {}> = OpenAPIHono<AppBindings, S>;

export type AppRouteHandler<R extends RouteConfig> = RouteHandler<
  R,
  AppBindings
>;

export type AppContext = Context<AppBindings>;

export type ZodSchema =
  // @ts-expect-error
  z.ZodUnion | z.AnyZodObject | z.ZodArray<z.AnyZodObject>;

export interface ErrorResponseAPI {
  error: {
    code: string;
    message: string;
    path: string;
    details?: string | string[];
    stack?: string;
  };
}
