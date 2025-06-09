import type { UsersDataType } from '@/validators/api/users/response';
import type { Column, ColumnDef } from '@tanstack/react-table';

import {
  BanIcon,
  CalendarIcon,
  CheckCircle2Icon,
  CircleDashedIcon,
  TextIcon,
  XCircleIcon,
} from 'lucide-react';

import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header';
import { Badge } from '@/components/ui/badge';
import { RowActions } from './row-actions';

export const userColumns = (): ColumnDef<UsersDataType>[] => {
  return [
    {
      id: 'email',
      accessorKey: 'email',
      header: ({ column }: { column: Column<UsersDataType, unknown> }) => (
        <DataTableColumnHeader column={column} title="User" className="pl-5" />
      ),
      cell: ({ row }) => {
        const { name, email } = row.original;

        return (
          <div className="flex w-60 flex-col gap-1 pl-5">
            <p className="font-medium">{name}</p>
            <p className="text-muted-foreground">{email}</p>
          </div>
        );
      },
      meta: {
        label: 'Email',
        placeholder: 'Search email...',
        variant: 'text',
        icon: TextIcon,
      },
      enableColumnFilter: true,
    },
    {
      id: 'emailVerified',
      accessorKey: 'emailVerified',
      header: ({ column }: { column: Column<UsersDataType, unknown> }) => (
        <DataTableColumnHeader column={column} title="Email Verified" />
      ),
      cell: ({ row }) => {
        const { emailVerified } = row.original;
        const Icon = emailVerified ? CheckCircle2Icon : XCircleIcon;

        return (
          <Badge variant="outline" className="capitalize">
            <Icon />
            {emailVerified ? 'Verified' : 'Not verified'}
          </Badge>
        );
      },
      meta: {
        label: 'Email Verified',
        variant: 'select',
        options: [
          {
            label: 'Verified',
            value: 'verified',
          },
          {
            label: 'Not verified',
            value: 'unverified',
          },
        ],
        icon: CircleDashedIcon,
      },
      enableColumnFilter: true,
    },
    {
      id: 'role',
      accessorKey: 'role',
      header: ({ column }: { column: Column<UsersDataType, unknown> }) => (
        <DataTableColumnHeader column={column} title="Role" />
      ),
      cell: ({ row }) => {
        const { role } = row.original;

        return (
          <Badge variant="outline" className="capitalize">
            {role}
          </Badge>
        );
      },
      meta: {
        label: 'Role',
        variant: 'select',
        options: [
          {
            label: 'Admin',
            value: 'admin',
          },
          {
            label: 'User',
            value: 'user',
          },
        ],
        icon: CircleDashedIcon,
      },
      enableColumnFilter: true,
    },
    {
      id: 'banned',
      accessorKey: 'banned',
      header: ({ column }: { column: Column<UsersDataType, unknown> }) => (
        <DataTableColumnHeader column={column} title="Banned" />
      ),
      cell: ({ row }) => {
        const { banned } = row.original;

        if (banned === null || banned === false) {
          return null;
        }

        return (
          <Badge
            variant="outline"
            className="border-rose-600 bg-rose-50 text-rose-600 dark:border-rose-400 dark:bg-rose-950 dark:text-rose-400"
          >
            <BanIcon />
            Banned
          </Badge>
        );
      },
      meta: {
        label: 'Banned',
        variant: 'select',
        options: [
          {
            label: 'Banned',
            value: 'banned',
          },
          {
            label: 'Active',
            value: 'active',
          },
        ],
        icon: CircleDashedIcon,
      },
      enableColumnFilter: true,
    },
    {
      id: 'createdAt',
      accessorKey: 'createdAt',
      header: ({ column }: { column: Column<UsersDataType, unknown> }) => (
        <DataTableColumnHeader column={column} title="Created at" />
      ),
      cell: ({ row }) => {
        const { createdAt } = row.original;

        return <div>{createdAt.toLocaleDateString()}</div>;
      },
      meta: {
        label: 'Created at',
        variant: 'dateRange',
        icon: CalendarIcon,
      },
      enableColumnFilter: true,
    },
    {
      id: 'actions',
      cell: ({ row }) => <RowActions row={row} />,
      size: 32,
    },
  ];
};
