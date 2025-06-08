import type { SignInType } from '@/types/actions/sign-in';

import { redirect } from 'next/navigation';

import { auth } from '@/lib/auth/server';
import { Routes } from '@/lib/safe-routes';
import { signInSchema } from '@/validators/actions/sign-in';

export const signInAction = async (values: SignInType) => {
  const { email, password } = signInSchema.parse(values);

  await auth.api.signInEmail({
    body: {
      email,
      password,
    },
  });

  redirect(Routes.root());
};
