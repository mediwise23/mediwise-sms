import { TUser } from "@/schema/user";
import { Profile } from "@prisma/client";
import { format } from "date-fns";
import React from "react";

type GeneralUserInfoProps = {
  data: TUser & { profile: Profile };
};

const DATE_FORMAT = `d MMM yyyy`;

const GeneralUserInfo: React.FC<GeneralUserInfoProps> = ({ data }) => {
  return (
    <div className="flex flex-1 flex-col bg-white dark:bg-[#1F2937] p-5 rounded-lg gap-y-10">
      <h1 className="text-3xl">General Information</h1>

      <div className="flex justify-evenly">
        <div className="flex flex-col items-start flex-1">
          <p className="text-md dark:text-zinc-400">First Name</p>
          <span className="capitalize text-sm">
            {data?.profile?.firstname || "-"}
          </span>
        </div>
        <div className="flex flex-col items-start flex-1">
          <p className="text-md dark:text-zinc-400">Last Name</p>
          <span className="capitalize text-sm">
            {data?.profile?.lastname || "-"}
          </span>
        </div>
      </div>

      <div className="flex justify-evenly">
        <div className="flex flex-col items-start flex-1">
          <p className="text-md dark:text-zinc-400">Middle Name</p>
          <span className="capitalize text-sm">
            {data?.profile?.middlename || "-"}
          </span>
        </div>
        <div className="flex flex-col items-start flex-1">
          <p className="text-md dark:text-zinc-400">Phone Number</p>
          <span className="capitalize text-sm">
            {data?.profile?.contactNo || "-"}
          </span>
        </div>
      </div>

      <div className="flex justify-evenly">
        <div className="flex flex-col items-start flex-1">
          <p className="text-md dark:text-zinc-400">Email</p>
          <span className="text-sm">
          <span className=" text-sm">{data?.email || "-"}</span>

          </span>
        </div>
      </div>

      <div className="flex justify-evenly">
        <div className="flex flex-col items-start flex-1">
          <p className="text-md dark:text-zinc-400">Home Number</p>
          <span className=" text-sm">{data?.profile?.homeNo || "-"}</span>
        </div>
        <div className="flex flex-col items-start flex-1">
          <p className="text-md dark:text-zinc-400">Street</p>
          <span className="text-sm"> {data?.profile?.street || "-"}</span>
        </div>
      </div>

      <div className="flex justify-evenly">
        <div className="flex flex-col items-start flex-1">
          <p className="text-md dark:text-zinc-400">City</p>
          <span className="text-sm"> {'Caloocan' || "-"}</span>
        </div>
        <div className="flex flex-col items-start flex-1">
          <p className="text-md dark:text-zinc-400">Date created</p>
          <span className="text-sm">
            {" "}
            {format(new Date(data?.createdAt || new Date()), DATE_FORMAT)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default GeneralUserInfo;
