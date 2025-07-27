'use client';

import type { SignInType } from '@/validators/actions/sign-in';
import type { SubmitHandler } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';

import { signInAction } from '@/actions/auth';
import { toast } from '@/lib/toast-redirect';
import { signInSchema } from '@/validators/actions/sign-in';
import { parseAsString, useQueryStates } from 'nuqs';

export const useSignIn = () => {
  const [search] = useQueryStates({
    callbackURL: parseAsString.withDefault(''),
  });

  const { callbackURL } = search;

  const [isPending, startTransition] = useTransition();

  const queryClient = useQueryClient();

  const form = useForm<SignInType>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<SignInType> = (values) => {
    const parsedData = signInSchema.parse(values);

    startTransition(() => {
      toast(signInAction(parsedData, callbackURL), {
        loading: 'Please wait, we are signing you in...',
        success: 'There you go!',
        onSuccess: () => {
          queryClient.clear();
        },
      });
    });
  };

  return {
    form,
    onSubmit,
    isPending,
  };
};
