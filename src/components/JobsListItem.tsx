import { Job } from "@/db/schema";
import { formatCurrency, formatTime } from "@/lib/utils";
import {
  Badge,
  Banknote,
  Briefcase,
  Clock,
  Globe2,
  MapPin,
} from "lucide-react";
import Image from "next/image";
import companyLogoPlaceholder from "@/assets/company-logo-placeholder.png";

type JobsListItemProps = {
  job: Job;
};
const JobsListItem = ({
  job: {
    companyLogoUrl,
    companyName,
    location,
    locationType,
    salary,
    title,
    type,
    createdAt,
  },
}: JobsListItemProps) => {
  return (
    <article className="flex gap-3 rounded-lg border p-5 hover:bg-muted/60">
      <Image
        src={companyLogoUrl || companyLogoPlaceholder}
        alt={`${companyName} logo`}
        width={100}
        height={100}
        className="self-center rounded-lg"
      />
      <div className="flex-grow space-y-3">
        <div>
          <h2 className="text-xl font-medium">{title}</h2>
          <p className="text-muted-foreground">{companyName}</p>
        </div>
        <div className="text-muted-foreground">
          <p className="flex items-center gap-1.5 sm:hidden">
            <Briefcase size={16} className="shrink-0" />
            {type}
          </p>
          <p className="flex items-center gap-1.5">
            <MapPin size={16} className="shrink-0" />
            {locationType}
          </p>
          <p className="flex items-center gap-1.5">
            <Globe2 size={16} className="shrink-0" />
            {location || "Worldwide"}
          </p>
          <p className="flex items-center gap-1.5">
            <Banknote size={16} className="shrink-0" />
            {formatCurrency(salary)}
          </p>
          <p className="flex items-center gap-1.5 sm:hidden">
            <Clock size={16} className="shrink-0" />
            {formatTime(createdAt)}
          </p>
        </div>
      </div>
      <div className="hidden shrink-0 flex-col items-end justify-between sm:flex">
        <Badge>{type}</Badge>
        <span className="flex items-center gap-1.5 text-muted-foreground">
          <Clock size={16} />
          {formatTime(createdAt)}
        </span>
      </div>
    </article>
  );
};

export default JobsListItem;
