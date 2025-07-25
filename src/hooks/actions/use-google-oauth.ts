'use client';

import { signInGoogleAction } from '@/actions/auth';
import { useTransition } from 'react';

export const useGoogleOAuth = () => {
  const [isPending, startTransition] = useTransition();

  const onSignInGoogle = () => {
    startTransition(async () => {
      await signInGoogleAction();
    });
  };

  return {
    onSignInGoogle,
    isPending,
  };
};
