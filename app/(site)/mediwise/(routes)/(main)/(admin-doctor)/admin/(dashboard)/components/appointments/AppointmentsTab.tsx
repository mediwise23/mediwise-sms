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

  const data = [
    {
      id: 1,
      numberOfAppointments: 53,
      month: "Jan",
    },

    {
      id: 2,
      numberOfAppointments: 65,
      month: "Feb",
    },

    {
      id: 3,
      numberOfAppointments: 277,
      month: "Mar",
    },
    {
      id: 4,
      numberOfAppointments: 523,
      month: "May",
    },

    {
      id: 5,
      numberOfAppointments: 232,
      month: "June",
    },

    {
      id: 6,
      numberOfAppointments: 53,
      month: "July",
    },

    {
      id: 7,
      numberOfAppointments: 123,
      month: "Aug",
    },

    {
      id: 8,
      numberOfAppointments: 78,
      month: "Sept",
    },
    {
      id: 9,
      numberOfAppointments: 45,
      month: "Oct",
    },
    {
      id: 10,
      numberOfAppointments: 324,
      month: "Nov",
    },

    {
      id: 11,
      numberOfAppointments: 76,
      month: "Dev",
    },
  ];

  return (
    <div className="grid grid-cols-5 gap-5">
      <div className="col-span-5 md:col-span-3 flex flex-col gap-5">
        <div className="shadow-md rounded-md p-5 dark:shadow-none dark:bg-slate-900 dark:text-white">
          <div className="flex flex-wrap items-center gap-5 md:gap-10 h-full">
            <Select
              onValueChange={(e) => setYear(parseInt(e))}
              defaultValue={year.toString()}
            >
              <SelectTrigger className="w-[300px] h-[50px] bg-transparent">
                <SelectValue placeholder="Select Years" />
              </SelectTrigger>
              <SelectContent>
                {yearSpan.map((year) => (
                  <SelectItem value={year.value.toString()} key={year.value}>
                    {year.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
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
