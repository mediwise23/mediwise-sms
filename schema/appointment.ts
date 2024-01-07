import { AppoinmentStatus, Appointment } from "@prisma/client";
import { z } from "zod";

export type TAppointment = z.infer<typeof AppointmentSchema>;
export type TCreateAppointment = z.infer<typeof CreateAppointmentSchema>;
export type TUpdateAppointment = z.infer<typeof UpdateAppointmentSchema>;
export type TAppointmentGetQuery = z.infer<typeof AppointmentGetQuerySchema>;

export const AppointmentSchema = z.object({
  id: z.string(),
  title: z.string(),
  doctorId: z.string().nullable(),
  patientId: z.string().nullable(),
  date: z.date(),
  status: z.nativeEnum(AppoinmentStatus),
  image_path: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
  barangayId: z.string(),
}) satisfies z.ZodType<Appointment>;

export const AppointmentGetQuerySchema = AppointmentSchema.pick({
  status: true,
  date: true,
  barangayId: true,
  doctorId:true,
})
.extend({
  date: z.coerce.date()
})
.partial({
  status: true,
  date: true,
  barangayId:true,
  doctorId:true,

})

export const CreateAppointmentSchema = AppointmentSchema.pick({
  title: true,
  doctorId: true,
  patientId: true,
  date: true,
  status: true,
  image_path: true,
  barangayId: true,
}).extend({
  title: z.string().min(3).max(255),
  doctorId: z.string().cuid(),
  patientId: z.string().cuid(),
  date: z.coerce.date(),
  status: z.nativeEnum(AppoinmentStatus),
  image_path: z.string().min(3).max(255).optional(),
});

export const UpdateAppointmentSchema = AppointmentSchema.pick({
  title: true,
  doctorId: true,
  patientId: true,
  date: true,
  status: true,
  image_path: true,
})
  .extend({
    title: z.string().min(3).max(255),
    doctorId: z.string().cuid(),
    patientId: z.string().cuid(),
    date: z.coerce.date(),
    status: z.nativeEnum(AppoinmentStatus),
    image_path: z.string().min(3).max(255),
  })
  .partial();
