import {
  BookOpenIcon,
  BotIcon,
  FrameIcon,
  MapIcon,
  PieChartIcon,
  Settings2Icon,
  SquareTerminalIcon,
} from 'lucide-react';

export const menus = [
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
      {
        title: 'Salary',
        url: '#',
      },
      {
        title: 'Lunch or Dinner',
        url: '#',
      },
      {
        title: 'Food',
        url: '#',
      },
      {
        title: 'Service Fee',
        url: '#',
      },
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

export const balances = [
  {
    name: 'Design Engineering',
    url: '#',
    icon: FrameIcon,
  },
  {
    name: 'Sales & Marketing',
    url: '#',
    icon: PieChartIcon,
  },
  {
    name: 'Travel',
    url: '#',
    icon: MapIcon,
  },
];
