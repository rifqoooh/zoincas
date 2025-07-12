import { createRouter } from '@/lib/api/create-router';

import * as handlers from './handler';
import * as routes from './routes';

const router = createRouter()
  .openapi(routes.listBudgetPlansSummary, handlers.listBudgetPlansSummary)
  .openapi(routes.createBudgetPlan, handlers.createBudgetPlan)
  .openapi(routes.getBudgetPlan, handlers.getBudgetPlan)
  .openapi(routes.updateBudgetPlan, handlers.updateBudgetPlan)
  .openapi(routes.deleteBudgetPlan, handlers.deleteBudgetPlan);

export default router;
