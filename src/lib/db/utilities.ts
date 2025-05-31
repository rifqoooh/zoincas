import { type SQL, sql } from 'drizzle-orm';
import { timestamp } from 'drizzle-orm/pg-core';

export const timestamps = {
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
};

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export function coalesce<T>(value: SQL.Aliased<T> | SQL<T>, defaultValue: any) {
  return sql<T>`coalesce(${value}, ${defaultValue})`;
}
