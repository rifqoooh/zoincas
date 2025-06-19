import { type SQL, sql } from 'drizzle-orm';
import { timestamp } from 'drizzle-orm/pg-core';

export const timestamps = {
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
};

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export function coalesce<T>(value: SQL.Aliased<T> | SQL<T>, defaultValue: any) {
  return sql<T>`coalesce(${value}, ${defaultValue})`;
}
