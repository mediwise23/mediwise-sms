"use client";

import { useState } from "react";
import AlumniChart from "./AppointmentsChart";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery } from "@tanstack/react-query";
import AppointmentsChart from "./AppointmentsChart";
import AppointmentSummary from "./AppointmentSummary";
import { useQueryProcessor } from "@/hooks/useTanstackQuery";
import { Appointment } from "@prisma/client";

const yearSpan = [
  {
    value: 5,
    label: "5 Years",
  },
  {
    value: 10,
    label: "10 Years",
  },
  {
    value: 15,
    label: "15 Years",
  },
  {
    value: 20,
    label: "20 Years",
  },
  {
    value: 25,
    label: "25 Years",
  },
];

const AppointmentsTab = () => {
  const [year, setYear] = useState<number>(yearSpan[1].value);

  const appointments = useQueryProcessor<Appointment[]>({
    url: '/dashboard/appointments',
    key:['dashboard-data'],
    queryParams: {
      year
    }
  })

  const monthlyRequestCounts:any = {};

  // Iterate through the data and update the count for each month
  appointments?.data?.forEach(item => {
    const createdAt = new Date(item.createdAt);
    const month = createdAt.toLocaleString('en-US', { month: 'short' }); // Get month abbreviation
  
    // Initialize count for the month if it doesn't exist
    if (!monthlyRequestCounts[month]) {
      monthlyRequestCounts[month] = 0;
    }
  
    // Increment the count for the month
    monthlyRequestCounts[month]++;
  });
  
  // Create an array with all 12 months, setting count to 0 for the missing ones
  const data = Array.from({ length: 12 }, (_, index) => {
    const monthName = new Date(2024, index, 1).toLocaleString('en-US', { month: 'short' }); // Get month abbreviation
    return {
      id: index + 1,
      numberOfAppointments: monthlyRequestCounts[monthName] || 0,
      month: monthName,
    };
  });
  
  console.log('Monthly Request Counts:', data);

  return (
    <div className="grid grid-cols-5 gap-5">
      <div className="col-span-5 md:col-span-3 flex flex-col gap-5">
        <div className="shadow-md rounded-md p-5 dark:shadow-none dark:bg-slate-900 dark:text-white">
          
        </div>
        <div className="h-[550px] shadow-md rounded-md p-4 md:p-8 pb-10 dark:shadow-none dark:bg-slate-900 dark:text-white">
          <h2 className="text-center font-bold text-xl">GRAPH</h2>
          <AppointmentsChart data={data} />
        </div>
      </div>
      <div className="col-span-5 md:col-span-2 h-full max-h-[660px] shadow-md rounded-md p-4 md:p-8 pb-10 dark:shadow-none dark:bg-slate-900 dark:text-white">
        <h2 className="text-center font-bold text-xl sticky top-0">SUMMARY</h2>
        <div className="overflow-y-auto h-[90%] mt-2">
          <AppointmentSummary data={data || []} />
        </div>
      </div>
    </div>
  );
};
export default AppointmentsTab;
