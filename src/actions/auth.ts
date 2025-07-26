'use server';

import type { SignInType } from '@/validators/actions/sign-in';
import type { SignUpType } from '@/validators/actions/sign-up';

import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import { env } from '@/env';
import { auth } from '@/lib/auth/server';
import { Routes } from '@/lib/safe-routes';
import { signInSchema } from '@/validators/actions/sign-in';
import { signUpSchema } from '@/validators/actions/sign-up';

export const signUpAction = async (values: SignUpType) => {
  const { name, email, password } = signUpSchema.parse(values);

  await auth.api.signUpEmail({
    body: {
      name,
      email,
      password,
    },
  });

  redirect(Routes.root());
};

export const signInGoogleAction = async () => {
  await auth.api.signInSocial({
    body: {
      provider: 'google',
      callbackURL: env().NEXT_PUBLIC_APP_URL,
    },
  });
};

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
