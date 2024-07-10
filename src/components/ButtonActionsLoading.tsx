"use client";

import { ReactNode } from "react";
import { Button } from "./ui/button";
import { useFormStatus } from "react-dom";
import { Loader2Icon } from "lucide-react";

const ButtonActionsLoading = ({ children }: { children: ReactNode }) => {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending}>
      <span className="flex items-center justify-center gap-1">
        {pending && <Loader2Icon size={16} className="animate-spin" />}
        {children}
      </span>
    </Button>
  );
};

export default ButtonActionsLoading;
