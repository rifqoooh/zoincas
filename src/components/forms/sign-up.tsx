'use client';

import { GoogleAuthButton } from '@/components/google-auth-button';
import { PasswordInput } from '@/components/password-input';
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
import { Separator } from '@/components/ui/separator';
import { useGoogleOAuth } from '@/hooks/actions/use-google-oauth';
import { useSignUp } from '@/hooks/actions/use-sign-up';

export function SignUpForm() {
  const { form, onSubmit, isPending: isPendingForm } = useSignUp();
  const { onSignInGoogle, isPending: isPendingOAuth } = useGoogleOAuth();

  const isPending = isPendingForm || isPendingOAuth;

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid gap-6">
            <div className="grid gap-2">
              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="John Doe"
                        className="h-9"
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="email"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="example@email.com"
                        className="h-9"
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="password"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <PasswordInput
                        {...field}
                        placeholder="Type strong password"
                        className="h-9"
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
              {isPending ? <p>Loading...</p> : <p>Create account</p>}
            </Button>
          </div>
        </form>
      </Form>

      <div className="relative w-full">
        <div className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 transform bg-background p-2 text-muted-foreground text-xs">
          OR
        </div>
        <Separator orientation="horizontal" />
      </div>

      <GoogleAuthButton onClick={onSignInGoogle} disabled={isPending} />
    </>
  );
}
