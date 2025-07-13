import type { BudgetPlansDataType } from '@/validators/api/budget-plans/response';

import { MoreHorizontalIcon } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useCreateBudgetPlanMutation } from '@/hooks/queries/budget-plans';
import { useCreateEditBudgetModal } from '@/hooks/store/create-edit-budget';
import { useDeleteBudgetPlanModal } from '@/hooks/store/delete-budget-plan';

interface CardActionsProps {
  budget: BudgetPlansDataType;
}

export function CardActions({ budget }: CardActionsProps) {
  const href = budget.categories.map((category) => category.id).join(',');

  const createEditBudgetStore = useCreateEditBudgetModal();
  const deleteBudgetStore = useDeleteBudgetPlanModal();

  const createMutation = useCreateBudgetPlanMutation();

  const onEditBudget = () => {
    createEditBudgetStore.onOpen({ id: budget.id });
  };

  const onDuplicateBudget = () => {
    return toast.promise(
      createMutation.mutateAsync({
        title: `Copy of ${budget.title}`,
        categories: budget.categories.map((category) => ({
          name: category.name,
          amount: category.amount,
        })),
      }),
      {
        loading: 'Duplicating budget plan...',
        success: 'Budget plan duplicated successfully',
        error: (error: unknown) => {
          if (error instanceof Error) {
            return error.message;
          }

          return 'There is an error in the internal server.';
        },
      }
    );
  };

  const onDeleteBudget = () => {
    deleteBudgetStore.onOpen({ id: budget.id });
  };

  return (
    <div className="flex items-center gap-2">
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
          <DropdownMenuItem onClick={onDuplicateBudget}>
            Duplicate budget
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
