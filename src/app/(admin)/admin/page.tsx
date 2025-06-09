import { Container } from '@/components/container';
import { UserNavigation } from '@/components/user-navigation';

export default function AdminPage() {
  return (
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
  );
}
