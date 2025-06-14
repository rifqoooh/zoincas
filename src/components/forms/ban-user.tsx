"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useBanUser } from "@/hooks/actions/use-ban-user";

export function BanUserForm() {
  const { form, onSubmit, mutation } = useBanUser();

  const isPending = mutation.isPending;

  const options = React.useMemo(
    () => [
      { value: "9999", label: "Forever ban" },
      { value: "1", label: "1 Day" },
      { value: "2", label: "2 Days" },
      { value: "3", label: "3 Days" },
      { value: "5", label: "5 Days" },
      { value: "7", label: "7 Days" },
      { value: "14", label: "14 Days" },
      { value: "30", label: "30 Days" },
      { value: "90", label: "90 Days" },
    ],
    [],
  );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-6">
          <div className="grid gap-2">
            <FormField
              name="banReason"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reason</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Type your reason for banning this user"
                      className="h-20 resize-none"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="banExpiresInDays"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expires in days</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value?.toString()}
                    disabled={isPending}
                  >
                    <FormControl>
                      <SelectTrigger className="h-9 w-full">
                        <SelectValue placeholder="Select the number of days this user will be banned" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {options.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
            {isPending ? <p>Loading...</p> : <p>Ban user</p>}
          </Button>
        </div>
      </form>
    </Form>
  );
}
