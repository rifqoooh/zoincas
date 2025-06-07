import type * as React from 'react';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin',
  description: 'Admin panel of Zoincas.',
};

type AdminRootLayoutProps = {
  readonly children: React.ReactNode;
};

export default function AdminRootLayout({ children }: AdminRootLayoutProps) {
  return <div>{children}</div>;
}
