import { User, Role } from "@prisma/client";
import { z } from "zod";

export const allowedUserFields = {
  profile: true,
  name: true,
  email: true,
  image: true,
  role: true,
  createdAt: true,
  id: true,
};

export const UserSchema = z.object({
  id: z.string(),
  isArchived: z.boolean(),
  name: z.string().nullable(),
  email: z.string().nullable(),
  emailVerified: z.date().nullable(),
  image: z.string().nullable(),
  hashedPassword: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
  role: z.nativeEnum(Role),
  barangayId: z.string().nullable(),
}) satisfies z.ZodType<User>;

// export const CreateUsersSchema = UserSchema.extend({
//   firstname: z.string(),
//   lastname: z.string(),
//   middlename: z.string(),
//   city: z.string(),
//   homeNo: z.string(),
//   street: z.string(),
//   barangay: z.string(),
//   province: z.string(),
//   contactNo: z.string(),
//   password: z
//     .string()
//     .refine(
//       (value) =>
//         /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(
//           value
//         ),
//       "Must contain 8 Characters, one uppercase, lowercase, one number and one special case character"
//     ),
//   confirmPassword: z.string(),
//   currentPassword: z.string(),
// })
//   .partial()
//   .refine((data) => data.password === data.confirmPassword, {
//     message: "Passwords don't match",
//     path: ["confirmPassword"],
// });

export const LoginUserSchema = UserSchema.pick({
  email: true,
  hashedPassword: true
}).
extend({
  email: z.string().min(1, "Required").email("Invalid email"),
  hashedPassword: z.string().min(1, "Required")
})

export type LoginUserSchemaType = z.infer<typeof LoginUserSchema>

