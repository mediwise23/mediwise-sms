import "server-only";

import prisma from "@/lib/prisma";
import { AppoinmentStatus } from "@prisma/client";
import moment from "moment-timezone";

// get all appointments by role
export const getAppointments = async ({
  role,
  date,
  barangayId
}: {
  role: AppoinmentStatus | undefined;
  date: Date | string | undefined;
  barangayId: string | undefined;
}) => {

  return await prisma.appointment.findMany({
    where: {
          status: role,
          date: { 
            equals: moment(date).toDate(),
          },
          barangayId
    },
    orderBy: {
      date: "desc",
    },
    include: {
      doctor: {
        include: {
          profile:true
        }
      },
      patient: {
        include: {
          profile:true
        }
      },
    }
  });
};

// get appointment by id
export const getAppointmentById = async ({ id }: { id: string }) => {
  return await prisma.appointment.findUnique({
    where: {
      id,
    },
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
  barangayId
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
      barangayId
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
