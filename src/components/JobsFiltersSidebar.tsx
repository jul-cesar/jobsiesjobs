import { JobFilterValues } from "@/app/jobs/schemas/job.schema";

import Link from "next/link";
import { SmileIcon } from "lucide-react";
import { distinctLocations } from "@/lib/utils";
import FiltersForm from "./Forms/FiltersForm";
import { Button } from "./ui/button";

type JobsFiltersSidebarProps = {
  defaultValues: JobFilterValues;
};

const JobsFiltersSidebar = async ({
  defaultValues,
}: JobsFiltersSidebarProps) => {
  const distinct = await distinctLocations();

  return (
    <aside className="sticky top-[12%]  h-fit hidden sm:block">
      <div className="rounded-lg border bg-background p-3 md:w-[290px] mb-4">
        <FiltersForm defaultValues={defaultValues} />
      </div>
      <Link href={"/jobs/new"} className="h-10">
        <Button className="flex items-center gap-2 w-full underline">
          Post a job for free! <SmileIcon />
        </Button>
      </Link>
    </aside>
  );
};

export default JobsFiltersSidebar;
