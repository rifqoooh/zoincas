'use client';

import * as React from 'react';

import type { TransactionsDataType } from '@/validators/api/transactions/response';

import { DataTable } from '@/components/data-table/data-table';
import { DataTableSkeleton } from '@/components/data-table/data-table-skeleton';
import { DataTableToolbar } from '@/components/data-table/data-table-toolbar';
import { useListTransactionsQuery } from '@/hooks/queries/transactions';
import { useDataTable } from '@/hooks/use-data-table';
import { transactionsColumns } from './columns';

const paginationDefault = {
  size: 0,
  count: 0,
  page: 1,
  pageCount: 1,
};

export function TransactionsTable() {
  const transactionsQuery = useListTransactionsQuery();
  const { data: transactions, pagination } = transactionsQuery.data || {
    data: [],
    pagination: paginationDefault,
  };

  const columns = React.useMemo(() => transactionsColumns(), []);

  const { table } = useDataTable({
    data: transactions,
    columns,
    pageCount: pagination.pageCount,
    initialState: {
      sorting: [{ id: 'createdAt', desc: true }],
      columnPinning: { right: ['actions'] },
    },
    getRowId: (originalRow: TransactionsDataType) => originalRow.id,
    clearOnDefault: true,
  });

  const isLoading = transactionsQuery.isLoading;

  return (
    <DataTable
      table={table}
      isLoading={isLoading}
      fallback={
        <DataTableSkeleton
          columnCount={4}
          rowCount={2}
          withViewOptions={false}
          withPagination={true}
          shrinkZero
        />
      }
    >
      <DataTableToolbar table={table} />
    </DataTable>
  );
}
