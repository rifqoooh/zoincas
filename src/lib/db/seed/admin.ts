import { db } from '../';
import { accounts, sessions, users, verifications } from '../schema';

const admin = {
  users: {
    id: 'gyGi9nMdWBNSa0KVKq8kCDIrz4wc7VOm',
    name: 'Admin',
    email: 'auth@zoincas.com',
    emailVerified: true,
    image: null,
    role: 'admin',
    banned: false,
    banReason: null,
    banExpires: null,
  },
  accounts: {
    id: 'dB6HcDo91yBQU4VEJWwqBVwtvb17K39T',
    accountId: 'gyGi9nMdWBNSa0KVKq8kCDIrz4wc7VOm',
    providerId: 'credential',
    accessToken: null,
    refreshToken: null,
    idToken: null,
    accessTokenExpiresAt: null,
    scope: null,
    password:
      'c2d454283be4c0461fa4bda81f83752d:aa5b205c7b86e660b6d5027ad7e0415e195d465043f765f8f65c1499738c8cad3b4ae2fd01df60e3dcccf3d3d322e91b29b669d8079c818460aa31d34130c2d4',
    userId: 'gyGi9nMdWBNSa0KVKq8kCDIrz4wc7VOm',
  },
};

const seedAdmin = async () => {
  try {
    await db.delete(users);
    await db.delete(sessions);
    await db.delete(accounts);
    await db.delete(verifications);

    await db.insert(users).values(admin.users).onConflictDoNothing();
    await db.insert(accounts).values(admin.accounts).onConflictDoNothing();
  } catch (error) {
    // biome-ignore lint/suspicious/noConsole: <explanation>
    console.error(error);
  }
};

const runSeed = async () => {
  // biome-ignore lint/suspicious/noConsole: <explanation>
  // biome-ignore lint/suspicious/noConsoleLog: <explanation>
  console.log('⏳ Running seed...');

  const start = Date.now();

  await seedAdmin();

  const end = Date.now();

  // biome-ignore lint/suspicious/noConsole: <explanation>
  // biome-ignore lint/suspicious/noConsoleLog: <explanation>
  console.log(`✅ Seed completed in ${end - start}ms`);

  process.exit(0);
};

runSeed().catch((err) => {
  // biome-ignore lint/suspicious/noConsole: <explanation>
  // biome-ignore lint/suspicious/noConsoleLog: <explanation>
  console.error('❌ Seed failed');

  // biome-ignore lint/suspicious/noConsole: <explanation>
  // biome-ignore lint/suspicious/noConsoleLog: <explanation>
  console.error(err);
  process.exit(1);
});
