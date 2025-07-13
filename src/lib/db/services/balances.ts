import type {
  InsertBalancesType,
  UpdateBalancesType,
} from '@/validators/db/balances';

import { and, asc, count, eq, sum } from 'drizzle-orm';

import { db } from '@/lib/db';
import { balances, transactions } from '@/lib/db/schema';
import { coalesce } from '@/lib/db/utilities';

export const listBalancesSummary = async (userId: string) => {
  const summary = db.$with('balance_transactions_summary').as(
    db
      .select({
        id: balances.id,
        count: count().as('count'),
        sum: sum(transactions.amount).mapWith(Number).as('total'),
      })
      .from(transactions)
      .innerJoin(balances, eq(transactions.balanceId, balances.id))
      .groupBy(balances.id)
      .where(eq(balances.userId, userId))
  );

  const data = await db
    .with(summary)
    .select({
      id: balances.id,
      name: balances.name,
      initialAmount: balances.initialAmount,
      transactions: {
        count: coalesce(summary.count, 0).mapWith(Number).as('count'),
        sum: coalesce(summary.sum, 0).mapWith(Number).as('sum'),
      },
    })
    .from(balances)
    .leftJoin(summary, eq(balances.id, summary.id))
    .where(eq(balances.userId, userId))
    .orderBy(asc(balances.name));

  return data;
};

export const createBalance = async (
  userId: string,
  balance: InsertBalancesType
) => {
  const [data] = await db
    .insert(balances)
    .values({
      name: balance.name,
      initialAmount: balance.initialAmount,
      userId,
    })
    .returning();

  return data;
};

export const getBalance = async (userId: string, balanceId: string) => {
  const summary = db.$with('balance_transactions_summary').as(
    db
      .select({
        id: balances.id,
        count: count().as('count'),
        sum: sum(transactions.amount).mapWith(Number).as('total'),
      })
      .from(transactions)
      .innerJoin(balances, eq(transactions.balanceId, balances.id))
      .groupBy(balances.id)
      .where(and(eq(balances.userId, userId), eq(balances.id, balanceId)))
  );

  const [data] = await db
    .with(summary)
    .select({
      id: balances.id,
      name: balances.name,
      initialAmount: balances.initialAmount,
      transactions: {
        count: coalesce(summary.count, 0).mapWith(Number).as('count'),
        sum: coalesce(summary.sum, 0).mapWith(Number).as('sum'),
      },
    })
    .from(balances)
    .leftJoin(summary, eq(balances.id, summary.id))
    .where(and(eq(balances.userId, userId), eq(balances.id, balanceId)))
    .limit(1);

  return data;
};

export const updateBalance = async (
  userId: string,
  balanceId: string,
  balance: UpdateBalancesType
) => {
  const [data] = await db
    .update(balances)
    .set({
      name: balance.name ? balance.name : undefined,
      initialAmount: balance.initialAmount,
    })
    .where(and(eq(balances.userId, userId), eq(balances.id, balanceId)))
    .returning();

  return data;
};

export const deleteBalance = async (userId: string, balanceId: string) => {
  const [data] = await db
    .delete(balances)
    .where(and(eq(balances.userId, userId), eq(balances.id, balanceId)))
    .returning();

  return data;
};
