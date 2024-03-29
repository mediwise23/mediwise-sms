import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Sidebar from "./Sidebar";
import { Session } from "next-auth";
import { TGetUserById } from "@/service/user";

type MobileSidebarProps = {
  currentUser: TGetUserById | null;
};

export const MobileSidebar = ({ currentUser }: MobileSidebarProps) => {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition">
        <Menu />
      </SheetTrigger>
      <SheetContent side="left" className="p-0 bg-white">
        <Sidebar currentUser={currentUser} />
      </SheetContent>
    </Sheet>
  );
};
