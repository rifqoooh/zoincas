'use client';

import { CreateUserForm } from '@/components/forms/create-user';
import { ResponsiveSheet } from '@/components/responsive-sheet';
import { useCreateUserModal } from '@/hooks/store/create-user';
import { useIsClient } from '@/hooks/use-is-client';

export function CreateUserModal() {
  const store = useCreateUserModal();

  const isClient = useIsClient();
  if (!isClient) {
    return null;
  }

  const text = {
    title: 'Create a new user',
    description: 'Fill the form to create a new user',
  };

  return (
    <ResponsiveSheet {...text} isOpen={store.isOpen} onClose={store.onClose}>
      <CreateUserForm />
    </ResponsiveSheet>
  );
}
