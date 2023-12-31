import { BrgyItem } from "@prisma/client";
import { z } from "zod";

export type TItemBrgy = z.infer<typeof ItemBrgySchema>;
export type TItemBrgyGetQuery = z.infer<typeof ItemBrgyGetQuerySchema>;
export type TCreateBrgyItem = z.infer<typeof CreateBrgyItemSchema>;
export type TUpdateBrgyItem = z.infer<typeof UpdateBrgyItemSchema>;

export const ItemBrgySchema = z.object({
  id: z.string(),
  description: z.string().nullable(),
  name: z.string().nullable(),
  stock: z.number().nullable(),
  unit: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
  barangayId: z.string().nullable(),
  requestId: z.string().nullable(),
  isArchive: z.boolean(),
}) satisfies z.ZodType<BrgyItem>;

export const ItemBrgyGetQuerySchema = z.object({
  name: z.string().optional(),
});

export const CreateBrgyItemSchema = ItemBrgySchema.pick({
  brgyId: true,
  name: true,
  description: true,
  unit: true,
  stock: true,
}).extend({
  brgyId: z.string().cuid(),
  name: z.string().min(1).max(255),
  description: z.string().min(1).max(255),
  unit: z.string().min(1).max(255),
  stock: z.string().min(1).max(255),
});

export const UpdateBrgyItemSchema = ItemBrgySchema.pick({
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
