"use client";

import React from "react";
import PatientsTab from "./patients/PatientsTab";
import { useQueryProcessor } from "@/hooks/useTanstackQuery";
import { TItemTransaction } from "@/schema/item-transaction";
import Widget from "./Widget";
import { Columns, LayoutDashboard } from "lucide-react";
import qs from "query-string";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import ItemsTab from "./items/ItemsTab";
import { Session } from "next-auth";
type DashboardClientProps = {
  tab: string;
  currentUser: Session['user']
};

const DashboardClient = ({ tab = "requests", currentUser }: DashboardClientProps) => {
  
  const transactions = useQueryProcessor<TItemTransaction[]>({
    url: `/transactions`,
    key: ['transactions-request']
  })

  const monthlyRequestCounts:any = {};

// Iterate through the data and update the count for each month
const getOnlyTransactionThisYear = transactions?.data?.filter((transaction) => new Date(transaction?.createdAt).getFullYear() == new Date().getFullYear() )

getOnlyTransactionThisYear?.forEach(item => {
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
    numberOfRequest: monthlyRequestCounts[monthName] || 0,
    month: monthName,
  };
});
const searchParams = useSearchParams();
const pathname = usePathname();
const { replace, push } = useRouter();
const handleSelectedTab = (tab: string) => {
  if (searchParams) {
    let currentQueries = qs.parse(searchParams.toString());
    const newQueries = { ...currentQueries, tab: tab };

    const newParams = qs.stringify(newQueries, {
      skipEmptyString: true,
      skipNull: true,
    });
    replace(`${pathname}?${newParams}`);
  }
};

console.log('Monthly Request Counts:', data);
  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
      <div onClick={() => handleSelectedTab("requests")}>
          <Widget
            title="Barangay requests"
            total={100 || 0}
            icon={LayoutDashboard}
          />
        </div>
        <div onClick={() => handleSelectedTab("items")}>
          <Widget title="Inventory Items" total={100 || 0} icon={Columns} />
        </div>
      </div>
      
      <div className="flex flex-col mt-5">
        {(() => {
          if (tab === "requests") return <PatientsTab data={data} />;
          if (tab === "items") return <ItemsTab currentUser={currentUser} />;
        })()}
      </div>
    </div>
  );
};

export default DashboardClient;
