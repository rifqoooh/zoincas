import { AutoComplete } from '@/components/auto-complete';
import { AutoCompleteGroup } from '@/components/auto-complete-group';
import { CurrencyInput } from '@/components/currency-input';
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
import { formatCurrency } from '@/lib/utilities';

export const CreateEditTransactionForm = () => {
  const {
    form,
    onSubmit,
    mutation,
    transactionQuery,
    balancesQuery,
    categoriesQuery,
    budgetCategoriesQuery,
  } = useCreateTransaction();

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

  const isPending = mutation.isPending;

  return (
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
            {isPending ? <p>Loading...</p> : <p>Create transaction</p>}
          </Button>
        </div>
      </form>
    </Form>
  );
};
