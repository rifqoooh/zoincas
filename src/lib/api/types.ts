import type { SessionsType, UsersType } from '@/validators/db/schema';
import type { OpenAPIHono, RouteConfig, RouteHandler } from '@hono/zod-openapi';
import type { z } from '@hono/zod-openapi';
import type { Schema } from 'hono';

export interface AppBindings {
  Variables: {
    user: UsersType | null;
    session: SessionsType | null;
  };
}

// biome-ignore lint/complexity/noBannedTypes: <explanation>
export type AppOpenAPI<S extends Schema = {}> = OpenAPIHono<AppBindings, S>;

export type AppRouteHandler<R extends RouteConfig> = RouteHandler<
  R,
  AppBindings
>;

export type ZodSchema =
  // @ts-expect-error
  z.ZodUnion | z.AnyZodObject | z.ZodArray<z.AnyZodObject>;
