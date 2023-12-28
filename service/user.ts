import "server-only";

import prisma from "@/lib/prisma";
import { Gender, Role } from "@prisma/client";
import bcrypt from "bcrypt";

export const generateHashPassword = async (password: string) => {
  return await bcrypt.hash(password, 10);
};

export const comparePassword = async (
  password: string,
  hashedPassword: string
) => {
  return await bcrypt.compare(password, hashedPassword);
};

const userAllowedFields = {
  id: true,
  email: true,
  role: true,
  createdAt: true,
  updatedAt: true,
};

export const getUserById = async ({ id }: { id: string }) => {
  return await prisma.user.findUnique({
    where: {
      id,
    },
    select: {},
  });
};

export const createUser = async ({
  email,
  hashedPassword,
  role,
  firstname,
  middlename,
  lastname,
  suffix,
  gender,
  dateOfBirth,
  homeNo,
  street,
  barangay,
  city,
  province,
  contactNo,
}: {
  email: string;
  hashedPassword: string;
  role: Role;
  firstname: string;
  middlename: string;
  lastname: string;
  suffix: string;
  gender: Gender;
  dateOfBirth: Date;
  homeNo: string;
  street: string;
  barangay: string;
  city: string;
  province: string;
  contactNo: string;
}) => {
  return await prisma.user.create({
    data: {
      email,
      hashedPassword,
      role,
      profile: {
        create: {
          firstname,
          lastname,
          middlename,
          suffix,
          gender,
          dateOfBirth,
          homeNo,
          street,
          barangay,
          city,
          province,
          contactNo,
        },
      },
    },
  });
};
