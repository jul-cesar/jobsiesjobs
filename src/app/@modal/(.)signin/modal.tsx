"use client"

import {
    Dialog,
    DialogContent,
  
  } from "@/components/ui/dialog";
  
  import { useRouter } from "next/navigation";
  import { ReactNode } from "react";
  
  export default function ModalAuth({ children }: { children: ReactNode }) {
    const router = useRouter()
    const handleOpenChange = () => {
      router.back()
    };
    return (
      <Dialog defaultOpen={true} open={true} onOpenChange={handleOpenChange} >
        <DialogContent >
        {children}
        </DialogContent>
      </Dialog>
    );
  }
  