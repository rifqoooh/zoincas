"use client";

import type { SubmitHandler } from "react-hook-form";
import type { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";

import { signInAction } from "@/actions/auth";
import { toast } from "@/lib/toast-redirect";
import { signInSchema } from "@/validators/actions/sign-in";
import { parseAsString, useQueryStates } from "nuqs";

type FormInputType = z.input<typeof signInSchema>;

export const useSignIn = () => {
  const [search] = useQueryStates({
    callbackURL: parseAsString.withDefault(""),
  });

  const { callbackURL } = search;

  const [isPending, startTransition] = useTransition();

  const form = useForm<FormInputType>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FormInputType> = (values) => {
    const parsedData = signInSchema.parse(values);

    startTransition(() => {
      toast(signInAction(parsedData, callbackURL), {
        loading: "Please wait, we are signing you in...",
        success: "There you go!",
      });
    });
  };

  return {
    form,
    onSubmit,
    isPending,
  };
};
