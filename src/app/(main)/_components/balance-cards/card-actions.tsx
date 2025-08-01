import type { BalancesDataType } from '@/validators/api/balances/response';

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
import { useCreateEditBalanceModal } from '@/hooks/store/create-edit-balance';
import { useDeleteBalanceModal } from '@/hooks/store/delete-balance';
import { Routes } from '@/lib/safe-routes';

interface CardActionsProps {
  balance: BalancesDataType;
}

export function CardActions({ balance }: CardActionsProps) {
  const createEditBalanceStore = useCreateEditBalanceModal();
  const deleteBalanceStore = useDeleteBalanceModal();

  const href = Routes.transactions({}, { search: { balance: [balance.id] } });

  const onEditBalance = () => {
    createEditBalanceStore.onOpen({ id: balance.id });
  };

  const onDeleteBalance = () => {
    deleteBalanceStore.onOpen({ id: balance.id });
  };

  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreHorizontalIcon className="size-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem asChild>
            <Link href={href}>View transactions</Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={onEditBalance}>
            Edit balances
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            variant="destructive"
            className="dark:text-red-500 dark:focus:text-red-500"
            onClick={onDeleteBalance}
          >
            Delete balance
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
