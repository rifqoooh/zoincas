'use client';

import * as React from 'react';

import type { FileUploadProps } from '@/components/file-upload';

import { usePapaParse } from 'react-papaparse';
import { toast } from 'sonner';

interface CSVRow {
  [key: string]: string | undefined;
}

interface CSVColumn {
  id: string;
  name: string;
  sample: string;
}

interface CSVResult {
  columns: CSVColumn[];
  preview: CSVRow[];
  data: CSVRow[];
}

export const useImportTransactionsCSV = () => {
  const [files, setFiles] = React.useState<File[]>([]);
  const [resultCSV, setResultCSV] = React.useState<CSVResult>({
    columns: [],
    preview: [],
    data: [],
  });

  const { readString } = usePapaParse();

  const onFileReject = React.useCallback((_file: File, message: string) => {
    toast.error(message);
  }, []);

  const onFileUpload: NonNullable<FileUploadProps['onUpload']> =
    React.useCallback(
      async (files, { onProgress, onSuccess, onError }) => {
        for (const file of files) {
          onProgress(file, 90);

          try {
            const fileText = await file.text();

            readString<CSVRow>(fileText, {
              header: true,
              skipEmptyLines: true,
              fastMode: true,

              complete: (results) => {
                if (results.data.length > 200) {
                  setTimeout(() => {
                    onError(
                      file,
                      new Error(
                        `Only accept up to 200 rows of transactions, but received ${results.data.length}`
                      )
                    );
                  }, 100);
                }

                const columns: CSVColumn[] =
                  results.meta.fields?.map((name) => ({
                    id: name,
                    name,
                    sample: results.data[0]?.[name] || '',
                  })) || [];

                const preview = results.data.slice(0, 20);

                setTimeout(() => {
                  onSuccess(file);
                  setResultCSV({ columns, preview, data: results.data });
                }, 500);
              },

              error: (error) => {
                toast.error('Failed to parse CSV');
                const err =
                  error instanceof Error
                    ? error
                    : new Error('Failed to parse CSV');
                onError(file, err);
              },
            });
          } catch (error) {
            toast.error('Upload failed, please try again');
            const err =
              error instanceof Error ? error : new Error('Upload failed');
            onError(file, err);
          }
        }
      },
      [readString]
    );

  return {
    files,
    setFiles,
    resultCSV,
    setResultCSV,
    onFileUpload,
    onFileReject,
  };
};
