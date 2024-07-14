import { JobFilterValues } from "@/app/jobs/schemas/job.schema";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Label } from "@radix-ui/react-dropdown-menu";

type paginationProps = {
  filterValues: JobFilterValues;
  totalPages: number;
  currentPage: number;
};

export function PaginationDemo({
  filterValues,
  totalPages,
  currentPage,
}: paginationProps) {
  const { q, location, remote, type } = filterValues;

  const generateLink = (page: number) => {
    const url = new URLSearchParams({
      ...(q && { q }),
      ...(location && { location }),
      ...(type && { type }),
      ...(remote && { remote: "true" }),
      page: page.toString(),
    });
    return `/?${url.toString()}`;
  };
  console.log("total", totalPages);
  return (
    <Pagination>
      <PaginationContent>
        {!(currentPage <= 1) && (
          <PaginationItem>
            <PaginationPrevious href={generateLink(currentPage - 1)} />
          </PaginationItem>
        )}
        <Label>
          Page {currentPage} of {totalPages}
        </Label>
        {currentPage === totalPages && (
          <PaginationItem>
            <PaginationNext href={generateLink(currentPage + 1)} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
