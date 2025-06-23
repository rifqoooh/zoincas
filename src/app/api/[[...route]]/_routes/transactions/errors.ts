export const listTransactionsQueryErrors = [
  {
    page: false,
    perPage: false,
    sort: ['[{"id":"undefined","desc":true}]'],
    description: 'test',
    balance: 'undefined',
    category: 'undefined',
    createdAt: ['1672502400000', '1672502400000'],
  },
];

export const createTransactionInputErrors = [
  {},
  {
    datetime: '9999-01-01 00:00:00',
    description: 1,
    amount: '1',
    balanceId: 1,
    categoryId: 1,
    budgetCategoryId: 1,
  },
];
