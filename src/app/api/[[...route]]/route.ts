import { handle } from 'hono/vercel';

import configureOpenAPI from '@/lib/api/configure-open-api';
import { createApp } from '@/lib/api/create-app';
import sessions from './_routes/sessions';
import users from './_routes/users';

const app = createApp();

configureOpenAPI(app);

const routes = app.route('/', sessions).route('/', users);

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;
