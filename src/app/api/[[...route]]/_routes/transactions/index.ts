import { createRouter } from '@/lib/api/create-router';

import * as handlers from './handler';
import * as routes from './routes';

const router = createRouter()
  .openapi(routes.listTransactions, handlers.listTransactions)
  .openapi(routes.createTransaction, handlers.createTransaction)
  .openapi(routes.deleteManyTransactions, handlers.deleteManyTransactions)
  .openapi(
    routes.assignManyCategoryTransactions,
    handlers.assignManyCategoryTransactions
  )
  .openapi(
    routes.assignManyBudgetTransactions,
    handlers.assignManyBudgetTransactions
  )
  .openapi(routes.getTransaction, handlers.getTransaction)
  .openapi(routes.updateTransaction, handlers.updateTransaction)
  .openapi(routes.deleteTransaction, handlers.deleteTransaction);

export default router;
