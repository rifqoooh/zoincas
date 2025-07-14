import type * as React from 'react';

import { DeleteBalanceModal } from '@/components/alert/delete-balance';
import { DeleteBudgetCategoryModal } from '@/components/alert/delete-budget-category';
import { DeleteBudgetPlanModal } from '@/components/alert/delete-budget-plan';
import { DeleteTransactionModal } from '@/components/alert/delete-transaction';
import { CreateEditBalanceModal } from '@/components/modal/create-edit-balance';
import { CreateEditBudgetModal } from '@/components/modal/create-edit-budget-plan';
import { CreateEditTransactionModal } from '@/components/modal/create-edit-transaction';

export function MainProviders({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CreateEditBalanceModal />
      <CreateEditTransactionModal />
      <CreateEditBudgetModal />

      {/* alert modal providers */}
      <DeleteBalanceModal />
      <DeleteTransactionModal />
      <DeleteBudgetPlanModal />
      <DeleteBudgetCategoryModal />

      {children}
    </>
  );
}
