import { User, Role, Gender, Profile } from "@prisma/client";
import { z } from "zod";

// user type
export type TProfile = z.infer<typeof ProfileSchema>;
export type TUser = z.infer<typeof SafeUserSchema>;

// auth types
export type LoginUserSchemaType = z.infer<typeof LoginUserSchema>;
export type TRegister = z.infer<typeof RegisterUserSchema>;
export type TUpdateProfile = z.infer<typeof UpdateProfileSchema>;
export type TUserGetQuery = z.infer<typeof UserGetQuerySchema>;

// crud user types
export type TCreateUserSchema = z.infer<typeof CreateUserSchema>;
export type TUpdateUserSchema = z.infer<typeof UpdateUserSchema>;

// export const allowedUserFields = {
//   profile: true,
//   name: true,
//   email: true,
//   image: true,
//   role: true,
//   createdAt: true,
//   id: true,
// };

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
  contactNo: z.string().nullable(),
  zip: z.string().nullable(),
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
  createdAt: z.date(),
  updatedAt: z.date(),
  role: z.nativeEnum(Role),
  barangayId: z.string().nullable(),
  isVerified: z.date().nullable(),
  // profile: ProfileSchema.nullable(),
}) satisfies z.ZodType<User>;

const SafeUserSchema = UserSchema.omit({
  hashedPassword: true,
});

export const UserGetQuerySchema = z.object({
  name: z.string().optional(),
  email: z.string().optional(),
  role: z.nativeEnum(Role).optional(),
  barangayId: z.string().optional()
});

export const LoginUserSchema = UserSchema.pick({
  email: true,
}).extend({
  email: z.string().min(1, "Required").email("Invalid email"),
  password: z.string().min(1, "Required"),
});

export const RegisterUserSchema = UserSchema.pick({
  email: true,
  role: true,
})
  .extend({
    email: z.string().min(1).max(255).email("Invalid email"),
    role: z.nativeEnum(Role),
    firstname: z.string().min(1).max(50),
    middlename: z.string().optional(),
    lastname: z.string().min(1).max(50),
    suffix: z.string().optional(),
    gender: z.nativeEnum(Gender),
    dateOfBirth: z.date(),
    homeNo: z.string().min(1).max(50),
    street: z.string().min(1).max(50),
    barangay: z.string().min(1).max(50),
    zip: z.string(),
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
    confirmPassword: z.string(),
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
  zip: true,
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
    zip: z.string().min(1).max(50),
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

export const CreateUserSchema = UserSchema.pick({}).extend({
  email: z.string().min(1, "Required").max(255).email("Invalid email"),
  role: z.nativeEnum(Role),
  firstname: z.string().min(1, "Required").max(50),
  lastname: z.string().min(1, "Required").max(50),
  middlename: z.string().min(1, "Required").max(50),
  suffix: z.string().min(1, "Required").max(50),
  gender: z.nativeEnum(Gender),
  specialist: z.string().min(1, "Required").max(50),
  licenseNo: z.string().min(1, "Required").max(50),
  dateOfBirth: z.coerce.date(),
  homeNo: z.string().min(1, "Required").max(50),
  street: z.string().min(1, "Required").max(50),
  barangay: z.string().min(1, "Required").max(50),
  city: z.string().min(1, "Required").max(50),
  province: z.string().min(1, "Required").max(50),
  contactNo: z.string().min(1, "Required").max(50),
  zip: z.string().min(1, "Required").max(50),
});


// eto dinagdag ko para makapag create ng doctor
export const CreateDoctorSchema = CreateUserSchema.pick({
  email:true,
  role:true,
  suffix:true,
  firstname:true,
  lastname:true,
  middlename:true,
  specialist:true,
  licenseNo:true,
  barangay:true
})
.partial({
  suffix:true,
  middlename:true
})

export type TCreateDoctorSchema = z.infer<typeof CreateDoctorSchema>

export const UpdateUserSchema = UserSchema.pick({
  role: true,
  barangayId: true,
})
  .extend({
    role: z.nativeEnum(Role),
    barangayId: z.string().min(1).max(50),
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
