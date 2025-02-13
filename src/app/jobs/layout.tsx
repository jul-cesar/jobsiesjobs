import Navbar from "@/components/Navbar";
import { ReactNode } from "react";

const JobsLayout = ({
  children,
  modal,
}: {
  children: ReactNode;
  modal: ReactNode;
}) => {
  return (
    <section>
      <Navbar />
      {modal}
      {children}
    </section>
  );
};

export default JobsLayout;
