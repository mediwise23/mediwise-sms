import { RegisterUserSchema } from "@/schema/user";
import { createUser, generateHashPassword } from "@/service/user";
import { NextRequest, NextResponse } from "next/server";

/* 
  REGISTER USER
*/
export async function POST(req: NextRequest, { params }: { params: {} }) {
  try {
    const body = await RegisterUserSchema.safeParseAsync(await req.json());

    if (!body.success) {
      return NextResponse.json(
        {
          errors: body.error.flatten().fieldErrors,
          message: "Invalid body parameters",
        },
        { status: 400 }
      );
    }

    const {
      email,
      password,
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
    } = body.data;

    // hash password
    const hashedPassword = await generateHashPassword(password);

    // create user
    const userCreated = await createUser({
      email: email,
      hashedPassword: hashedPassword,
      role: role,
      firstname,
      middlename,
      lastname,
      suffix,
      gender,
      dateOfBirth: new Date(dateOfBirth),
      homeNo,
      street,
      barangay,
      city,
      contactNo,
    });

    return NextResponse.json(`User ${email} registered successfully`, {
      status: 201,
    });
  } catch (error) {
    console.log("[REGISTER_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
