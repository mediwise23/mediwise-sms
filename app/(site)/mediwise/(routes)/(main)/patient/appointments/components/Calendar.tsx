"use client";
import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useModal } from "@/hooks/useModalStore";
import {
  apiClient,
  useMutateProcessor,
  useQueryProcessor,
} from "@/hooks/useTanstackQuery";
import { useQueryClient } from "@tanstack/react-query";
import {
  AppoinmentStatus,
  Appointment,
  Profile,
  Role,
  User,
  WorkSchedule,
} from "@prisma/client";
import { useToast } from "@/components/ui/use-toast";
import { Session } from "next-auth";

import { TProfile, TUser } from "@/schema/user";
import Avatar from "@/components/Avatar";
import moment from "moment-timezone";
import AppointmentItem from "./AppointmentItem";
import { Button } from "@/components/ui/button";
import { Divide } from "lucide-react";
import { Loader2 } from "@/components/ui/Loader";
type CalendarClientProps = {
  currentUser: TUser;
};

const Calendar: React.FC<CalendarClientProps> = ({ currentUser }) => {
  const { onOpen, onClose } = useModal();
  const { toast } = useToast();
  const [selectInfo, setSelectInfo] = useState<any>();
  const workSchedules = useQueryProcessor<
    (WorkSchedule & { doctor: TUser & { profile: Profile } })[]
  >({
    url: `/work-schedules`,
    key: ["work-schedules"],
    queryParams: {
      barangayId: currentUser.barangayId,
    },
  });

  const currentworkSchedules =
    typeof workSchedules.data !== "undefined" && workSchedules?.data?.length > 0
      ? workSchedules.data.map((workSchedule) => {
          const { doctor } = workSchedule;
          return {
            id: workSchedule?.id,
            title: workSchedule?.title,
            start: workSchedule?.start,
            end: workSchedule?.end,
            allDay: workSchedule?.allDay,
            doctorName: `${doctor.profile.firstname} ${doctor.profile.lastname}`,
            image: doctor?.image,
          };
        })
      : [];

  const handleDateSelect = (selectInfo: any) => {
    const calendarApi = selectInfo;
    setSelectInfo(calendarApi);
    // onOpen("addWorkSchedule", { calendarApi, user: currentUser });
  };

  type EventData = {
    id: string;
    title: string;
    date: Date;
    allDay: boolean;
    doctorId: string;
    patientId: string;
    status: AppoinmentStatus;
    barangayId: string;
  };

  const currentAppointment = useQueryProcessor<
    (Appointment & {
      doctor: TUser & { profile: TProfile };
      patient: TUser & { profile: TProfile };
    })[]
  >({
    url: "/appointments",
    key: ["appointments", currentUser.id],
    queryParams: {
      date: selectInfo?.startStr,
      barangayId: currentUser.barangayId,
    },
  });

  useEffect(() => {
    currentAppointment.refetch();
  }, [selectInfo]);
  const createAppointment = useMutateProcessor<EventData, null>({
    url: "/appointments",
    method: "POST",
    key: ["appointments", currentUser.id],
  });

  const handleAddEvent = ({ event }: any) => {
    const eventData = {
      id: event.id,
      title: event.title,
      date: event.start,
      doctorId: event?._def.extendedProps.doctorId,
      patientId: event?._def.extendedProps.patientId,
      status: event?._def.extendedProps.status,
      barangayId:
        event?._def.extendedProps.barangayId || currentUser.barangayId,
    } as EventData;

    createAppointment.mutate(eventData, {
      onSuccess(data, variables, context) {
        console.log(data);
        toast({
          title: "Appointment has been added",
        });
      },
      onError(error, variables, context) {
        console.error(error);
        toast({
          title: "Appointment failed",
          variant: "destructive",
        });
      },
    });
  };

  const handleUpdateEvent = ({ event }: any) => {
    // const eventData = {
    //   id: event.id,
    //   title: event.title,
    //   timeStart: event.start,
    //   timeEnd: event.end,
    //   allDay: event.allDay,
    // };
    // updateEvent(event.id, eventData);
  };

  const handleEventClick = (calendarApi: any) => {
    // onOpen("viewEvent", { calendarApi });
  };

  const handleDeleteEvent = ({ event }: any) => {
    console.log("deleting event");
    // deleteEvent(event.id);
  };

  return (
    <div className="w-full h-full flex gap-x-3">
      <div className="w-full flex-[0.8]">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          dayHeaderClassNames={"text-sky-700 text-sm font-medium uppercase"}
          validRange={{
            start: new Date(),
          }}
          height={"100vh"}
          initialView="dayGridMonth"
          // longPressDelay={0}

          selectAllow={(event) => {
            const dateStart = new Date(event.startStr);
            const dateEnd = new Date(event.endStr);

            // To calculate the time difference of two dates
            const Difference_In_Time = dateEnd.getTime() - dateStart.getTime();

            // To calculate the no. of days between two dates
            const Difference_In_Days = Math.round(
              Difference_In_Time / (1000 * 3600 * 24)
            );

            return Difference_In_Days === 1;
          }}
          eventContent={EventContent}
          editable={false}
          selectable={true}
          selectMirror={true}
          droppable={true}
          dayMaxEvents={1}
          eventBackgroundColor={"#449e65"}
          eventColor={"#449e65"}
          weekends={true}
          // @ts-ignore
          // @ts-nocheck
          events={currentworkSchedules}
          // initialEvents={currentEvents} // alternatively, use the `events` setting to fetch from a feed
          select={handleDateSelect} // adding event
          eventClick={handleEventClick} // trigger when clicking an event
          //  eventsSet={handleEvents} // called after events are initialized/added/changed/removed
          // you can update a remote database when these fire:
          eventAdd={handleAddEvent}
          eventChange={handleUpdateEvent}
          eventRemove={handleDeleteEvent} // triggen when you delete an event in event api
        />
      </div>

      {selectInfo && (
        <div className=" flex-[0.2] mt-10 flex flex-col h-[80vh] justify-between">
          <h1 className="text-center text-lg font-semibold">Appointments</h1>
          <div className="flex flex-col mt-10 max-h-[550px] h-[550px] overflow-y-auto gap-y-2">
            {(() => {
              if (currentAppointment.status === "pending") {
                return (
                  <div className="flex items-center justify-center">
                    <Loader2 size={30} />
                  </div>
                );
              }
              if (currentAppointment.status === "error") {
                return null;
              }
              if (currentAppointment?.data?.length <= 0) {
                return <h1 className="text-center font-semibold">No appointments found</h1>;
              }
              return currentAppointment.data?.map((appointment) => (
                <AppointmentItem data={appointment} currentUser={currentUser} key={appointment.id}/>
              ));
            })()}
          </div>
          <Button
            className="mx-auto"
            onClick={() =>
              onOpen("addAppointment", {
                calendarApi: selectInfo,
                user: currentUser,
              })
            }
          >
            Add a appointment
          </Button>
        </div>
      )}
    </div>
  );
};

export default Calendar;

const EventContent = (eventInfo: any) => {
  return (
    <div className="flex items-center gap-x-3 cursor-auto">
      <Avatar src={eventInfo.event?._def?.extendedProps?.image} />
      <span>{eventInfo.event?._def?.extendedProps?.doctorName}</span>
    </div>
  );
};
