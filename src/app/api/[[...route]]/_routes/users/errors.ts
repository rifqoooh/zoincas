export const listUsersQueryErrors = [
  {
    page: false,
    perPage: false,
    sort: ['[{"id":"undefined","desc":true}]'],
    email: "test",
    emailVerified: "undefined",
    role: "undefined",
    banned: "undefined",
    createdAt: ["1672502400000", "1672502400000"],
  },
  {
    page: true,
    perPage: true,
    email: "test",
    emailVerified: ["undefined"],
    role: ["undefined"],
    banned: ["undefined"],
  },
];

export const createUserInputErrors = [
  {},
  {
    name: 1,
    email: "test",
    emailVerified: "false",
    role: "undefined",
    password: "fYtLqWa",
  },
  {
    name: "test",
    email: "test@example.com",
    emailVerified: false,
    role: "user",
    password:
      "WmTcjRvKzAYpNeLuqsGbJHTIMoakVXEdCBhfywZnxSrQPLgUemOdtFiNvkrBl1Znx",
  },
];

export const resetPasswordInputErrors = [
  {},
  {
    password: "fYtLqWa",
  },
  {
    password:
      "WmTcjRvKzAYpNeLuqsGbJHTIMoakVXEdCBhfywZnxSrQPLgUemOdtFiNvkrBl1Znx",
  },
];
