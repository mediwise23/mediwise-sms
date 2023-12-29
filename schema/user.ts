import { User, Profile, Role, Gender } from "@prisma/client";
import { z } from "zod";

export type TProfile = z.infer<typeof ProfileSchema>;
export type TUser = z.infer<typeof SafeUserSchema>;
export type LoginUserSchemaType = z.infer<typeof LoginUserSchema>;
export type TRegister = z.infer<typeof RegisterUserSchema>;
export type TUpdateProfile = z.infer<typeof UpdateProfileSchema>;

export const ProfileSchema = z.object({
  id: z.string(),
  firstname: z.string().nullable(),
  lastname: z.string().nullable(),
  middlename: z.string().nullable(),
  suffix: z.string().nullable(),
  gender: z.nativeEnum(Gender),
  specialist: z.string().nullable(),
  licenseNo: z.string().nullable(),
  dateOfBirth: z.date().nullable(),
  homeNo: z.string().nullable(),
  street: z.string().nullable(),
  barangay: z.string().nullable(),
  city: z.string().nullable(),
  province: z.string().nullable(),
  contactNo: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
  userId: z.string(),
}) satisfies z.ZodType<Profile>;

export const UserSchema = z.object({
  id: z.string(),
  isArchived: z.boolean(),
  name: z.string().nullable(),
  email: z.string().nullable(),
  emailVerified: z.date().nullable(),
  image: z.string().nullable(),
  hashedPassword: z.string().nullable(),
  role: z.nativeEnum(Role),
  createdAt: z.date(),
  updatedAt: z.date(),
  barangayId: z.string().nullable(),
  profile: ProfileSchema.nullable(),
}) satisfies z.ZodType<User>;

const SafeUserSchema = UserSchema.omit({
  hashedPassword: true,
});

export const LoginUserSchema = UserSchema.pick({
  email: true,
  hashedPassword: true,
}).extend({
  email: z.string().min(1, "Required").email("Invalid email"),
  hashedPassword: z.string().min(1, "Required"),
});

export const RegisterUserSchema = UserSchema.pick({
  email: true,
  role: true,
})
  .extend({
    email: z.string().min(1).max(255).email("Invalid email"),
    password: z
      .string()
      .min(1)
      .max(50)
      .refine(
        (value) =>
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(
            value
          ),
        "Password must contain 8 Characters, one uppercase, lowercase, one number and one special case character"
      ),
    confirmPassword: z.string().min(1).max(50),
    role: z.nativeEnum(Role),
    firstname: z.string().min(1).max(50),
    middlename: z.string().min(1).max(50),
    lastname: z.string().min(1).max(50),
    suffix: z.string().min(1).max(50),
    gender: z.nativeEnum(Gender),
    dateOfBirth: z.date(),
    homeNo: z.string().min(1).max(50),
    street: z.string().min(1).max(50),
    barangay: z.string().min(1).max(50),
    city: z.string().min(1).max(50),
    province: z.string().min(1).max(50),
    contactNo: z.string().min(1).max(50),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const UpdateProfileSchema = ProfileSchema.pick({
  firstname: true,
  lastname: true,
  middlename: true,
  suffix: true,
  gender: true,
  // specialist: true,
  // licenseNo: true,
  dateOfBirth: true,
  homeNo: true,
  street: true,
  barangay: true,
  city: true,
  province: true,
  contactNo: true,
})
  .extend({
    firstname: z.string().min(1).max(50),
    lastname: z.string().min(1).max(50),
    middlename: z.string().min(1).max(50),
    suffix: z.string().min(1).max(50),
    gender: z.nativeEnum(Gender),
    // specialist: z.string().min(1).max(50),
    // licenseNo: z.string().min(1).max(50),
    dateOfBirth: z.coerce.date(),
    homeNo: z.string().min(1).max(50),
    street: z.string().min(1).max(50),
    barangay: z.string().min(1).max(50),
    city: z.string().min(1).max(50),
    province: z.string().min(1).max(50),
    contactNo: z.string().min(1).max(50),
  })
  .partial();

// test.js
// const z = require("zod");
// const RegisterUserSchema = z
//   .object({
//     password: z
//       .string()
//       .min(1)
//       .max(50)
//       .refine(
//         (value) =>
//           /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(
//             value
//           ),
//         "Must contain 8 Characters, one uppercase, lowercase, one number and one special case character"
//       ),
//     confirmPassword: z.string().min(1).max(50),
//   })
//   .refine((data) => data.password === data.confirmPassword, {
//     message: "Passwords don't match",
//     path: ["confirmPassword"],
//   });

// // test

// const fake_data = {
//   password: "Test1234",
//   confirmPassword: "@Test1234",
// };

// const result = RegisterUserSchema.safeParse(fake_data);

// if (!result.success) {
//   console.log(result.error.flatten().fieldErrors);
// }
