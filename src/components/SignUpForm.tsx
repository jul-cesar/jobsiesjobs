"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import Link from "next/link";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { prevStateType, signup } from "@/app/auth/actions";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { Loader2Icon } from "lucide-react";
import { useState } from "react";

const SignUpForm = () => {
  const formScheme = z
    .object({
      username: z.string().min(1),
      password: z
        .string()
        .min(8, { message: "Password must be atleast 8 characters" }),
      passwordConfirm: z
        .string()
        .min(8, { message: "Password must be atleast 8 characters" }),
    })
    .refine((data) => data.password === data.passwordConfirm, {
      message: "Password must match",
      path: ["passwordConfirm"],
    });

  const form = useForm<z.infer<typeof formScheme>>({
    resolver: zodResolver(formScheme),
    mode: "onChange",
    defaultValues: {
      password: "",
      passwordConfirm: "",
      username: "",
    },
  });
  const { isSubmitting } = form.formState;

  const [state, setState] = useState<prevStateType>();

  const router = useRouter();

  const onSubmit = async (data: z.infer<typeof formScheme>) => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (value) {
        formData.append(key, value);
      }
    });

    const res = await signup(formData);

    setState(res);

    if (res.success) {
      router.push("/auth/signin");
    }
  };

  return (
    <div className="flex items-center justify-center p-12">
      <div className="mx-auto grid w-[350px] gap-6">
        <div className="grid gap-2 text-center">
          <h1 className="relative rotate-12 font-mono text-lg font-bold underline sm:text-xl">
            J
          </h1>{" "}
          <p className="text-balance text-muted-foreground">Sign up</p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input id="username" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input id="password" type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="passwordConfirm"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm your password</FormLabel>
                      <FormControl>
                        <Input id="password" type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {state?.error && (
                <p className="text-destructive">{state.error}</p>
              )}
              <Button disabled={isSubmitting}>
                {isSubmitting ? (
                  <Loader2Icon className="size-4 animate-spin" />
                ) : (
                  "Sign up"
                )}
              </Button>
            </div>
          </form>
        </Form>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link href="/auth/signin" className="underline">
            Log in{" "}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
