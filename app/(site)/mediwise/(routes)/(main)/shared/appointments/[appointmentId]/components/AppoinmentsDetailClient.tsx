"use client";
import Avatar from "@/components/Avatar";
import { Badge } from "@/components/ui/badge";
import { useQueryProcessor } from "@/hooks/useTanstackQuery";
import { cn } from "@/lib/utils";
import { TAppointment } from "@/schema/appointment";
import { TBarangay } from "@/schema/barangay";
import { TUser, TUserRaw } from "@/schema/user";
import { format } from "date-fns";
import { ArrowLeft } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import QRCode from "react-qr-code";

type AppoinmentsDetailClientProps = {
  currentUser: TUserRaw;
};

const DATE_FORMAT = `MMM d yyyy`;

const AppoinmentsDetailClient: React.FC<AppoinmentsDetailClientProps> = ({
  currentUser,
}) => {
  const params = useParams();
  const router = useRouter();
  const appointmentId = params?.appointmentId;
  const appointment = useQueryProcessor<
    TAppointment & { patient: TUser; doctor: TUser; barangay: TBarangay }
  >({
    url: `/appointments/${appointmentId}`,
    key: ["view-appointment"],
  });
  return (
    <div className="flex flex-col bg-white dark:bg-slate-900 shadow-md p-5 rounded-md">
      <ArrowLeft
        className="w-7 h-7 cursor-pointer rounded-md text-black dark:text-white"
        onClick={() =>
          // router.push(`/mediwise/${currentUser.role.toLocaleLowerCase()}`)
          router.back()

        }
      />

      <div className="flex justify-center w-full flex-col items-center gap-5">
        <section className="flex flex-col mt-10 w-[50vw] gap-y-5">
          <h1 className="text-3xl font-semibold">Appointment detail</h1>
          <div className="flex flex-col mt-10 gap-y-5">
            <div className="flex justify-between ">
              <strong>Qr code provided</strong>
              <QRCode
                value={`${process.env.NEXT_PUBLIC_SITE_URL}/mediwise/shared/appointments/${appointment?.data?.id as string}` ?? ""}
                className="w-[100px] h-[100px]"
              />
            </div>

            <div className="flex justify-between ">
              <strong>Barangay</strong>{" "}
              <span>{appointment.data?.barangay?.name}</span>
            </div>

            <div className="flex justify-between">
              <strong>Date</strong>{" "}
              <span>
                {format(
                  new Date(appointment.data?.date || new Date()),
                  DATE_FORMAT
                )}
              </span>
            </div>

            <div className="flex justify-between">
              <strong>Status</strong>{" "}
              <span>
                <Badge
                  className={cn(
                    "",
                    appointment.data?.status === "PENDING" && "bg-zinc-400",
                    appointment.data?.status === "CANCELLED" && "bg-rose-400",
                    appointment.data?.status === "REJECTED" && "bg-rose-500",
                    appointment.data?.status === "ACCEPTED" && "bg-blue-500",
                    appointment.data?.status === "COMPLETED" && "bg-green-500"
                  )}
                >
                  {appointment.data?.status}
                </Badge>
              </span>
            </div>
          </div>
        </section>

        <section className="flex flex-col mt-10 w-[50vw] gap-y-5">
          <h1 className="text-3xl font-semibold">Patient detail</h1>
          <div className="flex flex-col mt-10 gap-y-5">
            <div className="flex justify-between ">
              <strong>Photo</strong>
              <div className="border rounded-sm p-5">
                <Avatar
                  src={appointment?.data?.patient?.image}
                  className="w-[100px] h-[100px]"
                />
              </div>
            </div>

            <div className="flex justify-between ">
              <strong>Name</strong>{" "}
              <span>{appointment.data?.patient.name}</span>
            </div>
            <div className="flex justify-between">
              <strong>Status</strong>{" "}
              <span>
                <Badge
                  className={cn(
                    "bg-rose-500",
                    appointment.data?.patient.isVerified && "bg-green-500"
                  )}
                >
                  {appointment.data?.patient.isVerified
                    ? "VERIFIED"
                    : "NOT VERIFIED"}
                </Badge>
              </span>
            </div>
          </div>
        </section>

        <section className="flex flex-col mt-10 w-[50vw] gap-y-5">
          <h1 className="text-3xl font-semibold">Doctor detail</h1>
          <div className="flex flex-col mt-10 gap-y-5">
            <div className="flex justify-between ">
              <strong>Photo</strong>
              <div className="border rounded-sm p-5">
                <Avatar
                  src={appointment?.data?.doctor?.image}
                  className="w-[100px] h-[100px]"
                />
              </div>
            </div>

            <div className="flex justify-between ">
              <strong>Name</strong> <span>{appointment.data?.doctor.name}</span>
            </div>
            <div className="flex justify-between">
              <strong>Status</strong>{" "}
              <span>
                <Badge
                  className={cn(
                    "bg-rose-500",
                    appointment.data?.doctor.isVerified && "bg-green-500"
                  )}
                >
                  {appointment.data?.doctor.isVerified
                    ? "VERIFIED"
                    : "NOT VERIFIED"}
                </Badge>
              </span>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AppoinmentsDetailClient;
