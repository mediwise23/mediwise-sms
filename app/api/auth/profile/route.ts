import { withAuth } from "@/lib/auth";
import { UpdateProfileSchema } from "@/schema/user";
import { getUserById, updateProfileById } from "@/service/user";
import { NextResponse } from "next/server";

/* 
  UPDATE PROFILE
*/
export const PATCH = withAuth(
  async ({ req, session, params }) => {
    try {
      const body = await UpdateProfileSchema.safeParseAsync(await req.json());

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
        return new NextResponse("User not found", { status: 404 });
      }

      // update current user profile
      const barangayUpdated = await updateProfileById({
        id: session.user.id,
        ...body.data,
      });

      return NextResponse.json(barangayUpdated, { status: 201 });
    } catch (error) {
      console.log("[PROFILE_PATCH]", error);
      return new NextResponse("Internal error", { status: 500 });
    }
  },
  {
    requiredRole: [],
  }
);
