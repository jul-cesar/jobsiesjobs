import { z } from "zod";
import { jobTypes, locationTypes } from "./job.types";

const requiredString = z.string().min(1, { message: "This field is required" });
const requiredImgFile = z
  .custom<File | undefined>()
  .refine(
    (file) => !file || (file instanceof File && file.type.startsWith("image/")),
    { message: "The file must be an image" }
  );

const numericValidator = requiredString.regex(/^\d+$/, "Must be a number");

const jobApplicationSchema = z
  .object({
    applicationEmail: z.string().max(100).email().optional().or(z.literal("")),
    applicationUrl: z.string().max(200).url().optional().or(z.literal("")),
  })
  .refine((data) => data.applicationEmail || data.applicationUrl, {
    message: "Email or url is required",
    path: ["applicationEmail"],
  });

const locationSchema = z
  .object({
    locationType: requiredString.refine(
      (value) => locationTypes.includes(value),

      { message: "Invalid location type" }
    ),
    location: z.string().max(100).optional(),
  })
  .refine(
    (data) =>
      !data.locationType || data.locationType === "Remote" || data.location,
    {
      message: "Location is required for on site jobs.",
      path: ["location"],
    }
  );

export const newJobSchema = z
  .object({
    title: requiredString.max(100),
    type: requiredString.refine(
      (type) => jobTypes.includes(type),
      "Invalid job type."
    ),
    companyName: requiredString.max(100),
    companyLogo: requiredImgFile,
    description: z.string().max(6000),
    salary: numericValidator.max(9, "Number cant be longer than 9 digits"),
  })
  .and(jobApplicationSchema)
  .and(locationSchema);

export const jobFilterSchema = z.object({
  q: z.string().optional(),
  type: z.string().optional(),
  location: z.string().optional(),
  remote: z.coerce.boolean().optional(),
});

export type JobFilterValues = z.infer<typeof jobFilterSchema>;

export type newJobType = z.infer<typeof newJobSchema>;
