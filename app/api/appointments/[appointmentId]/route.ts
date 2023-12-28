import { getAppointmentById } from "@/service/appoinment";
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

    return NextResponse.json(appointments);
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

    return NextResponse.json(appointments);
  } catch (error) {
    console.log("[APPOINMENT_PATCH_BY_ID]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
