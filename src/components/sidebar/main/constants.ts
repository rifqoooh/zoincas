import type { LucideIcon } from 'lucide-react';

import {
  ArrowLeftRightIcon,
  CreditCardIcon,
  Layers2Icon,
  LayoutDashboardIcon,
  PiggyBankIcon,
} from 'lucide-react';

import { Routes } from '@/lib/safe-routes';

export interface Menu {
  title: string;
  url: string;
  icon: LucideIcon;
  items?: { title: string; url: string }[];
}

export const menus: Menu[] = [
  {
    title: 'Dashboard',
    url: Routes.dashboard(),
    icon: LayoutDashboardIcon,
  },
  {
    title: 'Balances',
    url: Routes.balances(),
    icon: CreditCardIcon,
  },
  {
    title: 'Categories',
    url: Routes.categories(),
    icon: Layers2Icon,
    items: [],
  },
  {
    title: 'Transactions',
    url: Routes.transactions(),
    icon: ArrowLeftRightIcon,
  },
  {
    title: 'Budget Plans',
    url: Routes.budgets(),
    icon: PiggyBankIcon,
  },
];
