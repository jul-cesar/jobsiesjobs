"use server";

import { redirect } from "next/navigation";
import { jobFilterSchema } from "../schemas/job.schema";

export async function filterJobs(formData: FormData) {

  console.log(formData)
  const values = Object.fromEntries(formData.entries());

  const { q, type, location, remote } = jobFilterSchema.parse(values);

  const searchParams = new URLSearchParams({
    ...(q && { q: q.trim() }),
    ...(type && { type }),
    ...(location && { location }),
    ...(remote && { remote: "true" }),
  });

  redirect(`/jobs?${searchParams.toString()}`);
}
