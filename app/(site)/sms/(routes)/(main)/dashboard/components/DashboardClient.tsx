"use client";

import React from "react";
import PatientsTab from "./patients/PatientsTab";
import { useQueryProcessor } from "@/hooks/useTanstackQuery";
import { TItemTransaction } from "@/schema/item-transaction";
type DashboardClientProps = {
  tab: string;
};

const DashboardClient = ({ tab = "barangay" }: DashboardClientProps) => {
  
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

console.log('Monthly Request Counts:', data);
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">Barangay Request Per Month</h1>
      <div className="flex flex-col mt-5">
        {(() => {
          if (tab === "barangay") return <PatientsTab data={data} />;
        })()}
      </div>
    </div>
  );
};

export default DashboardClient;
