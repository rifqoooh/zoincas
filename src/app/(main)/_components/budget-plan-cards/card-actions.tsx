import type { BudgetPlansDataType } from '@/validators/api/budget-plans/response';

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
import { useCreateEditBudgetModal } from '@/hooks/store/create-edit-budget';
import { useDeleteBudgetPlanModal } from '@/hooks/store/delete-budget-plan';
import { cn } from '@/lib/utilities';

interface CardActionsProps {
  data: BudgetPlansDataType;
  className?: string;
}

export function CardActions({ data, className }: CardActionsProps) {
  const href = data.categories.map((category) => category.id).join(',');

  const createEditBudgetStore = useCreateEditBudgetModal();
  const deleteBudgetStore = useDeleteBudgetPlanModal();

  const onEditBudget = () => {
    createEditBudgetStore.onOpen({ id: data.id });
  };

  const onDeleteBudget = () => {
    deleteBudgetStore.onOpen({ id: data.id });
  };

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <Button
        variant="secondary"
        className="hidden sm:inline-flex"
        onClick={onEditBudget}
      >
        <span>Edit budget</span>
      </Button>

      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" size="icon">
            <MoreHorizontalIcon className="size-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem asChild>
            <Link href={`/transactions?budget=${href}`}>View transactions</Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onEditBudget}>
            Edit budget
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            variant="destructive"
            className="dark:text-red-500 dark:focus:text-red-500"
            onClick={onDeleteBudget}
          >
            Delete budget
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
