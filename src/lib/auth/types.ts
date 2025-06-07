import type { auth } from './server';

export type authUserType = typeof auth.$Infer.Session.user;
export type authSessionType = typeof auth.$Infer.Session.session;

export interface SessionVariables {
  user: authUserType | null;
  session: authSessionType | null;
}
