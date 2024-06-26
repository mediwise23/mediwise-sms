"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Filter,
  GitPullRequestArrow,
  PackageSearch,
  Search,
} from "lucide-react";
import React, { useState } from "react";
import { DataTable } from "@/components/DataTable";
import { columns } from "./Columns";
import { Session } from "next-auth";
import { useModal } from "@/hooks/useModalStore";
import { useQueryProcessor } from "@/hooks/useTanstackQuery";
import { TItemBrgy } from "@/schema/item-brgy";
import { TItemSms } from "@/schema/item-sms";
import { TSupplierSchema } from "@/schema/supplier";
import { TItemTransaction } from "@/schema/item-transaction";
import { Barangay } from "@prisma/client";

type TransactionsClientProps = {
  currentUser: Session["user"];
};
const TransactionsClient: React.FC<TransactionsClientProps> = ({ currentUser }) => {
  const { onOpen } = useModal();

  const transactions = useQueryProcessor<(TItemTransaction & {barangay: Barangay})[]>({
    url: "/transactions",
    key: ["transactions",],
  });

  const [globalFilter, setGlobalFilter] = useState("");

  const onFilter = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGlobalFilter(e.target.value);
  };

  return (
    <div className="flex flex-col p-10">
      <div className="flex justify-end gap-x-5">
        {/* <Button
          className="text-zinc-500 dark:text-white bg-transparent"
          variant={"outline"}
          onClick={() => onOpen("createSmsItem", { user: currentUser })}
        >
          {" "}
          <PackageSearch className="w-5 h-5 mr-2" /> Add new medicine
        </Button> */}
      </div>

      <div className="flex items-center gap-5 my-10">
        <div className="border flex items-center rounded-md px-2 w-full flex-1">
          <Search className="w-5 h-5 font-semibold text-zinc-500 dark:text-white" />
          <Input
            className="inset-0 outline-none border-none active:outline-none hover:outline-none focus-visible:ring-0 focus-visible:ring-offset-0 text-sm bg-transparent"
            onChange={onFilter}
            type="text"
            value={globalFilter}
            placeholder="Search for transaction"
          />
        </div>
        {/* <Select>
          <SelectTrigger className="w-full flex-[0.3]  font-semibold text-zinc-500 dark:text-white">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent className="w-full flex-[0.3] font-semibold text-zinc-500 dark:text-white">
            <SelectItem value={"All"} key={"All"} className="cursor-pointer">
              {capitalizeWords("All")}
            </SelectItem>
            {roles?.map((value) => (
              <SelectItem value={value} key={value} className="cursor-pointer">
                {capitalizeWords(value).replaceAll("_", " ")}
              </SelectItem>
            ))}
          </SelectContent>
        </Select> */}

        {/* <Select value={department} onValueChange={(value) => setDepartment(value)}>
          <SelectTrigger className="w-full flex-[0.3]  font-semibold text-zinc-500 dark:text-white">
            <SelectValue placeholder="Department" />
          </SelectTrigger>
          <SelectContent className="w-full flex-[0.3] font-semibold text-zinc-500 dark:text-white">
            <SelectItem value={"All"} key={"All"} className="cursor-pointer">
              {capitalizeWords("All")}
            </SelectItem>

            {departments?.data?.map((value) => (
              <SelectItem value={value} key={value} className="cursor-pointer">
                {capitalizeWords(value)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select> */}

        <Button
          variant="outline"
          className="text-zinc-500 dark:text-white bg-transparent"
          onClick={() => {
            // setRole("All");
            // setDepartment("All");
            setGlobalFilter((prev) => "");
          }}
        >
          <Filter className="w-5 h-5 text-zinc-500" /> Clear Filters
        </Button>
      </div>

      {(() => {
        return (
          <DataTable
            columns={columns}
            data={transactions.data || []}
            globalFilter={globalFilter}
            setGlobalFilter={setGlobalFilter}
          />
        );
      })()}
    </div>
  );
};

export default TransactionsClient;
