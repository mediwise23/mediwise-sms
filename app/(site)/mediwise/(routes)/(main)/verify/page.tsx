import { Button } from "@/components/ui/button";
import React from "react";

const page = () => {
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <img
            className="w-[150px] h-[70px] mr-2 object-cover"
            src="/images/mediwiseLogo.png"
            alt="logo"
          />
        <div className="w-full flex flex-col gap-y-3 p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8 ">
          <h1 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Verify account
          </h1>
          <p className="font-light text-gray-500 dark:text-gray-400">
            We have send a code to your email
          </p>
          <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5 flex flex-col" action="#">
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Enter the code
              </label>
              <input
                type="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Code"
              />
            </div>
            <Button
            variant={'link'}
            className="text-zinc-500 w-fit"
            >
              Send another code
            </Button>
            <Button
              type="button"
              className="self-end"
            >
              Submit
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default page;
