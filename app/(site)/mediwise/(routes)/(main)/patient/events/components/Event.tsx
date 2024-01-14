import { Separator } from "@/components/ui/separator";
import { Clock, MapPin, Pin, Waypoints } from "lucide-react";
import React from "react";

const Event = () => {
  return (
    <div className="flex gap-x-16">
      <div className="flex flex-col gap-y-5 items-center">
        <span className="text-[#90EE74] text-4xl font-extrabold">Jan</span>
        <Separator className="h-1" />
        <span className="text-white text-4xl font-extrabold">27</span>
      </div>

      <div className="flex flex-col gap-y-3">
        <h1 className="text-3xl font-semibold text-white">
          Barangay Medical Mission
        </h1>

        <div className="flex flex-col gap-y-1">
          <span className="flex items-center gap-x-3 text-white">
            <MapPin className="w-5 h-5 text-[#90EE74]" />
            <p> Caloocan North City Hall</p>
          </span>
          <span className="flex items-center gap-x-3 text-white">
            <Clock className="w-5 h-5 text-[#90EE74]" />
            <p>Saturday, Jan 27, 2023 at 8:00 AM to 5 PM</p>
          </span>
        </div>

        <p className="text-white mt-10">
          Healing begins with compassion, and in unity, we find strength. Thank
          you for joining hands in our Barangay medical mission to bring health
          and hope to our community.
        </p>
      </div>
    </div>
  );
};

export default Event;
