import { Job } from "@/db/schema";
import { formatCurrency, formatTime } from "@/lib/utils";
import { Banknote, Clock, Globe2, MapPin } from "lucide-react";
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
      <img
        src={companyLogoUrl || companyLogoPlaceholder.src}
        alt={`${companyName} logo`}
        width={100}
        height={80}
        className="self-center rounded-lg"
      />
      <div className="flex-grow space-y-3">
        <header className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-medium">{title}</h2>
            <p className="text-muted-foreground underline">{companyName}</p>
          </div>
        </header>
        <section className="text-muted-foreground">
          <div className="flex items-center gap-1.5 sm:hidden">
            <div className="flex items-center gap-1.5">
              <Globe2 size={16} className="shrink-0" />
              {location || "Worldwide"} ({locationType})
            </div>
          </div>
          <p className="flex items-center gap-1.5 sm:hidden">
            <MapPin size={16} className="shrink-0" />
            {type}
          </p>
          <p className="hidden sm:flex items-center gap-1.5">
            <MapPin size={16} className="shrink-0" />
            {locationType}
          </p>
          <p className="flex items-center gap-1.5">
            <Banknote size={16} className="shrink-0" />
            {formatCurrency(salary)}
          </p>
          {type}
        </section>
        <time className="flex items-center self-end gap-1.5 sm:hidden text-xs">
          <Clock size={16} className="shrink-0" />
          {formatTime(createdAt)}
        </time>
      </div>
      <footer className="hidden shrink-0 flex-col items-end justify-between  sm:flex">
        <p className="flex items-center gap-1.5">
          <Globe2 size={16} className="shrink-0" />
          {location || "Worldwide"}
        </p>

        <time className="flex items-center gap-1.5 text-muted-foreground text-sm">
          <Clock size={16} />
          {formatTime(createdAt)}
        </time>
      </footer>
    </article>
  );
};

export default JobsListItem;
