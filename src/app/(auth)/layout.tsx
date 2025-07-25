import type * as React from 'react';

import { Background } from './_components/background';

interface AuthLayoutProps {
  readonly children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="relative grid h-svh flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0 xl:grid-cols-[45%_55%]">
      <div>{children}</div>

      <div className="h-full p-2">
        <div className="relative hidden h-full px-6 py-4 text-white lg:flex lg:flex-col">
          <Background />
        </div>
      </div>
    </div>
  );
}
