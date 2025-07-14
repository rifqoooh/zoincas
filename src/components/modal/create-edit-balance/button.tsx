'use client';

import { Button } from '@/components/ui/button';
import { useCreateEditBalanceModal } from '@/hooks/store/create-edit-balance';

export function CreateEditBalanceButton() {
  const store = useCreateEditBalanceModal();

  const onClick = () => {
    store.onOpen();
  };

  return (
    <Button className="gap-2" size="sm" onClick={onClick}>
      <span>Create balance</span>
    </Button>
  );
}
