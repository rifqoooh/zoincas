'use client';

import type { SignUpType } from '@/validators/actions/sign-up';
import type { SubmitHandler } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { useTransition } from 'react';
import { useForm } from 'react-hook-form';

import { signUpAction } from '@/actions/auth';
import { toast } from '@/lib/toast-redirect';
import { signUpSchema } from '@/validators/actions/sign-up';

export const useSignUp = () => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<SignUpType>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<SignUpType> = (values) => {
    const parsedData = signUpSchema.parse(values);

    startTransition(() => {
      toast(signUpAction(parsedData), {
        loading: 'Please wait, we are signing you up...',
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
