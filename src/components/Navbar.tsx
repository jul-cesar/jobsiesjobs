import { ThemeToggle } from "./ThemeToggle";
import { Button } from "./ui/button";
import { validateRequest } from "@/lib/validateRequest";
import UserDropdown from "./UserDropdown";
import Link from "next/link";

const Navbar = async () => {
  const { user } = await validateRequest();
  return (
    <nav className="start-0 top-0 z-20 sticky w-full border-b border-border bg-background">
      <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-2.5">
        <div className="flex items-center gap-6">
          <Link
            href="/jobs"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <h1 className="relative rotate-12 text-primary font-mono text-2xl font-bold underline">
              J
            </h1>
          </Link>
          {user?.rol === "admin" && (
            <Link
              href={"/jobs/admin"}
              className="text-gray-700 hover:text-indigo-600 underline"
            >
              {" "}
              Admin
            </Link>
          )}
        </div>

        <div className="flex items-center gap-2  ">
          <ThemeToggle />
          {!user?.id ? (
            <Link href="/signin">
              <Button>Get started</Button>
            </Link>
          ) : (
            <UserDropdown username={user.username} />
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
