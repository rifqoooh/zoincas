"use client";

import { ConfirmationDialog } from "@/components/confirmation-dialog";
import { useDeleteUserModal } from "@/hooks/store/delete-user";
import { useIsClient } from "@/hooks/use-is-client";

export function DeleteUserModal() {
  const store = useDeleteUserModal();

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
    // TODO: delete user logic
    store.onClose();
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
