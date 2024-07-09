import Navbar from "@/components/Navbar";
import { ReactNode } from "react";

const JobsLayout = ({ children }: { children: ReactNode }) => {
  return (
    <section>
      <Navbar />
      {children}
    </section>
  );
};

export default JobsLayout;
