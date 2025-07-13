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

interface CardActionsProps {
  balance: BalancesDataType;
}

export function CardActions({ balance }: CardActionsProps) {
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
            <Link href={`/transactions?balance=${balance.id}`}>
              View transactions
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => {}}>Edit balances</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            variant="destructive"
            className="dark:text-red-500 dark:focus:text-red-500"
          >
            Delete balance
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
