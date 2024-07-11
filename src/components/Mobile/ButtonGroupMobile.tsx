import React from "react";
import { Button } from "../ui/button";
import { SmileIcon } from "lucide-react";
import { FiltersDialogMobile } from "./FiltersDialogMobile";
import { JobFilterValues } from "@/app/jobs/schemas/job.schema";
import Link from "next/link";

type ButtonGroupMobileProps = {
  defaultValues: JobFilterValues;
};

const ButtonGroupMobile = ({ defaultValues }: ButtonGroupMobileProps) => {
  return (
    <section className="sm:hidden">
      <div className="flex items-start gap-2">
        <FiltersDialogMobile defaultValues={defaultValues} />
        <Link href="/jobs/new">
          <Button className="flex gap-2" variant={"secondary"}>
            Post a job <SmileIcon />{" "}
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default ButtonGroupMobile;
