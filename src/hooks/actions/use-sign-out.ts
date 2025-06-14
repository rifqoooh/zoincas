'use client';

import { signOutAction } from '@/actions/auth';
import { toast } from '@/lib/toast-redirect';
import { useQueryClient } from '@tanstack/react-query';
import { useTransition } from 'react';

export const useSignOut = () => {
  const [isPending, startTransition] = useTransition();

  const queryClient = useQueryClient();

  const onSignOut = () => {
    startTransition(() => {
      toast(signOutAction(), {
        loading: 'Please wait, we are signing you out...',
        success: 'Have a nice day!',
        onSuccess: () => {
          queryClient.clear();
        },
      });
    });
  };

  return {
    onSignOut,
    isPending,
  };
};
