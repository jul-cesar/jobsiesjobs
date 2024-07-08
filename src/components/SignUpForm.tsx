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
import { useFormState, useFormStatus } from "react-dom";
import { useRef } from "react";
import { signup } from "@/app/auth/actions";
import { Button } from "./ui/button";

const SignUpForm = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const { pending } = useFormStatus();

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
  });

  const [state, action] = useFormState(signup, {
    error: "",
    inputValues: {
      username: "",
      password: "",
    },
  });
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
          <form
            ref={formRef}
            action={action}
            onSubmit={(evt) => {
              evt.preventDefault();
              form.handleSubmit(() => {
                action(new FormData(formRef.current!));
              })(evt);
            }}
          >
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
              {state.error && <p className="text-destructive">{state.error}</p>}
              <Button type="submit">
                {pending ? "Loading..." : "Log in"}
              </Button>{" "}
              {/* <Button variant="outline" className="w-full">
              Inicia con Google
              <img
                className="w-6 h-4 m-1"
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                loading="lazy"
                alt="google logo"
              />
            </Button> */}
            </div>
          </form>
        </Form>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link href="/auth/login" className="underline">
            Log in{" "}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
