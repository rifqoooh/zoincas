import type * as React from 'react';

import { DeleteBudgetCategoryModal } from '@/components/alert/delete-budget-category';
import { DeleteTransactionModal } from '@/components/alert/delete-transaction';
import { CreateEditBudgetModal } from '@/components/modal/create-edit-budget-plan';
import { CreateEditTransactionModal } from '@/components/modal/create-edit-transaction';

export function MainProviders({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CreateEditTransactionModal />
      <CreateEditBudgetModal />

      {/* alert modal providers */}
      <DeleteTransactionModal />
      <DeleteBudgetCategoryModal />

      {children}
    </>
  );
}
