import { SmsItem } from "@prisma/client";
import { z } from "zod";

export type TItemSms = z.infer<typeof ItemSmsSchema>;
export type TItemSmsGetQuery = z.infer<typeof ItemSmsGetQuerySchema>;
export type TCreateSmsItem = z.infer<typeof CreateSmsItemSchema>;
export type TUpdateSmsItem = z.infer<typeof UpdateSmsItemSchema>;

export const ItemSmsSchema = z.object({
  id: z.string(),
  description: z.string().nullable(),
  name: z.string().nullable(),
  stock: z.number().nullable(),
  unit: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
  isArchive: z.boolean(),
}) satisfies z.ZodType<SmsItem>;

export const ItemSmsGetQuerySchema = z.object({
  name: z.string().optional(),
});

export const CreateSmsItemSchema = ItemSmsSchema.pick({
  name: true,
  description: true,
  unit: true,
  stock: true,
}).extend({
  name: z.string().min(1).max(255),
  description: z.string().min(1).max(255),
  unit: z.string().min(1).max(255),
  stock: z.number().min(1).max(255),
});

export const UpdateSmsItemSchema = ItemSmsSchema.pick({
  name: true,
  description: true,
  unit: true,
  stock: true,
}).extend({
  name: z.string().min(1).max(255).optional(),
  description: z.string().min(1).max(255).optional(),
  unit: z.string().min(1).max(255).optional(),
  stock: z.number().min(1).max(255).optional(),
});
