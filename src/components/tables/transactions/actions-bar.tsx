import * as React from 'react';

import type { TransactionsDataType } from '@/validators/api/transactions/response';
import type { Table } from '@tanstack/react-table';

import { DownloadIcon, Layers2Icon, TrashIcon } from 'lucide-react';

import {
  DataTableActionBar,
  DataTableActionBarAction,
  DataTableActionBarSelection,
} from '@/components/data-table/data-table-action-bar';
import { Separator } from '@/components/ui/separator';
import { useAssignManyCategoryModal } from '@/hooks/store/assign-many-category';
import { useDeleteManyTransactionModal } from '@/hooks/store/delete-many-transaction';
import { exportTableToCSV } from '@/lib/export';

interface ActionsBarProps {
  table: Table<TransactionsDataType>;
}

export function ActionsBar({ table }: ActionsBarProps) {
  const assignManyCategoryStore = useAssignManyCategoryModal();
  const deleteManyStore = useDeleteManyTransactionModal();

  const [isPending, startTransition] = React.useTransition();

  const onExport = React.useCallback(() => {
    startTransition(() => {
      exportTableToCSV(table, {
        filename: 'transactions',
        excludeColumns: ['select', 'actions'],
        onlySelected: true,
      });
    });
  }, [table]);

  const rows = table.getFilteredSelectedRowModel().rows;

  const selectedIds = rows.map((row) => row.original.id);

  const onAssignManyCategory = () => {
    assignManyCategoryStore.onOpen({ ids: selectedIds });
  };

  const onDeleteMany = () => {
    deleteManyStore.onOpen({ ids: selectedIds });
  };

  return (
    <DataTableActionBar table={table} visible={rows.length > 0}>
      <DataTableActionBarSelection table={table} />
      <Separator
        orientation="vertical"
        className="hidden data-[orientation=vertical]:h-5 sm:block"
      />
      <div className="flex items-center gap-1.5">
        <DataTableActionBarAction
          size="icon"
          className="rounded-[0.3rem]"
          tooltip="Assign category to selected transaction(s)"
          isPending={isPending}
          onClick={onAssignManyCategory}
        >
          <Layers2Icon />
        </DataTableActionBarAction>
        <DataTableActionBarAction
          size="icon"
          className="rounded-[0.3rem]"
          tooltip="Delete selected transaction(s)"
          isPending={isPending}
          onClick={onDeleteMany}
        >
          <TrashIcon />
        </DataTableActionBarAction>
        <DataTableActionBarAction
          size="icon"
          className="rounded-[0.3rem]"
          tooltip="Export selected transaction(s)"
          isPending={isPending}
          onClick={onExport}
        >
          <DownloadIcon />
        </DataTableActionBarAction>
      </div>
    </DataTableActionBar>
  );
}
