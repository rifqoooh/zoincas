import { CreateNewUserModal } from "@/components/modal/create-user";
import { DeleteUserModal } from "@/components/modal/delete-user";

export function AdminProviders({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CreateNewUserModal />
      <DeleteUserModal />

      {children}
    </>
  );
}
