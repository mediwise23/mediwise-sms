import { getSession } from "@/lib/auth";
import Navbar from "./components/Navbar";
import { redirect } from "next/navigation";
import { getUserById } from "@/service/user";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const currentUser = await getSession();

  if (!currentUser?.user) {
    return redirect("/mediwise");
  }

  const { user } = currentUser;

  const data = await getUserById({id: user.id})

  if(!data?.isVerified) {
    return redirect('/mediwise/verify')
  }

  if(!data?.barangayId) {
    return redirect('/mediwise/setup')
  }

  return (
    <main className=" h-full flex justify-center items-center py-10 px-20">
      <div className="h-[80px]  fixed inset-y-0 w-full z-50">
        <Navbar currentUser={user} />
      </div>
      <div className=" w-full overflow-hidden bg-white mt-[80px]">
        {children}
      </div>
    </main>
  );
};

export default Layout;
