import { ACCEPTED_CSV_MIME_TYPES } from '@/validators/utilities';

import { CloudUploadIcon, XIcon } from 'lucide-react';

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
import { Label } from '@/components/ui/label';
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
  const { files, setFiles, resultCSV, onFileUpload, onFileReject } =
    useImportTransactionsCSV();

  return (
    <div className="mb-8 grid gap-2">
      <Label htmlFor="csv-upload">Upload CSV file</Label>
      <p className="text-muted-foreground text-sm">
        Upload a CSV file. The first row should be the headers of the table, and
        your headers should not include any special characters other than
        hyphens <kbd className="text-code">-</kbd> or underscores{' '}
        <kbd className="text-code">_</kbd>
      </p>
      <p className="text-muted-foreground text-sm">
        Tip: Datetime columns should be formatted as YYYY-MM-DD HH:mm:ss
      </p>

      <FileUpload
        id="csv-upload"
        value={files}
        onValueChange={setFiles}
        accept={ACCEPTED_CSV_MIME_TYPES.join(',')}
        maxFiles={1}
        maxSize={5 * 1024 * 1024}
        onUpload={onFileUpload}
        onFileReject={onFileReject}
      >
        {files.length === 0 ? (
          <FileUploadDropzone className="flex-row flex-wrap border-dotted text-center">
            <CloudUploadIcon className="size-4" />
            <p className="text-sm">Drag and drop or choose files to upload</p>
          </FileUploadDropzone>
        ) : (
          <FileUploadList>
            {files.map((file, index) => (
              <FileUploadItem key={index} value={file}>
                <FileUploadItemPreview />
                <FileUploadItemMetadata
                  className="h-11"
                  hasFileProgress={true}
                />
                <FileUploadItemProgress />
                <FileUploadItemDelete asChild>
                  <Button variant="ghost" size="icon" className="size-7">
                    <XIcon />
                    <span className="sr-only">Delete uploaded csv</span>
                  </Button>
                </FileUploadItemDelete>
              </FileUploadItem>
            ))}
          </FileUploadList>
        )}
      </FileUpload>

      {resultCSV.data.length > 0 && (
        <>
          <div className="mt-6">
            <p className="text-muted-foreground text-sm">
              Preview data to be imported
            </p>
          </div>

          <div className="max-h-56 w-full overflow-auto border">
            <Table containerClassName="h-full">
              <TableHeader>
                <TableRow>
                  {resultCSV.columns.map((column) => (
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
                {resultCSV.preview.map(
                  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
                  (data: any, index: number) => (
                    <TableRow key={index}>
                      {resultCSV.columns.map((column) => (
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
        </>
      )}
    </div>
  );
};
