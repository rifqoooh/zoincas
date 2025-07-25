import type * as React from 'react';

import { cn } from '@/lib/utilities';

export function Header({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      {...props}
      className={cn(
        'flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:justify-between',
        className
      )}
    />
  );
}
