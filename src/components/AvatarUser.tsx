import { validateRequest } from "@/lib/validateRequest";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export async function AvatarUser() {
  const { user } = await validateRequest();
  return (
    <Avatar>
      <AvatarImage src="" alt="@shadcn" />
      <AvatarFallback>{user?.username.split("").shift()}</AvatarFallback>
    </Avatar>
  );
}
