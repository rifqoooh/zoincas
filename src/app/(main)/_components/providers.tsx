import type * as React from 'react';

import { DeleteTransactionModal } from '@/components/alert/delete-transaction';
import { AssignBudgetTransactionModal } from '@/components/modal/assign-budget-transaction';
import { CreateEditTransactionModal } from '@/components/modal/create-edit-transaction';

export function MainProviders({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CreateEditTransactionModal />

      {/* Table row actions providers */}
      <AssignBudgetTransactionModal />
      <DeleteTransactionModal />

      {children}
    </>
  );
}
