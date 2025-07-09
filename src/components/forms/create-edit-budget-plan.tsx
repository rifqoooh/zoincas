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
import { Trash2Icon } from 'lucide-react';

export const CreateEditBudgetPlanForm = () => {
  const { form, fieldArray, onSubmit, isCreating } = useCreateEditBudgetPlan();

  const isPending = false;

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

            <div className="flex flex-col gap-5">
              {fieldArray.fields.map((field, index) => (
                <div key={field.id} className="flex gap-1.5">
                  <div className="basis-3/5">
                    <FormField
                      key={field.id}
                      name={`categories.${index}.name`}
                      control={form.control}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category name</FormLabel>
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
                          <FormLabel>Amount</FormLabel>
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

                  <div className="pt-[1.4rem]">
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => fieldArray.remove(index)}
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
                size="sm"
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
