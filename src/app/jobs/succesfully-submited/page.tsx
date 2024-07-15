import HeroText from "@/components/HeroText";
import Sucess from "../../../../public/sucess.svg";
import Image from "next/image";
const page = () => {
  return (
    <main className="flex flex-col items-center justify-evenly h-screen p-6 ">
      <HeroText title="Your job position was successfully submited, we will review it and notify you." />
      <Image alt="sucess" src={Sucess} height={100} width={100} />
    </main>
  );
};

export default page;
