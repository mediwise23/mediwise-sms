import { Button } from "@/components/ui/button";
import React from "react";

const page = () => {
  return (
    <div className="flex flex-col  w-full mx-auto items-center mt-20 gap-y-40">
      <section
        className="w-full flex justify-center p-10 h-[700px] bg-zinc-50"
        id="home"
      >
        <div className=" w-[75%] flex justify-between gap-x-10 items-center clip-path:polygon(0%_0%,100%_0%,100%_100%)">
          <img src="/images/Clogo.png" alt="" />
          <div className="flex flex-col w-[60%] gap-y-10  ">
            <h1 className="font-bold text-[40px] uppercase">
              A path to a better health
            </h1>
            <p className="text-zinc-500 text-md">
              A platform gives healthcare providers the tools they need to
              manage medical inventory effectively, ensuring that patients get
              the treatment they deserve, when they need it.
            </p>
            <Button
              className="w-fit text-md text-primary border-primary hover:text-primary"
              variant={"outline"}
            >
              Get started
            </Button>
          </div>
        </div>
      </section>
      <section
        id="about-us"
        className="w-full flex justify-center p-10 h-[700px] "
      >
        <div className=" w-[75%] flex flex-row-reverse gap-x-10 items-center">
          <img
            src="/images/BGPNU.jpeg"
            className=" w-[50%] h-[400px] object-cover rounded-md"
            alt=""
          />
          <div className="flex flex-col w-[50%] gap-y-10">
            <h1 className="font-bold text-[40px] uppercase">
              Find Out A Little More About Us
            </h1>
            <p className="text-zinc-500 text-md">
              MediWise, a meticulously designed web-based and mobile
              application, is tailor-made for use by the City Health Department
              and Barangays. This essential intermediary platform fosters
              seamless communication, coordination, and information exchange
              within a city's healthcare framework. The innovative system
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

      <section className=" w-[75%] flex flex-col " id="guidelines">
        <h1 className="text-center text-[25px] font-semibold my-20 uppercase">
          A Few Guidelines On How To Use It
        </h1>

        <div className="flex gap-x-20">
          <div className="shadow-lg p-10 text-center font-semibold rounded-xl">
            <h2>Login/Signup</h2>
            <img src="/images/1.png" alt="" />
          </div>

          <div className="shadow-lg p-10 text-center font-semibold rounded-xl">
            <h2>Make an Appointment</h2>
            <img src="/images/2.png" alt="" />
          </div>

          <div className="shadow-lg p-10 text-center font-semibold rounded-xl">
            <h2>Go to your local Barangay.</h2>
            <img src="/images/3.png" alt="" />
          </div>
        </div>
      </section>

      <section
        className="bg-[#c5ebd3] w-full p-10 h-[600px] flex items-center relative"
        id="contact-us"
        style={{
          clipPath: "polygon(0 0, 100% 3%, 100% 100%, 0 98%)",
        }}
      >
        <img
          src="/images/contact2.png"
          className="absolute top-0 left-0  w-[500px]"
          alt=""
        />
        <img
          src="/images/contact4.png"
          className="absolute bottom-0 right-0 w-[500px]"
          alt=""
        />
        <div className="flex flex-col gap-y-10 w-[50%] mx-auto">
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
              <p>Mediwise@email.com</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default page;
