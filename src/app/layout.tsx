import './globals.css';

import type * as React from 'react';

import { spaceGrotesk } from '@/lib/fonts';
import { cn } from '@/lib/utilities';
import { Provider } from '@/providers';

type RootLayoutProps = {
  readonly children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn('scroll-smooth', spaceGrotesk)}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
