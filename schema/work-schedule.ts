import { WorkSchedule } from "@prisma/client";
import { z } from "zod";

// export type TAppointment = z.infer<typeof AppointmentSchema>;
// export type TCreateAppointment = z.infer<typeof CreateAppointmentSchema>;
// export type TUpdateAppointment = z.infer<typeof UpdateAppointmentSchema>;


export const WorkScheduleSchema = z.object({
    id: z.string(),
    title: z.string().min(1),
    isArchived: z.boolean(),
    start: z.date(),
    end: z.date(),
    allDay: z.boolean(),
    createdAt: z.date(),
    updatedAt: z.date(),
    doctorId: z.string().cuid(),
  }) satisfies z.ZodType<WorkSchedule>;

  export const CreateWorkScheduleSchema = WorkScheduleSchema.pick({
    id: true,
    title: true,
    allDay: true,
    start: true,
    end: true,
  })
  .extend({
    start: z.string(),
    end: z.string(),
  })


  export type CreateWorkScheduleSchemaType = z.infer<typeof CreateWorkScheduleSchema>;
