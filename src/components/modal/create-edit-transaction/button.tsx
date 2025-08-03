'use client';

import { Button } from '@/components/ui/button';
import { useCreateEditTransactionModal } from '@/hooks/store/create-edit-transaction';
import { cn } from '@/lib/utilities';

export function CreateTransactionButton({
  className,
}: {
  className?: string;
}) {
  const store = useCreateEditTransactionModal();

  const onClick = () => {
    store.onOpen();
  };

  return (
    <Button className={cn('gap-2', className)} size="sm" onClick={onClick}>
      <span>Create transaction</span>
    </Button>
  );
}
