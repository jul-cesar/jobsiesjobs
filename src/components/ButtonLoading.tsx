"use client";

import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
import { Loader, Loader2 } from "lucide-react";
import { ReactNode } from "react";

const ButtonLoading = ({ children }: { children: ReactNode }) => {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending} type="submit">
      {pending ? <Loader /> : children}
    </Button>
  );
};

export default ButtonLoading;
