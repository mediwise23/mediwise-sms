"use client";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import Avatar from "@/components/Avatar";
import { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

type appointmentsType = {
  id: string;
  doctor: string;
  patient: string;
  date: Date;
  status: string;
  createdAt: Date;
};

export const columns: ColumnDef<appointmentsType>[] = [
  {
    accessorKey: "id",
    header: () => {
      return <div className="sr-only dark:text-white">Id</div>;
    },
    cell: ({ row }) => {
      const id = row.getValue("id") as string;

      return <div className="sr-only dark:text-white">{id}</div>;
    },
  },
  {
    accessorKey: "date",
    accessorFn: (row) => {
      const date = row.date;
      return date;
    },
    header: ({ column }) => {
      return (
        <div
          className="text-[#181a19] flex items-center cursor-pointer dark:text-white flex-1"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => {
      const date = row.original.date;
      return (
        <div className=" dark:text-white">
          {date.toLocaleDateString()}
        </div>
      );
    },
  },
  {
    accessorKey: "doctor",
    accessorFn: (row) => {
      const doctor = row.doctor;
      return doctor;
    },
    header: ({ column }) => (
      <div
        className="text-[#181a19] flex items-center cursor-pointer dark:text-white flex-1"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        doctor <ArrowUpDown className="ml-2 h-4 w-4" />
      </div>
    ),
    cell: ({ row }) => {
      const doctor = row.original?.doctor;

      return <div className={` flex items-center`}>{doctor}</div>;
    },
  },
  {
    accessorKey: "patient",
    accessorFn: (row) => {
      const patient = row.patient;
      return patient;
    },
    header: ({ column }) => (
      <div
        className="text-[#181a19]  flex items-center cursor-pointer dark:text-white flex-1"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Patient <ArrowUpDown className="ml-2 h-4 w-4" />
      </div>
    ),
    cell: ({ row }) => {
      // const studentNo = row.original.profile?.studentNumber as string;
      const patient = row.original.patient;
      return <div className={``}>{patient}</div>;
    },
  },
  {
    accessorKey: "status",
    accessorFn: (row) => {
      const status = row.status;
      return status;
    },
    header: ({ column }) => (
      <div
        className="text-[#181a19]  flex items-center cursor-pointer dark:text-white flex-1"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Status <ArrowUpDown className="ml-2 h-4 w-4" />
      </div>
    ),
    cell: ({ row }) => {
      // const yearEnrolled = row.getValue('') as Date
      const status = row.original.status as string;

      return (
        <div className={``}>
          <Badge className={cn(
              "dark:text-white bg-slate-500",
              status === "PENDING" && "bg-slate-500",
              status === "REJECTED" && "bg-rose-700",
              status === "ACCEPTED" || status === "COMPLETED" && "bg-[#16A34A]"
            )}>
            {status}
          </Badge>{" "}
        </div>
      );
    },
  },

  {
    accessorKey: "createdAt",
    accessorFn: (row) => {
      const createdAt = row.createdAt;
      return createdAt;
    },
    header: ({ column }) => {
      return (
        <div
          className=" text-[#181a19]  flex items-center cursor-pointer dark:text-white flex-1"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          CreatedAt
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => {
      const createdAt = row.original?.createdAt;
      return (
        <div className="">{createdAt.toLocaleDateString()}</div>
      );
    },
  },
];
