import { createRouter } from "@/lib/api/create-router";

import * as handlers from "./handler";
import * as routes from "./routes";

const router = createRouter()
  .openapi(routes.listUsers, handlers.listUsers)
  .openapi(routes.createUser, handlers.createUser)
  .openapi(routes.revokeSession, handlers.revokeSession)
  .openapi(routes.deleteUser, handlers.deleteUser)
  .openapi(routes.banUser, handlers.banUser)
  .openapi(routes.unbanUser, handlers.unbanUser);

export default router;
