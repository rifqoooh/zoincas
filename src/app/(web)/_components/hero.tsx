'use client';

import type { Variants } from 'motion/react';

import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { Container } from '@/components/container';
import { AnimatedGroup } from '@/components/motion-primitives/animated-group';
import { TextEffect } from '@/components/motion-primitives/text-effect';
import { Button } from '@/components/ui/button';
import { useGetSessionsQuery } from '@/hooks/queries/sessions';
import { Routes } from '@/lib/safe-routes';
import { Header } from './header';

const transitionVariants = {
  item: {
    hidden: {
      opacity: 0,
      filter: 'blur(12px)',
      y: 12,
    },
    visible: {
      opacity: 1,
      filter: 'blur(0px)',
      y: 0,
      transition: {
        type: 'spring',
        bounce: 0.3,
        duration: 1.5,
      },
    },
  },
} satisfies { item: Variants };

export function Hero() {
  const sessionsQuery = useGetSessionsQuery();
  const { user } = sessionsQuery.data || {};

  const isPending = sessionsQuery.isPending;

  return (
    <>
      <Header />
      <main className="overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 isolate hidden opacity-65 contain-layout contain-style lg:block"
        >
          <div className="-translate-y-87.5 -rotate-45 absolute top-0 left-0 h-320 w-140 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsla(0,0%,85%,.08)_0,hsla(0,0%,55%,.02)_50%,hsla(0,0%,45%,0)_80%)]" />
          <div className="-rotate-45 absolute top-0 left-0 h-320 w-60 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.06)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)] [translate:5%_-50%]" />
          <div className="-translate-y-87.5 -rotate-45 absolute top-0 left-0 h-320 w-60 bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.04)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)]" />
        </div>
        <section>
          <div className="relative pt-24 md:pt-36">
            <div className="-z-10 absolute inset-0 size-full [background:radial-gradient(125%_125%_at_50%_100%,transparent_0%,var(--color-background)_75%)]" />
            <Container>
              <div className="text-center sm:mx-auto lg:mt-0 lg:mr-auto">
                <AnimatedGroup variants={transitionVariants}>
                  <Link
                    href={Routes.transactions()}
                    className="group mx-auto flex w-fit items-center gap-4 rounded-full border bg-muted p-1 pl-4 shadow-md shadow-zinc-950/5 transition-colors duration-300 hover:bg-background dark:border-t-white/5 dark:shadow-zinc-950 dark:hover:border-t-border"
                  >
                    <span className="text-foreground text-sm">
                      Now powered with AI
                    </span>
                    <span className="block h-4 w-0.5 border-l bg-white dark:border-background dark:bg-zinc-700" />
                    <div className="size-6 overflow-hidden rounded-full bg-background duration-500 group-hover:bg-muted">
                      <div className="-translate-x-1/2 flex w-12 duration-500 ease-in-out group-hover:translate-x-0">
                        <span className="flex size-6">
                          <ArrowRight className="m-auto size-3" />
                        </span>
                        <span className="flex size-6">
                          <ArrowRight className="m-auto size-3" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </AnimatedGroup>

                <AnimatedGroup variants={transitionVariants}>
                  <h1 className="mt-8 text-balance text-5xl uppercase md:text-6xl xl:text-7xl">
                    AI
                    <Image
                      src="https://res.cloudinary.com/dq3ztcghr/image/upload/v1753508303/single-fake-gold-dollar-coin-crop_xuzcwx.webp"
                      alt="coin"
                      draggable={false}
                      className="mx-4 mb-4 inline-block h-12 w-12 md:h-16 md:w-16"
                      width="256"
                      height="256"
                    />
                    Solution for Personal Financial Management
                  </h1>
                </AnimatedGroup>

                <TextEffect
                  per="line"
                  preset="fade-in-blur"
                  speedSegment={0.3}
                  delay={0.5}
                  as="p"
                  className="mx-auto mt-8 max-w-2xl text-balance text-lg"
                >
                  Zoincas is a personal financial management app powered with AI
                </TextEffect>

                <AnimatedGroup
                  variants={{
                    container: {
                      visible: {
                        transition: {
                          staggerChildren: 0.05,
                          delayChildren: 0.75,
                        },
                      },
                    },
                    ...transitionVariants,
                  }}
                  className="mt-12 flex flex-col items-center justify-center gap-2 md:flex-row"
                >
                  {isPending ? (
                    <div className="invisible h-[2.9rem]" />
                    // biome-ignore lint/nursery/noNestedTernary: <explanation>
                  ) : user ? (
                    <div
                      key={1}
                      className="rounded-[calc(var(--radius-xl)+0.125rem)] border bg-foreground/10 p-0.5"
                    >
                      <Button
                        size="lg"
                        className="rounded-xl px-5 text-base"
                        asChild
                      >
                        <Link href={Routes.dashboard()}>
                          <span className="text-nowrap">
                            Continue Manage Your Finances
                          </span>
                        </Link>
                      </Button>
                    </div>
                  ) : (
                    <div
                      key={1}
                      className="rounded-[calc(var(--radius-xl)+0.125rem)] border bg-foreground/10 p-0.5"
                    >
                      <Button
                        size="lg"
                        className="rounded-xl px-5 text-base"
                        asChild
                      >
                        <Link href={Routes.signIn()}>
                          <span className="text-nowrap">
                            Simplify Your Finances Today
                          </span>
                        </Link>
                      </Button>
                    </div>
                  )}
                </AnimatedGroup>
              </div>
            </Container>

            <AnimatedGroup
              variants={{
                container: {
                  visible: {
                    transition: {
                      staggerChildren: 0.05,
                      delayChildren: 0.75,
                    },
                  },
                },
                ...transitionVariants,
              }}
            >
              <div className="-mr-56 relative mt-8 overflow-hidden px-2 sm:mt-12 sm:mr-0 md:mt-20">
                <div
                  aria-hidden
                  className="absolute inset-0 z-10 bg-linear-to-b from-35% from-transparent to-background"
                />
                <div className="relative inset-shadow-2xs mx-auto max-w-6xl overflow-hidden rounded-2xl border bg-background p-4 shadow-lg shadow-zinc-950/15 ring-1 ring-background dark:inset-shadow-white/20">
                  <Image
                    className="relative z-2 rounded-2xl border border-border/25 dark:hidden"
                    src="https://res.cloudinary.com/dq3ztcghr/image/upload/v1753601980/light-zoincas-transactions_ackkv2.png"
                    alt="app screen light theme"
                    width="1366"
                    height="679"
                  />
                  <Image
                    className="relative hidden rounded-2xl bg-background dark:block"
                    src="https://res.cloudinary.com/dq3ztcghr/image/upload/v1753601963/dark-zoincas-transactions_jtiuud.png"
                    alt="app screen dark theme"
                    width="1366"
                    height="679"
                  />
                </div>
              </div>
            </AnimatedGroup>
          </div>
        </section>
      </main>
    </>
  );
}
