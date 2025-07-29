import type { Metadata } from 'next';

import Link from 'next/link';

import { Ballpit } from '@/components/ballpit';
import { Button } from '@/components/ui/button';
import { Routes } from '@/lib/safe-routes';
import { createMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = createMetadata({
  title: '404 Not Found',
  description: 'The page you are looking for nowhere to be found.',
});

export default function NotFound() {
  return (
    <div className="relative h-svh">
      <div className="h-full bg-secondary p-2">
        <div className="relative flex h-full flex-col rounded-xl bg-background px-6 py-4">
          <div className="absolute inset-0 rounded-xl border">
            <Ballpit
              className="overflow-hidden rounded-xl"
              count={100}
              gravity={0.01}
              friction={0.9975}
              wallBounce={0.95}
              followCursor={false}
              colors={[0xebebeb, 0x000000, 0x5227ff]}
            />
          </div>

          <div className="relative flex h-full items-center justify-center">
            <div className="-translate-y-8 flex flex-col rounded-xl border bg-background/50 px-8 py-6 backdrop-blur-md sm:items-center">
              <h2 className="text-balance font-medium text-4xl uppercase sm:text-6xl md:text-7xl xl:text-8xl">
                404 Not Found
              </h2>
              <p className="mt-2 text-balance text-lg ">
                Sorry, the page you are looking for doesn't exist.
              </p>
              <Button
                size="lg"
                className="mt-4 border opacity-80 backdrop-blur-md"
                asChild
              >
                <Link href={Routes.dashboard()}>Back to home</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
