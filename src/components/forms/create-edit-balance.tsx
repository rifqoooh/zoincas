import { CurrencyInput } from '@/components/currency-input';
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
import { useCreateEditBalance } from '@/hooks/actions/use-create-edit-balance';

export const CreateEditBalanceForm = () => {
  const { form, onSubmit, isCreating, createMutation, updateMutation } =
    useCreateEditBalance();

  const isPending = createMutation.isPending || updateMutation.isPending;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-8">
          <div className="grid gap-3">
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="initialAmount"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Initial amount</FormLabel>
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
              <p>Create balance</p>
            ) : (
              <p>Update balance</p>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};
