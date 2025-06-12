'use client';

import * as React from 'react';

import { DataTable } from '@/components/data-table/data-table';
import { DataTableSkeleton } from '@/components/data-table/data-table-skeleton';
import { DataTableSortList } from '@/components/data-table/data-table-sort-list';
import { DataTableToolbar } from '@/components/data-table/data-table-toolbar';
import { useGetUsersQuery } from '@/hooks/queries/users';
import { useDataTable } from '@/hooks/use-data-table';
import type { UsersDataType } from '@/validators/api/openapi/users/response';
import { userColumns } from './columns';

const paginationDefault = {
  size: 0,
  count: 0,
  page: 1,
  pageCount: 1,
};

export function UsersTable() {
  const usersQuery = useGetUsersQuery();
  const { data: users, pagination } = usersQuery.data || {
    data: [],
    pagination: paginationDefault,
  };

  const columns = React.useMemo(() => userColumns(), []);

  const { table } = useDataTable({
    data: users,
    columns,
    pageCount: pagination.pageCount,
    initialState: {
      sorting: [{ id: 'createdAt', desc: true }],
      columnPinning: { right: ['actions'] },
    },
    getRowId: (originalRow: UsersDataType) => originalRow.id,
    clearOnDefault: true,
  });

  const isLoading = usersQuery.isLoading;

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
      <DataTableToolbar table={table}>
        <DataTableSortList table={table} />
      </DataTableToolbar>
    </DataTable>
  );
}
