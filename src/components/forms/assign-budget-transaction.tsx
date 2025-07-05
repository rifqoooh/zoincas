import { AutoComplete } from '@/components/auto-complete';
import { AutoCompleteGroup } from '@/components/auto-complete-group';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useAssignBudgetTransaction } from '@/hooks/actions/use-assign-budget-transaction';
import { formatCurrency } from '@/lib/utilities';

export const AssignBudgetTransactionForm = () => {
  const { form, onSubmit, isAssigning, updateMutation, budgetCategoriesQuery } =
    useAssignBudgetTransaction();

  const budgetCategoriesData = budgetCategoriesQuery.data || [];

  const budgetPlansOptions = budgetCategoriesData.map((plan) => ({
    label: plan.title,
    value: plan.id,
  }));

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

  const isPending = updateMutation.isPending;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-8">
          <div className="grid gap-3">
            <FormField
              name="planId"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Budget Plan</FormLabel>
                  <FormControl>
                    <AutoComplete
                      {...field}
                      options={budgetPlansOptions}
                      placeholder="Select budget plan"
                      isLoading={budgetCategoriesQuery.isLoading}
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
            ) : isAssigning ? (
              <p>Assign budget</p>
            ) : (
              <p>Update budget</p>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};
