import { CreateNewUserModal } from "@/components/modal/create-user";

export function AdminProviders({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CreateNewUserModal />

      {children}
    </>
  );
}
