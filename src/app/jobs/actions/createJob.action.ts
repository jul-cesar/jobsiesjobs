"use server";

import { z } from "zod";
import { newJobSchema } from "../schemas/job.schema";
import { toSlug } from "@/lib/utils";
import { put } from "@vercel/blob";
import path from "path";
import { db } from "@/db";
import { JobsTable, newJob } from "@/db/schema";
import { redirect } from "next/navigation";
import { validateRequest } from "@/lib/validateRequest";

export const createNewJob = async (formData: FormData) => {
  const { user } = await validateRequest();
  const userId = user?.id as string;
  let companyLogoUrl;
  const values = Object.fromEntries(formData.entries());

  const {
    companyName,
    description,
    locationType,
    salary,
    title,
    type,
    applicationEmail,
    applicationUrl,
    companyLogo,
    location,
  } = newJobSchema.parse(values);

  const slug = `${toSlug(title)}-${crypto.randomUUID()}`;

  if (companyLogo) {
    const blob = await put(
      `company_logos/${slug}${path.extname(companyLogo.name)}`,
      companyLogo,
      {
        access: "public",
        addRandomSuffix: false,
      }
    );
    companyLogoUrl = blob.url;
  }

  const jobValues: newJob = {
    slug,
    title,
    type,
    locationType,
    location,
    description,
    salary: parseInt(salary),
    companyName,
    applicationEmail,
    applicationUrl,
    companyLogoUrl,
    approved: false,
    postedBy: userId,
  };

  await db.insert(JobsTable).values(jobValues);

  redirect("/succesfully-submited");
};
