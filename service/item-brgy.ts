import "server-only";

import prisma from "@/lib/prisma";
import {
  TCreateBrgyItem,
  TItemBrgy,
  TUpdateBrgyItem,
} from "@/schema/item-brgy";

// getAllBarangayItem
export const getAllBarangayItem = async (data: {
  name?: string,
  barangayId?:string,
}): Promise<TItemBrgy[]> => {
  return await prisma.brgyItem.findMany({
    where: {
      name: {
        contains: data.name ?? undefined,
      },
      barangayId: data.barangayId ?? undefined
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      items:true
    }
  });
};

// getBarangayItemById
export const getBarangayItemById = async (
  id: string
): Promise<TItemBrgy | null> => {
  return await prisma.brgyItem.findUnique({
    where: {
      id: id,
    },
    include: {
      items:true
    }
  });
};

// createBarangayItem
export const createBarangayItem = async (
  data: TCreateBrgyItem
): Promise<TItemBrgy> => {
  return await prisma.brgyItem.create({
    data: {
      name: data.name,
      unit: data.unit,
      description: data.description,
      // stock: Number(data.stock),
      barangayId: data.brgyId,
      dosage:data?.dosage
    },
  });
};

// updateBarangayItem
export const updateBarangayItemById = async (
  id: string,
  data: TUpdateBrgyItem
): Promise<TItemBrgy> => {
  return await prisma.brgyItem.update({
    where: {
      id,
    },
    data,
  });
};

// deleteBarangayItem
export const deleteBarangayItemById = async (id: string) => {
  return await prisma.brgyItem.delete({
    where: {
      id,
    },
  });
};
