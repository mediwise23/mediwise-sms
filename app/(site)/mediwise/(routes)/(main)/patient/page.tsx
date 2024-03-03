"use client"
import { Button } from "@/components/ui/button";
import { redirect, useRouter } from "next/navigation";
import React from "react";

const Page = () => {

  const router = useRouter()

  return (
    <div className="flex flex-col items-center w-full gap-y-32">
      <section className=" flex flex-col md:flex-row mt-32 justify-between w-[90%] lg:w-[60%] ">
        <div className="w-full flex flex-col font-semibold gap-y-3 ">
          <span className="text-[#5CA15D]">
            Welcome to mediwise barangay center
          </span>

          <h1 className="text-5xl ">
            We Care About Your{" "}
            <span className="text-[#5CA15D]">
              {" "}
              <br /> Health
            </span>
          </h1>
        </div>
        <div className="flex flex-col w-full items-center gap-y-5">
          <p className="text-sm">
            We will treat your health condition with a satisfying experience and
            professional service by an expert doctor
          </p>
          <div className="flex justify-between w-full">
            <Button onClick={() => {
              router.push('patient/appointments')
            }}>Request an appointment</Button>
          </div>
        </div>
      </section>

      <section className="w-[90%] lg:w-[60%]  max-h-[400px] grid sm:grid-cols-1 md:grid-cols-4  lg:grid-cols-4 grid-rows-1 gap-5">
        <div className="col-span-2">
          <img
            src="/images/doctor1.jpg"
            className=" rounded-md  h-full w-full object-cover"
            alt=""
          />
        </div>
        <div className="flex flex-col col-span-1 gap-5">
          <img
            src="/images/doctor2.jpg"
            className=" rounded-md h-[100px] w-full object-cover flex-1"
            alt=""
          />
          <img
            src="/images/doctor4.jpg"
            className=" rounded-md h-[100px] w-full object-cover flex-1"
            alt=""
          />
        </div>
        <div className="col-span-1">
          <img src="/images/doctor3.jpg" className=" rounded-md  h-full w-full object-cover object-top " alt="" />
        </div>
      </section>
    </div>
  );
};

export default Page;
