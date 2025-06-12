import { Container } from '@/components/container';
import { UsersTable } from '@/components/tables/user-table';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { UserNavigation } from '@/components/user-navigation';

export default function AdminPage() {
  return (
    <>
      <header className="sticky inset-0 z-10 border-b">
        <Container className="px-4 py-6">
          <div className="flex items-center gap-4">
            <p className="font-medium text-lg">Auth Admin</p>
            <div className="ml-auto">
              <UserNavigation />
            </div>
          </div>
        </Container>
      </header>

      <main>
        <Container>
          <div className="flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="font-semibold text-2xl">Users Management</h1>
              <p className=" text-muted-foreground sm:text-sm/6">
                Users monitoring for manage users
              </p>
            </div>

            <Button>Create new user</Button>
          </div>

          <Separator />

          <div className="py-6">
            <UsersTable />
          </div>
        </Container>
      </main>
    </>
  );
}
