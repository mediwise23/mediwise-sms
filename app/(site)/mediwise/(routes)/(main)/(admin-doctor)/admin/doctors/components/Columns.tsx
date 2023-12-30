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
import ActionButton from "./ActionButton";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

type doctorType = {
  id: string;
  firstname: string;
  middlename: string;
  lastname: string;
  specialized: string;
  licenseNo: string;
  createdAt: Date;
  action: null;
};

export const columns: ColumnDef<doctorType>[] = [
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
    accessorKey: "licenseNo",
    accessorFn: (row) => {
      const licenseNo = row.licenseNo;
      return licenseNo;
    },
    header: ({ column }) => (
      <div
        className="text-[#181a19]  flex items-center cursor-pointer dark:text-white flex-1"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        License No. <ArrowUpDown className="ml-2 h-4 w-4" />
      </div>
    ),
    cell: ({ row }) => {
      // const yearEnrolled = row.getValue('') as Date
      const licenseNo = row.original.licenseNo as string;

      return (
        <div className="">{licenseNo}</div>
      );
    },
  },

  {
    accessorKey: "firstname",
    accessorFn: (row) => {
      const firstname = row.firstname;
      return firstname;
    },
    header: ({ column }) => {
      return (
        <div
          className="text-[#181a19] flex items-center cursor-pointer dark:text-white flex-1"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Firstname <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => {
      const firstname = row.original.firstname;
      return (
        <div className=" dark:text-white">
          {firstname}
        </div>
      );
    },
  },
  {
    accessorKey: "middlename",
    accessorFn: (row) => {
      const middlename = row.middlename;
      return middlename;
    },
    header: ({ column }) => (
      <div
        className="text-[#181a19] flex items-center cursor-pointer dark:text-white flex-1"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Middlename <ArrowUpDown className="ml-2 h-4 w-4" />
      </div>
    ),
    cell: ({ row }) => {
      const middlename = row.original?.middlename;

      return <div className={` flex items-center`}>{middlename}</div>;
    },
  },

  {
    accessorKey: "lastname",
    accessorFn: (row) => {
      const lastname = row.lastname || {};
      return lastname;
    },
    header: ({ column }) => (
      <div
        className="text-[#181a19]  flex items-center cursor-pointer dark:text-white flex-1"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Lastname <ArrowUpDown className="ml-2 h-4 w-4" />
      </div>
    ),
    cell: ({ row }) => {
      // const {firstname, middlename, lastname} = row.original.profile
      const lastname = row.original.lastname;
      return <div className={` flex items-center`}>{lastname}</div>;
    },
  },
  {
    accessorKey: "specialized",
    accessorFn: (row) => {
      const specialized = row.specialized;
      return specialized;
    },
    header: ({ column }) => (
      <div
        className="text-[#181a19]  flex items-center cursor-pointer dark:text-white flex-1"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Specialized <ArrowUpDown className="ml-2 h-4 w-4" />
      </div>
    ),
    cell: ({ row }) => {
      // const yearEnrolled = row.getValue('') as Date
      const specialized = row.original.specialized as string;

      return (
        <div className="">{specialized}</div>
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

  {
    accessorKey: "action",
    header: ({ column }) => {
      return (
        <div
          className=" text-[#181a19]  flex items-center cursor-pointer dark:text-white flex-1"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
        </div>
      );
    },
    cell: ({ row }) => {
      const createdAt = row.original?.createdAt;
      return (
        <ActionButton />
      );
    },
  },
];
