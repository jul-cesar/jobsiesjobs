import Link from "next/link";
import { db } from "@/db";
import { JobsTable } from "@/db/schema";
import { and, asc, count, eq, sql } from "drizzle-orm";
import { PaginationDemo } from "@/components/PaginationButtons";
import JobsListItem from "@/components/JobsListItem";
import HeroText from "@/components/HeroText";

type JobsResultsProps = {
  searchParams: {
    order: string;
    page?: number;
  };
};

const UnnaprovedJobs = async ({
  searchParams: { order, page = 1 },
}: JobsResultsProps) => {
  const filterValues = {
    order,
    page,
  };
  const jobsCount = await db
    .select({ count: count() })
    .from(JobsTable)
    .where(eq(JobsTable.approved, false));

  const jobsPerPage = 10;
  const skip = (page - 1) * jobsPerPage;

  const jobs = await db
    .select()
    .from(JobsTable)
    .where(eq(JobsTable.approved, false))
    .orderBy(asc(JobsTable.createdAt))
    .limit(jobsPerPage)
    .offset(skip);
  const [jobsDb, jobsCountdb] = await Promise.all([jobs, jobsCount]);

  return (
    <div className="grow space-y-4 flex flex-col">
        <HeroText title="Unnaproved jobs" subtitle="Admin dashboard"/>
      {jobsDb?.map((job) => (
        <Link key={job.id} href={`/jobs/admin/${job.slug}`} className="block">
          <JobsListItem job={job} />
        </Link>
      ))}
      {jobs.length === 0 && (
        <p className="m-auto text-center">
          No jobs found. Try adjusting your search filters.
        </p>
      )}
      <div>
        <PaginationDemo
          currentPage={page}
          adminPageFilters={filterValues}
          totalPages={Math.ceil(jobsCountdb?.[0].count / jobsPerPage)}
        />
      </div>
    </div>
  );
};

export default UnnaprovedJobs;
