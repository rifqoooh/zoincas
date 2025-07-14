import type {
  InsertCategoriesType,
  UpdateCategoriesType,
} from '@/validators/db/categories';

import { and, asc, count, eq, sum } from 'drizzle-orm';

import { db } from '@/lib/db';
import { categories, transactions } from '@/lib/db/schema';
import { coalesce } from '@/lib/db/utilities';

export const listCategoriesSummary = async (userId: string) => {
  const summary = db.$with('category_transactions_summary').as(
    db
      .select({
        id: categories.id,
        count: count().as('count'),
        sum: sum(transactions.amount).mapWith(Number).as('total'),
      })
      .from(transactions)
      .innerJoin(categories, eq(transactions.categoryId, categories.id))
      .groupBy(categories.id)
      .where(eq(categories.userId, userId))
  );

  const data = await db
    .with(summary)
    .select({
      id: categories.id,
      name: categories.name,
      transactions: {
        count: coalesce(summary.count, 0).mapWith(Number).as('count'),
        sum: coalesce(summary.sum, 0).mapWith(Number).as('sum'),
      },
    })
    .from(categories)
    .leftJoin(summary, eq(categories.id, summary.id))
    .where(eq(categories.userId, userId))
    .orderBy(asc(categories.name));

  return data;
};

export const createCategory = async (
  userId: string,
  input: InsertCategoriesType
) => {
  const [data] = await db
    .insert(categories)
    .values({ ...input, userId })
    .returning();

  return data;
};

export const getCategory = async (userId: string, categoryId: string) => {
  const summary = db.$with('category_transactions_summary').as(
    db
      .select({
        id: categories.id,
        count: count().as('count'),
        sum: sum(transactions.amount).mapWith(Number).as('total'),
      })
      .from(transactions)
      .innerJoin(categories, eq(transactions.categoryId, categories.id))
      .groupBy(categories.id)
      .where(and(eq(categories.userId, userId), eq(categories.id, categoryId)))
  );

  const [data] = await db
    .with(summary)
    .select({
      id: categories.id,
      name: categories.name,
      transactions: {
        count: coalesce(summary.count, 0).mapWith(Number).as('count'),
        sum: coalesce(summary.sum, 0).mapWith(Number).as('sum'),
      },
    })
    .from(categories)
    .leftJoin(summary, eq(categories.id, summary.id))
    .where(and(eq(categories.userId, userId), eq(categories.id, categoryId)))
    .limit(1);

  return data;
};

export const updateCategory = async (
  userId: string,
  categoryId: string,
  category: UpdateCategoriesType
) => {
  const [data] = await db
    .update(categories)
    .set({
      name: category.name ? category.name : undefined,
    })
    .where(and(eq(categories.userId, userId), eq(categories.id, categoryId)))
    .returning();

  return data;
};

export const deleteCategory = async (userId: string, categoryId: string) => {
  const [data] = await db
    .delete(categories)
    .where(and(eq(categories.userId, userId), eq(categories.id, categoryId)))
    .returning();

  return data;
};
