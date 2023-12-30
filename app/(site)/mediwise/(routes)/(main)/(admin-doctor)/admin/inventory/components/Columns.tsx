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

type itemType = {
  id: string,
  name:string,
  stock: string,
  barangay:string,
  createdAt: Date,
  action:null,
};

export const columns: ColumnDef<itemType>[] = [
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
    accessorKey: "name",
    accessorFn: (row) => {
      const name = row.name;
      return name;
    },
    header: ({ column }) => {
      return (
        <div
          className="text-[#181a19] flex items-center cursor-pointer dark:text-white flex-1"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Item name <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => {
      const name = row.original.name;
      return (
        <div className=" dark:text-white">
          {name}
        </div>
      );
    },
  },
  {
    accessorKey: "stock",
    accessorFn: (row) => {
      const stock = row.stock;
      return stock;
    },
    header: ({ column }) => (
      <div
        className="text-[#181a19] flex items-center cursor-pointer dark:text-white flex-1"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Stock <ArrowUpDown className="ml-2 h-4 w-4" />
      </div>
    ),
    cell: ({ row }) => {
      const stock = row.original?.stock;

      return <div className={` flex items-center`}>{stock}</div>;
    },
  },

  {
    accessorKey: "barangay",
    accessorFn: (row) => {
      const barangay = row.barangay || {};
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
      const barangay = row.original.barangay;
      return <div className={` flex items-center`}>{barangay}</div>;
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
        <div>{createdAt.toLocaleDateString()}</div>
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
