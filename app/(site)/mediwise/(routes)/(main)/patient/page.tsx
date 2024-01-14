import React from "react";

const page = () => {
  return (
    <div className="flex flex-col items-center">
      <section className=" flex flex-col md:flex-row justify-between gap-5 w-[70%] max-w-[1000px] items-center mt-20">
        <img src="/images/Clogo.png" alt="" />
        <h1 className="capitalize text-[3em] text-center md:text-left font-semibold dark:text-white">
          Welcome to Barangay Health Center
        </h1>
      </section>
    </div>
  );
};

export default page;
