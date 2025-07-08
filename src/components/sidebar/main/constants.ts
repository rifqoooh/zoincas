import type { LucideIcon } from 'lucide-react';

import {
  ArrowLeftRightIcon,
  CreditCardIcon,
  Layers2Icon,
  LayoutDashboardIcon,
  PiggyBankIcon,
} from 'lucide-react';

export interface Menu {
  title: string;
  url: string;
  icon: LucideIcon;
  items?: { title: string; url: string }[];
}

export const menus: Menu[] = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: LayoutDashboardIcon,
  },
  {
    title: 'Balances',
    url: '/balances',
    icon: CreditCardIcon,
  },
  {
    title: 'Categories',
    url: '/categories',
    icon: Layers2Icon,
    items: [],
  },
  {
    title: 'Transactions',
    url: '/transactions',
    icon: ArrowLeftRightIcon,
  },
  {
    title: 'Budget Plans',
    url: '/budgets',
    icon: PiggyBankIcon,
  },
];
