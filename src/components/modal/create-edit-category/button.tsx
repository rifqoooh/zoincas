'use client';

import { Button } from '@/components/ui/button';
import { useCreateEditCategoryModal } from '@/hooks/store/create-edit-category';

export function CreateEditCategoryButton() {
  const store = useCreateEditCategoryModal();

  const onClick = () => {
    store.onOpen();
  };

  return (
    <Button className="gap-2" size="sm" onClick={onClick}>
      <span>Create category</span>
    </Button>
  );
}
