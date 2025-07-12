import type * as React from 'react';

import { cn } from '@/lib/utilities';

export function HeaderDescription({
  className,
  ...props
}: React.ComponentProps<'p'>) {
  return (
    <p
      className={cn('text-muted-foreground sm:text-sm', className)}
      {...props}
    />
  );
}
