import type * as React from 'react';

import { DeleteUserModal } from '@/components/alert/delete-user';
import { RevokeSessionsModal } from '@/components/alert/revoke-sessions';
import { UnbanUserModal } from '@/components/alert/unban-user';
import { BanUserModal } from '@/components/modal/ban-user';
import { CreateUserModal } from '@/components/modal/create-user';
import { ResetPasswordModal } from '@/components/modal/reset-password';

export function AdminProviders({ children }: { children: React.ReactNode }) {
  return (
    <>
      <CreateUserModal />

      {/* Table row actions providers */}
      <DeleteUserModal />
      <ResetPasswordModal />
      <RevokeSessionsModal />
      <BanUserModal />
      <UnbanUserModal />

      {children}
    </>
  );
}
