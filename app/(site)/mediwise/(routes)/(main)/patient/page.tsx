"use client";
import { Button } from "@/components/ui/button";
import { redirect, useRouter } from "next/navigation";
import React from "react";

const Page = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center w-full gap-y-32">
      <div className="bg-[#DAF2FB] py-20 w-full">
        <div className="container mx-auto flex flex-col lg:flex-row items-center">
          {/* Left Column (Image) */}
          <div className="lg:w-1/2 mb-10 lg:mb-0">
            <img
              src="/images/pics/doctor.png"
              alt="Your Image"
              className="mx-auto lg:mx-0 w-full rounded-lg"
            />
          </div>

          {/* Right Column (Text) */}
          <div className="lg:w-1/2 lg:pl-10 text-black gap-y-3">
            <h1 className="text-4xl lg:text-5xl font-bold mb-4  text-nowrap">
              {" "}
              <span className="text-[#147174]">Bringin Health</span> To <br />{" "}
              Life For The Whole Family
            </h1>
            <p className="text-md text-black mb-8">
              Utilizing all of our knowledge, potential and experties in
              contemporary medicine, We strive to get the best results possible
            </p>
            <Button
              className="bg-[#147174]"
              onClick={() => {
                router.push("patient/appointments");
              }}
            >
              Request an appointment
            </Button>

            <div className=" flex justify-between mt-20">
              <span className="flex flex-col">
                <span className="font-extrabold text-3xl">24/7</span>
                <span className="font-semibold">Online Support</span>
              </span>

              <span className="flex flex-col">
                <span className="font-extrabold text-3xl">80+</span>
                <span className="font-semibold">Doctor</span>
              </span>

              <span className="flex flex-col">
                <span className="font-extrabold text-3xl">100k+</span>
                <span className="font-semibold">Customer</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      <section className=" flex flex-col md:flex-row justify-between w-[90%] lg:w-[60%] ">
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
