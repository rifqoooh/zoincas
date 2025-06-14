"use client";

import type { CreateUserType } from "@/validators/actions/create-user";
import type { SubmitHandler } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { useCreateUserMutation } from "@/hooks/queries/users";
import { useCreateUserModal } from "@/hooks/store/create-user";
import { createUserSchema } from "@/validators/actions/create-user";

export const useCreateUser = () => {
  const store = useCreateUserModal();
  const mutation = useCreateUserMutation();

  const form = useForm<CreateUserType>({
    resolver: zodResolver(createUserSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "user",
      emailVerified: false,
    },
  });

  const onSubmit: SubmitHandler<CreateUserType> = (values) => {
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
