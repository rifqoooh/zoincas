import * as React from 'react';

import { EyeIcon, EyeOffIcon } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utilities';

export function PasswordInput({
  className,
  ...props
}: React.ComponentProps<'input'>) {
  const [isVisible, setIsVisible] = React.useState<boolean>(false);

  return (
    <div className="relative">
      <Input
        type={isVisible ? 'text' : 'password'}
        className={cn('pe-10', className)}
        {...props}
      />

      <button
        type="button"
        title={isVisible ? 'Hide password' : 'Show password'}
        tabIndex={-1}
        className="-translate-y-1/2 absolute top-1/2 right-4 transform text-muted-foreground"
        onClick={() => setIsVisible(!isVisible)}
      >
        {isVisible ? (
          <EyeOffIcon className="size-4" />
        ) : (
          <EyeIcon className="size-4" />
        )}
      </button>
    </div>
  );
}
