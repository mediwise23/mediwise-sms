"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel as CarouselParent,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import React from "react";

const Carousel = () => {
  return (
    <CarouselParent className="w-full border-none">
      <CarouselContent className="border-none">
          <CarouselItem >
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <section
                    id="home"
                    className="flex justify-between gap-x-10 items-center clip-path:polygon(0%_0%,100%_0%,100%_100%)"
                  >
                    <img src="/images/Clogo.png" alt="" />
                    <div className="flex flex-col w-[60%] gap-y-10  ">
                      <h1 className="font-bold text-[40px]">
                        A path to a better health
                      </h1>
                      <p className="text-zinc-500">
                        A platform gives healthcare providers the tools they
                        need to manage medical inventory effectively, ensuring
                        that patients get the treatment they deserve, when they
                        need it.
                      </p>
                      <Button
                        className="w-fit text-md text-primary border-primary hover:text-primary"
                        variant={"outline"}
                      >
                        Get started
                      </Button>
                    </div>
                  </section>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>

          <CarouselItem >
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <section
                    id="home"
                    className="flex justify-between gap-x-10 items-center clip-path:polygon(0%_0%,100%_0%,100%_100%)"
                  >
                    <img src="/images/Clogo.png" alt="" />
                    <div className="flex flex-col w-[60%] gap-y-10  ">
                      <h1 className="font-bold text-[40px]">
                        A path to a better health
                      </h1>
                      <p className="text-zinc-500">
                        A platform gives healthcare providers the tools they
                        need to manage medical inventory effectively, ensuring
                        that patients get the treatment they deserve, when they
                        need it.
                      </p>
                      <Button
                        className="w-fit text-md text-primary border-primary hover:text-primary"
                        variant={"outline"}
                      >
                        Get started
                      </Button>
                    </div>
                  </section>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>

          <CarouselItem >
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                <section
        id="about-us"
        className="flex flex-row-reverse gap-x-10 items-center"
      >
        <img
          src="/images/BGPNU.jpeg"
          className=" w-[50%] h-[400px] object-cover rounded-md"
          alt=""
        />
        <div className="flex flex-col w-[50%] gap-y-10">
          <h1 className="font-bold text-[25px]">
            Find Out A Little More About Us
          </h1>
          <p className="text-zinc-500">
            MediWise, a meticulously designed web-based and mobile application,
            is tailor-made for use by the City Health Department and Barangays.
            This essential intermediary platform fosters seamless communication,
            coordination, and information exchange within a city's healthcare
            framework. The innovative system significantly streamlines
            healthcare data, resource, and service flows, ultimately aiming to
            boost efficiency and effectiveness in delivering healthcare services
            to the community. Serving as a central repository for critical
            healthcare data and enabling real-time collaboration, MediWise
            empowers healthcare professionals and local authorities to join
            forces, ensuring residents receive optimal care. In an age where
            swift information and resource exchange is pivotal, MediWise stands
            as a vital tool for enhancing the overall healthcare experience in a
            city.
          </p>
        </div>
      </section>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </CarouselParent>
  );
};

export default Carousel;
