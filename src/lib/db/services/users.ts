import type { GetUsersQuery } from "@/validators/api/openapi/users/request";

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
  or,
} from "drizzle-orm";

import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";
import { coalesce } from "@/lib/db/utilities";

export const getUsers = async (query: GetUsersQuery) => {
  const [startCreatedAt, endCreatedAt] = query.createdAt;

  const offset = (query.page - 1) * query.perPage;
  const emailVerified = query.emailVerified.map((item) => item === "verified");
  const banned = query.banned.map((item) => item === "banned");

  const where = and(
    query.email
      ? or(
          ilike(users.name, `%${query.email}%`),
          ilike(users.email, `%${query.email}%`),
        )
      : undefined,
    query.emailVerified.length > 0
      ? inArray(users.emailVerified, emailVerified)
      : undefined,
    query.role.length > 0 ? inArray(users.role, query.role) : undefined,
    query.banned.length > 0 ? inArray(users.banned, banned) : undefined,
    query.createdAt.length > 0
      ? and(
          startCreatedAt
            ? gte(
                users.createdAt,
                (() => {
                  const date = new Date(query.createdAt[0]);
                  date.setHours(0, 0, 0, 0);
                  return date;
                })(),
              )
            : undefined,
          endCreatedAt
            ? lte(
                users.createdAt,
                (() => {
                  const date = new Date(query.createdAt[1]);
                  date.setHours(23, 59, 59, 999);
                  return date;
                })(),
              )
            : undefined,
        )
      : undefined,
  );

  const orderBy =
    query.sort.length > 0
      ? query.sort.map((item) =>
          item.desc ? desc(users[item.id]) : asc(users[item.id]),
        )
      : [asc(users.createdAt)];

  const { data, total } = await db.transaction(async (tx) => {
    const data = await tx
      .select({
        id: users.id,
        name: users.name,
        email: users.email,
        emailVerified: users.emailVerified,
        image: users.image,
        role: users.role,
        banned: users.banned,
        createdAt: users.createdAt,
      })
      .from(users)
      .where(where)
      .orderBy(...orderBy)
      .limit(query.perPage)
      .offset(offset);

    const [total] = await tx
      .select({
        count: coalesce(count(), 0).mapWith(Number).as("count"),
      })
      .from(users)
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

export const getUser = async (userId: string) => {
  const [data] = await db
    .select()
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  return data;
};
