'use client';

import { Button } from '@/components/ui/button';
import { useCreateEditBudgetModal } from '@/hooks/store/create-edit-budget';

export function CreateBudgetPlanButton() {
  const store = useCreateEditBudgetModal();

  const onClick = () => {
    store.onOpen();
  };

  return (
    <Button className="gap-2" size="sm" onClick={onClick}>
      <span>Create budget plan</span>
    </Button>
  );
}
