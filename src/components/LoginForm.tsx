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
import { Button } from "./ui/button";
import { login } from "@/app/auth/actions";

const LogInForm = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const { pending } = useFormStatus();

  const formScheme = z.object({
    username: z.string().min(1),
    password: z
      .string()
      .min(1, { message: "Por favor, ingresa una contraseña" }),
  });

  const form = useForm<z.infer<typeof formScheme>>({
    resolver: zodResolver(formScheme),
    mode: "onChange",
  });

  const [state, action] = useFormState(login, {
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
          <p className="text-balance text-muted-foreground">Log In</p>
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
                <div className="flex items-center"></div>
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
              {state.error && <p className="text-destructive">{state.error}</p>}

              <Button type="submit">{pending ? "Loading..." : "Log in"}</Button>

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
          Dont have an account yet?{" "}
          <Link href="/auth/signup" className="underline">
            Sign up{" "}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LogInForm;
