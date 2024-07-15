import JobPage from "@/components/JobsPage";
import { Button } from "@/components/ui/button";
import { db } from "@/db";
import { JobsTable } from "@/db/schema";
import { eq } from "drizzle-orm";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";

interface PageProps {
  params: { slug: string };
}

const getJob = cache(async (slug: string) => {
  const job = await db.query.JobsTable.findFirst({
    where: eq(JobsTable.slug, slug),
    with: {
      author: {
        columns: {
          id: true,
          username: true,
        },
      },
    },
  });

  if (!job) notFound();

  return job;
});

export async function generateMetadata({
  params: { slug },
}: PageProps): Promise<Metadata> {
  const job = await getJob(slug);

  return {
    title: job.title,
  };
}

export default async function Page({ params: { slug } }: PageProps) {
  const job = await getJob(slug);

  const { applicationEmail, applicationUrl } = job;

  const applicationLink = applicationEmail
    ? `mailto:${applicationEmail}`
    : applicationUrl;

  if (!applicationLink) {
    console.error("Job has no application link or email");
    notFound();
  }

  return (
    <main className="m-auto my-10 flex max-w-5xl flex-col items-center gap-5 px-3 md:flex-row md:items-start">
      <JobPage job={job} Author={job.author} />
      <aside className="flex flex-col items-center gap-4">
        <Button asChild>
          <a href={applicationLink} className="w-40 md:w-fit">
           Approve
          </a>
        </Button>
        <Button asChild variant={"destructive"}>
          <a href={applicationLink} className="w-40 md:w-fit">
           Delete
          </a>
        </Button>
      </aside>
    </main>
  );
}
