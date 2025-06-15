"use client";

import { ResetPasswordForm } from "@/components/forms/reset-password";
import { ResponsiveModal } from "@/components/responsive-modal";
import { useResetPasswordModal } from "@/hooks/store/reset-password";
import { useIsClient } from "@/hooks/use-is-client";

export function ResetPasswordModal() {
  const store = useResetPasswordModal();

  const isClient = useIsClient();
  if (!isClient) {
    return null;
  }

  const text = {
    title: "Reset password",
    description: "Fill the form to reset a user password",
  };

  const onClose = () => {
    store.onClose({ reset: true });
  };

  return (
    <ResponsiveModal {...text} isOpen={store.isOpen} onClose={onClose}>
      <ResetPasswordForm />
    </ResponsiveModal>
  );
}
