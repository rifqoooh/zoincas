import type { Metadata } from 'next';
import type * as React from 'react';

import { createMetadata } from '@/lib/seo/metadata';
import { adminMiddleware } from '@/middleware/page/admin-middleware';

export const metadata: Metadata = createMetadata({
  title: 'Admin',
  description: 'Admin panel of Zoincas.',
});

type AdminLayoutProps = {
  readonly children: React.ReactNode;
};

export default async function AdminLayout({ children }: AdminLayoutProps) {
  await adminMiddleware();

  return <div>{children}</div>;
}
