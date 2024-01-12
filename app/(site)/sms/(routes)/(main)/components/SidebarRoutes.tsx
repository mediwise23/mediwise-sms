"use client";

import {
  CalendarDays,
  Home,
  Users,
  History,
  Blocks,
  Table,
} from "lucide-react";
import { MdHive } from "react-icons/md";
import { SidebarItem } from "./SidebarItem";
import { Role } from "@prisma/client";

type routeListType = {
  icon: any;
  label: string;
  href: string;
  roles: ("ALL" | Role)[];
};

const routesList: routeListType[] = [
  {
    icon: Home,
    label: "Dashboard",
    href: "",
    roles: ["STOCK_MANAGER"],
  },

  {
    icon: Table,
    label: "Transaction",
    href: "/transactions",
    roles: ["STOCK_MANAGER"],
  },
  {
    icon: Table,
    label: "Items",
    href: "/items",
    roles: ["STOCK_MANAGER"],
  },

  {
    icon: Table,
    label: "Barangay",
    href: "/barangay",
    roles: ["STOCK_MANAGER"],
  },
];

type SidebarRoutesProps = {
  role: Role;
};

export const SidebarRoutes = ({ role }: SidebarRoutesProps) => {
  return (
    <div className="flex flex-col w-full ">
      {routesList.map((route) => {
        if (!route.roles.includes(role)) {
          return null;
        }
        return (
          <SidebarItem
            key={route.href}
            icon={route.icon}
            label={route.label}
            href={`/sms/admin${route.href}`}
          />
        );
      })}
    </div>
  );
};
