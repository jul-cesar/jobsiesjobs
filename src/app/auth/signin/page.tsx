import LogInForm from "@/components/LoginForm";
import { validateRequest } from "@/lib/validateRequest";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const { user } = await validateRequest();

  if (user?.username) {
    redirect("/");
  }

  return (
    <main>
      <LogInForm />
    </main>
  );
};

export default page;
