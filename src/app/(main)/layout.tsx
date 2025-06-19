import type * as React from 'react';

import { MainSidebar } from '@/components/sidebar/main';
import { Separator } from '@/components/ui/separator';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';

type MainLayoutProps = {
  readonly children: React.ReactNode;
};

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <SidebarProvider>
      <MainSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <div>Dashboard</div>
          </div>
        </header>
        <div className="flex flex-1 flex-col p-4 pt-0">
          <main>{children}</main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
