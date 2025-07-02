import type * as React from 'react';

import { DeleteTransactionModal } from '@/components/alert/delete-transaction';
import { CreateTransactionModal } from '@/components/modal/create-edit-transaction';

export function MainProviders({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CreateTransactionModal />

      {/* Table row actions providers */}
      <DeleteTransactionModal />

      {children}
    </>
  );
}
