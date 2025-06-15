"use client";

import type { ResetPasswordInput } from "@/validators/api/openapi/users/request";
import type { SubmitHandler } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { useResetPasswordMutation } from "@/hooks/queries/users";
import { useResetPasswordModal } from "@/hooks/store/reset-password";
import { resetPasswordInput } from "@/validators/api/openapi/users/request";

export const useResetPassword = () => {
  const store = useResetPasswordModal();
  const mutation = useResetPasswordMutation(store.id);

  const form = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordInput),
    defaultValues: {
      password: "",
    },
  });

  const onSubmit: SubmitHandler<ResetPasswordInput> = (values) => {
    toast.promise(
      mutation.mutateAsync(values, {
        onSuccess: () => {
          store.onClose();
        },
      }),
      {
        loading: "Resetting password...",
        success: "User password reset successfully",
        error: (error: unknown) => {
          if (error instanceof Error) {
            return error.message;
          }

          return "There is an error in the internal server.";
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
