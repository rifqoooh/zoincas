'use client';

import * as React from 'react';

import type { FileUploadProps } from '@/components/file-upload';
import type { InsertTransactionsType } from '@/validators/db/transactions';
import type { SubmitHandler } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { usePapaParse } from 'react-papaparse';
import { toast } from 'sonner';
import { z } from 'zod';

import { useListBalancesQuery } from '@/hooks/queries/balances';
import { useCreateManyTransactionMutation } from '@/hooks/queries/transactions';
import { useImportTransactionsCSVModal } from '@/hooks/store/import-transactions-csv';
import { insertTransactionsSchema } from '@/validators/db/transactions';
import { csvSchema } from '@/validators/utilities';

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

type Transaction = Omit<InsertTransactionsType, 'datetime' | 'amount'> & {
  datetime?: Date | undefined;
  amount?: number | undefined;
};

export type Field = keyof Transaction | 'skip';

const importTransactionsSchema = z
  .object({
    files: csvSchema
      .array()
      .min(1, 'CSV file is required')
      .max(1, 'Only one file is allowed'),
  })
  .merge(insertTransactionsSchema.pick({ balanceId: true }));

type ImportTransactionsType = z.infer<typeof importTransactionsSchema>;

export const useImportTransactionsCSV = () => {
  const [isFilesError, setIsFilesError] = React.useState(false);
  const [mapping, setMapping] = React.useState<Record<string, Field>>({});
  const [resultCSV, setResultCSV] = React.useState<CSVResult>({
    columns: [],
    preview: [],
    data: [],
  });

  const store = useImportTransactionsCSVModal();
  const mutation = useCreateManyTransactionMutation();

  const balancesQuery = useListBalancesQuery();

  const { readString } = usePapaParse();

  const onFileReject = React.useCallback((_file: File, message: string) => {
    toast.error(message);
    setIsFilesError(true);
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

              complete: (results) => {
                if (results.data.length > 200) {
                  return setTimeout(() => {
                    setIsFilesError(true);
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
                  setIsFilesError(false);
                  setResultCSV({ columns, preview, data: results.data });
                  setMapping({});
                }, 500);
              },

              error: (error) => {
                toast.error('Failed to parse CSV');
                const err =
                  error instanceof Error
                    ? error
                    : new Error('Failed to parse CSV');

                setTimeout(() => {
                  setIsFilesError(true);
                  onError(file, err);
                }, 100);
              },
            });
          } catch (error) {
            toast.error('Upload failed, please try again');
            const err =
              error instanceof Error ? error : new Error('Upload failed');

            setTimeout(() => {
              setIsFilesError(true);
              onError(file, err);
            }, 100);
          }
        }
      },
      [readString]
    );

  const getFinalMapping = () => {
    const mappingErrors: Record<string, string> = {};
    const usedFields = new Set<string>();

    // Check for duplicate fields
    for (const [column, field] of Object.entries(mapping)) {
      if (field !== 'skip' && usedFields.has(field)) {
        mappingErrors[column] = 'Field already mapped';
      }

      if (field !== 'skip') {
        usedFields.add(field);
      }
    }

    if (Object.keys(mappingErrors).length > 0) {
      return { finalMapping: {}, errors: mappingErrors };
    }

    // Map column to selected field
    const finalMapping: Record<string, Field> = Object.fromEntries(
      Object.entries(mapping).filter(([_, field]) => field !== 'skip')
    );

    return { finalMapping, errors: mappingErrors };
  };

  const getFinalInput = (
    finalMapping: Record<string, Field>,
    balanceId: string
    // biome-ignore lint/complexity/noExcessiveCognitiveComplexity: <explanation>
  ) => {
    const input: Transaction[] = [];
    const inputErrors: { message?: string; data?: Transaction } = {};

    for (const [index, row] of resultCSV.data.entries()) {
      const transaction: Transaction = { balanceId };

      // Apply map
      for (const [column, field] of Object.entries(finalMapping)) {
        if (field === 'skip' || row[column] === undefined) {
          continue;
        }

        // Convert row data to expected type
        if (field === 'datetime') {
          transaction[field] = new Date(row[column].trim());
        } else if (field === 'amount') {
          transaction[field] = Number(row[column].trim());
        } else {
          transaction[field] = row[column].trim();
        }
      }

      const parsedData = insertTransactionsSchema.safeParse(transaction);
      if (!parsedData.success) {
        const issues = parsedData.error.issues.map((issue) => issue.path[0]);

        const fieldErrors = issues.join(', ');

        inputErrors.message = `Invalid ${fieldErrors} at row ${index + 1}. Please check your CSV file.`;
        inputErrors.data = transaction;

        return { input, errors: inputErrors };
      }

      if (parsedData.data) {
        input.push(parsedData.data);
      }
    }

    return { input, errors: inputErrors };
  };

  const form = useForm<ImportTransactionsType>({
    resolver: zodResolver(importTransactionsSchema),
    defaultValues: {
      files: [],
      balanceId: '',
    },
  });

  const onSubmit: SubmitHandler<ImportTransactionsType> = (values) => {
    const { finalMapping } = getFinalMapping();

    const { input, errors } = getFinalInput(finalMapping, values.balanceId);

    if (errors.message) {
      toast.error(errors.message);
      return;
    }

    const parsedData = insertTransactionsSchema.array().parse(input);

    toast.promise(
      mutation.mutateAsync(parsedData, {
        onSuccess: () => {
          store.onClose();
        },
      }),
      {
        loading: 'Creating transactions...',
        success: 'Transactions created successfully',
        error: (error: unknown) => {
          if (error instanceof Error) {
            return error.message;
          }

          return 'There is an error in the internal server.';
        },
      }
    );
  };

  return {
    isFilesError,
    setIsFilesError,
    mapping,
    setMapping,
    resultCSV,
    setResultCSV,
    onFileUpload,
    onFileReject,
    form,
    onSubmit,
    balancesQuery,
  };
};
