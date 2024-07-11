import ButtonActionsLoading from "../ButtonActionsLoading";
import Select from "../ui/Select";
import { jobTypes } from "@/app/jobs/schemas/job.types";
import { Input } from "../ui/input";
import { filterJobs } from "@/app/jobs/actions/filterJobst";
import { distinctLocations } from "@/lib/utils";
import { Label } from "../ui/label";
import { JobFilterValues } from "@/app/jobs/schemas/job.schema";

type FiltersForm = {
  defaultValues: JobFilterValues;
};

const FiltersForm = async ({ defaultValues }: FiltersForm) => {
  const distinct = await distinctLocations();

  return (
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
          <Select id="type" name="type" defaultValue={defaultValues.type || ""}>
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
            {distinct.map((location) => (
              <option key={location.locations} value={location.locations || ""}>
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
        <div className="flex items-center justify-between">
          <ButtonActionsLoading>Filter jobs</ButtonActionsLoading>
          {/* {Object.values(defaultValues).some((v) => v || false) && (
            )} */}
        </div>
      </div>
    </form>
  );
};

export default FiltersForm;
