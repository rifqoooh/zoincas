import type { TransactionsDataType } from '@/validators/api/transactions/response';
import type { Row } from '@tanstack/react-table';

import { MoreHorizontalIcon } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useUpdateTransactionMutation } from '@/hooks/queries/transactions';
import { useCreateEditTransactionModal } from '@/hooks/store/create-edit-transaction';
import { useDeleteTransactionModal } from '@/hooks/store/delete-transaction';

interface RowActionsProps {
  row: Row<TransactionsDataType>;
}

export function RowActions({ row }: RowActionsProps) {
  const { id: transactionId } = row.original;

  const createEditTransactionStore = useCreateEditTransactionModal();
  const deleteTransactionStore = useDeleteTransactionModal();

  const mutation = useUpdateTransactionMutation(transactionId);

  const onEditTransaction = () => {
    createEditTransactionStore.onOpen({ id: transactionId });
  };

  const onRemoveCategory = () => {
    toast.promise(mutation.mutateAsync({ categoryId: null }), {
      loading: 'Removing category...',
      success: 'Category removed successfully',
      error: (error: unknown) => {
        if (error instanceof Error) {
          return error.message;
        }

        return 'There is an error in the internal server.';
      },
    });
  };

  const onRemoveBudget = () => {
    toast.promise(mutation.mutateAsync({ budgetCategoryId: null }), {
      loading: 'Removing budget...',
      success: 'Budget removed successfully',
      error: (error: unknown) => {
        if (error instanceof Error) {
          return error.message;
        }

        return 'There is an error in the internal server.';
      },
    });
  };

  const onDeleteTransaction = () => {
    deleteTransactionStore.onOpen({ id: transactionId });
  };

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="dark:bg-background dark:hover:bg-accent"
        >
          <MoreHorizontalIcon className="size-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={onEditTransaction}>
          Edit transaction
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onRemoveCategory}>
          Remove category
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onRemoveBudget}>
          Remove budget
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          variant="destructive"
          className="dark:text-red-500 dark:focus:text-red-500"
          onClick={onDeleteTransaction}
        >
          Delete transaction
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
