
"use client"
import ButtonActionsLoading from "@/components/ButtonActionsLoading";
import {  deleteJob } from "./actions/AdminActions";
import { useFormState } from "react-dom";

const DeleteButton = ({ jobId }: { jobId: string }) => {
  const [state, action] = useFormState(deleteJob, {
    message: "",
  });
  return (
    <form action={action}>
      <input name="jobId" value={jobId} hidden/>
      <ButtonActionsLoading >Delete</ButtonActionsLoading>
    </form>
  );
};

export default DeleteButton;
