import { createRouter } from '@/lib/api/create-router';

import * as handlers from './handler';
import * as routes from './routes';

const router = createRouter()
  .openapi(routes.listCategoriesSummary, handlers.listCategoriesSummary)
  .openapi(routes.createCategory, handlers.createCategory)
  .openapi(routes.getCategory, handlers.getCategory)
  .openapi(routes.updateCategory, handlers.updateCategory)
  .openapi(routes.deleteCategory, handlers.deleteCategory);

export default router;
