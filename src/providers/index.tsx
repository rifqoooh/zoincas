import { Toaster } from '@/components/ui/sonner';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import type { ThemeProviderProps } from 'next-themes';
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { QueryProvider } from './query';
import { ThemeProvider } from './theme';

interface ProviderProps extends ThemeProviderProps {}

export function Provider({ children, ...props }: ProviderProps) {
  return (
    <ThemeProvider {...props}>
      <QueryProvider>
        <NuqsAdapter>
          {children}
          <Toaster />
        </NuqsAdapter>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryProvider>
    </ThemeProvider>
  );
}
