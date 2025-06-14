import { createRouter } from "@/lib/api/create-router";

import * as handlers from "./handler";
import * as routes from "./routes";

const router = createRouter()
  .openapi(routes.getUsers, handlers.getUsers)
  .openapi(routes.postUser, handlers.postUser)
  .openapi(routes.deleteUser, handlers.deleteUser)
  .openapi(routes.banUser, handlers.banUser);

export default router;
