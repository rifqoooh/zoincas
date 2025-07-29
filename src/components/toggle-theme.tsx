'use client';

import * as React from 'react';

import { MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { useIsClient } from '@/hooks/use-is-client';
import { useMetaColor } from '@/hooks/use-meta-theme-color';

export function ToggleTheme() {
  const { setTheme, resolvedTheme } = useTheme();
  const { setMetaColor, metaColor } = useMetaColor();

  React.useEffect(() => {
    setMetaColor(metaColor);
  }, [metaColor, setMetaColor]);

  const toggleTheme = React.useCallback(() => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  }, [resolvedTheme, setTheme]);

  const isClient = useIsClient();
  if (!isClient) {
    return <Skeleton className="size-6" />;
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className="extend-touch-target size-auto rounded-none p-0 text-muted-foreground hover:bg-opacity-0 dark:hover:bg-opacity-0"
      onClick={toggleTheme}
      title="Toggle theme"
      suppressHydrationWarning
    >
      {resolvedTheme === 'dark' ? (
        <MoonIcon className="size-6 shrink-0 scale-100 transition-all" />
      ) : (
        <SunIcon className="size-6 shrink-0 scale-100 transition-all" />
      )}
    </Button>
  );
}
