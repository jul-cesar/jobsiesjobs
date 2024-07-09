"use server";

import { z } from "zod";
import { newJobSchema } from "../schemas/job.schema";
import { toSlug } from "@/lib/utils";
import { put } from "@vercel/blob";
import path from "path";
import { db } from "@/db";
import { JobsTable } from "@/db/schema";
import { redirect } from "next/navigation";

export const createNewJob = async (formData: FormData) => {
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

  type JobValues = {
    slug: string;
    title: string;
    type: string;
    locationType: string;
    location?: string;
    description: string;
    salary: number;
    companyName?: string;
    applicationEmail?: string;
    applicationUrl?: string;
    companyLogoUrl?: string;
    approved: boolean;
  };

  const jobValues: JobValues = {
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
  };

  await db.insert(JobsTable).values(jobValues);

  redirect("/succesfully-submited");
};
