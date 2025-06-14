import type { AppBindings } from "@/lib/api/types";

import { createMiddleware } from "hono/factory";

import { APIError } from "@/lib/api/api-exception";
import { UNAUTHORIZED } from "@/lib/api/http-status-code";

export const adminMiddleware = () =>
  createMiddleware<AppBindings>(async (c, next) => {
    const session = c.get("session");
    const user = c.get("user");

    if (!session || !user) {
      throw new APIError(UNAUTHORIZED, {
        code: "UNAUTHENTICATED",
        message: "You are not authenticated to access this resource.",
      });
    }

    if (user.role !== "admin") {
      throw new APIError(UNAUTHORIZED, {
        code: "UNAUTHORIZED",
        message: "You are not authorized as admin to access this resource.",
      });
    }

    return await next();
  });
