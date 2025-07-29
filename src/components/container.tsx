import type * as React from 'react';

import { cn } from '@/lib/utilities';

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Container = ({ className, ...props }: ContainerProps) => {
  return (
    <div
      className={cn(
        'mx-auto w-full px-4 pb-8 sm:max-w-none sm:px-6 md:px-8 xl:max-w-7xl',
        className
      )}
      {...props}
    />
  );
};
