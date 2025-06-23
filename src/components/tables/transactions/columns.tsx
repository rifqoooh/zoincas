import type { TransactionsDataType } from '@/validators/api/transactions/response';
import type { Column, ColumnDef } from '@tanstack/react-table';

import { format } from 'date-fns';
import { CalendarIcon, CircleDashedIcon, TextIcon } from 'lucide-react';

import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { cn, formatCurrency } from '@/lib/utilities';

export const transactionsColumns = (): ColumnDef<TransactionsDataType>[] => {
  return [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="translate-y-0.5"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="translate-y-0.5"
        />
      ),
      enableSorting: false,
      enableHiding: false,
      size: 40,
    },
    {
      id: 'datetime',
      accessorKey: 'datetime',
      header: ({
        column,
      }: { column: Column<TransactionsDataType, unknown> }) => (
        <DataTableColumnHeader column={column} title="Datetime" />
      ),
      cell: ({ row }) => {
        const { datetime } = row.original;

        const formattedDate = format(datetime, 'dd MMM yyyy');
        const formattedTime = format(datetime, 'hh:mm a');

        return (
          <div className="flex flex-col gap-0.5">
            <p>{formattedDate}</p>
            <p className="text-muted-foreground text-xs">{formattedTime}</p>
          </div>
        );
      },
    },
    {
      id: 'description',
      accessorKey: 'description',
      header: ({
        column,
      }: { column: Column<TransactionsDataType, unknown> }) => (
        <DataTableColumnHeader column={column} title="Description" />
      ),
      cell: ({ row }) => {
        const { description, category } = row.original;

        return (
          <div className="flex flex-col gap-2">
            <Badge
              variant="outline"
              className={cn(
                'w-min text-nowrap',
                category.name === null && 'text-rose-600'
              )}
            >
              {category.name ?? 'Uncategorized'}
            </Badge>

            <p className="flex w-[300px] items-center gap-1 truncate pl-2">
              {description}
            </p>
          </div>
        );
      },
      meta: {
        label: 'Transaction',
        placeholder: 'Search transaction...',
        variant: 'text',
        icon: TextIcon,
      },
      enableColumnFilter: true,
    },
    {
      id: 'balance',
      accessorKey: 'balance',
      header: ({
        column,
      }: { column: Column<TransactionsDataType, unknown> }) => (
        <DataTableColumnHeader column={column} title="Balance" />
      ),
      cell: ({ row }) => {
        const { balance } = row.original;

        return <p>{balance.name}</p>;
      },
      meta: {
        label: 'Balance',
        variant: 'select',
        options: [
          {
            label: 'Balance name',
            value: 'balance id',
          },
        ],
        icon: CircleDashedIcon,
      },
      enableColumnFilter: true,
    },
    {
      id: 'amount',
      accessorKey: 'amount',
      header: ({
        column,
      }: { column: Column<TransactionsDataType, unknown> }) => (
        <DataTableColumnHeader
          column={column}
          title="Amount"
          className="ml-auto"
        />
      ),
      cell: ({ row }) => {
        const { amount } = row.original;

        const isPositiveNum = amount >= 0;

        return (
          <div
            className={cn(
              'whitespace-nowrap text-nowrap text-right font-medium tabular-nums',
              isPositiveNum ? 'text-green-500' : 'text-red-500'
            )}
          >
            {formatCurrency(amount)}
          </div>
        );
      },
      meta: {
        label: 'Amount',
        variant: 'select',
        options: [
          {
            label: 'Amount name',
            value: 'amount id',
          },
        ],
        icon: CircleDashedIcon,
      },
      enableColumnFilter: true,
    },
    {
      id: 'createdAt',
      accessorKey: 'createdAt',
      header: ({
        column,
      }: { column: Column<TransactionsDataType, unknown> }) => (
        <DataTableColumnHeader
          column={column}
          title="Created at"
          className="mx-auto"
        />
      ),
      cell: ({ row }) => {
        const { createdAt } = row.original;

        return (
          <div className="text-center">{createdAt.toLocaleDateString()}</div>
        );
      },
      meta: {
        label: 'Created at',
        variant: 'dateRange',
        icon: CalendarIcon,
      },
      enableColumnFilter: true,
    },
    // {
    //   id: 'actions',
    //   cell: ({ row }) => <RowActions row={row} />,
    //   size: 32,
    // },
  ];
};
