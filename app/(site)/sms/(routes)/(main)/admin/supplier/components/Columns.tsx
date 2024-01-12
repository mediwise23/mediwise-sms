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
import { TItemBrgy } from "@/schema/item-brgy";
import { format } from "date-fns";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
const DATE_FORMAT = `MMM d yyyy`;
export const columns: ColumnDef<TItemBrgy>[] = [
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
          Supplier name <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => {
      const name = row.original.name;
      return (
        <div className=" dark:text-white">
          DOH
        </div>
      );
    },
  },

  {
    accessorKey: "address",
    accessorFn: (row) => {
      const description = row.description;
      return description;
    },
    header: ({ column }) => (
      <div
        className="text-[#181a19] flex items-center cursor-pointer dark:text-white flex-1"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Address <ArrowUpDown className="ml-2 h-4 w-4" />
      </div>
    ),
    cell: ({ row }) => {
      const description = row.original?.description;
      return <div className={` flex items-center line-clamp-2`}>109 virginia st</div>;
    },
  },

  {
    accessorKey: "contactPerson",
    accessorFn: (row) => {
      const stock = row.stock;
      return stock;
    },
    header: ({ column }) => (
      <div
        className="text-[#181a19] flex items-center cursor-pointer dark:text-white flex-1"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Contact Person <ArrowUpDown className="ml-2 h-4 w-4" />
      </div>
    ),
    cell: ({ row }) => {
      const stock = row.original?.stock;

      return <div className={` flex items-center`}>Brian Dumasdas</div>;
    },
  },

  {
    accessorKey: "contactNo",
    accessorFn: (row) => {
      const unit = row.unit;
      return unit;
    },
    header: ({ column }) => (
      <div
        className="text-[#181a19] flex items-center cursor-pointer dark:text-white flex-1"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Contact No. <ArrowUpDown className="ml-2 h-4 w-4" />
      </div>
    ),
    cell: ({ row }) => {
      const unit = row.original?.unit;

      return <div className={` flex items-center`}>09561289642</div>;
    },
  },

  {
    accessorKey: "status",
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
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => {
      const createdAt = row.original?.createdAt;
      return (
        <div> <Badge>Active</Badge></div>
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
          Date Created
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => {
      const createdAt = row.original?.createdAt;
      return (
        <div> {format(new Date(createdAt || new Date()), DATE_FORMAT)}</div>
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
