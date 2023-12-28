import { UpdateAppointmentSchema } from "@/schema/appointment";
import {
  deleteAppointmentById,
  getAppointmentById,
  updateAppointmentById,
} from "@/service/appoinment";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: {
      appointmentId: string;
    };
  }
) {
  try {
    const appointment = await getAppointmentById({
      id: params.appointmentId,
    });

    if (!appointment) {
      return NextResponse.json(
        {
          message: "Appointment not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(appointment);
  } catch (error) {
    console.log("[APPOINMENT_GET_BY_ID]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: NextRequest,
  {
    params,
  }: {
    params: {
      appointmentId: string;
    };
  }
) {
  try {
    const appointments = await getAppointmentById({
      id: params.appointmentId,
    });

    if (!appointments) {
      return NextResponse.json(
        {
          message: "Appointment not found",
        },
        { status: 404 }
      );
    }

    const body = await UpdateAppointmentSchema.safeParseAsync(await req.json());

    if (!body.success) {
      return NextResponse.json(
        {
          errors: body.error.flatten().fieldErrors,
          message: "Invalid body parameters",
        },
        { status: 400 }
      );
    }

    const { title, doctorId, patientId, date, status, image_path } = body.data;

    const appointmentUpdated = await updateAppointmentById({
      id: params.appointmentId,
      title,
      doctorId,
      patientId,
      date,
      status,
      image_path,
    });

    return NextResponse.json(appointmentUpdated, { status: 200 });
  } catch (error) {
    console.log("[APPOINMENT_PATCH_BY_ID]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  {
    params,
  }: {
    params: {
      appointmentId: string;
    };
  }
) {
  try {
    const appointments = await getAppointmentById({
      id: params.appointmentId,
    });

    if (!appointments) {
      return NextResponse.json(
        {
          message: "Appointment not found",
        },
        { status: 404 }
      );
    }

    const appointmentDeleted = await deleteAppointmentById({
      id: params.appointmentId,
    });

    return NextResponse.json(appointmentDeleted);
  } catch (error) {
    console.log("[APPOINMENT_DELETE_BY_ID]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
