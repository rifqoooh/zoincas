import type { Metadata } from 'next';

import Link from 'next/link';

import { SignUpForm } from '@/components/forms/sign-up';
import { Routes } from '@/lib/safe-routes';
import { createMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = createMetadata({
  title: 'Sign up',
  description: 'Zoincas sign up page.',
});

export default function SignUpPage() {
  return (
    <div className="p-6 lg:p-8">
      <div className="mx-auto flex w-full flex-col justify-center gap-6 sm:w-[400px]">
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-xl uppercase tracking-tight">
            Create an account
          </h1>
          <p className="text-muted-foreground text-sm">
            Enter your credentials below to create your account
          </p>
        </div>

        <SignUpForm />

        <Link
          href={Routes.signIn()}
          className="block text-center text-sm hover:underline"
        >
          Already have an account? Sign in
        </Link>

        <p className="px-8 text-center text-muted-foreground text-xs">
          By clicking continue, you agree to our{' '}
          <Link
            href="#terms"
            className="italic underline underline-offset-4 hover:text-primary"
          >
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link
            href="#privacy"
            className="italic underline underline-offset-4 hover:text-primary"
          >
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
