"use client";

import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

interface SidebarItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
}

export const SidebarItem = ({ icon: Icon, label, href }: SidebarItemProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const isActive = pathname == href;
  
  const onClick = () => {
    router.push(href);
  };

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-x-2 text-slate-500 text-sm font-[500] pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/20 dark:bg-[#020817] dark:text-white",
        isActive &&
          "text-[#FD7E14] bg-[#f5e9dc] hover:bg-[#f5e9dc] hover:text-[#FD7E14]"
      )}
    >
      {/* <button type="button"> */}
      <div className="flex items-center gap-x-2 py-4">
        <Icon
          size={18}
          className={cn(
            "text-slate-500 dark:bg-transparent dark:text-white",
            isActive && "text-[#FD7E14]"
          )}
        />
        {label}
      </div>
      <div
        className={cn(
          "ml-auto opacity-0 border-2 border-[#FD7E14] h-full transition-all",
          isActive && "opacity-100"
        )}
      />
      {/* </button> */}
    </Link>
  );
};
