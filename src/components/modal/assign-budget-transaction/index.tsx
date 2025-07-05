'use client';

import { AssignBudgetTransactionForm } from '@/components/forms/assign-budget-transaction';
import { ResponsiveModal } from '@/components/responsive-modal';
import { useAssignBudgetTransactionModal } from '@/hooks/store/assign-budget-transaction';
import { useIsClient } from '@/hooks/use-is-client';

export function AssignBudgetTransactionModal() {
  const store = useAssignBudgetTransactionModal();

  const isClient = useIsClient();
  if (!isClient) {
    return null;
  }

  const text = {
    title: 'Assign to budget plan',
    description:
      'Assign this transaction to a budget plan for better budgeting.',
  };

  return (
    <ResponsiveModal {...text} isOpen={store.isOpen} onClose={store.onClose}>
      <AssignBudgetTransactionForm />
    </ResponsiveModal>
  );
}
