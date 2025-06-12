'use server';

import type { SignInType } from '@/validators/actions/sign-in';

import { auth } from '@/lib/auth/server';
import { Routes } from '@/lib/safe-routes';
import { signInSchema } from '@/validators/actions/sign-in';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export const signInAction = async (
  values: SignInType,
  callbackURL?: string
) => {
  const { email, password } = signInSchema.parse(values);

  await auth.api.signInEmail({
    body: {
      email,
      password,
    },
  });

  if (callbackURL) {
    redirect(Routes.root({}, { search: { url: callbackURL } }));
  }

  redirect(Routes.root());
};

export const signOutAction = async () => {
  await auth.api.signOut({
    headers: await headers(),
  });

  redirect(Routes.root());
};
