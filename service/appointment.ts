import "server-only";

import prisma from "@/lib/prisma";
import { AppoinmentStatus } from "@prisma/client";
import moment from "moment-timezone";

// get all appointments by role
export const getAppointments = async ({
  status,
  date,
  barangayId,
  doctorId,
}: {
  status: AppoinmentStatus | undefined;
  date: Date | string | undefined;
  barangayId: string | undefined;
  doctorId: string | undefined;
}) => {
  return await prisma.appointment.findMany({
    where: {
          status: status ?? undefined,
          doctorId: doctorId ?? undefined,
          barangayId: barangayId?? undefined,
          date: {
            equals: date ? moment(date).toDate() : undefined,
          },
    },
    orderBy: {
      date: "desc",
    },
    include: {
      doctor: {
        include: {
          profile: true,
        },
      },
      patient: {
        include: {
          profile: true,
        },
      },
    },
  });
};

// get appointment by id
export const getAppointmentById = async ({ id }: { id: string }) => {
  return await prisma.appointment.findUnique({
    where: {
      id,
    },
    include: {
      barangay:true,
      doctor:true,
      patient:true,
      appointment_item:true
    }
  });
};

// create appointment
export const createAppointment = async ({
  title,
  doctorId,
  patientId,
  date,
  status,
  image_path,
  barangayId,
}: {
  title: string;
  doctorId: string;
  patientId: string;
  date: Date;
  barangayId: string;
  status: AppoinmentStatus;
  image_path?: string;
}) => {
  return await prisma.appointment.create({
    data: {
      title,
      doctorId,
      patientId,
      date,
      status,
      image_path,
      barangayId,
    },
  });
};

// update appointment
export const updateAppointmentById = async ({
  id,
  title,
  doctorId,
  patientId,
  date,
  status,
  image_path,
}: {
  id: string;
  title?: string;
  doctorId?: string;
  patientId?: string;
  date?: Date;
  status?: AppoinmentStatus;
  image_path?: string;
}) => {
  return await prisma.appointment.update({
    where: {
      id,
    },
    data: {
      title,
      doctorId,
      patientId,
      date,
      status,
      image_path,
    },
  });
};

// delete appointment by id
export const deleteAppointmentById = async ({ id }: { id: string }) => {
  return await prisma.appointment.delete({
    where: {
      id,
    },
  });
};
