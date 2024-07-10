import { db } from "@/db";
import Link from "next/link";
import JobsListItem from "./JobsListItem";

const JobsList = async () => {
  const jobs = await db.query.JobsTable.findMany();
  return (
    <div className="grow space-y-4">
      {jobs?.map((job) => (
        <Link key={job.id} className="block" href={`/jobs/${job.slug}`}>
          {" "}
          <JobsListItem job={job} />{" "}
        </Link>
      ))}

      {jobs.length < 1 && <p className="text-center">No jobs</p>}
    </div>
  );
};

export default JobsList;
