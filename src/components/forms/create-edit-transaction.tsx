import { AutoComplete } from '@/components/auto-complete';
import { AutoCompleteGroup } from '@/components/auto-complete-group';
import { CurrencyInput } from '@/components/currency-input';
import { DateTimePicker } from '@/components/date-time-picker';
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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCreateEditTransaction } from '@/hooks/actions/use-create-edit-transaction';
import { formatCurrency } from '@/lib/utilities';
import { ACCEPTED_IMAGE_MIME_TYPES } from '@/validators/utilities';
import { CloudUploadIcon, XIcon } from 'lucide-react';

export const CreateEditTransactionForm = () => {
  const {
    files,
    setFiles,
    onFileUpload,
    onFileReject,
    form,
    onSubmit,
    isCreating,
    createMutation,
    updateMutation,
    balancesQuery,
    categoriesQuery,
    budgetCategoriesQuery,
  } = useCreateEditTransaction();

  const balancesData = balancesQuery.data || [];
  const balancesOptions = balancesData.map((balance) => ({
    label: balance.name,
    value: balance.id,
  }));

  const categoriesData = categoriesQuery.data || [];
  const categoriesOptions = categoriesData.map((category) => ({
    label: category.name,
    value: category.id,
  }));

  const budgetCategoriesData = budgetCategoriesQuery.data || [];
  const budgetCategoriesOptions = budgetCategoriesData.map((plan) => {
    const categories = plan.categories.map((category) => ({
      label: category.name,
      value: category.id,
      description: formatCurrency(category.amount - category.spend),
    }));
    return {
      group: plan.title,
      options: categories,
    };
  });

  const isPending = createMutation.isPending || updateMutation.isPending;

  return (
    <>
      <div className="mb-8 grid gap-2">
        <Label htmlFor="image-upload">Scan image to transaction</Label>

        <FileUpload
          id="image-upload"
          value={files}
          onValueChange={setFiles}
          accept={ACCEPTED_IMAGE_MIME_TYPES.join(',')}
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
                  <FileUploadItemMetadata className="h-11" />
                  <FileUploadItemProgress variant="text" text="Scanning..." />
                  <FileUploadItemDelete asChild>
                    <Button variant="ghost" size="icon" className="size-7">
                      <XIcon />
                      <span className="sr-only">Delete uploaded image</span>
                    </Button>
                  </FileUploadItemDelete>
                </FileUploadItem>
              ))}
            </FileUploadList>
          )}
        </FileUpload>
        <p className="text-muted-foreground text-sm">
          Upload an image up to 5MB
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-8">
            <div className="grid gap-3">
              <FormField
                name="datetime"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Datetime</FormLabel>
                    <FormControl>
                      <DateTimePicker
                        granularity="minute"
                        showClearButton={false}
                        jsDate={field.value}
                        onJsDateChange={field.onChange}
                        isDisabled={isPending}
                        hourCycle={12}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="description"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Monthly shopping"
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="amount"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount</FormLabel>
                    <FormControl>
                      <CurrencyInput
                        {...field}
                        placeholder="0"
                        disabled={isPending}
                      />
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

              <FormField
                name="categoryId"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <AutoComplete
                        {...field}
                        isCreatable
                        options={categoriesOptions}
                        placeholder="Select category"
                        isLoading={categoriesQuery.isLoading}
                        isDisabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="budgetCategoryId"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Budget category</FormLabel>
                    <FormControl>
                      <AutoCompleteGroup
                        {...field}
                        options={budgetCategoriesOptions}
                        placeholder="Select budget category"
                        preDescription="Remaining : "
                        isLoading={budgetCategoriesQuery.isLoading}
                        isDisabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button
              type="submit"
              size="sm"
              className="w-full"
              disabled={isPending}
            >
              {isPending ? (
                <p>Loading...</p>
                // biome-ignore lint/nursery/noNestedTernary: <explanation>
              ) : isCreating ? (
                <p>Create transaction</p>
              ) : (
                <p>Update transaction</p>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};
