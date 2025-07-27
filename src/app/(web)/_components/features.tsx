import type * as React from 'react';

import type { LucideIcon } from 'lucide-react';

import { Settings2Icon, SparklesIcon, ZapIcon } from 'lucide-react';

import { Card, CardContent, CardHeader } from '@/components/ui/card';

interface FeaturesType {
  title: string;
  description: string;
  icon: LucideIcon;
}

const features: FeaturesType[] = [
  {
    title: 'Fast and easy',
    description: 'Fast for manage your finances.',
    icon: ZapIcon,
  },
  {
    title: 'Full control',
    description: 'Full control over your finances.',
    icon: Settings2Icon,
  },
  {
    title: 'AI Functionalities',
    description: 'Powered by AI to make your life easier.',
    icon: SparklesIcon,
  },
];

export function Features() {
  return (
    <section id="features" className="py-16 md:py-32 dark:bg-transparent">
      <div className="@container mx-auto max-w-5xl px-6">
        <div className="text-center">
          <h2 className="text-balance font-semibold text-4xl uppercase lg:text-5xl">
            Built to cover your needs
          </h2>
          <p className="mt-4 text-lg">
            Crafted with love for easy to use for manage your finances.
          </p>
        </div>
        <Card className="mx-auto mt-8 grid @min-4xl:max-w-full max-w-sm @min-4xl:grid-cols-3 @min-4xl:divide-x divide-y @min-4xl:divide-y-0 overflow-hidden shadow-zinc-950/5 *:text-center md:mt-16">
          {features.map((feature) => (
            <div key={feature.title} className="group shadow-zinc-950/5">
              <CardHeader className="pb-3">
                <CardDecorator>
                  <feature.icon className="size-6" aria-hidden />
                </CardDecorator>

                <h3 className="mt-6 font-semibold tracking-wide">
                  {feature.title}
                </h3>
              </CardHeader>

              <CardContent className="pb-6">
                <p className="text-sm">{feature.description}</p>
              </CardContent>
            </div>
          ))}
        </Card>
      </div>
    </section>
  );
}

function CardDecorator({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mx-auto size-36 duration-200 [--color-border:color-mix(in_oklab,var(--color-zinc-950)10%,transparent)] dark:group-hover:bg-white/5 group-hover:[--color-border:color-mix(in_oklab,var(--color-zinc-950)20%,transparent)] dark:[--color-border:color-mix(in_oklab,var(--color-white)15%,transparent)] dark:group-hover:[--color-border:color-mix(in_oklab,var(--color-white)20%,transparent)]">
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:24px_24px]"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-radial from-transparent to-75% to-background"
      />
      <div className="absolute inset-0 m-auto flex size-12 items-center justify-center border-t border-l bg-background">
        {children}
      </div>
    </div>
  );
}
