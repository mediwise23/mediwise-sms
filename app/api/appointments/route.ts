import { withAuth } from "@/lib/auth";
import {
  AppointmentGetQuerySchema,
  CreateAppointmentSchema,
} from "@/schema/appointment";
import { createAppointment, getAppointments } from "@/service/appointment";
import { getQueryParams } from "@/service/params";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, { params }: { params: {} }) {
  const queries = getQueryParams(req, AppointmentGetQuerySchema);

  if (!queries.success) {
    return NextResponse.json(
      {
        errors: queries.error.flatten().fieldErrors,
        message: "Invalid query parameters",
      },
      { status: 400 }
    );
  }

  try {
    const appointments = await getAppointments({
      role: queries.data.status,
    });

    return NextResponse.json(appointments, { status: 200 });
  } catch (error) {
    console.log("[APPOINMENT_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export const POST = withAuth(
  async ({ req, session }) => {
    try {
      const body = await CreateAppointmentSchema.safeParseAsync(
        await req.json()
      );

      if (!body.success) {
        return NextResponse.json(
          {
            errors: body.error.flatten().fieldErrors,
            message: "Invalid body parameters",
          },
          { status: 400 }
        );
      }

      const { title, doctorId, patientId, date, status, image_path } =
        body.data;

      const appointment = await createAppointment({
        title,
        doctorId,
        patientId,
        date,
        status,
        image_path,
      });

      return NextResponse.json(appointment, { status: 201 });
    } catch (error) {
      console.log("[APPOINMENT_POST]", error);
      return new NextResponse("Internal error", { status: 500 });
    }
  },
  {
    requiredRole: ["ADMIN", "DOCTOR", "PATIENT"],
  }
);
