import { prescription } from "@prisma/client";
import { z } from "zod";


export const PrescriptionSchema = z.object({
  id: z.string(),
  convertedText: z.string(),
  image: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  userId: z.string().cuid(),

}) satisfies z.ZodType<prescription>;
export type TPrescriptionSchema = z.infer<typeof PrescriptionSchema>

export const CreatePrescriptionSchema = PrescriptionSchema.pick({
    userId:true
})
.extend({
  image: z.any().refine((val) => val?.length > 0, "File is required"),
})

export type TCreatePrescriptionSchema = z.infer<typeof CreatePrescriptionSchema>

export const PrescriptionQuerySchema = PrescriptionSchema.pick({
  userId:true,
})
.partial({
  userId:true,
})