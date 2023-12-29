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
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { signOut, useSession } from "next-auth/react";
import { Role, WorkSchedule } from "@prisma/client";

const Calendar = () => {
  const { onOpen, onClose } = useModal();

  const workSchedules = useQueryProcessor<WorkSchedule[]>({url:`/work-schedules`,key:["work-schedules"]});

  const currentworkSchedules = typeof workSchedules.data !== "undefined" && workSchedules?.data?.length > 0
      ? workSchedules.data.map((workSchedule) => {
          return {
            id: workSchedule?.id,
            title: workSchedule?.title,
            start: workSchedule?.start,
            end: workSchedule?.end,
            allDay: workSchedule?.allDay,
          };
        })
      : [];


  const handleDateSelect = (selectInfo: any) => {
    const calendarApi = selectInfo;
    console.log(calendarApi)
    onOpen("addWorkSchedule", { calendarApi });
  };

  type EventData = {
    id: string;
    title: string;
    start: Date;
    end: Date;
    allDay: boolean;
  };
  const addWorkSchedule = useMutateProcessor({
    url: '/work-schedules',
    method:'POST',
    key: ['work-schedules']
  })

  const handleAddEvent = ({ event }: any) => {
    const eventData = {
      id: event.id,
      title: event.title,
      start: event.start,
      end: event.end,
      allDay: event.allDay,
    } as EventData;

    addWorkSchedule.mutate(eventData, {
      onSuccess(data) {
        toast.success("Work Schedule added!");
        onClose();
      },
      onError(error, variables, context) {
        console.error(error)
        toast.error("Something went wrong...");
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
        height={"85vh"}
        initialView="dayGridMonth"
        // longPressDelay={0}
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
