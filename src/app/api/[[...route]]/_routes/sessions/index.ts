import { createRouter } from '@/lib/api/create-router';

import * as handlers from './handler';
import * as routes from './routes';

const router = createRouter().openapi(routes.getSessions, handlers.getSessions);

export default router;
