"use client";

import type { PatchUserBanInputType } from "@/validators/api/openapi/users/request";
import type { SubmitHandler } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { useBanUserMutation } from "@/hooks/queries/users";
import { useBanUserModal } from "@/hooks/store/ban-user";
import { patchUserBanInputSchema } from "@/validators/api/openapi/users/request";

export const useBanUser = () => {
  const store = useBanUserModal();
  const mutation = useBanUserMutation(store.id);

  const form = useForm<PatchUserBanInputType>({
    resolver: zodResolver(patchUserBanInputSchema),
    defaultValues: {
      banReason: "No reason",
      banExpiresInDays: 9999,
    },
  });

  const onSubmit: SubmitHandler<PatchUserBanInputType> = (values) => {
    toast.promise(
      mutation.mutateAsync(values, {
        onSuccess: () => {
          store.onClose();
        },
      }),
      {
        loading: "Banning user...",
        success: "User banned successfully",
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
