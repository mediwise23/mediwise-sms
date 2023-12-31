import "server-only";

import prisma from "@/lib/prisma";
import {
  TCreateBrgyItem,
  TItemBrgy,
  TUpdateBrgyItem,
} from "@/schema/item-brgy";

// getAllBarangayItem
export const getAllBarangayItem = async (data: {
  name?: string;
}): Promise<TItemBrgy[]> => {
  return await prisma.brgyItem.findMany({
    where: {
      name: {
        contains: data.name,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
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
  });
};

// createBarangayItem
export const createBarangayItem = async (
  data: TCreateBrgyItem
): Promise<TItemBrgy> => {
  return await prisma.brgyItem.create({
    data,
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
