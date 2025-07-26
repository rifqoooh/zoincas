import type * as React from 'react';

import { Button } from '@/components/ui/button';
import { FcGoogle as GoogleIcon } from 'react-icons/fc';

export function GoogleAuthButton(props: React.ComponentProps<'button'>) {
  return (
    <Button {...props} className="flex gap-3" variant="outline">
      <GoogleIcon />
      Continue with Google
    </Button>
  );
}
