import { count, eq, sum } from 'drizzle-orm';

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
    .where(eq(categories.userId, userId));

  return data;
};
