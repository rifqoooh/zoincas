'use client';

import type { SignInType } from '@/types/actions/sign-in';
import type { SubmitHandler } from 'react-hook-form';

import { signInAction } from '@/actions/auth';
import { toast } from '@/lib/toast-redirect';
import { signInSchema } from '@/validators/actions/sign-in';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';

export const useSignIn = () => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<SignInType>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<SignInType> = (values) => {
    startTransition(() => {
      toast(signInAction(values), {
        loading: 'Please wait, we are signing you in...',
        success: 'There you go!',
      });
    });
  };

  return {
    form,
    onSubmit,
    isPending,
  };
};
