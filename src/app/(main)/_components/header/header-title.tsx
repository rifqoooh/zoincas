import type * as React from 'react';

import { cn } from '@/lib/utilities';

export function HeaderTitle({
  className,
  ...props
}: React.ComponentProps<'h1'>) {
  return <h1 className={cn('text-2xl uppercase', className)} {...props} />;
}
