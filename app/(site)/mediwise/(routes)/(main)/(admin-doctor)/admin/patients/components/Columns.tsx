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

type patientsType = {
  id: string;
  firstname: string;
  middlename: string;
  lastname: string;
  email: string;
  barangay:string;
  contactNo: string;
  createdAt: Date;
  action: null;
};

export const columns: ColumnDef<patientsType>[] = [
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
    accessorKey: "email",
    accessorFn: (row) => {
      const email = row.email;
      return email;
    },
    header: ({ column }) => (
      <div
        className="text-[#181a19]  flex items-center cursor-pointer dark:text-white flex-1"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Email <ArrowUpDown className="ml-2 h-4 w-4" />
      </div>
    ),
    cell: ({ row }) => {
      // const yearEnrolled = row.getValue('') as Date
      const email = row.original.email as string;

      return (
        <div className="">{email}</div>
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
    accessorKey: "barangay",
    accessorFn: (row) => {
      const barangay = row.barangay;
      return barangay;
    },
    header: ({ column }) => (
      <div
        className="text-[#181a19]  flex items-center cursor-pointer dark:text-white flex-1"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Barangay <ArrowUpDown className="ml-2 h-4 w-4" />
      </div>
    ),
    cell: ({ row }) => {
      const barangay = row.original.barangay as string;

      return (
        <div className="">{barangay}</div>
      );
    },
  },

  {
    accessorKey: "contactNo",
    accessorFn: (row) => {
      const contactNo = row.contactNo;
      return contactNo;
    },
    header: ({ column }) => (
      <div
        className="text-[#181a19]  flex items-center cursor-pointer dark:text-white flex-1"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Contact No. <ArrowUpDown className="ml-2 h-4 w-4" />
      </div>
    ),
    cell: ({ row }) => {
      const contactNo = row.original.contactNo as string;

      return (
        <div className="">{contactNo}</div>
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
