import * as React from 'react';

import type { TransactionsDataType } from '@/validators/api/transactions/response';
import type { Table } from '@tanstack/react-table';

import {
  DataTableActionBar,
  DataTableActionBarAction,
  DataTableActionBarSelection,
} from '@/components/data-table/data-table-action-bar';
import { Separator } from '@/components/ui/separator';
import { exportTableToCSV } from '@/lib/export';
import { DownloadIcon } from 'lucide-react';

interface ActionsBarProps {
  table: Table<TransactionsDataType>;
}

export function ActionsBar({ table }: ActionsBarProps) {
  const rows = table.getFilteredSelectedRowModel().rows;

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
