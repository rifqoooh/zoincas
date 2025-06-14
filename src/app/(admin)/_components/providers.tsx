import { BanUserModal } from "@/components/modal/ban-user";
import { CreateNewUserModal } from "@/components/modal/create-user";
import { DeleteUserModal } from "@/components/modal/delete-user";

export function AdminProviders({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CreateNewUserModal />

      {/* Table row actions providers */}
      <BanUserModal />
      <DeleteUserModal />

      {children}
    </>
  );
}
