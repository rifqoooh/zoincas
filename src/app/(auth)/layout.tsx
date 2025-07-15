import type * as React from 'react';

import { Background } from './_components/background';

interface AuthLayoutProps {
  readonly children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="relative grid h-svh flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0 xl:grid-cols-[45%_55%]">
      <div>{children}</div>

      <div className="relative hidden h-full p-10 text-primary-foreground lg:flex lg:flex-col dark:border-r">
        <Background />
      </div>
    </div>
  );
}
