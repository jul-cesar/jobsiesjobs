import NewJobForm from "@/components/Forms/NewJobForm";
import { validateRequest } from "@/lib/validateRequest";
import { redirect } from "next/navigation";

const page = async () => {
  const { user } = await validateRequest();

  if (!user) {
    redirect("/signin");
  }
  return <NewJobForm />;
};

export default page;
