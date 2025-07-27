'use client';

import type * as React from 'react';

import { useGetSessionsQuery } from '@/hooks/queries/sessions';
import { cn } from '@/lib/utilities';

export function Greeting({ className, ...props }: React.ComponentProps<'div'>) {
  const sessionsQuery = useGetSessionsQuery();
  const { user } = sessionsQuery.data || {};

  const isPending = sessionsQuery.isPending;

  if (isPending) {
    return <div />;
  }

  return (
    <div className={cn(className)} {...props}>
      {user ? `Welcome, ${user.name}!` : 'Welcome, stranger!'}
    </div>
  );
}
