import type * as React from 'react';

import { DeleteBalanceModal } from '@/components/alert/delete-balance';
import { DeleteBudgetCategoryModal } from '@/components/alert/delete-budget-category';
import { DeleteBudgetPlanModal } from '@/components/alert/delete-budget-plan';
import { DeleteCategoryModal } from '@/components/alert/delete-category';
import { DeleteManyTransactionModal } from '@/components/alert/delete-many-transaction';
import { DeleteTransactionModal } from '@/components/alert/delete-transaction';
import { AssignManyBudgetModal } from '@/components/modal/assign-many-budget';
import { AssignManyCategoryModal } from '@/components/modal/assign-many-category';
import { CreateEditBalanceModal } from '@/components/modal/create-edit-balance';
import { CreateEditBudgetModal } from '@/components/modal/create-edit-budget-plan';
import { CreateEditCategoryModal } from '@/components/modal/create-edit-category';
import { CreateEditTransactionModal } from '@/components/modal/create-edit-transaction';
import { ImportTransactionsCSVModal } from '@/components/modal/import-transactions-csv';
import { ScanFileModal } from '@/components/modal/scan-file';

export function MainProviders({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CreateEditBalanceModal />
      <CreateEditCategoryModal />
      <CreateEditTransactionModal />
      <ImportTransactionsCSVModal />
      <ScanFileModal />
      <CreateEditBudgetModal />

      {/* alert modal providers */}
      <DeleteBalanceModal />
      <DeleteCategoryModal />
      <DeleteTransactionModal />
      <DeleteBudgetPlanModal />
      <DeleteBudgetCategoryModal />

      {/* transactions table actions bar */}
      <DeleteManyTransactionModal />
      <AssignManyCategoryModal />
      <AssignManyBudgetModal />

      {children}
    </>
  );
}
