"use client";

import { toast } from "sonner";

import { ConfirmationDialog } from "@/components/confirmation-dialog";
import { useDeleteUserMutation } from "@/hooks/queries/users";
import { useDeleteUserModal } from "@/hooks/store/delete-user";
import { useIsClient } from "@/hooks/use-is-client";

export function DeleteUserModal() {
  const store = useDeleteUserModal();
  const mutation = useDeleteUserMutation(store.id);

  const isClient = useIsClient();
  if (!isClient) {
    return null;
  }

  const text = {
    title: "Delete User",
    description: "Just checking - are you sure you want to delete this user?",
    action: "Delete",
  };

  const onConfirm = () => {
    toast.promise(
      mutation.mutateAsync(undefined, {
        onSuccess: () => {
          store.onClose();
        },
      }),
      {
        loading: "Deleting user...",
        success: "User deleted successfully",
        error: (error: unknown) => {
          if (error instanceof Error) {
            return error.message;
          }

          return "There is some internal error. Try again or contact support.";
        },
      },
    );
  };

  return (
    <ConfirmationDialog
      {...text}
      isOpen={store.isOpen}
      onClose={store.onClose}
      onConfirm={onConfirm}
    />
  );
}
