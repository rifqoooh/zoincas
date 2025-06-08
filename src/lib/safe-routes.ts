import queryString from 'query-string';
import { z } from 'zod/v4';

export const SignInSearchParams = z.object({
  callbackURL: z.string().optional(),
});

export const Routes = {
  root: makeRoute(() => '/'),
  signIn: makeRoute(() => '/sign-in', z.object({}), SignInSearchParams),
};

type RouteBuilder<Params extends z.ZodSchema, Search extends z.ZodSchema> = {
  (p?: z.input<Params>, options?: { search?: z.input<Search> }): string;
  parse: (input: z.input<Params>) => z.output<Params>;
  params: z.output<Params>;
};

const empty: z.ZodSchema = z.object({});

function makeRoute<Params extends z.ZodSchema, Search extends z.ZodSchema>(
  fn: (p: z.input<Params>) => string,
  paramsSchema: Params = empty as Params,
  _searchSchema: Search = empty as Search
): RouteBuilder<Params, Search> {
  const routeBuilder: RouteBuilder<Params, Search> = (params, options) => {
    const baseUrl = fn(params);
    const searchString =
      options?.search && queryString.stringify(options.search);
    return [baseUrl, searchString ? `?${searchString}` : ''].join('');
  };

  routeBuilder.parse = function parse(args: z.input<Params>): z.output<Params> {
    const res = paramsSchema.safeParse(args);
    if (!res.success) {
      const routeName =
        Object.entries(Routes).find(
          ([, route]) => (route as unknown) === routeBuilder
        )?.[0] || '(unknown route)';
      throw new Error(
        `Invalid route params for route ${routeName}: ${res.error.message}`
      );
    }
    return res.data;
  };

  // set the type
  routeBuilder.params = undefined as z.output<Params>;
  // set the runtime getter
  Object.defineProperty(routeBuilder, 'params', {
    get() {
      throw new Error(
        'Routes.[route].params is only for type usage, not runtime. Use it like `typeof Routes.[routes].params`'
      );
    },
  });

  return routeBuilder;
}
