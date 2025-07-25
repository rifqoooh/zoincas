import { createRouter } from '@/lib/api/create-router';

import * as handlers from './handler';
import * as routes from './routes';

const router = createRouter()
  .openapi(routes.getSummaries, handlers.getSummaries)
  .openapi(routes.getSummariesIncomeExpense, handlers.getSummariesIncomeExpense)
  .openapi(routes.getSummariesCategory, handlers.getSummariesCategory);

export default router;
