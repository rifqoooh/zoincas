import {
  boolean,
  index,
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';
import { timestamps } from './utilities';

// #region auth schema table definition
export const users = pgTable('users', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').unique().notNull(),
  emailVerified: boolean('email_verified').notNull(),
  image: text('image'),
  role: text('role').default('user').notNull(),
  banned: boolean('banned').default(false).notNull(),
  banReason: text('ban_reason'),
  banExpires: timestamp('ban_expires'),
  ...timestamps,
});

export const accounts = pgTable('accounts', {
  id: text('id').primaryKey(),
  accountId: text('account_id').notNull(),
  providerId: text('provider_id').notNull(),
  accessToken: text('access_token'),
  refreshToken: text('refresh_token'),
  idToken: text('id_token'),
  accessTokenExpiresAt: timestamp('access_token_expires_at'),
  refreshTokenExpiresAt: timestamp('refresh_token_expires_at'),
  scope: text('scope'),
  password: text('password'),
  userId: text('user_id')
    .references(() => users.id, { onDelete: 'cascade' })
    .notNull(),
  ...timestamps,
});

export const sessions = pgTable('sessions', {
  id: text('id').primaryKey(),
  expiresAt: timestamp('expires_at').notNull(),
  token: text('token').unique().notNull(),
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  impersonatedBy: text('impersonated_by'),
  userId: text('user_id')
    .references(() => users.id, { onDelete: 'cascade' })
    .notNull(),
  ...timestamps,
});

export const verifications = pgTable('verifications', {
  id: text('id').primaryKey(),
  identifier: text('identifier').notNull(),
  value: text('value').notNull(),
  expiresAt: timestamp('expires_at').notNull(),
  ...timestamps,
});
// #endregion auth schema table definition

// #region main schema table defenition
export const balances = pgTable(
  'balances',
  {
    id: uuid('id').primaryKey().defaultRandom().notNull(),
    name: varchar('name', { length: 256 }).notNull(),
    initialAmount: integer('initial_amount').default(0).notNull(),
    userId: text('user_id')
      .references(() => users.id, { onDelete: 'cascade' })
      .notNull(),
    ...timestamps,
  },
  (table) => [index('balances_user_id_idx').on(table.userId)]
);

export const categories = pgTable(
  'categories',
  {
    id: uuid('id').primaryKey().defaultRandom().notNull(),
    name: varchar('name', { length: 256 }).default('Untitled').notNull(),
    userId: text('user_id')
      .references(() => users.id, { onDelete: 'cascade' })
      .notNull(),
    ...timestamps,
  },
  (table) => [index('categories_user_id_idx').on(table.userId)]
);

export const transactions = pgTable(
  'transactions',
  {
    id: uuid('id').primaryKey().defaultRandom().notNull(),
    datetime: timestamp('datetime').notNull(),
    description: varchar('description', { length: 256 })
      .default('Untitled')
      .notNull(),
    amount: integer('amount').default(0).notNull(),
    balanceId: uuid('balance_id')
      .references(() => balances.id, { onDelete: 'cascade' })
      .notNull(),
    categoryId: uuid('category_id').references(() => categories.id, {
      onDelete: 'set null',
    }),
    budgetCategoryId: uuid('budget_category_id').references(
      () => budgetCategories.id,
      {
        onDelete: 'set null',
      }
    ),
    ...timestamps,
  },
  (table) => [
    index('transactions_balance_id_idx').on(table.balanceId),
    index('transactions_budget_category_id_idx').on(table.budgetCategoryId),
  ]
);

export const budgetPlans = pgTable(
  'budget_plans',
  {
    id: uuid('id').primaryKey().defaultRandom().notNull(),
    title: varchar('title', { length: 256 }).default('Untitled').notNull(),
    userId: text('user_id')
      .references(() => users.id, { onDelete: 'cascade' })
      .notNull(),
    ...timestamps,
  },
  (table) => [index('budget_plans_user_id_idx').on(table.userId)]
);

export const budgetCategories = pgTable(
  'budget_categories',
  {
    id: uuid('id').primaryKey().defaultRandom().notNull(),
    name: varchar('name', { length: 256 }).default('Uncategorized').notNull(),
    amount: integer('amount').default(0).notNull(),
    budgetPlanId: uuid('budget_plan_id')
      .references(() => budgetPlans.id, {
        onDelete: 'cascade',
      })
      .notNull(),
    ...timestamps,
  },
  (table) => [
    index('budget_categories_budget_plan_id_idx').on(table.budgetPlanId),
  ]
);
// #endregion main schema table defenition
