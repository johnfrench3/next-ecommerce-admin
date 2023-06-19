import StoreSwitcher from "@/components/store-switcher";
import { MainNav } from "@/components/main-nav";
import { Search } from "@/components/search";
import { UserButton } from "@clerk/nextjs";

const Navbar = () => {
  return ( 
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <StoreSwitcher />
        <MainNav className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
          <Search />
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </div>
  );
};
 
export default Navbar;
