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
import { useState } from "react";
import { Button } from "../ui/button";
import { login, prevStateType } from "@/app/auth/actions";
import { useRouter } from "next/navigation";
import { Loader2Icon } from "lucide-react";

const LogInForm = () => {
  const formScheme = z.object({
    username: z.string().min(1),
    password: z
      .string()
      .min(1, { message: "Por favor, ingresa una contraseña" }),
  });

  const form = useForm<z.infer<typeof formScheme>>({
    resolver: zodResolver(formScheme),
    mode: "onChange",
    defaultValues: {
      password: "",
      username: "",
    },
  });

  const { isSubmitting } = form.formState;

  const [state, setState] = useState<prevStateType>();

  const router = useRouter();

  const onSubmit = async (data: z.infer<typeof formScheme>) => {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (key === "username") {
        formData.append(key, value.toLowerCase());
      } else {
        formData.append(key, value);
      }
    });
    const res = await login(formData);
    setState(res);
    if (res.success) {
      window.location.reload();
    }
  };

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
              {state?.error && (
                <p className="text-destructive">{state?.error}</p>
              )}

              <Button disabled={isSubmitting}>
                {isSubmitting ? (
                  <Loader2Icon className="size-4 animate-spin" />
                ) : (
                  "Log in"
                )}
              </Button>
            </div>
          </form>
        </Form>
        <div className="mt-4 text-center text-sm">
          Dont have an account yet?{" "}
          <Link href="/signup" className="underline">
            Sign up{" "}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LogInForm;
