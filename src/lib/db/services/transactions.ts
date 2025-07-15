import type { ListTransactionsQuery } from '@/validators/api/transactions/request';
import type {
  DeleteManyTransactionsType,
  InsertTransactionsType,
  UpdateTransactionsType,
} from '@/validators/db/transactions';

import { db } from '@/lib/db';
import {
  balances,
  budgetCategories,
  budgetPlans,
  categories,
  transactions,
} from '@/lib/db/schema';
import { coalesce, jsonBuildObject } from '@/lib/db/utilities';
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
import { z } from 'zod';

export const listTransactions = async (
  userId: string,
  query: ListTransactionsQuery
) => {
  const [startDatetime, endDatetime] = query.datetime;

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
    query.budget.length > 0
      ? inArray(transactions.budgetCategoryId, query.budget)
      : undefined,
    query.datetime.length > 0
      ? and(
          startDatetime
            ? gte(
                transactions.datetime,
                (() => {
                  const date = new Date(query.datetime[0]);
                  date.setHours(0, 0, 0, 0);
                  return date;
                })()
              )
            : undefined,
          endDatetime
            ? lte(
                transactions.datetime,
                (() => {
                  const date = new Date(query.datetime[1]);
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
      : [asc(transactions.datetime)];

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
        budget: {
          plan: jsonBuildObject({
            id: budgetPlans.id,
            title: budgetPlans.title,
          }),
          category: jsonBuildObject({
            id: transactions.budgetCategoryId,
            name: budgetCategories.name,
          }),
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
      .leftJoin(budgetPlans, eq(budgetCategories.budgetPlanId, budgetPlans.id))
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
      .leftJoin(budgetPlans, eq(budgetCategories.budgetPlanId, budgetPlans.id))
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

// TODO:
export const createTransaction = async (input: InsertTransactionsType) => {
  const data = await db.transaction(async (tx) => {
    // If input category id is not UUID we know it is a new category to create
    const parsedCategoryId = z.string().uuid().safeParse(input.categoryId);
    if (!parsedCategoryId.success) {
      // Get user id from input balance id
      const [{ userId }] = await tx
        .select({
          userId: balances.userId,
        })
        .from(balances)
        .where(eq(balances.id, input.balanceId))
        .limit(1);

      // Create a new category
      const [{ id }] = await tx
        .insert(categories)
        .values({
          name: input.categoryId ?? 'Untitled',
          userId,
        })
        .returning({
          id: categories.id,
        });

      // Assign new category id to input
      input.categoryId = id;
    }

    const [data] = await tx.insert(transactions).values(input).returning();

    return data;
  });

  return data;
};

export const deleteManyTransactions = async (
  userId: string,
  input: DeleteManyTransactionsType
) => {
  const transactionIds = db.$with('transaction_ids').as(
    db
      .select({
        id: transactions.id,
      })
      .from(transactions)
      .innerJoin(balances, eq(transactions.balanceId, balances.id))
      .where(
        and(
          eq(balances.userId, userId),
          inArray(transactions.id, input.transactionIds)
        )
      )
  );

  const data = await db
    .with(transactionIds)
    .delete(transactions)
    .where(inArray(transactions.id, db.select().from(transactionIds)))
    .returning();

  return data;
};

export const getTransaction = async (userId: string, transactionId: string) => {
  const [data] = await db
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
      budget: {
        plan: jsonBuildObject({
          id: budgetPlans.id,
          title: budgetPlans.title,
        }),
        category: jsonBuildObject({
          id: transactions.budgetCategoryId,
          name: budgetCategories.name,
        }),
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
    .leftJoin(budgetPlans, eq(budgetCategories.budgetPlanId, budgetPlans.id))
    .where(and(eq(balances.userId, userId), eq(transactions.id, transactionId)))
    .limit(1);

  return data;
};

export const updateTransaction = async (
  userId: string,
  transactionId: string,
  input: UpdateTransactionsType
) => {
  const updatedAt = new Date();

  const data = await db.transaction(async (tx) => {
    // If input category id is not UUID we know it is a new category to create
    const parsedCategoryId = z.string().uuid().safeParse(input.categoryId);
    if (!parsedCategoryId.success) {
      // Create a new category
      const [{ id }] = await tx
        .insert(categories)
        .values({
          name: input.categoryId ?? 'Untitled',
          userId,
        })
        .returning({
          id: categories.id,
        });

      // Assign new category id to input
      input.categoryId = id;
    }

    const transaction = tx.$with('transaction').as(
      tx
        .select({
          id: transactions.id,
        })
        .from(transactions)
        .innerJoin(balances, eq(transactions.balanceId, balances.id))
        .where(
          and(eq(balances.userId, userId), eq(transactions.id, transactionId))
        )
        .limit(1)
    );

    const [data] = await tx
      .with(transaction)
      .update({ ...transactions, updatedAt })
      .set(input)
      .where(eq(transactions.id, tx.select().from(transaction)))
      .returning();

    return data;
  });

  return data;
};

export const deleteTransaction = async (
  userId: string,
  transactionId: string
) => {
  const transaction = db.$with('transaction').as(
    db
      .select({
        id: transactions.id,
      })
      .from(transactions)
      .innerJoin(balances, eq(transactions.balanceId, balances.id))
      .where(
        and(eq(balances.userId, userId), eq(transactions.id, transactionId))
      )
      .limit(1)
  );

  const [data] = await db
    .with(transaction)
    .delete(transactions)
    .where(eq(transactions.id, db.select().from(transaction)))
    .returning();

  return data;
};
