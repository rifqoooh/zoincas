import type { TransactionsDataType } from '@/validators/api/transactions/response';
import type { Row } from '@tanstack/react-table';

import { MoreHorizontalIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useCreateEditTransactionModal } from '@/hooks/store/create-edit-transaction';
import { useDeleteTransactionModal } from '@/hooks/store/delete-transaction';

interface RowActionsProps {
  row: Row<TransactionsDataType>;
}

export function RowActions({ row }: RowActionsProps) {
  const { id: transactionId } = row.original;

  const createEditTransactionStore = useCreateEditTransactionModal();
  const deleteTransactionStore = useDeleteTransactionModal();

  const onEditTransaction = () => {
    createEditTransactionStore.onOpen({ id: transactionId });
  };

  const onDeleteTransaction = () => {
    deleteTransactionStore.onOpen({ id: transactionId });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <MoreHorizontalIcon className="size-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={onEditTransaction}>
          Edit transaction
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
