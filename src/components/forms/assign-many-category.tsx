import { AutoComplete } from '@/components/auto-complete';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useAssignManyCategory } from '@/hooks/actions/use-assign-many-category';

export const AssignManyCategoryForm = () => {
  const { form, onSubmit, mutation, categoriesQuery } = useAssignManyCategory();

  const categoriesData = categoriesQuery.data || [];
  const categoriesOptions = categoriesData.map((category) => ({
    label: category.name,
    value: category.id,
  }));

  const isPending = mutation.isPending;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-8">
          <div className="grid gap-3">
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
