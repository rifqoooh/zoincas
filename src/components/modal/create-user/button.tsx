'use client';

import { Button } from '@/components/ui/button';
import { useCreateUserModal } from '@/hooks/store/create-user';

export function CreateNewUserButton() {
  const store = useCreateUserModal();

  return (
    <Button className="gap-2" size="sm" onClick={store.onOpen}>
      <span>Create new user</span>
    </Button>
  );
}
