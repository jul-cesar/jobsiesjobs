import { jobTypes } from "@/app/jobs/schemas/job.types";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select } from "./ui/Select";
import { db } from "@/db";
import { JobsTable } from "@/db/schema";
import { JobFilterValues } from "@/app/jobs/schemas/job.schema";
import { Button } from "./ui/button";
import { isNotNull } from "drizzle-orm";
import { FilterIcon } from "lucide-react";
import { filterJobs } from "@/app/jobs/actions/filterJobst";
import ButtonActionsLoading from "./ButtonActionsLoading";

type JobsFiltersSidebarProps = {
  defaultValues: JobFilterValues;
};

const JobsFiltersSidebar = async ({
  defaultValues,
}: JobsFiltersSidebarProps) => {
  const distinctLocations = await db
    .selectDistinct({
      locations: JobsTable.location,
    })
    .from(JobsTable)
    .where(isNotNull(JobsTable.location));

  return (
    <aside className="sticky top-0 h-fit rounded-lg border bg-background p-4 md:w-[260px]">
      <form action={filterJobs} key={JSON.stringify(defaultValues)}>
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="q">Search</Label>
            <Input
              id="q"
              name="q"
              placeholder="Title, company, etc."
              defaultValue={defaultValues.q}
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="type">Type</Label>
            <Select
              id="type"
              name="type"
              defaultValue={defaultValues.type || ""}
            >
              <option value="">All types</option>
              {jobTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </Select>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="location">Location</Label>
            <Select
              id="location"
              name="location"
              defaultValue={defaultValues.location || ""}
            >
              <option value="">All locations</option>
              {distinctLocations.map((location) => (
                <option
                  key={location.locations}
                  value={location.locations || ""}
                >
                  {location.locations}
                </option>
              ))}
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <input
              id="remote"
              name="remote"
              type="checkbox"
              className="scale-125 accent-black"
              defaultChecked={defaultValues.remote}
            />
            <Label htmlFor="remote">Remote jobs</Label>
          </div>
          <ButtonActionsLoading>Filter jobs</ButtonActionsLoading>
        </div>
      </form>
    </aside>
  );
};

export default JobsFiltersSidebar;
