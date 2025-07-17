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
import { useAssignManyBudget } from '@/hooks/actions/use-assign-many-budget';
import { formatCurrency } from '@/lib/utilities';

export const AssignManyBudgetForm = () => {
  const { form, onSubmit, mutation, budgetCategoriesQuery } =
    useAssignManyBudget();

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
              name="budgetId"
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
            {isPending ? <p>Loading...</p> : <p>Assign</p>}
          </Button>
        </div>
      </form>
    </Form>
  );
};
