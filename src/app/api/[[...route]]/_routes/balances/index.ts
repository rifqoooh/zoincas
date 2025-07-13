import { createRouter } from '@/lib/api/create-router';

import * as handlers from './handler';
import * as routes from './routes';

const router = createRouter()
  .openapi(routes.listBalancesSummary, handlers.listBalancesSummary)
  .openapi(routes.createBalance, handlers.createBalance)
  .openapi(routes.getBalance, handlers.getBalance)
  .openapi(routes.updateBalance, handlers.updateBalance)
  .openapi(routes.deleteBalance, handlers.deleteBalance);

export default router;
