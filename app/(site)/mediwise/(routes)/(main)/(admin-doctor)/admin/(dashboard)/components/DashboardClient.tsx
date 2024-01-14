"use client";
import React from "react";
import Widget from "./Widget";
import { LucideUserSquare2, LayoutDashboard, Box } from "lucide-react";
import AppointmentsTab from "./appointments/AppointmentsTab";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import qs from "query-string";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useQueryProcessor } from "@/hooks/useTanstackQuery";
import PatientsTab from "./patients/PatientsTab";

type DashboardClientProps = {
  tab: string;
};

type WidgetsRecord = {
  appointments: number;
  items: number;
  patients: number;
};

const DashboardClient = ({ tab = "appointments" }: DashboardClientProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace, push } = useRouter();

  const widgets = useQueryProcessor<WidgetsRecord>({
    url: "/dashboard/admin/widgets",
    queryParams: {},
    key: ["dashboard-total-record"],
  });

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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <div onClick={() => handleSelectedTab("appointments")}>
          <Widget
            title="Appointments"
            total={widgets.data?.appointments || 0}
            icon={LucideUserSquare2}
          />
        </div>
        <div onClick={() => handleSelectedTab("patients")}>
          <Widget
            title="Patients"
            total={widgets.data?.patients || 0}
            icon={LayoutDashboard}
          />
        </div>
        <div>
          {/* <Widget
            title="Items"
            total={widgets.data?.items || 0}
            icon={GraduationCap}
          /> */}
          <AlertDialog>
            <AlertDialogTrigger className="w-full text-left">
              <Widget
                title="Items"
                total={widgets.data?.items || 0}
                icon={Box}
              />
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will navigate you to inventory page.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => push("/mediwise/admin/inventory")}
                >
                  Continue anyway
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
      <div className="flex flex-col mt-5">
        {(() => {
          if (tab === "appointments") return <AppointmentsTab />;
          else if (tab === "patients") return <PatientsTab />;
        })()}
      </div>
    </div>
  );
};

export default DashboardClient;
