import type * as React from 'react';

import { DeleteTransactionModal } from '@/components/alert/delete-transaction';
import { CreateEditBudgetModal } from '@/components/modal/create-edit-budget-plan';
import { CreateEditTransactionModal } from '@/components/modal/create-edit-transaction';

export function MainProviders({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CreateEditTransactionModal />
      <CreateEditBudgetModal />

      {/* Table row actions providers */}
      <DeleteTransactionModal />

      {children}
    </>
  );
}
