'use client';

import * as React from 'react';

import { MenuIcon, XIcon } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { useGetSessionsQuery } from '@/hooks/queries/sessions';
import { cn } from '@/lib/utilities';

const menuItems = [
  { name: 'Features', href: '#features' },
  { name: 'Pricing', href: '#pricing' },
  { name: 'About', href: '#about' },
];

export function Header() {
  const [menuState, setMenuState] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);

  const sessionsQuery = useGetSessionsQuery();
  const { user } = sessionsQuery.data || {};

  const isPending = sessionsQuery.isPending;

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header>
      <nav
        data-state={menuState && 'active'}
        className="fixed z-20 w-full px-2"
      >
        <div
          className={cn(
            'mx-auto mt-2 max-w-7xl rounded-2xl border border-border/0 px-6 transition-all duration-300 lg:px-12',
            isScrolled &&
              'border border-border/100 bg-background/50 backdrop-blur-lg lg:max-w-4xl lg:px-5'
          )}
        >
          <div className="relative flex flex-wrap items-center justify-between gap-4 py-6 lg:gap-0 lg:py-4">
            <div className="flex w-full justify-between lg:w-auto">
              <Link
                href="/"
                aria-label="home"
                className="flex items-center space-x-2"
              >
                zoincas
              </Link>

              <Button
                size="icon"
                onClick={() => setMenuState(!menuState)}
                aria-label={menuState === true ? 'Close Menu' : 'Open Menu'}
                className="relative z-20 cursor-pointer lg:hidden"
              >
                <MenuIcon className="m-auto size-5 in-data-[state=active]:rotate-180 in-data-[state=active]:scale-0 in-data-[state=active]:opacity-0 duration-200" />
                <XIcon className="-rotate-180 absolute inset-0 m-auto size-5 in-data-[state=active]:rotate-0 in-data-[state=active]:scale-100 scale-0 in-data-[state=active]:opacity-100 opacity-0 duration-200" />
              </Button>
            </div>

            <div className="absolute inset-0 m-auto hidden size-fit lg:block">
              <ul className="flex gap-8 text-sm">
                {menuItems.map((item, index) => (
                  <li key={index}>
                    <Link
                      href={item.href}
                      className="block text-muted-foreground duration-150 hover:text-accent-foreground"
                    >
                      <span>{item.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div
              className={cn(
                'in-data-[state=active]:block hidden w-full flex-wrap items-center justify-end space-y-8 rounded-xl border bg-background p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:flex lg:in-data-[state=active]:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent',
                isScrolled && 'bg-transparent'
              )}
            >
              <div className="lg:hidden">
                <ul className="space-y-6 text-base">
                  {menuItems.map((item, index) => (
                    <li key={index}>
                      <Link
                        href={item.href}
                        className="block text-muted-foreground duration-150 hover:text-accent-foreground"
                      >
                        <span>{item.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex w-full flex-col space-y-3 lg:w-fit lg:flex-row lg:gap-3 lg:space-y-0">
                {/* biome-ignore lint/nursery/noNestedTernary: <explanation> */}
                {isPending ? null : user ? (
                  <Button size="sm" asChild>
                    <Link href="/dashboard">
                      <span>Dashboard</span>
                    </Link>
                  </Button>
                ) : (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      className={cn(isScrolled && 'lg:hidden')}
                      asChild
                    >
                      <Link href="/sign-in">
                        <span>Login</span>
                      </Link>
                    </Button>
                    <Button
                      size="sm"
                      className={cn(isScrolled && 'lg:hidden')}
                      asChild
                    >
                      <Link href="/sign-up">
                        <span>Sign Up</span>
                      </Link>
                    </Button>
                    <Button
                      size="sm"
                      className={cn('hidden', isScrolled && 'lg:inline-flex')}
                      asChild
                    >
                      <Link href="/sign-up">
                        <span>Start today</span>
                      </Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
