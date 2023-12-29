import "server-only";

import prisma from "@/lib/prisma";
import { Gender, Role } from "@prisma/client";
import bcrypt from "bcrypt";
import { TRegister, TUpdateProfile } from "@/schema/user";

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
      contactNo: true,
    },
  },
};

export const getUserById = async ({
  id,
  enableRawData = false,
}: {
  id: string;
  enableRawData?: boolean;
}) => {
  return await prisma.user.findUnique({
    where: {
      id,
    },
    select: enableRawData ? undefined : userAllowedFields,
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
  contactNo,
}: Omit<TRegister, "confirmPassword" | "password"> & {
  hashedPassword: string;
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
          contactNo,
        },
      },
    },
    select: userAllowedFields,
  });
};

export const updateProfileById = async ({
  id,
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
}: TUpdateProfile & { id: string }) => {
  return await prisma.profile.update({
    where: {
      id: id,
    },
    data: {
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
      contactNo,
    },
    select: userAllowedFields,
  });
};

export const updateUserPasswordById = async ({
  id,
  hashedPassword,
}: {
  id: string;
  hashedPassword: string;
}) => {
  return await prisma.user.update({
    where: {
      id: id,
    },
    data: {
      hashedPassword,
    },
    select: userAllowedFields,
  });
};
