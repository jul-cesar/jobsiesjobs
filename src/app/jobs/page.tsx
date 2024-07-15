import HeroText from "@/components/HeroText";
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
      <HeroText
        title="  Find your perfect "
        coloredText="Tech job."
        subtitle="   We help you find your dream job from everywhere."
      />

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
