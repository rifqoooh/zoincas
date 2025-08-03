'use client';

import { ImportTransactionsCSVForm } from '@/components/forms/import-transactions-csv';

import { ResponsiveSheet } from '@/components/responsive-sheet';
import { useImportTransactionsCSVModal } from '@/hooks/store/import-transactions-csv';
import { useIsClient } from '@/hooks/use-is-client';

export function ImportTransactionsCSVModal() {
  const store = useImportTransactionsCSVModal();

  const isClient = useIsClient();
  if (!isClient) {
    return null;
  }

  const text = {
    title: 'Import transactions from CSV',
    description: 'Upload a CSV file to import transactions',
  };

  return (
    <ResponsiveSheet {...text} isOpen={store.isOpen} onClose={store.onClose}>
      <ImportTransactionsCSVForm />
    </ResponsiveSheet>
  );
}
