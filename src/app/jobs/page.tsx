import JobsList from "@/components/JobsList";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const page = () => {
  return (
    <main className="m-auto my-10 max-w-5xl space-y-10 px-3">
      <div className="space-y-5 text-center">
        <h1>Jobs</h1>
        <p className="text-muted-foreground">Find your dream job.</p>
      </div>
      <Link href={"/jobs/new"}>
      <Button>Add</Button>

      </Link>

      <section className="flex flex-col-reverse gap-4 sm:flex-row-reverse">
        <JobsList />
      </section>
    </main>
  );
};

export default page;
