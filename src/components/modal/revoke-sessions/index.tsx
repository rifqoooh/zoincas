"use client";

import { toast } from "sonner";

import { ConfirmationDialog } from "@/components/confirmation-dialog";
import { useRevokeSessionsMutation } from "@/hooks/queries/users";
import { useRevokeSessionsModal } from "@/hooks/store/revoke-sessions";
import { useIsClient } from "@/hooks/use-is-client";

export function RevokeSessionsModal() {
  const store = useRevokeSessionsModal();
  const mutation = useRevokeSessionsMutation(store.id);

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
