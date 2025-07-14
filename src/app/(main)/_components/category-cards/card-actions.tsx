import type { CategoriesDataType } from '@/validators/api/categories/response';

import { MoreHorizontalIcon } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useCreateEditCategoryModal } from '@/hooks/store/create-edit-category';
import { useDeleteCategoryModal } from '@/hooks/store/delete-category';

interface CardActionsProps {
  category: CategoriesDataType;
}

export function CardActions({ category }: CardActionsProps) {
  const createEditCategoryStore = useCreateEditCategoryModal();
  const deleteCategoryStore = useDeleteCategoryModal();

  const onEditCategory = () => {
    createEditCategoryStore.onOpen({ id: category.id });
  };

  const onDeleteCategory = () => {
    deleteCategoryStore.onOpen({ id: category.id });
  };

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreHorizontalIcon className="size-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem asChild>
          <Link href={`/transactions?category=${category.id}`}>
            View transactions
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onEditCategory}>
          Edit category
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          variant="destructive"
          className="dark:text-red-500 dark:focus:text-red-500"
          onClick={onDeleteCategory}
        >
          Delete category
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
