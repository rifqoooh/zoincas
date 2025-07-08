import { MoreHorizontalIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface CardActionsProps {
  id: string;
}

export function CardActions({ id }: CardActionsProps) {
  const isPending = false;

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="size-8 p-0" variant="ghost" disabled={isPending}>
            <MoreHorizontalIcon className="size-4" />
            <span className="sr-only">Open row action</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>Create new category</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>View transactions</DropdownMenuItem>
          <DropdownMenuItem>Edit plan title</DropdownMenuItem>
          <DropdownMenuItem>Delete plan</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
