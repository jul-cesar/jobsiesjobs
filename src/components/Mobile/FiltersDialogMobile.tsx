import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { JobFilterValues } from "@/app/jobs/schemas/job.schema";
import FiltersForm from "../Forms/FiltersForm";

type FiltersDialogMobileProps = {
  defaultValues: JobFilterValues;
};

export function FiltersDialogMobile({
  defaultValues,
}: FiltersDialogMobileProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"secondary"}>Filter Jobs</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Filter jobs and get what you want!</DialogTitle>
        </DialogHeader>
        <FiltersForm defaultValues={defaultValues} />
      </DialogContent>
    </Dialog>
  );
}
