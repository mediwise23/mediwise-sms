import { getSession } from "@/lib/auth";
import Sidebar from "./components/Sidebar";
import { Navbar } from "./components/Navbar";
import { redirect } from "next/navigation";

const Layout = async ({ children }: { children: React.ReactNode }) => {

  const currentUser = await getSession();

  if (!currentUser?.user) {
    return redirect('/mediwise');
  }
  const {user} = currentUser

  return (
      <main className=" h-full bg-[#F9FAFC] flex justify-center items-center py-10 px-20">
        <div className="h-[80px] md:pl-56 fixed inset-y-0 w-full z-50">
        <Navbar currentUser={user} />
      </div>
        <div className="h-[90%] w-80 fixed left-10 top-10 shadow-2xl rounded-xl  bg-white overflow-hidden">
          <Sidebar currentUser={user} />
        </div>
        <div className="md:ml-80 w-full h-[90vh] shadow-2xl rounded-xl overflow-hidden bg-white">
          {children}
        </div>
        </main>
  );
};

export default Layout;
