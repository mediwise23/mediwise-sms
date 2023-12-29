import { User, Role, Gender } from "@prisma/client";
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

export const ProfileSchema = z.object({
    firstname: z.string().min(1).max(50),
    lastname: z.string().min(1).max(50),
    middlename: z.string().optional(),
    suffix: z.string().optional(),
    gender: z.nativeEnum(Gender),
    specialist: z.string().optional(),
    licenseNo: z.string().optional(),
    dateOfBirth: z.coerce.date(),
    homeNo: z.string().min(1).max(50),
    street: z.string().min(1).max(50),
    barangay: z.string().min(1).max(50),
    city: z.string().min(1).max(50),
    province: z.string().min(1).max(50),
    contactNo: z.string().min(1).max(50),
})


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

const SafeUserSchema = UserSchema.omit({
  hashedPassword: true,
});
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
}).extend({
  email: z.string().min(1, "Required").email("Invalid email"),
  password: z.string().min(1, "Required"),
});

export const RegisterUserSchema = UserSchema.pick({
  email: true,
  role: true,
}).extend({
  email: z.string().min(1).max(255).email("Invalid email"),
  role: z.nativeEnum(Role),
  firstname: z.string().min(1).max(50),
  middlename: z.string().optional(),
  lastname: z.string().min(1).max(50),
  suffix: z.string().optional(),
  gender: z.nativeEnum(Gender),
  dateOfBirth: z.string(),
  homeNo: z.string().min(1).max(50),
  street: z.string().min(1).max(50),
  barangay: z.string().min(1).max(50),
  zip:z.string(),
  city: z.string().min(1).max(50),
  contactNo: z.string().min(1).max(50),
  password: z
  .string()
  .refine(
    (value) =>
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/.test(
        value
      ),
    "Must contain 8 Characters, one uppercase, lowercase, one number and one special case character"
  ),
confirmPassword:z.string(),
})
.refine((data) => data.password === data.confirmPassword, {
      message: "Passwords don't match",
      path: ["confirmPassword"],
})

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

export const ChangePasswordSchema = z.object({
  oldPassword: z.string().min(1).max(50),
  newPassword: z
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
  confirmNewPassword: z.string().min(1).max(50),
});

export type UserSchemaType = z.infer<typeof UserSchema>
export type RegisterUserSchemaType = z.infer<typeof RegisterUserSchema>
export type TProfile = z.infer<typeof ProfileSchema>;
export type TUser = z.infer<typeof SafeUserSchema>;
export type LoginUserSchemaType = z.infer<typeof LoginUserSchema>;
export type TRegister = z.infer<typeof RegisterUserSchema>;
export type TUpdateProfile = z.infer<typeof UpdateProfileSchema>;