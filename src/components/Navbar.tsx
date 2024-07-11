import { ThemeToggle } from "./ThemeToggle";
import { Button } from "./ui/button";
import { validateRequest } from "@/lib/validateRequest";
import UserDropdown from "./UserDropdown";

const Navbar = async () => {
  const { user } = await validateRequest();
  return (
    <nav className="start-0 top-0 z-20 w-full border-b border-border bg-background">
      <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
        <a
          href="/jobs"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <h1 className="relative rotate-12 text-primary font-mono text-2xl font-bold underline">
            J
          </h1>
        </a>
        <div className="flex items-center justify-between gap-2">
          <ThemeToggle />
          {!user?.id ? (
            <Button>Get started</Button>
          ) : (
            <UserDropdown username={user.username} />
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
