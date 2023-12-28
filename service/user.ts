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

export const userAllowedFields = {
  email: true,
  name: true,
  image: true,
  role: true,
  createdAt: true,
  profile: {
    select: {
      firstname: true,
      middlename: true,
      lastname: true,
      suffix: true,
      gender: true,
      dateOfBirth: true,
      homeNo: true,
      street: true,
      barangay: true,
      city: true,
      province: true,
      contactNo: true,
    },
  },
};

export const getUserById = async ({ id }: { id: string }) => {
  return await prisma.user.findUnique({
    where: {
      id,
    },
    select: userAllowedFields,
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
    select: userAllowedFields,
  });
};
