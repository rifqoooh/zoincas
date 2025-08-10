import * as React from 'react';

import type { Field } from '@/hooks/actions/use-import-transactions-csv';

import { ACCEPTED_CSV_MIME_TYPES } from '@/validators/utilities';

import { CloudUploadIcon, XIcon } from 'lucide-react';

import { AutoComplete } from '@/components/auto-complete';
import {
  FileUpload,
  FileUploadDropzone,
  FileUploadItem,
  FileUploadItemDelete,
  FileUploadItemMetadata,
  FileUploadItemPreview,
  FileUploadItemProgress,
  FileUploadList,
} from '@/components/file-upload';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useImportTransactionsCSV } from '@/hooks/actions/use-import-transactions-csv';
import { robotoMono } from '@/lib/fonts';
import { cn } from '@/lib/utilities';

export const ImportTransactionsCSVForm = () => {
  const {
    isFilesError,
    mapping,
    setMapping,
    resultCSV,
    onFileUpload,
    onFileReject,
    form,
    onSubmit,
    balancesQuery,
  } = useImportTransactionsCSV();

  const balancesData = balancesQuery.data || [];
  const balancesOptions = balancesData.map((balance) => ({
    label: balance.name,
    value: balance.id,
  }));

  const fieldOptions: FieldOption[] = React.useMemo(
    () => [
      { label: 'Datetime', value: 'datetime', required: true },
      { label: 'Description', value: 'description', required: true },
      { label: 'Amount', value: 'amount', required: true },
      { label: 'Category', value: 'categoryId', required: false },
      { label: 'Skip', value: 'skip' },
    ],
    []
  );

  const hasRequiredMapping = fieldOptions.every(
    (field) => !field.required || Object.values(mapping).includes(field.value)
  );

  const isPending = false;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-8">
          <div className="grid gap-3">
            <FormField
              name="files"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Upload CSV file</FormLabel>
                  <FormDescription>
                    The first row should be the headers of the table, and your
                    headers should not include any special characters other than
                    hyphens <kbd className="text-code">-</kbd> or underscores{' '}
                    <kbd className="text-code">_</kbd>
                  </FormDescription>
                  <FormDescription>
                    Uploaded CSV file is only up to 5MB and max 200 rows
                  </FormDescription>
                  <FormControl>
                    <FileUpload
                      value={field.value}
                      onValueChange={field.onChange}
                      accept={ACCEPTED_CSV_MIME_TYPES.join(',')}
                      maxFiles={1}
                      maxSize={5 * 1024 * 1024}
                      onUpload={onFileUpload}
                      onFileReject={onFileReject}
                    >
                      {field.value.length === 0 ? (
                        <FileUploadDropzone className="flex-row flex-wrap border-dotted text-center">
                          <CloudUploadIcon className="size-4" />
                          <p className="text-sm">
                            Drag and drop or choose files to upload
                          </p>
                        </FileUploadDropzone>
                      ) : (
                        <FileUploadList>
                          {field.value.map((file, index) => (
                            <FileUploadItem key={index} value={file}>
                              <FileUploadItemPreview />
                              <FileUploadItemMetadata
                                className="h-11"
                                hasFileProgress={true}
                              />
                              <FileUploadItemProgress />
                              <FileUploadItemDelete asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="size-7"
                                >
                                  <XIcon />
                                  <span className="sr-only">
                                    Delete uploaded csv
                                  </span>
                                </Button>
                              </FileUploadItemDelete>
                            </FileUploadItem>
                          ))}
                        </FileUploadList>
                      )}
                    </FileUpload>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="balanceId"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Balance</FormLabel>
                  <FormControl>
                    <AutoComplete
                      {...field}
                      options={balancesOptions}
                      placeholder="Select balance"
                      isLoading={balancesQuery.isLoading}
                      isDisabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid gap-8">
              {resultCSV.data.length > 0 && isFilesError === false && (
                <div className="grid gap-2">
                  <p className="mb-1 text-sm">
                    Map your table columns to the fields
                  </p>
                  <MappingField
                    columns={resultCSV.columns}
                    mapping={mapping}
                    setMapping={setMapping}
                    fieldOptions={fieldOptions}
                  />
                </div>
              )}

              {resultCSV.data.length > 0 && isFilesError === false && (
                <div className="grid gap-2">
                  <p className="mb-1 text-sm">Preview data to be imported</p>
                  <PreviewTable
                    columns={resultCSV.columns}
                    preview={resultCSV.preview}
                  />
                </div>
              )}
            </div>
          </div>

          {resultCSV.data.length > 0 && isFilesError === false && (
            <Button
              type="submit"
              size="sm"
              className="w-full"
              disabled={!hasRequiredMapping || isPending}
            >
              {isPending ? <p>Loading...</p> : <p>Import transactions</p>}
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
};

interface Columns {
  id: string;
  name: string;
  sample: string;
}

type FieldOption =
  | { label: string; value: Field; required: boolean }
  | { label: string; value: Field; required?: never };

interface MappingFieldProps {
  columns: Columns[];
  mapping: Record<string, Field>;
  setMapping: React.Dispatch<React.SetStateAction<Record<string, Field>>>;
  fieldOptions: FieldOption[];
}

function MappingField({
  columns,
  mapping,
  setMapping,
  fieldOptions,
}: MappingFieldProps) {
  const onSelectChange = (column: string, field: string) => {
    setMapping((prev) => ({
      ...prev,
      [column]: field as Field,
    }));
  };

  return (
    <div className="flex flex-col gap-1">
      {columns.map((column, index) => (
        <div key={`${column.id}-${index}`} className="flex gap-1">
          <div className="basis-2/4">
            <div className="grid gap-2">
              <Label
                className={cn('text-muted-foreground', index !== 0 && 'hidden')}
              >
                CSV columns
              </Label>
              <div className="flex h-9 items-center truncate rounded-md border border-input bg-transparent px-3 text-base shadow-xs md:text-sm dark:bg-input/30">
                <p className="truncate text-base md:text-sm">{column.name}</p>
              </div>
            </div>
          </div>

          <div className="basis-2/4">
            <div className="grid gap-2">
              <Label
                className={cn('text-muted-foreground', index !== 0 && 'hidden')}
              >
                Map field
              </Label>
              <Select
                value={mapping[column.name] || 'skip'}
                onValueChange={(value) => onSelectChange(column.name, value)}
              >
                <SelectTrigger type="button" className="w-full truncate">
                  <SelectValue placeholder="Select field" />
                </SelectTrigger>
                <SelectContent align="end">
                  {fieldOptions.map((option) => {
                    const isDisabled =
                      option.value !== 'skip' &&
                      option.value !== mapping[column.name] &&
                      Object.values(mapping).includes(option.value);

                    return (
                      <SelectItem
                        key={option.value}
                        value={option.value}
                        disabled={isDisabled}
                      >
                        <span className="truncate capitalize">
                          {option.label}
                          {option?.required === false && (
                            <span className="ml-1 text-[0.6rem] text-muted-foreground md:text-[0.7rem]">
                              (optional)
                            </span>
                          )}
                        </span>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

interface PreviewTableProps {
  columns: Columns[];
  preview: {
    [key: string]: string | undefined;
  }[];
}

function PreviewTable({ columns, preview }: PreviewTableProps) {
  return (
    <div className="max-h-56 w-full overflow-auto border">
      <Table containerClassName="h-full">
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead
                key={column.id}
                className={cn(
                  'h-auto border-r bg-secondary py-2 text-xs last:border-r-0',
                  robotoMono
                )}
              >
                {column.name}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {preview.map(
            // biome-ignore lint/suspicious/noExplicitAny: <explanation>
            (data: any, index: number) => (
              <TableRow key={index}>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    className={cn(
                      'h-auto border-r py-2 text-xs last:border-r-0',
                      robotoMono
                    )}
                  >
                    {data[column.name]}
                  </TableCell>
                ))}
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </div>
  );
}
