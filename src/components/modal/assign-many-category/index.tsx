'use client';

import { AssignManyCategoryForm } from '@/components/forms/assign-many-category';
import { ResponsiveSheet } from '@/components/responsive-sheet';
import { useAssignManyCategoryModal } from '@/hooks/store/assign-many-category';
import { useIsClient } from '@/hooks/use-is-client';

export function AssignManyCategoryModal() {
  const store = useAssignManyCategoryModal();

  const isClient = useIsClient();
  if (!isClient) {
    return null;
  }

  const text = {
    title: 'Assign many categories',
    description: 'Assign many categories to a transaction',
  };

  return (
    <ResponsiveSheet {...text} isOpen={store.isOpen} onClose={store.onClose}>
      <AssignManyCategoryForm />
    </ResponsiveSheet>
  );
}
