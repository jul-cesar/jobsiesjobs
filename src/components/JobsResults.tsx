import Link from "next/link";
import JobsListItem from "./JobsListItem";
import { JobFilterValues } from "@/app/jobs/schemas/job.schema";
import { db } from "@/db";
import { JobsTable } from "@/db/schema";
import { and, asc, count, eq, sql } from "drizzle-orm";
import { PaginationDemo } from "./PaginationButtons";

type JobsResultsProps = {
  filterValues: JobFilterValues;
  page?: number;
};

const JobsResults = async ({ filterValues, page = 1 }: JobsResultsProps) => {
  const { q, type, location, remote } = filterValues;
  const searchString = q
    ?.split(" ")
    .filter((word) => word.length > 0)
    .join(" & ");

  const conditions = [];

  if (searchString) {
    conditions.push(sql`
          to_tsvector('simple', lower(${JobsTable.title} || ' ' || ${JobsTable.description} || ' ' || ${JobsTable.companyName} || ' ' || ${JobsTable.location} || ' ' || ${JobsTable.locationType})) 
          @@ to_tsquery('simple', lower(${searchString}))
        `);
  }

  if (type) {
    conditions.push(eq(JobsTable.type, type));
  }

  if (location) {
    conditions.push(eq(JobsTable.location, location));
  }

  if (remote) {
    conditions.push(eq(JobsTable.locationType, "Remote"));
  }

  //   conditions.push(eq(JobsTable.approved, true));

  const combinedConditions = and(...conditions);

  const jobsCount = await db
    .select({ count: count() })
    .from(JobsTable)
    .where(combinedConditions);

  console.log(jobsCount?.[0].count);
  const jobsPerPage = 3;
  const skip = (page - 1) * jobsPerPage;

  const jobs = await db
    .select()
    .from(JobsTable)
    .where(combinedConditions)
    .orderBy(asc(JobsTable.createdAt))
    .limit(jobsPerPage)
    .offset(skip);
    
    console.log(jobs,page, skip )
  return (
    <div className="grow space-y-4">
      {jobs?.map((job) => (
        <Link key={job.id} href={`/jobs/${job.slug}`} className="block">
          <JobsListItem job={job} />
        </Link>
      ))}
      {jobs.length === 0 && (
        <p className="m-auto text-center">
          No jobs found. Try adjusting your search filters.
        </p>
      )}
      <PaginationDemo
        currentPage={page}
        filterValues={filterValues}
        totalPages={Math.ceil(jobsCount?.[0].count / jobsPerPage)}
      />
    </div>
  );
};

export default JobsResults;
