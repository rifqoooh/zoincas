import type { TransactionsDataType } from '@/validators/api/transactions/response';
import type { Column, ColumnDef } from '@tanstack/react-table';

import { format } from 'date-fns';
import {
  CalendarIcon,
  CreditCardIcon,
  Layers2Icon,
  PiggyBankIcon,
  TextIcon,
} from 'lucide-react';

import { DataTableColumnHeader } from '@/components/data-table/data-table-column-header';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { useCreateEditTransactionModal } from '@/hooks/store/create-edit-transaction';
import { cn, formatCurrency } from '@/lib/utilities';
import { RowActions } from './row-actions';

interface Option {
  label: string;
  value: string;
}

interface TransactionsColumnsProps {
  balanceOptions: Option[];
  categoryOptions: Option[];
  budgetOptions: {
    group: string;
    options: Option[];
  }[];
}

export const transactionsColumns = ({
  balanceOptions,
  categoryOptions,
  budgetOptions,
}: TransactionsColumnsProps): ColumnDef<TransactionsDataType>[] => {
  return [
    {
      id: 'select',
      header: ({ table }) => (
        <div className="ps-4 pe-2">
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && 'indeterminate')
            }
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Select all"
            className="size-5 translate-y-0.5"
          />
        </div>
      ),
      cell: ({ row }) => (
        <div className="ps-4 pe-2">
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
            className="size-5 translate-y-0.5"
          />
        </div>
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
      meta: {
        label: 'Datetime',
        variant: 'dateRange',
        icon: CalendarIcon,
      },
      enableColumnFilter: true,
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

            <p className="flex items-center gap-1 truncate ps-1">
              {description}
            </p>
          </div>
        );
      },
      meta: {
        label: 'Description',
        placeholder: 'Search transaction...',
        variant: 'text',
        icon: TextIcon,
      },
      enableColumnFilter: true,
      enableSorting: false,
    },
    {
      id: 'budget',
      accessorFn: (row) => row.budget.plan.title,
      header: ({
        column,
      }: { column: Column<TransactionsDataType, unknown> }) => (
        <DataTableColumnHeader column={column} title="Budget" />
      ),
      cell: ({ row }) => {
        const { id: transactionId, budget } = row.original;

        const createEditTransactionStore = useCreateEditTransactionModal();

        const onClick = () => {
          createEditTransactionStore.onOpen({ id: transactionId });
        };

        if (!budget.plan.id) {
          return (
            <Button
              variant="outline"
              size="sm"
              className="text-muted-foreground"
              onClick={onClick}
            >
              Assign budget
            </Button>
          );
        }

        return (
          <div className="flex flex-col gap-0.5">
            <p>{budget.category.name}</p>
            <p className="text-muted-foreground text-xs">{budget.plan.title}</p>
          </div>
        );
      },
      meta: {
        label: 'Budget',
        variant: 'groupMultiSelect',
        groupOptions: budgetOptions,
        icon: PiggyBankIcon,
      },
      enableColumnFilter: true,
      enableSorting: false,
    },
    {
      id: 'balance',
      accessorFn: (row) => row.balance.name,
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
        options: balanceOptions,
        icon: CreditCardIcon,
      },
      enableColumnFilter: true,
      enableSorting: false,
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
      },
    },
    {
      id: 'actions',
      cell: ({ row }) => <RowActions row={row} />,
      size: 32,
    },
    {
      id: 'category',
      accessorFn: (row) => row.category.name,
      header: ({
        column,
      }: { column: Column<TransactionsDataType, unknown> }) => (
        <DataTableColumnHeader column={column} title="Category" />
      ),
      cell: ({ row }) => {
        const { category } = row.original;

        return <p>{category.name}</p>;
      },
      meta: {
        label: 'Category',
        variant: 'select',
        options: categoryOptions,
        icon: Layers2Icon,
      },
      enableColumnFilter: true,
      enableSorting: false,
      enableHiding: false,
    },
  ];
};
