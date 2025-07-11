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
import { useCreateEditBudgetPlan } from '@/hooks/actions/use-create-edit-budget-plan';
import { cn } from '@/lib/utilities';
import { Trash2Icon } from 'lucide-react';

export const CreateEditBudgetPlanForm = () => {
  const { form, fieldArray, onSubmit, isCreating, deleteStore } =
    useCreateEditBudgetPlan();

  const isPending = false;

  const onRemoveField = ({
    categoryId,
    index,
  }: { categoryId?: string; index: number }) => {
    if (categoryId) {
      deleteStore.onOpen({
        id: categoryId,
        onSuccess: () => fieldArray.remove(index),
      });
      return;
    }

    fieldArray.remove(index);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-8">
          <div className="grid gap-3">
            <FormField
              name="title"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Budget plan title</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="January budget"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex flex-col gap-2">
              {fieldArray.fields.map((field, index) => (
                <div key={field.id} className="flex gap-1.5">
                  <div className="basis-3/5">
                    <FormField
                      key={field.id}
                      name={`categories.${index}.name`}
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className={cn(index !== 0 && 'hidden')}>
                            Category name
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Monthly spend"
                              disabled={isPending}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="basis-2/5">
                    <FormField
                      key={field.id}
                      name={`categories.${index}.amount`}
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className={cn(index !== 0 && 'hidden')}>
                            Amount
                          </FormLabel>
                          <FormControl>
                            <CurrencyInput
                              {...field}
                              placeholder="0"
                              hidePlusButton
                              disabled={isPending}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className={cn(index !== 0 ? 'pt-0' : 'pt-[1.4rem]')}>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() =>
                        onRemoveField({
                          categoryId: field.categoryId,
                          index,
                        })
                      }
                      disabled={isPending}
                    >
                      <Trash2Icon />
                    </Button>
                  </div>
                </div>
              ))}

              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() =>
                  fieldArray.append({
                    name: '',
                    amount: 0,
                  })
                }
                disabled={isPending}
              >
                Add new category
              </Button>
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? (
              <p>Loading...</p>
              // biome-ignore lint/nursery/noNestedTernary: <explanation>
            ) : isCreating ? (
              <p>Create budget plan</p>
            ) : (
              <p>Update budget plan</p>
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};
