"use server";

import { db } from "@/db";
import { JobsTable } from "@/db/schema";
import { validateRequest } from "@/lib/validateRequest";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

type formPrevState =
  | {
      message?: string;
    }
  | undefined;

export const approveJob = async (
  prevState: formPrevState,
  formData: FormData
): Promise<formPrevState> => {
  const { user } = await validateRequest();
  try {
    if (user?.rol !== "admin") {
      throw new Error("Not authorized");
    }
    const jobId = formData.get("jobId") as string;

    await db
      .update(JobsTable)
      .set({
        approved: true,
      })
      .where(eq(JobsTable.id, jobId));
    revalidatePath("/");
  } catch (error) {
    let message = "Unexpected error";

    if (error instanceof Error) {
      message = error.message;
    }
    return { message };
  }
};

export const deleteJob = async (
  prevState: formPrevState,
  formData: FormData
): Promise<formPrevState> => {
  const { user } = await validateRequest();
  try {
    if (user?.rol !== "admin") {
      throw new Error("Not authorized");
    }
    const jobId = formData.get("jobId") as string;

    await db.delete(JobsTable).where(eq(JobsTable.id, jobId));
    revalidatePath("/");
  } catch (error) {
    let message = "Unexpected error";

    if (error instanceof Error) {
      message = error.message;
    }
    return { message };
  }
  redirect("/jobs/admin");
};
