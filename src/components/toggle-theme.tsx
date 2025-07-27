'use client';

import { MoonIcon, SunIcon } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Toggle } from '@/components/ui/toggle';

export function ToggleTheme() {
  const { theme, setTheme } = useTheme();

  return (
    <Toggle
      className="group h-full min-w-0 rounded-none p-0 text-muted-foreground duration-150 hover:bg-transparent hover:text-primary data-[state=on]:bg-transparent data-[state=on]:hover:bg-muted dark:text-muted-foreground dark:hover:bg-transparent dark:hover:text-primary"
      pressed={theme !== 'dark'}
      onPressedChange={() =>
        setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
      }
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      suppressHydrationWarning
    >
      {/* Note: After dark mode implementation, rely on dark: prefix rather than group-data-[state=on]: */}
      <MoonIcon
        className="size-6 shrink-0 scale-0 opacity-0 transition-all group-data-[state=on]:scale-100 group-data-[state=on]:opacity-100"
        aria-hidden="true"
      />
      <SunIcon
        className="absolute size-6 shrink-0 scale-100 opacity-100 transition-all group-data-[state=on]:scale-0 group-data-[state=on]:opacity-0"
        aria-hidden="true"
      />
    </Toggle>
  );
}
