import type { Metadata } from 'next';

import Link from 'next/link';

import { SignInForm } from '@/components/forms/sign-in';
import { createMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = createMetadata({
  title: 'Sign in',
  description: 'Zoincas sign in page.',
});

export default function SignInPage() {
  return (
    <div className="p-6 lg:p-8">
      <div className="mx-auto flex w-full flex-col justify-center gap-6 sm:w-[400px]">
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-xl uppercase tracking-tight">
            Welcome to Zoincas
          </h1>
          <p className="text-muted-foreground text-sm">
            Enter your credentials below to login to your account
          </p>
        </div>

        <SignInForm />

        <Link
          href="/sign-up"
          className="block text-center text-sm hover:underline"
        >
          Don&apos;t have an account? Sign up
        </Link>

        <p className="px-8 text-center text-muted-foreground text-xs">
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
