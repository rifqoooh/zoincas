import type { ListTransactionsQuery } from '@/validators/api/transactions/request';

export const transactionsKeys = {
  all: () => ['transactions'],
  transactions: (search: ListTransactionsQuery) => ['transactions', search],
  transaction: ({ transactionId }: { transactionId?: string }) => [
    'transaction',
    { transactionId },
  ],
  commandSearch: (search?: string) => ['transactions', 'command', search],
  command: () => ['transactions', 'command'],
};
