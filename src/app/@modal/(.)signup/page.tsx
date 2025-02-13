import SignUpForm from "@/components/Forms/SignUpForm";
import ModalAuth from "./modal";

const page = () => {
  return (
    <ModalAuth>
      <SignUpForm />
    </ModalAuth>
  );
};

export default page;
