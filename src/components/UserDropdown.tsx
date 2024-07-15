import { LogOut, User as UserIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { logout } from "@/app/auth/actions";
import { AvatarUser } from "./AvatarUser";

type UserDropdownProps = {
  username: string;
};

const UserDropdown = ({ username }: UserDropdownProps) => {
  return (
    <DropdownMenu >
      <DropdownMenuTrigger>
        <AvatarUser />
      </DropdownMenuTrigger>
      <DropdownMenuContent className={"w-44"}>
        <DropdownMenuLabel>{username}</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem>
            <form action={logout}>
              <button className="flex w-44">
                <LogOut className="mr-2 h-4 w-4" />
                Log Out
              </button>
            </form>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;
