import { createRouter } from '@/lib/api/create-router';

import * as handlers from './handler';
import * as routes from './routes';

const router = createRouter()
  .openapi(routes.listBudgetPlansSummary, handlers.listBudgetPlansSummary)
  .openapi(routes.getBudgetPlan, handlers.getBudgetPlan);

export default router;
