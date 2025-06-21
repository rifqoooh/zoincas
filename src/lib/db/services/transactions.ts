import type { ListTransactionsQuery } from '@/validators/api/openapi/transactions/request';

import {
  and,
  asc,
  count,
  desc,
  eq,
  gte,
  ilike,
  inArray,
  lte,
} from 'drizzle-orm';

import { db } from '@/lib/db';
import {
  balances,
  budgetCategories,
  categories,
  transactions,
} from '@/lib/db/schema';
import { coalesce } from '@/lib/db/utilities';

export const listTransactions = async (
  userId: string,
  query: ListTransactionsQuery
) => {
  const [startCreatedAt, endCreatedAt] = query.createdAt;

  const offset = (query.page - 1) * query.perPage;

  const where = and(
    query.description
      ? ilike(transactions.description, `%${query.description}%`)
      : undefined,
    query.balance.length > 0
      ? inArray(transactions.balanceId, query.balance)
      : undefined,
    query.category.length > 0
      ? inArray(transactions.categoryId, query.category)
      : undefined,
    query.createdAt.length > 0
      ? and(
          startCreatedAt
            ? gte(
                transactions.createdAt,
                (() => {
                  const date = new Date(query.createdAt[0]);
                  date.setHours(0, 0, 0, 0);
                  return date;
                })()
              )
            : undefined,
          endCreatedAt
            ? lte(
                transactions.createdAt,
                (() => {
                  const date = new Date(query.createdAt[1]);
                  date.setHours(23, 59, 59, 999);
                  return date;
                })()
              )
            : undefined
        )
      : undefined,
    eq(balances.userId, userId)
  );

  const orderBy =
    query.sort.length > 0
      ? query.sort.map((item) =>
          item.desc ? desc(transactions[item.id]) : asc(transactions[item.id])
        )
      : [asc(transactions.createdAt)];

  const { data, total } = await db.transaction(async (tx) => {
    const data = await tx
      .select({
        id: transactions.id,
        description: transactions.description,
        amount: transactions.amount,
        datetime: transactions.datetime,
        balance: {
          id: transactions.balanceId,
          name: balances.name,
        },
        category: {
          id: transactions.categoryId,
          name: categories.name,
        },
        budgetCategory: {
          id: transactions.budgetCategoryId,
          name: budgetCategories.name,
        },
        createdAt: transactions.createdAt,
      })
      .from(transactions)
      .innerJoin(balances, eq(transactions.balanceId, balances.id))
      .leftJoin(categories, eq(transactions.categoryId, categories.id))
      .leftJoin(
        budgetCategories,
        eq(transactions.budgetCategoryId, budgetCategories.id)
      )
      .where(where)
      .orderBy(...orderBy)
      .limit(query.perPage)
      .offset(offset);

    const [total] = await tx
      .select({
        count: coalesce(count(), 0).mapWith(Number).as('count'),
      })
      .from(transactions)
      .innerJoin(balances, eq(transactions.balanceId, balances.id))
      .leftJoin(categories, eq(transactions.categoryId, categories.id))
      .leftJoin(
        budgetCategories,
        eq(transactions.budgetCategoryId, budgetCategories.id)
      )
      .where(where)
      .limit(1);

    return {
      data,
      total: total.count,
    };
  });

  const pageCount = Math.ceil(total / query.perPage);

  const pagination = {
    size: data.length,
    count: total,
    page: query.page,
    pageCount,
  };

  return { data, pagination };
};
