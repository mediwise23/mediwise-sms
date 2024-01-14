import { getSession } from "@/lib/auth";
import Navbar from "./components/Navbar";
import { redirect } from "next/navigation";
import { getUserById } from "@/service/user";
import { Role } from "@prisma/client";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const currentUser = await getSession();

  if (!currentUser?.user) {
    return redirect("/mediwise");
  }

  const { user } = currentUser;

  const data = await getUserById({id: user.id})

  if (currentUser?.user.role !== Role.PATIENT) {
    return redirect("/mediwise");
  }
  
  if(!data?.isVerified) {
    return redirect('/mediwise/verify')
  }

  if(!data?.barangayId) {
    return redirect('/mediwise/setup')
  }

 

  return (
    <main className=" h-full flex justify-center items-center py-10 bg-white">
      <div className="h-[80px]  fixed inset-y-0 w-full z-50">
        <Navbar currentUser={user} />
      </div>
      <div className=" w-full overflow-hidden mt-[80px]">
        {children}
      </div>
    </main>
  );
};

export default Layout;
