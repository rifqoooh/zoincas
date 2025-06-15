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
import { useBanUserModal } from "@/hooks/store/ban-user";
import { useDeleteUserModal } from "@/hooks/store/delete-user";
import { useRevokeUserSessionsModal } from "@/hooks/store/revoke-user-sessions";
import { useUnbanUserModal } from "@/hooks/store/unban-user";

interface RowActionsProps {
  row: Row<UsersDataType>;
}

export function RowActions({ row }: RowActionsProps) {
  const { id: userId, banned } = row.original;

  const revokeSessionStore = useRevokeUserSessionsModal();
  const banUserStore = useBanUserModal();
  const unbanUserStore = useUnbanUserModal();
  const deleteUserStore = useDeleteUserModal();

  const onRevokeUserSessions = () => {
    revokeSessionStore.onOpen({ id: userId });
  };

  const onBanUser = () => {
    banUserStore.onOpen({ id: userId });
  };

  const onUnbanUser = () => {
    unbanUserStore.onOpen({ id: userId });
  };

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
        <DropdownMenuItem>Reset Password</DropdownMenuItem>
        <DropdownMenuItem onClick={onRevokeUserSessions}>
          Revoke all sessions
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {banned ? (
          <DropdownMenuItem
            variant="destructive"
            className="dark:text-red-500 dark:focus:text-red-500"
            onClick={onUnbanUser}
          >
            Unban user
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem
            variant="destructive"
            className="dark:text-red-500 dark:focus:text-red-500"
            onClick={onBanUser}
          >
            Ban user
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
