import LogInForm from "@/components/Forms/LoginForm"
import ModalAuth from "./modal"

const page = () => {
  return (
   <ModalAuth>
    <LogInForm/>
   </ModalAuth>
  )
}

export default page