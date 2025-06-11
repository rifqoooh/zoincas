import { createRouter } from '@/lib/api/create-router';

import * as handlers from './handler';
import * as routes from './routes';

const router = createRouter().openapi(routes.getUsers, handlers.getUsers);

export default router;
