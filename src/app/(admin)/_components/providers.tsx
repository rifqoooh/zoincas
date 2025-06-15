import { BanUserModal } from "@/components/modal/ban-user";
import { CreateNewUserModal } from "@/components/modal/create-user";
import { DeleteUserModal } from "@/components/modal/delete-user";
import { ResetPasswordModal } from "@/components/modal/reset-password";
import { RevokeSessionsModal } from "@/components/modal/revoke-sessions";
import { UnbanUserModal } from "@/components/modal/unban-user";

export function AdminProviders({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CreateNewUserModal />

      {/* Table row actions providers */}
      <ResetPasswordModal />
      <RevokeSessionsModal />
      <BanUserModal />
      <UnbanUserModal />
      <DeleteUserModal />

      {children}
    </>
  );
}
