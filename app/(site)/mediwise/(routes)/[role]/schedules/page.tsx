import {
    HydrationBoundary,
    QueryClient,
    dehydrate,
  } from "@tanstack/react-query";
import Calendar from "./components/Calendar";
  const SchedulesPage = async () => {
    // const queryClient = new QueryClient();
    // const currentUser = await getCurrentUser();
  
    // await queryClient.prefetchQuery({
    //   queryKey: ["events"],
    //   queryFn: () => queryFn("/events"),
    // });
  
    return (
        <div className="flex w-full bg-white p-6 dark:bg-[#020817]">
          <Calendar />
        </div>
    );
  };
  export default SchedulesPage;
  