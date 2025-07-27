'use client';

import { Button } from '@/components/ui/button';
import { useCreateUserModal } from '@/hooks/store/create-user';

export function CreateUserButton() {
  const store = useCreateUserModal();

  const onClick = () => {
    store.onOpen();
  };

  return (
    <Button className="gap-2" size="sm" onClick={onClick}>
      <span>Create new user</span>
    </Button>
  );
}
