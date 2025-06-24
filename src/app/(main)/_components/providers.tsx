import type * as React from 'react';

import { CreateTransactionModal } from '@/components/modal/create-transaction';

export function MainProviders({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CreateTransactionModal />

      {children}
    </>
  );
}
