import type { ListTransactionsQuery } from '@/validators/api/openapi/transactions/request';

export const transactionsKeys = {
  all: () => ['transactions'],
  transactions: (search: ListTransactionsQuery) => ['transactions', search],
};
