import {
  BookOpenIcon,
  BotIcon,
  type LucideIcon,
  Settings2Icon,
  SquareTerminalIcon,
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
    url: '#',
    icon: SquareTerminalIcon,
  },
  {
    title: 'Balances',
    url: '#',
    icon: BotIcon,
  },
  {
    title: 'Categories',
    url: '#',
    icon: BookOpenIcon,
    items: [
      // {
      //   title: 'Salary',
      //   url: '#',
      // },
      // {
      //   title: 'Lunch or Dinner',
      //   url: '#',
      // },
      // {
      //   title: 'Food',
      //   url: '#',
      // },
      // {
      //   title: 'Service Fee',
      //   url: '#',
      // },
    ],
  },
  {
    title: 'Transactions',
    url: '/transactions',
    icon: Settings2Icon,
  },
  {
    title: 'Budget Plans',
    url: '#',
    icon: Settings2Icon,
  },
];
