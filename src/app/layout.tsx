import './globals.css';

import type * as React from 'react';

import { poppins } from '@/lib/fonts';
import { Provider } from '@/providers';

type RootLayoutProps = {
  readonly children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={poppins}>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
