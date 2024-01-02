import "server-only";

import prisma from "@/lib/prisma";
import { Gender, Role, User } from "@prisma/client";
import bcrypt from "bcrypt";
import {
  TRegister,
  TUpdateProfile,
  TUpdateUserSchema,
  TUser,
} from "@/schema/user";

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
  id: true,
  isArchived: true,
  name: true,
  email: true,
  emailVerified: true,
  image: true,
  createdAt: true,
  updatedAt: true,
  role: true,
  barangayId: true,

  profile: {
    select: {
      id: true,
      firstname: true,
      lastname: true,
      middlename: true,
      suffix: true,
      gender: true,
      specialist: true,
      licenseNo: true,
      dateOfBirth: true,
      homeNo: true,
      street: true,
      barangay: true,
      city: true,
      contactNo: true,
      zip: true,
      createdAt: true,
      updatedAt: true,
      userId: true,
    },
  },
};

export const getAllUsers = async ({
  name,
  email,
  role,
}: {
  name?: string;
  email?: string;
  role?: Role | undefined;
}): Promise<TUser[]> => {
  return await prisma.user.findMany({
    where: {
      name: {
        contains: name,
      },
      email: {
        contains: email,
      },
      role: {
        not: "ADMIN",
        equals: role,
      },
    },
    select: userAllowedFields,
  });
};

export const getUserById = async ({
  id,
  enableRawData = false,
}: {
  id: string;
  enableRawData?: boolean;
}): Promise<TUser | null> => {
  return await prisma.user.findUnique({
    where: {
      id,
    },
    select: enableRawData ? undefined : userAllowedFields,
  });
};

export const createUser = async ({
  data: {
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
  },
}: {
  data: Omit<TRegister, "confirmPassword" | "password"> & {
    hashedPassword: string;
  };
}): Promise<TUser> => {
  return await prisma.user.create({
    data: {
      email,
      hashedPassword,
      role,
      barangayId: barangay,
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

export const updateUserById = async ({
  id,
  data,
}: {
  id: string;
  data: TUpdateUserSchema;
}): Promise<TUser> => {
  return await prisma.user.update({
    where: {
      id,
    },
    data,
    select: userAllowedFields,
  });
};

export const deleteUserById = async ({
  id,
}: {
  id: string;
}): Promise<TUser> => {
  return await prisma.user.update({
    where: {
      id,
    },
    data: {
      isArchived: true,
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
  contactNo,
}: TUpdateProfile & { id: string }): Promise<TUser> => {
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
}): Promise<TUser> => {
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

export const getUserByEmail = async ({
  email,
  enableRawData = false,
}: {
  email: string;
  enableRawData?: boolean;
}): Promise<TUser | null> => {
  return await prisma.user.findUnique({
    where: {
      email,
    },
    select: enableRawData ? undefined : userAllowedFields,
  });
};
