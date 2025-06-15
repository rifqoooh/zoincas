"use client";

import { toast } from "sonner";

import { ConfirmationDialog } from "@/components/confirmation-dialog";
import { useRevokeUserSessionsMutation } from "@/hooks/queries/users";
import { useRevokeUserSessionsModal } from "@/hooks/store/revoke-user-sessions";
import { useIsClient } from "@/hooks/use-is-client";

export function RevokeUserSessionsModal() {
  const store = useRevokeUserSessionsModal();
  const mutation = useRevokeUserSessionsMutation(store.id);

  const isClient = useIsClient();
  if (!isClient) {
    return null;
  }

  const text = {
    title: "Revoke User Sessions",
    description:
      "Just checking - are you sure you want to revoke this user's sessions?",
    action: "Revoke",
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
        loading: "Revoking user sessions...",
        success: "User sessions revoked successfully",
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
