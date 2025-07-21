import { handle } from 'hono/vercel';

import configureOpenAPI from '@/lib/api/configure-open-api';
import { createApp } from '@/lib/api/create-app';

import ai from './_routes/ai';
import balances from './_routes/balances';
import budgetCategories from './_routes/budget-categories';
import budgetPlans from './_routes/budget-plans';
import categories from './_routes/categories';
import sessions from './_routes/sessions';
import transactions from './_routes/transactions';
import users from './_routes/users';

const app = createApp().basePath('/api');

configureOpenAPI(app);

// When making a lot of routes the Hono tend to errors excessively deep types,
// so we need to split the routes into different variables
const authRoutes = app.route('/', sessions).route('/', users);
const transactionsRoutes = app.route('/', transactions);
const balancesRoutes = app.route('/', balances);
const categoriesRoutes = app.route('/', categories);
const budgetPlansRoutes = app.route('/', budgetPlans);
const budgetCategoriesRoutes = app.route('/', budgetCategories);
const aiRoutes = app.route('/', ai);

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AuthType = typeof authRoutes;
export type TransactionsType = typeof transactionsRoutes;
export type BalancesType = typeof balancesRoutes;
export type CategoriesType = typeof categoriesRoutes;
export type BudgetPlansType = typeof budgetPlansRoutes;
export type BudgetCategoriesType = typeof budgetCategoriesRoutes;
export type AIType = typeof aiRoutes;
