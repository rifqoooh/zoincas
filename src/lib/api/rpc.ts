import type {
  AIType,
  AuthType,
  BalancesType,
  BudgetCategoriesType,
  BudgetPlansType,
  CategoriesType,
  TransactionsType,
} from '@/app/api/[[...route]]/route';

import { hc } from 'hono/client';

import { env } from '@/env';

const url = env().NEXT_PUBLIC_APP_URL;

export const admin = hc<AuthType>(url).api;
export const transactions = hc<TransactionsType>(url).api.transactions;
export const balances = hc<BalancesType>(url).api.balances;
export const categories = hc<CategoriesType>(url).api.categories;
export const budgetPlans = hc<BudgetPlansType>(url).api['budget-plans'];
export const budgetCategories =
  hc<BudgetCategoriesType>(url).api['budget-categories'];
export const ai = hc<AIType>(url).api.ai;
