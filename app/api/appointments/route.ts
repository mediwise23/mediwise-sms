import {
  AppointmentGetQuerySchema,
  CreateAppointmentSchema,
} from "@/schema/appointment";
import { createAppointment, getAppointments } from "@/service/appoinment";
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

export async function POST(req: NextRequest, { params }: { params: {} }) {
  try {
    const result = await CreateAppointmentSchema.safeParseAsync(
      await req.json()
    );

    if (!result.success) {
      return NextResponse.json(
        {
          errors: result.error.flatten().fieldErrors,
          message: "Invalid body parameters",
        },
        { status: 400 }
      );
    }

    const { title, doctorId, patientId, date, status, image_path } =
      result.data;

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
}