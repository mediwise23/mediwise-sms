import { RegisterUserSchema } from "@/schema/user";
import { CreateUser, generateHashPassword } from "@/service/user";
import { NextRequest, NextResponse } from "next/server";

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

    const { email, password, role } = body.data;

    // hash password
    const hashedPassword = await generateHashPassword(password);

    // create user
    const userCreated = await CreateUser({
      email,
      hashedPassword,
      role,
    });

    return NextResponse.json(`User ${email} registered successfully`, {
      status: 201,
    });
  } catch (error) {
    console.log("[REHISTER_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
