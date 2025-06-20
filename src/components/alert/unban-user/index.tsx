"use client";

import { toast } from "sonner";

import { ConfirmationDialog } from "@/components/confirmation-dialog";
import { useUnbanUserMutation } from "@/hooks/queries/users";
import { useUnbanUserModal } from "@/hooks/store/unban-user";
import { useIsClient } from "@/hooks/use-is-client";

export function UnbanUserModal() {
  const store = useUnbanUserModal();
  const mutation = useUnbanUserMutation(store.id);

  const isClient = useIsClient();
  if (!isClient) {
    return null;
  }

  const text = {
    title: "Unban User",
    description: "Just checking - are you sure you want to unban this user?",
    action: "Unban",
  };

  const onChange = () => {
    store.onClose();
  };

  const onCancel = () => {
    store.onClose({ reset: true });
  };

  const onConfirm = () => {
    toast.promise(
      mutation.mutateAsync(undefined, {
        onSuccess: () => {
          store.onClose({ reset: true });
        },
      }),
      {
        loading: "Unbanning user...",
        success: "User unbanned successfully",
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
      onChange={onChange}
      onCancel={onCancel}
      onConfirm={onConfirm}
    />
  );
}
