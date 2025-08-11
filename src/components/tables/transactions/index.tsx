'use client';

import * as React from 'react';

import type { TransactionsDataType } from '@/validators/api/transactions/response';

import { DataTable } from '@/components/data-table/data-table';
import { DataTableSkeleton } from '@/components/data-table/data-table-skeleton';
import { DataTableToolbar } from '@/components/data-table/data-table-toolbar';
import { useListBalancesQuery } from '@/hooks/queries/balances';
import { useListBudgetPlansQuery } from '@/hooks/queries/budget-plans';
import { useListCategoriesQuery } from '@/hooks/queries/categories';
import { useListTransactionsQuery } from '@/hooks/queries/transactions';
import { useDataTable } from '@/hooks/use-data-table';
import { ActionsBar } from './actions-bar';
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

  const balancesQuery = useListBalancesQuery();
  const balances = balancesQuery.data || [];
  const balanceOptions = React.useMemo(
    () =>
      balances.map((balance) => ({
        label: balance.name,
        value: balance.id,
      })),
    [balances]
  );

  const categoriesQuery = useListCategoriesQuery();
  const categories = categoriesQuery.data || [];
  const categoryOptions = React.useMemo(
    () =>
      categories.map((category) => ({
        label: category.name,
        value: category.id,
      })),
    [categories]
  );

  const budgetQuery = useListBudgetPlansQuery();
  const budgetData = budgetQuery.data || [];
  const budgetOptions = React.useMemo(
    () =>
      budgetData.map((plan) => {
        const categories = plan.categories.map((category) => ({
          label: category.name,
          value: category.id,
        }));
        return {
          group: plan.title,
          options: categories,
        };
      }),
    [budgetData]
  );

  const columns = React.useMemo(
    () =>
      transactionsColumns({ balanceOptions, categoryOptions, budgetOptions }),
    [balanceOptions, categoryOptions, budgetOptions]
  );

  const { table } = useDataTable({
    data: transactions,
    columns,
    pageCount: pagination.pageCount,
    searchField: 'description',
    initialState: {
      columnVisibility: { category: false },
      sorting: [{ id: 'datetime', desc: true }],
      columnPinning: { right: ['actions'] },
    },
    getRowId: (originalRow: TransactionsDataType) => originalRow.id,
    clearOnDefault: true,
  });

  const isLoading = transactionsQuery.isLoading;

  return (
    <DataTable
      table={table}
      actionBar={<ActionsBar table={table} />}
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
      <DataTableToolbar
        table={table}
        showViewOptions={false}
        sortFilter={[
          'description',
          'balance',
          'category',
          'budget',
          'datetime',
        ]}
      />
    </DataTable>
  );
}
