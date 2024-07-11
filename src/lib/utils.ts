import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { formatDistanceToNowStrict } from "date-fns";
import { db } from "@/db";
import { JobsTable } from "@/db/schema";
import { isNotNull } from "drizzle-orm";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatCurrency = (money: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(money);
};

export const formatTime = (date: Date) => {
  return formatDistanceToNowStrict(date, { addSuffix: true });
};

export function toSlug(str: string) {
  return str
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
}

export const distinctLocations = async (): Promise<
  {
    locations: string | null;
  }[]
> => {
  return await db
    .selectDistinct({
      locations: JobsTable.location,
    })
    .from(JobsTable)
    .where(isNotNull(JobsTable.location));
};
