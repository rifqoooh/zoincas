import { Check } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

export function Pricing() {
  return (
    <section id="pricing" className="relative py-16 md:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance font-bold text-3xl uppercase md:text-4xl lg:text-5xl">
            Unlock All Features — 100% Free
          </h2>
        </div>
        <div className="mt-8 md:mt-20">
          <div className="relative rounded-3xl border bg-card shadow-2xl shadow-zinc-950/5">
            <div className="grid items-center gap-12 divide-y p-12 md:grid-cols-2 md:divide-x md:divide-y-0">
              <div className="pb-12 text-center md:pr-12">
                <h3 className="mt-2 text-lg">
                  AI-powered tools to help you budget, track, and save —
                  effortlessly.
                </h3>
                <span className="my-8 inline-block font-bold text-6xl">
                  <span className="text-4xl">Rp</span>0
                </span>

                <div className="flex justify-center">
                  <Button size="lg" asChild>
                    <Link href="/dashboard">Start free right now</Link>
                  </Button>
                </div>
              </div>
              <div className="relative">
                <ul className="space-y-4">
                  {[
                    'Unlimited premium features',
                    'Smart insights updated weekly',
                    'Support the future of personal finance with AI',
                    'Full access to all tools and reports',
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <Check className="size-3" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-6 text-muted-foreground text-sm">
                  Start small or go big — your financial goals, your pace. AI
                  will guide you along the way.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
