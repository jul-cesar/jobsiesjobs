import { JobFilterValues } from "@/app/jobs/schemas/job.schema";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Label } from "@radix-ui/react-dropdown-menu";

type adminPageFilters = {
  order: string;
  page: number;
};

type paginationProps = {
  filterValues?: JobFilterValues;
  adminPageFilters?: adminPageFilters
  totalPages: number;
  currentPage: number;
};

export function PaginationDemo({
  filterValues,
  totalPages,
  adminPageFilters,
  currentPage,
}: paginationProps) {
  let Q: string | undefined;
  let Location: string | undefined;
  let Remote: boolean | undefined;
  let Type: string | undefined;

  if (filterValues) {
    const { q, location, remote, type } = filterValues;
    (Q = q), (Location = location), (Remote = remote);
    Type = type;
  }

  const generateLink = (page: number) => {
    const url = new URLSearchParams({
      ...(Q && { Q }),
      ...(Location && { Location }),
      ...(Type && { Type }),
      ...(Remote && { Remote: "true" }),
      page: page.toString(),
    });
    if(adminPageFilters){
      return `/jobs/admin?${url.toString()}`;
    }else{
      return `/jobs?${url.toString()}`;
    }
    
  };
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
        {!(currentPage === totalPages )&& (
          <PaginationItem>
            <PaginationNext href={generateLink(currentPage + 1)} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
