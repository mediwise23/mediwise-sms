import { Item } from "@prisma/client";
import { z } from "zod";

export const ItemSchema = z.object({
    id: z.string(),
    product_number: z.string(),
    brgyItemId: z.string(),
    smsItemId: z.string(),
    updatedAt: z.date(),
    createdAt: z.date(),
  }) satisfies z.ZodType<Item>;
  
  export const CreateItemSchema = ItemSchema.pick({
    product_number: true,
  });
  
  export type TItemSchema = z.infer<typeof ItemSchema>
  export type TCreateItemSchema = z.infer<typeof CreateItemSchema>