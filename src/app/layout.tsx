import './globals.css';

import type * as React from 'react';

import { spaceGrotesk } from '@/lib/fonts';
import { Provider } from '@/providers';

type RootLayoutProps = {
  readonly children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={spaceGrotesk}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
