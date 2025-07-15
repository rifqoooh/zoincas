import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

interface VerifyConfirmationDialogProps {
  isOpen: boolean;
  title: string;
  description: string;
  verification?: string;
  action: string;
  isPending?: boolean;
  onChange: () => void;
  onCancel: () => void;
  onConfirm: () => void;
}

export function VerifyConfirmationDialog({
  isOpen,
  title,
  description,
  verification = 'REMOVE',
  action,
  isPending = false,
  onChange,
  onCancel,
  onConfirm,
}: VerifyConfirmationDialogProps) {
  const verifyDeleteSchema = z.object({
    verification: z.string().trim(),
  });

  type VerifyDeleteType = z.infer<typeof verifyDeleteSchema>;

  const form = useForm<VerifyDeleteType>({
    resolver: zodResolver(verifyDeleteSchema),
    defaultValues: { verification: '' },
  });

  const onSubmit = (data: VerifyDeleteType) => {
    if (data.verification === verification) {
      return onConfirm();
    }

    return toast.error('Verification failed. Please check your typing.');
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onChange}>
      <AlertDialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <AlertDialogHeader>
              <AlertDialogTitle className="font-normal uppercase">
                {title}
              </AlertDialogTitle>
              <AlertDialogDescription>{description}</AlertDialogDescription>
              <div className="py-2">
                <FormField
                  name="verification"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormDescription>
                        Type <span>{`"${verification}"`}</span> to confirm your
                        delete action.
                      </FormDescription>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </AlertDialogHeader>
            <AlertDialogFooter className="pt-2">
              <AlertDialogCancel
                type="button"
                onClick={onCancel}
                disabled={isPending}
              >
                Cancel
              </AlertDialogCancel>
              <Button type="submit" variant="destructive" disabled={isPending}>
                {action}
              </Button>
            </AlertDialogFooter>
          </form>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
