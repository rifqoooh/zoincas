'use client';

import { ScanFileForm } from '@/components/forms/scan-file';

import { ResponsiveSheet } from '@/components/responsive-sheet';
import { useScanFileModal } from '@/hooks/store/scan-file';
import { useIsClient } from '@/hooks/use-is-client';

export function ScanFileModal() {
  const store = useScanFileModal();

  const isClient = useIsClient();
  if (!isClient) {
    return null;
  }

  const text = {
    title: 'Scan transactions file',
    description: 'Upload image or PDF file to import transactions',
  };

  return (
    <ResponsiveSheet {...text} isOpen={store.isOpen} onClose={store.onClose}>
      <ScanFileForm />
    </ResponsiveSheet>
  );
}
