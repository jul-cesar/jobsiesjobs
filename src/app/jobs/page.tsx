import { JobFilterValues } from "./schemas/job.schema";
import JobsFiltersSidebar from "@/components/JobsFiltersSidebar";
import JobsResults from "@/components/JobsResults";
import ButtonGroupMobile from "@/components/Mobile/ButtonGroupMobile";

type JobsPageProps = {
  searchParams: {
    q?: string;
    type?: string;
    location?: string;
    remote?: string;
    page?: string;
  };
};

const page = ({
  searchParams: { q, location, remote, type, page },
}: JobsPageProps) => {
  const filterValues: JobFilterValues = {
    q,
    type,
    location,
    remote: remote === "true",
  };

  return (
    <main className="m-auto my-10 max-w-5xl space-y-10 px-3">
      <div className="space-y-4 flex-1 text-center ">
        <h1 className="text-gray-700 font-bold text-4xl xl:text-5xl">
          Find your perfect <span className="text-primary">tech job.</span>
        </h1>
        <p className="text-gray-500 max-w-xl text-center leading-relaxed sm:mx-auto ">
          We help you find your dream job from everywhere.
        </p>
      </div>

      <section className="flex flex-col-reverse gap-3 sm:flex-row-reverse">
        <JobsResults
          filterValues={filterValues}
          page={page ? parseInt(page) : undefined}
        />
        <JobsFiltersSidebar defaultValues={filterValues} />
        <ButtonGroupMobile defaultValues={filterValues} />
      </section>
    </main>
  );
};

export default page;
