'use client';

import * as React from 'react';

import { DataTableDateFilter } from '@/components/data-table/data-table-date-filter';
import { DataTableFacetedFilter } from '@/components/data-table/data-table-faceted-filter';
import { DataTableSliderFilter } from '@/components/data-table/data-table-slider-filter';
import { DataTableViewOptions } from '@/components/data-table/data-table-view-options';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { sortColumns } from '@/lib/data-table';
import { cn } from '@/lib/utilities';
import type { Column, Table } from '@tanstack/react-table';
import { X } from 'lucide-react';
import { DataTableGroupFacetedFilter } from './data-table-group-faceted-filter';

interface DataTableToolbarProps<TData> extends React.ComponentProps<'div'> {
  table: Table<TData>;
  sortFilter: string[];
  isLoading?: boolean;
  fallback?: React.ReactNode;
}

export function DataTableToolbar<TData>({
  table,
  sortFilter = [],
  isLoading,
  fallback,
  children,
  className,
  ...props
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  const columns = React.useMemo(() => {
    const filterColumns = table
      .getAllColumns()
      .filter((column) => column.getCanFilter());

    // return filterColumns as Column<TData, unknown>[];

    return sortColumns(filterColumns, sortFilter) as Column<TData, unknown>[];
  }, [table, sortFilter]);

  const onReset = React.useCallback(() => {
    table.resetColumnFilters();
  }, [table]);

  if (isLoading) {
    return fallback;
  }

  return (
    // biome-ignore lint/nursery/useAriaPropsSupportedByRole: <explanation>
    <div
      role="toolbar"
      aria-orientation="horizontal"
      className={cn(
        'flex w-full flex-wrap items-start justify-between gap-2 py-1',
        className
      )}
      {...props}
    >
      <div className="flex w-full flex-1 flex-row flex-wrap gap-2 sm:items-center">
        {columns.map((column) => (
          <DataTableToolbarFilter key={column.id} column={column} />
        ))}

        {isFiltered && (
          <Button
            aria-label="Reset filters"
            variant="outline"
            size="sm"
            className="border-dashed"
            onClick={onReset}
          >
            <X />
            Reset
          </Button>
        )}

        <div className="flex items-center gap-2 md:ml-auto">
          {children}
          <DataTableViewOptions table={table} />
        </div>
      </div>
    </div>
  );
}
interface DataTableToolbarFilterProps<TData> {
  column: Column<TData>;
}

function DataTableToolbarFilter<TData>({
  column,
}: DataTableToolbarFilterProps<TData>) {
  {
    const columnMeta = column.columnDef.meta;

    // biome-ignore lint/complexity/noExcessiveCognitiveComplexity: <explanation>
    const onFilterRender = React.useCallback(() => {
      if (!columnMeta?.variant) {
        return null;
      }

      switch (columnMeta.variant) {
        case 'text':
          return (
            <Input
              placeholder={columnMeta.placeholder ?? columnMeta.label}
              value={(column.getFilterValue() as string) ?? ''}
              onChange={(event) => column.setFilterValue(event.target.value)}
              className="h-8 w-full md:w-full lg:w-56"
            />
          );

        case 'number':
          return (
            <div className="relative">
              <Input
                type="number"
                inputMode="numeric"
                placeholder={columnMeta.placeholder ?? columnMeta.label}
                value={(column.getFilterValue() as string) ?? ''}
                onChange={(event) => column.setFilterValue(event.target.value)}
                className={cn('h-8 w-[120px]', columnMeta.unit && 'pr-8')}
              />
              {columnMeta.unit && (
                <span className="absolute top-0 right-0 bottom-0 flex items-center rounded-r-md bg-accent px-2 text-muted-foreground text-sm">
                  {columnMeta.unit}
                </span>
              )}
            </div>
          );

        case 'range':
          return (
            <DataTableSliderFilter
              column={column}
              title={columnMeta.label ?? column.id}
            />
          );

        case 'date':
        case 'dateRange':
          return (
            <DataTableDateFilter
              column={column}
              title={columnMeta.label ?? column.id}
              multiple={columnMeta.variant === 'dateRange'}
            />
          );

        case 'select':
        case 'multiSelect':
          return (
            <DataTableFacetedFilter
              column={column}
              title={columnMeta.label ?? column.id}
              options={columnMeta.options ?? []}
              multiple={columnMeta.variant === 'multiSelect'}
            />
          );

        case 'groupSelect':
        case 'groupMultiSelect':
          return (
            <DataTableGroupFacetedFilter
              column={column}
              title={columnMeta.label ?? column.id}
              groupOptions={columnMeta.groupOptions ?? []}
              multiple={columnMeta.variant === 'groupMultiSelect'}
            />
          );

        default:
          return null;
      }
    }, [column, columnMeta]);

    return onFilterRender();
  }
}
