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
import { TItemSms } from "@/schema/item-sms";
import { Item, Role } from "@prisma/client";
import { TSupplierSchema } from "@/schema/supplier";
import { TUser } from "@/schema/user";
import { TAppointment } from "@/schema/appointment";
import IllnessTab from "./illness/IllnessTab";
type DashboardClientProps = {
  tab: string;
  currentUser: Session['user']
};

const DashboardClient = ({ tab = "requests", currentUser }: DashboardClientProps) => {
  
  const transactions = useQueryProcessor<TItemTransaction[]>({
    url: `/transactions`,
    key: ['transactions-request']
  })

  const items = useQueryProcessor<(TItemSms & {items: Item[]})[]>({
    url: `/sms-item`,
    key: ['sms-item-dashboard'],
  })

  const suppliers = useQueryProcessor<(TSupplierSchema)[]>({
    url: `/supplier`,
    key: ['suppliers'],
  })

  const adminList = useQueryProcessor<(TUser[])>({
    url: `/users`,
    key: ['users', 'admin'],
    queryParams:{
      role: Role.ADMIN
    }
  })

  const illness = useQueryProcessor<({
		_count: {
			illness: number
		},
		illness: string
	}[])>({
    url: `/appointments/illness`,
    key: ['appointment', 'illness'],
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
  const monthName = new Date(new Date().getFullYear(), index, 1).toLocaleString('en-US', { month: 'short' }); // Get month abbreviation
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

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">
      <div onClick={() => handleSelectedTab("requests")}>
          <Widget
            title="Barangay requests"
            total={transactions.data?.length || 0}
            icon={LayoutDashboard}
            showTotal={true}
          />
        </div>
        <div onClick={() => handleSelectedTab("items")}>
          <Widget title="Inventory Items" total={items?.data?.length || 0} showTotal={true} icon={Columns} />
        </div>

        <div onClick={() => handleSelectedTab("illness")}>
          <Widget title="Common Disease" total={illness?.data?.length || 0} icon={Columns} />
        </div>
        <div onClick={() => handleSelectedTab("suppliers")}>
          <Widget title="Suppliers" total={suppliers?.data?.length || 0}   icon={Columns} />
        </div>

        <div onClick={() => handleSelectedTab("admin-list")}>
          <Widget title="Admin list" total={adminList?.data?.length || 0} icon={Columns} />
        </div>

      </div>
      
      <div className="flex flex-col mt-5">
        {(() => {
          if (tab === "requests") return <PatientsTab data={data} />;
          if (tab === "items") return <ItemsTab data={items?.data} currentUser={currentUser} />;
          if (tab === "illness") return <IllnessTab data={illness?.data || []}  />;
        })()}
      </div>
    </div>
  );
};

export default DashboardClient;
