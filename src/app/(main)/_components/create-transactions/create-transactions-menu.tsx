'use client';

import { MoreHorizontalIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useImportTransactionsCSVModal } from '@/hooks/store/import-transactions-csv';
import { useScanFileModal } from '@/hooks/store/scan-file';

export function CreateTransactionsMenu() {
  const importTransactionsCSVStore = useImportTransactionsCSVModal();
  const _scanFileStore = useScanFileModal();

  const onImportFromCSV = () => {
    importTransactionsCSVStore.onOpen();
  };

  const onScanFile = () => {
    return;
    // scanFileStore.onOpen();
  };

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="size-8">
          <MoreHorizontalIcon className="size-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={onImportFromCSV}>
          Import from CSV
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onScanFile}>Scan file</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
