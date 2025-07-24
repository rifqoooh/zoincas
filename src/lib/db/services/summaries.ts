import type { GetSummariesQuery } from '@/validators/api/summaries/request';

import { and, desc, eq, gte, lt, lte, sql, sum } from 'drizzle-orm';

import { db } from '@/lib/db';
import { balances, categories, transactions } from '@/lib/db/schema';

export const getSummaries = async (
  userId: string,
  query: GetSummariesQuery
) => {
  const where = and(
    query.balance ? eq(transactions.balanceId, query.balance) : undefined,
    and(
      query.startDate
        ? gte(
            transactions.datetime,
            (() => {
              const date = new Date(query.startDate);
              date.setHours(0, 0, 0, 0);
              return date;
            })()
          )
        : undefined,
      query.endDate
        ? lte(
            transactions.datetime,
            (() => {
              const date = new Date(query.endDate);
              date.setHours(23, 59, 59, 999);
              return date;
            })()
          )
        : undefined
    ),
    eq(balances.userId, userId)
  );

  const data = await db
    .select({
      date: sql`date(${transactions.datetime})`.mapWith(String).as('date'),
      income: sum(
        sql`case when ${transactions.amount} > 0 then ${transactions.amount} else 0 end`
      )
        .mapWith(Number)
        .as('income'),
      expense: sum(
        sql`case when ${transactions.amount} < 0 then ${transactions.amount} else 0 end`
      )
        .mapWith(Number)
        .as('expense'),
    })
    .from(transactions)
    .innerJoin(balances, eq(transactions.balanceId, balances.id))
    .where(where)
    .groupBy(sql`date`)
    .orderBy(sql`date`);

  return data;
};

export const getSummariesCategory = async (
  userId: string,
  query: GetSummariesQuery
) => {
  const where = and(
    query.balance ? eq(transactions.balanceId, query.balance) : undefined,
    and(
      query.startDate
        ? gte(
            transactions.datetime,
            (() => {
              const date = new Date(query.startDate);
              date.setHours(0, 0, 0, 0);
              return date;
            })()
          )
        : undefined,
      query.endDate
        ? lte(
            transactions.datetime,
            (() => {
              const date = new Date(query.endDate);
              date.setHours(23, 59, 59, 999);
              return date;
            })()
          )
        : undefined
    ),
    lt(transactions.amount, 0),
    eq(categories.userId, userId)
  );

  const data = await db
    .select({
      name: categories.name,
      amount: sum(sql`abs(${transactions.amount})`)
        .mapWith(Number)
        .as('amount'),
    })
    .from(transactions)
    .innerJoin(categories, eq(transactions.categoryId, categories.id))
    .where(where)
    .groupBy(categories.name)
    .orderBy(desc(sql`amount`));

  return data;
};
