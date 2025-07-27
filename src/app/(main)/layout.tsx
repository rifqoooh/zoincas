import type * as React from 'react';

import { MainSidebar } from '@/components/sidebar/main';
import { Separator } from '@/components/ui/separator';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { protectedMiddleware } from '@/middleware/page/protected-middleware';
import { CommandMenu } from './_components/command-menu';
import { Greeting } from './_components/greeting';
import { MainProviders } from './_components/providers';

type MainLayoutProps = {
  readonly children: React.ReactNode;
};

export default async function MainLayout({ children }: MainLayoutProps) {
  await protectedMiddleware();

  return (
    <SidebarProvider>
      <MainSidebar />
      <SidebarInset>
        <MainProviders>
          <header className="flex h-16 shrink-0 items-center gap-2">
            <div className="flex w-full items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator
                orientation="vertical"
                className="mr-2 data-[orientation=vertical]:h-4"
              />
              <Greeting className="grow" />
              <CommandMenu />
            </div>
          </header>
          <div className="flex flex-1 flex-col p-4 pt-0">
            <main>{children}</main>
          </div>
        </MainProviders>
      </SidebarInset>
    </SidebarProvider>
  );
}
