'use client';

import { Button } from '@/components/ui/button';
import { useCreateEditTransactionModal } from '@/hooks/store/create-edit-transaction';

export function CreateTransactionButton() {
  const store = useCreateEditTransactionModal();

  const onClick = () => {
    store.onOpen();
  };

  return (
    <Button className="gap-2" size="sm" onClick={onClick}>
      <span>Create transaction</span>
    </Button>
  );
}
