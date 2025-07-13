export const balancesKeys = {
  all: () => ['balances'],
  balance: () => ['balance'],
  balanceId: ({ balanceId }: { balanceId?: string }) => [
    'balance',
    { balanceId },
  ],
};
