import "server-only";

import prisma from "@/lib/prisma";
import { AppoinmentStatus } from "@prisma/client";

// get all appointments by role
export const getAppointments = async ({
  role,
}: {
  role: AppoinmentStatus | undefined;
}) => {
  return await prisma.appointment.findMany({
    where: {
      status: role,
    },
    orderBy: {
      date: "desc",
    },
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
}: {
  title: string;
  doctorId: string;
  patientId: string;
  date: Date;
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
