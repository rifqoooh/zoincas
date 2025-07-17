'use client';

import { AssignManyBudgetForm } from '@/components/forms/assign-many-budget';
import { ResponsiveSheet } from '@/components/responsive-sheet';
import { useAssignManyBudgetModal } from '@/hooks/store/assign-many-budget';
import { useIsClient } from '@/hooks/use-is-client';

export function AssignManyBudgetModal() {
  const store = useAssignManyBudgetModal();

  const isClient = useIsClient();
  if (!isClient) {
    return null;
  }

  const text = {
    title: 'Assign many budgets',
    description: 'Assign many budgets to a transaction',
  };

  return (
    <ResponsiveSheet {...text} isOpen={store.isOpen} onClose={store.onClose}>
      <AssignManyBudgetForm />
    </ResponsiveSheet>
  );
}
