"use client";

import type { SubmitHandler } from "react-hook-form";
import type { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { useCreateUserMutation } from "@/hooks/queries/users";
import { useCreateUserModal } from "@/hooks/store/create-user";
import { createUserSchema } from "@/validators/actions/create-user";

type FormInputType = z.input<typeof createUserSchema>;

export const useCreateUser = () => {
  const store = useCreateUserModal();
  const mutation = useCreateUserMutation();

  const form = useForm<FormInputType>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "user",
      emailVerified: false,
    },
  });

  const onSubmit: SubmitHandler<FormInputType> = (values) => {
    const parsedData = createUserSchema.parse(values);

    toast.promise(
      mutation.mutateAsync(parsedData, {
        onSuccess: () => {
          store.onClose();
        },
        onError: () => {
          form.reset();
        },
      }),
      {
        loading: "Creating user...",
        success: "User created successfully",
        error: (error: unknown) => {
          if (error instanceof Error) {
            return error.message;
          }

          return "Something went wrong";
        },
      },
    );
  };

  return {
    form,
    onSubmit,
    mutation,
  };
};
