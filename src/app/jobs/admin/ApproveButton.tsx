
"use client"
import ButtonActionsLoading from "@/components/ButtonActionsLoading";
import { approveJob } from "./actions/AdminActions";
import { useFormState } from "react-dom";

const ApproveButton = ({ jobId }: { jobId: string }) => {
  const [state, action] = useFormState(approveJob, {
    message: "",
  });
  return (
    <form action={action}>
      <input name="jobId" value={jobId} hidden/>
      <ButtonActionsLoading>Approve this job.</ButtonActionsLoading>
    </form>
  );
};

export default ApproveButton;
