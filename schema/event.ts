import { Event } from "@prisma/client";

import { z } from "zod";

export const EventSchema = z.object({
  id: z.string(),
  title: z.string().min(1,"Required"),
  description: z.string().min(1,"Required"),
  isArchived: z.boolean(),
  start: z.date(),
  end: z.date(),
  allDay: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
  barangayId: z.string().cuid(),
  userId: z.string().cuid().nullable(),
}) satisfies z.ZodType<Event>;

export type EventSchemaType = z.infer<typeof EventSchema>;


export const CreateEventSchema = EventSchema.pick({
  id: true,
  title: true,
  description: true,
  allDay: true,
  start:true,
  end:true,
})
.extend({
  start: z.coerce.date(),
  end: z.coerce.date()
})
export type TCreateEventSchema = z.infer<typeof CreateEventSchema>;


export const EventGetQuerySchema = EventSchema.pick({
  barangayId: true,
  userId: true
})
.partial({
  barangayId: true,
  userId:true,
})
