import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import Calendar from "./components/Calendar";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

const AppointmentPage = async () => {
  const session = await getSession();
  if (!session?.user) {
    return redirect("/");
  }

  const queryClient = new QueryClient();

  return (
    <div className="flex w-full bg-white dark:bg-[#020817]">
      <Calendar currentUser={session.user} />
    </div>
  );
};
export default AppointmentPage;
