"use client";

import { BanUserForm } from "@/components/forms/ban-user";
import { ResponsiveModal } from "@/components/responsive-modal";
import { useBanUserModal } from "@/hooks/store/ban-user";
import { useIsClient } from "@/hooks/use-is-client";

export function BanUserModal() {
  const store = useBanUserModal();

  const isClient = useIsClient();
  if (!isClient) {
    return null;
  }

  const options = {
    title: "Ban user",
    description: "Fill the form to ban a user",
  };

  const onClose = () => {
    store.onClose({ reset: true });
  };

  return (
    <ResponsiveModal
      title={options.title}
      description={options.description}
      isOpen={store.isOpen}
      onClose={onClose}
    >
      <BanUserForm />
    </ResponsiveModal>
  );
}
