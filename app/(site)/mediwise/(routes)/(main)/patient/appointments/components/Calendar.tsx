"use client";
import React from "react";
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
import { Profile, Role, User, WorkSchedule } from "@prisma/client";
import { useToast } from "@/components/ui/use-toast";
import { Session } from "next-auth";

import { TUser } from "@/schema/user";
import Avatar from "@/components/Avatar";
import moment from "moment-timezone";
type CalendarClientProps = {
  currentUser: Session["user"];
};

const Calendar: React.FC<CalendarClientProps> = ({ currentUser }) => {
  const { onOpen, onClose } = useModal();
  const { toast } = useToast();
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

    // onOpen("addWorkSchedule", { calendarApi, user: currentUser });
  };

  type EventData = {
    id: string;
    title: string;
    start: Date;
    end: Date;
    allDay: boolean;
  };

  const handleAddEvent = ({ event }: any) => {};

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
    <div className="w-full h-full">
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
        editable={true}
        selectable={true}
        selectMirror={true}
        droppable={true}
        dayMaxEvents={true}
        eventBackgroundColor={"#449e65"}
        eventColor={"#449e65"}
        weekends={true}
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
  );
};

export default Calendar;

const EventContent = (eventInfo: any) => {
  return (
    <div className="flex items-center gap-x-3">
      <Avatar src={eventInfo.event?._def?.extendedProps?.image} />
      <span>{eventInfo.event?._def?.extendedProps?.doctorName}</span>
    </div>
  );
};
