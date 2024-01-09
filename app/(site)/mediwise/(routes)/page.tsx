import { Button } from "@/components/ui/button";
import React from "react";
import Navbar from "../../components/Navbar";
import Link from "next/link";
import { getSession } from "@/lib/auth";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await getSession();
  if (session?.user) {
    return redirect(`/mediwise/${session.user.role.toLowerCase()}`);
  }

  return (
    <div className="flex flex-col  w-full mx-auto items-center gap-y-32 md:gap-y-40 dark:bg-dark">
      <Navbar />
      <section
        className="w-full flex justify-center p-5 md:p-10 h-fit md:h-[700px] bg-[#c5ebd3] dark:bg-gray-800"
        id="home"
      >
        <div className="w-[95%] md:w-[75%] flex flex-col md:flex-row justify-start md:justify-between md:gap-x-10 items-center clip-path:polygon(0%_0%,100%_0%,100%_100%) pt-5">
          <img src="/images/Clogo.png" alt="" className="w-32 md:w-56" />
          <div className="flex flex-col md:w-[60%] gap-y-10  ">
            <h1 className="font-bold text-[30px] lg:text-[40px] uppercase">
              A path to a better health
            </h1>
            <p className="text-zinc-500 text-md">
              A platform gives healthcare providers the tools they need to
              manage medical inventory effectively, ensuring that patients get
              the treatment they deserve, when they need it.
            </p>
            <Link href={"/mediwise/register"} className="w-fit">
              <Button
                variant={"outline"}
                className="w-fit text-md text-primary border-primary hover:text-primary"
              >
                Get started
              </Button>
            </Link>
          </div>
        </div>
      </section>
      <section
        id="about-us"
        className="w-full flex justify-center p-5 md:p-10 h-fit md:h-[700px] bg-[#c5ebd3] dark:bg-gray-800"
      >
        <div className="w-[95%] md:w-[75%] flex flex-col md:flex-row-reverse gap-x-10 items-center">
          <img
            src="/images/BGPNU.jpeg"
            className="w-full md:w-[50%] h-[400px] object-cover rounded-md"
            alt=""
          />
          <div className="flex flex-col w-full md:w-[50%] gap-y-10">
            <h1 className="text-center md:text-left font-bold text-[40px] uppercase">
              Find Out A Little More About Us
            </h1>
            <p className="text-zinc-500 text-md">
              MediWise, a meticulously designed web-based and mobile
              application, is tailor-made for use by the City Health Department
              and Barangays. This essential intermediary platform fosters
              seamless communication, coordination, and information exchange
              within a city`s healthcare framework. The innovative system
              significantly streamlines healthcare data, resource, and service
              flows, ultimately aiming to boost efficiency and effectiveness in
              delivering healthcare services to the community. Serving as a
              central repository for critical healthcare data and enabling
              real-time collaboration, MediWise empowers healthcare
              professionals and local authorities to join forces, ensuring
              residents receive optimal care. In an age where swift information
              and resource exchange is pivotal, MediWise stands as a vital tool
              for enhancing the overall healthcare experience in a city.
            </p>
          </div>
        </div>
      </section>

      <section className="w-[75%] flex flex-col " id="guidelines">
        <h1 className="text-center text-[25px] font-semibold my-20 uppercase">
          A Few Guidelines On How To Use It
        </h1>

        <div className="flex flex-col md:flex-row gap-x-20 gap-y-10">
          <div className="shadow-2xl border-[.5px] p-10 text-center font-semibold rounded-xl dark:bg-gray-800">
            <h2>Login/Signup</h2>
            <img src="/images/1.png" alt="" />
          </div>

          <div className="shadow-2xl border-[.5px] p-10 text-center font-semibold rounded-xl dark:bg-gray-800">
            <h2>Make an Appointment</h2>
            <img src="/images/2.png" alt="" />
          </div>

          <div className="shadow-2xl border-[.5px] p-10 text-center font-semibold rounded-xl dark:bg-gray-800">
            <h2>Go to your local Barangay.</h2>
            <img src="/images/3.png" alt="" />
          </div>
        </div>
      </section>

      <section
        className=" w-full p-10 h-[600px] flex items-center relative bg-[#c5ebd3] dark:bg-gray-800"
        id="contact-us"
        style={{
          clipPath: "polygon(0 0, 100% 3%, 100% 100%, 0 98%)",
        }}
      >
        <img
          src="/images/contact2.png"
          className="absolute top-0 left-0 w-[200px] md:w-[300px] lg:w-[500px]"
          alt=""
        />
        <img
          src="/images/contact4.png"
          className="absolute bottom-0 right-0 w-[200px] md:w-[300px] lg:w-[500px]"
        />
        <div className="flex flex-col gap-y-10 w-[90%] md:w-[50%] mx-auto z-10 dark:bg-black bg-opacity-30 p-10 rounded-xl">
          <h1 className="text-3xl uppercase text-center">
            C o n t a c t &nbsp; U s
          </h1>
          <p className=" text-center">
            You can contact us from here, you can write a message to us, we will
            gladly assist you.
          </p>

          <div className="flex justify-between">
            <div className="address">
              <h3 className="font-semibold">Location</h3>
              <p>Caloocan City North - Philippines</p>
            </div>

            <div className="Phone">
              <h3 className="font-semibold">Email</h3>
              <p className="drop-shadow-2xl">Mediwise@email.com</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default page;
