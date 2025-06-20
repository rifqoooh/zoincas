'use server';

import converter from 'convert-csv-to-json';
import { ilike } from 'drizzle-orm';

import { db } from '../';
import {
  balances,
  budgetCategories,
  budgetPlans,
  categories,
  transactions,
  users,
} from '../schema';

const getJSON = (filename: string) => {
  const json = converter
    .fieldDelimiter(',')
    .formatValueByType(true)
    .getJsonFromCsv(filename);

  return json;
};

const seed = async () => {
  try {
    await db.delete(balances);
    await db.delete(categories);
    await db.delete(transactions);
    await db.delete(budgetPlans);
    await db.delete(budgetCategories);

    const email = 'rifqoh@zoincas.com';
    const [user] = await db
      .select()
      .from(users)
      .where(ilike(users.email, email))
      .limit(1);

    const { id: userId } = user;

    // get balances data from csv
    const rawBalances = getJSON('csv/balances.csv');

    const mappedBalances = rawBalances.map(({ createdAt, ...balance }) => ({
      ...balance,
      userId,
    }));

    // get categories data from csv
    const rawCategories = getJSON('csv/categories.csv');

    const mappedCategories = rawCategories.map(
      ({ createdAt, ...category }) => ({
        ...category,
        name: category.name || 'Untitled',
        userId,
      })
    );

    // get budget plans data from csv
    const rawBudgetPlans = getJSON('csv/budget_plans.csv');

    const mappedBudgetPlans = rawBudgetPlans.map(
      ({ createdAt, ...budgetPlan }) => ({
        ...budgetPlan,
        title: budgetPlan.title || 'Untitled',
        userId,
      })
    );

    // get budget categories data from csv
    const rawBudgetCategories = getJSON('csv/budget_categories.csv');

    const mappedBudgetCategories = rawBudgetCategories.map(
      ({ createdAt, ...budgetCategory }) => ({
        ...budgetCategory,
        name: budgetCategory.name || 'Uncategorized',
        amount: budgetCategory.amount || 0,
      })
    );

    // get transactions data from csv
    const rawTransactions = getJSON('csv/transactions.csv');

    const mappedTransactions = rawTransactions.map(
      ({ createdAt, ...transaction }) => ({
        ...transaction,
        datetime: new Date(transaction.datetime),
        description: transaction.description || 'Untitled',
        amount: transaction.amount || 0,
        categoryId: transaction.categoryId || null,
        budgetCategoryId: transaction.budgetCategoryId || null,
      })
    );

    await db.transaction(async (tx) => {
      await tx.insert(balances).values(mappedBalances);
      await tx.insert(categories).values(mappedCategories);
      await tx.insert(budgetPlans).values(mappedBudgetPlans);
      await tx.insert(budgetCategories).values(mappedBudgetCategories);
      await tx.insert(transactions).values(mappedTransactions);
    });
  } catch (error) {
    // biome-ignore lint/suspicious/noConsole: <explanation>
    console.error(error);
  }
};

const execute = async () => {
  // biome-ignore lint/suspicious/noConsole: <explanation>
  // biome-ignore lint/suspicious/noConsoleLog: <explanation>
  console.log('⏳ Running seed...');

  const start = Date.now();

  await seed();

  const end = Date.now();

  // biome-ignore lint/suspicious/noConsole: <explanation>
  // biome-ignore lint/suspicious/noConsoleLog: <explanation>
  console.log(`✅ Seed completed in ${end - start}ms`);

  process.exit(0);
};

execute().catch((err) => {
  // biome-ignore lint/suspicious/noConsole: <explanation>
  // biome-ignore lint/suspicious/noConsoleLog: <explanation>
  console.error('❌ Seed failed');

  // biome-ignore lint/suspicious/noConsole: <explanation>
  // biome-ignore lint/suspicious/noConsoleLog: <explanation>
  console.error(err);
  process.exit(1);
});
