import { withAuth } from "@/lib/auth";
import { VerifyUserSchema } from "@/schema/user";
import { getUserById, updateProfileById } from "@/service/user";
import { NextResponse } from "next/server";

export const POST = withAuth(
  async ({ req, session, params }) => {
    try {
      const body = await VerifyUserSchema.safeParseAsync(await req.json());

      if (!body.success) {
        return NextResponse.json(
          {
            errors: body.error.flatten().fieldErrors,
            message: "Invalid body parameters",
          },
          { status: 400 }
        );
      }

      // double check if user exists
      const user = await getUserById({ id: session.user.id });

      if (!user) {
        return NextResponse.json(
          {
            message: "User not found",
          },
          { status: 404 }
        );
      }

      // check if code is equal to user's vefificationCode
      if (user.vefificationCode !== body.data.code) {
        return NextResponse.json(
          {
            message: "Invalid verification code",
          },
          { status: 400 }
        );
      }

      //   update user status to verified
      const profileUpdated = await updateProfileById({
        id: session.user.id,
        isVerified: true,
      });

      return NextResponse.json(profileUpdated, { status: 201 });
    } catch (error) {
      console.log("[VERIFICATION_POST]", error);
      return new NextResponse("Internal error", { status: 500 });
    }
  },
  {
    requiredRole: [],
  }
);
