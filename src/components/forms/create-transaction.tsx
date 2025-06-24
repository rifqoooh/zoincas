import { DateTimePicker } from '@/components/date-time-picker';
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
import { useCreateTransaction } from '@/hooks/actions/use-create-transaction';

export const CreateTransactionForm = () => {
  const { form, onSubmit, mutation } = useCreateTransaction();

  const isPending = mutation.isPending;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-10">
          <div className="grid gap-2">
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
          </div>

          <Button
            type="submit"
            size="sm"
            className="w-full"
            disabled={isPending}
          >
            {isPending ? <p>Loading...</p> : <p>Create transaction</p>}
          </Button>
        </div>
      </form>
    </Form>
  );
};
