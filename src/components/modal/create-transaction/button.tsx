'use client';

import { Button } from '@/components/ui/button';
import { useCreateTransactionModal } from '@/hooks/store/create-transaction';

export function CreateTransactionButton() {
  const store = useCreateTransactionModal();

  const onClick = () => {
    store.onOpen();
  };

  return (
    <Button className="gap-2" size="sm" onClick={onClick}>
      <span>Create transaction</span>
    </Button>
  );
}
