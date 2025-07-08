'use client';

import { Button } from '@/components/ui/button';

export function CreateBudgetPlanButton() {
  const onClick = () => {};

  return (
    <Button className="gap-2" size="sm" onClick={onClick}>
      <span>Create budget plan</span>
    </Button>
  );
}
