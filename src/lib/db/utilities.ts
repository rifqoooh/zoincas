import type { AnyColumn, SQL } from 'drizzle-orm';
import type { SelectedFields } from 'drizzle-orm/pg-core';
import type { SelectResultFields } from 'drizzle-orm/query-builders/select.types';

import { is, sql } from 'drizzle-orm';
import { PgTimestampString } from 'drizzle-orm/pg-core';
import { timestamp } from 'drizzle-orm/pg-core';

export const timestamps = {
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
};

export const coalesce = <T>(
  value: SQL.Aliased<T> | SQL<T>,
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  defaultValue: any
) => {
  return sql<T>`coalesce(${value}, ${defaultValue})`;
};

export const jsonBuildObject = <T extends SelectedFields>(shape: T) => {
  const chunks: SQL[] = [];

  // biome-ignore lint/complexity/noForEach: <explanation>
  Object.entries(shape).forEach(([key, value]) => {
    if (chunks.length > 0) {
      // biome-ignore lint/style/noUnusedTemplateLiteral: <explanation>
      chunks.push(sql.raw(`,`));
    }

    chunks.push(sql.raw(`'${key}',`));

    // json_build_object formats to ISO 8601 ...
    if (is(value, PgTimestampString)) {
      chunks.push(sql`timezone('UTC', ${value})`);
    } else {
      chunks.push(sql`${value}`);
    }
  });

  return sql<SelectResultFields<T>>`coalesce(json_build_object(${sql.join(
    chunks
  )}), '{}')`;
};

export const jsonAggBuildObject = <T extends SelectedFields>(
  shape: T,
  options?: {
    orderBy?: { colName: AnyColumn; direction: 'ASC' | 'DESC' }[];
    notNullColumn?: keyof T;
  }
) => {
  const orderChunks: SQL[] = [];

  if (options?.orderBy?.length) {
    orderChunks.push(sql`order by`);

    options.orderBy.forEach((order, index) => {
      if (index !== 0) {
        // biome-ignore lint/style/noUnusedTemplateLiteral: <explanation>
        orderChunks.push(sql.raw(`,`));
      }

      orderChunks.push(sql`${order.colName} ${sql.raw(order.direction)}`);
    });
  }

  return sql<
    SelectResultFields<T>[]
  >`coalesce(jsonb_agg(${jsonBuildObject(shape)}${
    orderChunks.length > 0 ? sql.join(orderChunks, sql.raw(' ')) : undefined
  })${options?.notNullColumn ? sql` filter (where ${shape[options.notNullColumn]} is not null)` : sql.raw('')}, '${sql`[]`}')`;
};
