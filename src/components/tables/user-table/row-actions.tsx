import type { UsersDataType } from "@/validators/api/openapi/users/response";
import type { Row } from "@tanstack/react-table";

import { MoreHorizontalIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDeleteUserModal } from "@/hooks/store/delete-user";

interface RowActionsProps {
  row: Row<UsersDataType>;
}

export function RowActions({ row }: RowActionsProps) {
  const { id: userId, banned } = row.original;

  const deleteUserStore = useDeleteUserModal();

  const onDeleteUser = () => {
    deleteUserStore.onOpen({ id: userId });
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
        <DropdownMenuItem>Change Password</DropdownMenuItem>
        <DropdownMenuItem>Revoke all sessions</DropdownMenuItem>
        <DropdownMenuSeparator />
        {banned === null || banned === false ? (
          <DropdownMenuItem
            variant="destructive"
            className="dark:text-red-500 dark:focus:text-red-500"
          >
            Ban user
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem
            variant="destructive"
            className="dark:text-red-500 dark:focus:text-red-500"
          >
            Unban user
          </DropdownMenuItem>
        )}
        <DropdownMenuItem
          variant="destructive"
          className="dark:text-red-500 dark:focus:text-red-500"
          onClick={onDeleteUser}
        >
          Delete user
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
