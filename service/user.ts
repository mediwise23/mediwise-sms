import "server-only";

import prisma from "@/lib/prisma";
import { Role } from "@prisma/client";
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

export const CreateUser = async ({
  email,
  hashedPassword,
  role,
}: {
  email: string;
  hashedPassword: string;
  role: Role;
}) => {
  return await prisma.user.create({
    data: {
      email,
      hashedPassword,
      role,
    },
  });
};
